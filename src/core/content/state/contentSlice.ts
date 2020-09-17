import { createSlice, createAsyncThunk, createAction, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { container } from '@covid/provider/services';
import { IContentService } from '@covid/core/content/ContentService';
import { Services } from '@covid/provider/services.types';
import { AsyncStorageService, DISMISSED_CALLOUTS, PersonalisedLocalData } from '@covid/core/AsyncStorageService';
import { IPredictiveMetricsClient } from '@covid/core/content/PredictiveMetricsClient';

// State interface

type ApiState = 'ready' | 'loading' | 'finished' | 'error';

export type ContentState = {
  // Startup info
  infoApiState: ApiState;
  startupInfo?: StartupInfo;
  personalizedLocalData?: PersonalisedLocalData;

  // Metrics
  ukMetricsApiState: ApiState;
  ukActive?: string;
  ukDaily?: string;

  todayDate: string;

  dismissedCallouts: string[];
};

// Default state

const todaysDate = (): string => moment().format('dddd Do MMMM');

const initialState: ContentState = {
  infoApiState: 'ready',
  ukMetricsApiState: 'ready',
  todayDate: todaysDate(),
  dismissedCallouts: [],
};

// Async Actions

export const fetchDismissedCallouts = createAsyncThunk(
  'content/dismissed_callouts',
  async (): Promise<Partial<ContentState>> => {
    const arrayString = await AsyncStorageService.getItem<string>(DISMISSED_CALLOUTS);
    return {
      dismissedCallouts: arrayString ? (JSON.parse(arrayString) as string[]) : [],
    };
  }
);

export const fetchStartUpInfo = createAsyncThunk(
  'content/startup_info',
  async (): Promise<Partial<ContentState>> => {
    const service = container.get<IContentService>(Services.Content);
    return {
      startupInfo: (await service.getStartupInfo()) ?? undefined,
      personalizedLocalData: service.localData,
    };
  }
);

export const fetchUKMetrics = createAsyncThunk(
  'content/uk_metrics',
  async (): Promise<Partial<ContentState>> => {
    const service = container.get<IPredictiveMetricsClient>(Services.PredictiveMetricsClient);
    return {
      ukActive: (await service.getActiveCases()) ?? undefined,
      ukDaily: (await service.getDailyCases()) ?? undefined,
    };
  }
);

export const updateTodayDate = createAction('context/update_today_date');
export const addDismissCallout = createAction<string>('content/dismissed_callout');

// Slice (Store, Reducer, Actions etc...)

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: {
    [updateTodayDate.type]: (current) => {
      current.todayDate = todaysDate();
    },
    [addDismissCallout.type]: (current, action: PayloadAction<string>) => {
      if (!current.dismissedCallouts.includes(action.payload)) {
        current.dismissedCallouts = [...current.dismissedCallouts, action.payload];
        AsyncStorageService.setItem(JSON.stringify(current.dismissedCallouts), DISMISSED_CALLOUTS);
      }
    },
    // StartUpInfo reducers
    [fetchStartUpInfo.pending.type]: (current) => {
      current.infoApiState = 'loading';
    },
    [fetchStartUpInfo.rejected.type]: (current) => {
      current.infoApiState = 'error';
    },
    [fetchStartUpInfo.fulfilled.type]: (current, action: { payload: Partial<ContentState> }) => {
      current.infoApiState = !action.payload ? 'error' : 'finished';
      const { startupInfo, personalizedLocalData } = action.payload;
      current.startupInfo = startupInfo;
      current.personalizedLocalData = personalizedLocalData;
    },

    // DismissedCallouts reducer
    [fetchDismissedCallouts.fulfilled.type]: (current, action: { payload: Partial<ContentState> }) => {
      current.dismissedCallouts = action.payload.dismissedCallouts ?? [];
    },

    // UK Predictive Metrics reducers
    [fetchUKMetrics.pending.type]: (current) => {
      current.ukMetricsApiState = 'loading';
    },
    [fetchUKMetrics.rejected.type]: (current) => {
      current.ukMetricsApiState = 'error';
    },
    [fetchUKMetrics.fulfilled.type]: (current, action: { payload: Partial<ContentState> }) => {
      current.ukMetricsApiState = !action.payload ? 'error' : 'finished';
      const { ukActive, ukDaily } = action.payload;
      current.ukActive = ukActive;
      current.ukDaily = ukDaily;
    },
  },
});