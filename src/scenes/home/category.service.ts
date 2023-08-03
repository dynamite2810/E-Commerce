import { AxiosResponse } from 'axios';
import { ApiClient } from '@/configs/api.config';

export const getCategory = async (page: number = 1, size: number = 15) => {
  const response: AxiosResponse<any> = await ApiClient.get(`/category?page=${page}&&size=${size}`);
  return response.data;
};
