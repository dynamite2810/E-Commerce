import { AxiosResponse } from 'axios';

import { ApiClient } from '@/configs/api.config';
import {
  IGetUserInfoReponse,
  ISignInReponse,
  ISignInRequest,
  ISignUpRequest,
} from '@/interfaces/auth.interface';

export const getUserInfo = async () => {
  const response: AxiosResponse<IGetUserInfoReponse> = await ApiClient.get('/user/info');
  return response.data;
};

export const update = async (payload: any) => {
  const response: AxiosResponse<ISignInReponse> = await ApiClient.patch('/auth/update-info', payload);
  return response.data;
};

export const signIn = async (payload: ISignInRequest) => {
  const response: AxiosResponse<ISignInReponse> = await ApiClient.post('/auth/login', payload);
  return response.data;
};

export const signUp = async (payload: ISignUpRequest) => {
  const response: AxiosResponse<ISignInReponse> = await ApiClient.post('/auth/register', payload);
  return response.data;
};
