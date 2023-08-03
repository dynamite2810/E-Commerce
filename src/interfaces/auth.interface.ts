import { GENDER, LOGIN_TYPE, USER_ROLE, USER_STATUS } from '@/constants/config.constant';

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  email: string;
  password: string;
  confirmPassword: string;
  name : string,
  phone : string,
  role: USER_ROLE;
}

export interface ISignInReponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IGetUserInfoReponse {
  user: IUser;
}

export interface IUser {
  id: string;
  username: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  gender: GENDER;
  role: USER_ROLE;
  loginType: LOGIN_TYPE;
  status: USER_STATUS;
}
