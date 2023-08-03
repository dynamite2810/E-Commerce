import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LOCALSTORAGE, USER_ROLE } from '@/constants/config.constant';
import { ISignInRequest, ISignUpRequest, IUser } from '@/interfaces/auth.interface';
import { getUserInfo, signIn, signUp, update } from '@/services/api/auth.service';
import { RootState } from '../store';
import Cookies from 'js-cookie';

export interface AuthState {
  currentUser: any;
  loading: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  loading: false,
};


export const updateProfile = createAsyncThunk('auth/update-info', async (payload: any) => {
  const res = await update(payload);
  return res;
});

export const requestSignIn = createAsyncThunk('auth/sign-in', async (payload: ISignInRequest) => {
  const res = await signIn(payload);
  if (res) Cookies.set('token', res.accessToken);
  return res;
});

export const requestSignUp = createAsyncThunk('auth/sign-up', async (payload: ISignUpRequest) => {
  const res = await signUp({ ...payload, role: USER_ROLE.USER });
  // if (res) localStorage.setItem(LOCALSTORAGE.TOKEN, res.accessToken);
  return res;
});

export const requestGetUserInfo = createAsyncThunk('auth/get-user-info', async () => {
  const res = await getUserInfo();
  return res;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const actionList = [requestSignIn, requestSignUp, requestGetUserInfo];
    actionList.forEach((action) => {
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(action.rejected, (state) => {
        state.loading = false;
      });
    });

    builder.addCase(updateProfile.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.currentUser = {
        ...state.currentUser,
        ...action.payload
      };
    });

    builder.addCase(requestSignIn.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.currentUser = action.payload?.user;
    });

    builder.addCase(requestSignUp.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.currentUser = action.payload?.user;
    });

    builder.addCase(requestGetUserInfo.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.currentUser = action.payload?.user;
    });
  },
});

export const authState = (state: RootState) => state.authState;
export default authSlice.reducer;
