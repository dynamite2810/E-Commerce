import { LOCALSTORAGE } from '@/constants/config.constant';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

const requestHandler: any = (config: AxiosRequestConfig) => {
  // const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
  const token = Cookies.get('token');
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };

  config.params = {
    ...config.params,
    version: Date.now(),
  };

  return config;
};

export const apiClient = {
  get: (url: string, data?: any | null) => {
    return axiosInstance({
      method: 'get',
      url,
      params: data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  },
  post: (url: string, data: any) => {
    return axiosInstance({
      method: 'post',
      url,
      data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  },
  delete: (url: string, data: any, headers = {}) =>
    axiosInstance({
      method: 'delete',
      url,
      data,
      headers,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      }),
  put: (url: string, data: any) =>
    axiosInstance({
      method: 'put',
      url,
      data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      }),
  patch: (url: string, data: any) =>
    axiosInstance({
      method: 'patch',
      url,
      data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      }),
};

const responseErrorHandler = async (err: AxiosError) => {
  const data: any = err?.response?.data;
  const message = data?.message;

  if (message) {
    throw new Error(message);
  }
  return Promise.reject(err);
};

axiosInstance.interceptors.request.use(requestHandler, (err) => Promise.reject(err));
axiosInstance.interceptors.response.use((response: any) => response, responseErrorHandler);

export { axiosInstance as ApiClient };
