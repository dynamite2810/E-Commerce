import { AxiosResponse } from 'axios';

import { TFilterParams } from '@/interfaces/common.interface';
import { ApiClient } from '@/configs/api.config';
import { TRecommendProductsReponse } from '@/interfaces/product.interface';

export const getRecommendProducts = async (params: TFilterParams, token: string) => {
  const response: AxiosResponse<TRecommendProductsReponse> = await ApiClient.get(
    '/product/recommend',
    {
      headers: {
        token,
      },
      params,
    }
  );
  return response.data;
};
