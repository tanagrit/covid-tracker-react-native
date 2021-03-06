import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { profilesIcon } from '@assets';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ClickableText, HeaderText, RegularBoldText, RegularText, SecondaryText } from '@covid/components/Text';
import { Header } from '@covid/components/Screen';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { IProfileService } from '@covid/core/profile/ProfileService';
import { ScreenParamList } from '@covid/features';
import { BrandedButton } from '@covid/components';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ReportForOther'>;
  route: RouteProp<ScreenParamList, 'ReportForOther'>;
};

export default class ReportForOtherScreen extends Component<RenderProps, object> {
  @lazyInject(Services.Profile)
  private readonly profileService: IProfileService;

  handleSkip = async () => {
    await this.profileService.recordAskedToReportForOther();
    assessmentCoordinator.gotoNextScreen(this.props.route.name);
  };

  render() {
    return (
      <View style={styles.view}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.rootContainer}>
              <Header>
                <HeaderText style={{ marginBottom: 12 }}>{i18n.t('report-for-others-title')}</HeaderText>
                <SecondaryText>{i18n.t('report-for-others-text')}</SecondaryText>
              </Header>

              <View style={styles.shareContainer}>
                <Image source={profilesIcon} style={styles.icon} />

                <View style={styles.innerContainer}>
                  <RegularBoldText style={styles.innerContainerBold}>
                    {i18n.t('report-for-others-add-profiles')}
                  </RegularBoldText>
                  <RegularText style={styles.innerContainer}>{i18n.t('report-for-others-subtext')}</RegularText>
                </View>

                <BrandedButton
                  onPress={() => {
                    assessmentCoordinator.resetToCreateProfile();
                  }}>
                  <Text>{i18n.t('report-for-others-add-profiles')}</Text>
                </BrandedButton>
              </View>

              <RegularText style={styles.shareSubtitle}>{i18n.t('report-for-others-not-right-now')}</RegularText>

              <ClickableText onPress={() => this.handleSkip()} style={styles.done}>
                {i18n.t('report-for-others-skip')}
              </ClickableText>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.backgroundSecondary,
  },

  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'space-between',
  },

  rootContainer: {
    padding: 10,
  },

  shareSubtitle: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: colors.secondary,
  },

  shareContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  innerContainerBold: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 8,
  },

  innerContainer: {
    alignSelf: 'center',
    textAlign: 'center',
  },

  icon: {
    alignSelf: 'center',
    height: 100,
    width: 150,
    resizeMode: 'contain',
  },

  done: {
    alignSelf: 'center',
    color: colors.primary,
    margin: 40,
    fontSize: 20,
  },
});
