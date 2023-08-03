import { ISignInRequest } from '@/interfaces/auth.interface';
import { useAppDispatch } from '@/redux/hook';
import { requestSignIn } from '@/redux/slices/auth.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { openNotificationWithIcon } from 'helper/notification_antd';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Wrap from '../../components/Wrap';
import Image from 'next/image';

const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });
  const goToHomePage = () => {
    router.push('/');
  };

  const onSubmit = async (data: any) => {
    try {
      const resultAction = await dispatch(requestSignIn(data));
      unwrapResult(resultAction);
      goToHomePage();
    } catch (err: any) {
      openNotificationWithIcon('error', err.message);
    }
  };
  console.log('errors', errors);

  return (
    <Wrap background="bg-dart-red" className="shrink h-full py-10">
      <div className="flex justify-between max-lg:justify-center px-28 items-center h-full">
        <div
          className="rounded-3xl	p-4 flex flex-col justify-between w-[350px] h-full"
          style={{ background: '#F4F1F1' }}
        >
          <div>
            <div className="text-3xl mb-4">Đăng nhập</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                placeholder="Email"
                className="w-full outline-none text-lg focus:border-0 border-0 box-border px-3 mb-3"
                style={{ height: 60, background: '#D9D9D9' }}
                {...register('email', {
                  required: 'Vui lòng nhập email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email không hợp lệ',
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p className="text-red-600 mb-2" key={type}>
                      {message}
                    </p>
                  ))
                }
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full outline-none mb-3 text-lg focus:border-0 box-border	px-3 border-0"
                style={{ height: 60, background: '#D9D9D9' }}
                {...register('password', {
                  required: 'Vui lòng nhập mật khẩu',
                })}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p className="text-red-600 mb-2" key={type}>
                      {message}
                    </p>
                  ))
                }
              />
              <button
                type="submit"
                className="text-white text-center text-3xl border-0 outline-none w-full"
                style={{ height: 60, background: '#EE2D29' }}
              >
                ĐĂNG NHẬP
              </button>
            </form>
            <p className="mt-3">Quên mật khẩu</p>
          </div>
          <div
            className="text-dart-red text-xl flex justify-end cursor-pointer"
            onClick={() => router.push('/sign-up')}
          >
            Đăng ký
          </div>
        </div>
        <div className="max-lg:hidden xl:text-4xl md:text-2xl text-white flex flex-col justify-center items-center">
          <Image src="logo-white.svg" width={90} height={90} className="w-max" alt={''} />
          <p className="mt-[-20px] mb-3">KinKin</p>
          <p className="xl:text-3xl lg:text-xl font-normal text-white">Giải pháp</p>
          <p className="xl:text-3xl lg:text-xl font-normal text-white">thương mại điện tử</p>
        </div>
      </div>
    </Wrap>
  );
};

const cssInputAntd = {
  backgroundColor: '#D9D9D9',
  borderRadius: 0,
  outline: 'none',
  borderWidth: 0,
  boxShadow: 'none',
  height: 50,
};

export default SignIn;
