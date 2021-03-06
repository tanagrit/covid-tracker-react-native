import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@covid/core/state/root';

import { IUser } from '../types';

const initialState: IUser = {
  ask_for_rating: false,
  authorizations: [],
  country_code: '',
  is_tester: false,
  language_code: '',
  patients: [],
  pii: '',
  push_tokens: [],
  username: '',
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    reset: () => {
      return {
        ...initialState,
      };
    },
    setProfile: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPatients: (state, action: PayloadAction<string[]>) => {
      state.patients = action.payload;
    },
  },
});

export const { reset, setProfile, setUsername, setPatients } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
