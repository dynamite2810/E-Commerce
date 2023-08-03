import { AxiosResponse } from 'axios';
import { openNotificationWithIcon } from 'helper/notification_antd';
import { useEffect } from 'react';

import { apiClient } from '@/configs/api.config';

export const getNotification = async (size : number = 7) => {
  const response: AxiosResponse<any> = await apiClient.get(`/notification/notifications?size=${size}`);
  return response.data;
};
