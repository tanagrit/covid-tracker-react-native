import { inject, injectable } from 'inversify';

import { AsyncStorageService, PERSONALISED_LOCAL_DATA, PersonalisedLocalData } from '@covid/core/AsyncStorageService';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { handleServiceError } from '@covid/core/api/ApiServiceErrors';
import { isSECountry, isUSCountry, LocalisationService } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { ScreenContent } from '@covid/core/content/ScreenContentContracts';
import { Services } from '@covid/provider/services.types';
import { camelizeKeys } from '@covid/core/api/utils';
import { IContentApiClient } from '@covid/core/content/ContentApiClient';
import { useConstants } from '@covid/utils/hooks';

import { FeaturedContentResponse, TrendLineResponse } from './dto/ContentAPIContracts';

const Constants = useConstants();
export interface IContentService {
  localData?: PersonalisedLocalData;
  getUserCount(): Promise<string | null>;
  getCalloutBoxDefault(): ScreenContent;
  getAskedToRateStatus(): Promise<string | null>;
  setAskedToRateStatus(status: string): void;
  getUserCount(): Promise<string | null>;
  getStartupInfo(): Promise<StartupInfo | null>;
  getTrendLines(lad?: string): Promise<TrendLineResponse>;
  getFeaturedContent(): Promise<FeaturedContentResponse>;
  signUpForDietNewsletter(signup: boolean): Promise<void>;
}

@injectable()
export default class ContentService implements IContentService {
  @inject(Services.ContentApi)
  private readonly apiClient: IContentApiClient;

  localData: PersonalisedLocalData;

  static getWebsiteUrl = () => {
    if (isUSCountry()) {
      return 'https://covid.joinzoe.com/us';
    } else if (isSECountry()) {
      return 'https://covid19app.lu.se/';
    } else {
      return 'https://covid.joinzoe.com/';
    }
  };

  getCalloutBoxDefault(): ScreenContent {
    return {
      title_text: i18n.t('welcome.research'),
      body_text: i18n.t('welcome.see-how-your-area-is-affected'),
      body_link: ContentService.getWebsiteUrl(),
      link_text: i18n.t('welcome.visit-the-website'),
      body_photo: null,
      experiment_name: '',
      cohort_id: 0,
      analytics: '',
    };
  }

  async getUserCount() {
    return await AsyncStorageService.getUserCount();
  }

  async checkVersionOfAPIAndApp(apiVersion: string | undefined): Promise<boolean> {
    const appVersion: string | undefined = Constants.manifest.version;
    if (!appVersion || !apiVersion) {
      // Error getting versions - better to return false than incorrectly show a "please update" popup
      return false;
    }

    /*
      We are actually only concerned about the "middle" version number
      as our Best Practices at versioning means an increment of the "middle number" 
      means "breaking changes" from the API:

      API      APP       Show modal?
      2.4.0   2.5.0    No
      2.4.0   2.4.3    No
      2.4.0   2.4.0    No
      2.4.0   1.3.0    Yes
    */
    const apiVersionParts: string[] = apiVersion.split('.');
    const appVersionParts: string[] = appVersion.split('.');

    // First check on the major (1st) digits
    const startNumberAPI: number = parseInt(apiVersionParts[0]);
    const startNumberAPP: number = parseInt(appVersionParts[0]);

    if (startNumberAPP < startNumberAPI) {
      return true;
    }

    // Now check the middle digits. We don't do diffs for minor (3rd) digits
    const middleNumberAPI: number = parseInt(apiVersionParts[1]);
    const middleNumberAPP: number = parseInt(appVersionParts[1]);
    return middleNumberAPP < middleNumberAPI;
  }

  async getStartupInfo() {
    try {
      const info = await this.apiClient.getStartupInfo();
      const appNeedsUpdating: boolean = await this.checkVersionOfAPIAndApp(info.min_supported_app_version);
      info.app_requires_update = appNeedsUpdating;

      LocalisationService.ipCountry = info.ip_country;
      await AsyncStorageService.setUserCount(info.users_count.toString());
      if (info.local_data) {
        const data = camelizeKeys(info.local_data);
        await AsyncStorageService.setItem(JSON.stringify(camelizeKeys(data)), PERSONALISED_LOCAL_DATA);
        this.localData = data;
      }
      return info;
    } catch (error) {
      handleServiceError(error);
    }

    return null;
  }

  public async getAskedToRateStatus() {
    return AsyncStorageService.getAskedToRateStatus();
  }

  public setAskedToRateStatus(status: string) {
    AsyncStorageService.setAskedToRateStatus(status);
  }

  public async getTrendLines(lad?: string): Promise<TrendLineResponse> {
    return this.apiClient.getTrendLines(lad);
  }

  public async getFeaturedContent(): Promise<FeaturedContentResponse> {
    return this.apiClient.getFeaturedContent();
  }

  public signUpForDietNewsletter(signup: boolean): Promise<void> {
    return this.apiClient.signUpForDietNewsletter(signup);
  }
}
