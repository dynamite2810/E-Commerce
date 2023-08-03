import { unwrapResult } from '@reduxjs/toolkit';
import { message } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppDispatch } from '@/redux/hook';
import { requestGetUserInfo } from '@/redux/slices/auth.slice';

interface IWrap {
  children: JSX.Element;
}

const Wrap = ({ children }: IWrap) => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  // const authReducer = useAppSelector(authState);
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('/sign-in');
    }
    const getUserInfo = async () => {
      try {
        const actionResult = await dispatch(requestGetUserInfo());
        unwrapResult(actionResult);
      } catch (err: any) {
        messageApi.error(err.message);
      }
    };
    if (Cookies.get('token')) getUserInfo();
  }, []);

  return <>{children}</>;
};

export default Wrap;
