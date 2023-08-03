import { ISignUpRequest } from '@/interfaces/auth.interface';
import { useAppDispatch } from '@/redux/hook';
import { requestSignUp } from '@/redux/slices/auth.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { openNotificationWithIcon } from 'helper/notification_antd';
import { useRouter } from 'next/router';
import Wrap from '../../components/Wrap';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';

const SignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });
  const goToHomeLogin = () => {
    router.push('/sign-in');
  };

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      openNotificationWithIcon('warning', 'Mật khẩu không trùng khớp');
    } else {
      try {
        const resultAction = await dispatch(requestSignUp(data));
        unwrapResult(resultAction);
        openNotificationWithIcon(
          'success',
          'Đăng ký tài khoản thành công, vui lòng truy cập email để kích hoạt tài khoản'
        );
        goToHomeLogin();
      } catch (err: any) {
        openNotificationWithIcon('error', err?.message || 'Đăng ký thất bại');
      }
    }
  };

  const Error = (name: string) => {
    return (
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p className="text-red-600 mb-2" key={type}>
              {message}
            </p>
          ))
        }
      />
    );
  };

  return (
    <Wrap background="bg-dart-red" className="shrink h-full py-10">
      <div className="flex justify-between max-lg:justify-center md:px-28 items-center h-full">
        <div
          className="rounded-3xl p-4 flex flex-col justify-between w-[600px] h-full"
          style={{ background: '#F4F1F1' }}
        >
          <div>
            <div className="text-3xl mb-4">Đăng ký</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-x-4">
                <div className="flex-1">
                  <input
                    placeholder="Họ và Tên"
                    className="w-full outline-none text-lg focus:border-0 border-0 box-border px-3 mb-3"
                    style={{ height: 50, background: '#D9D9D9' }}
                    {...register('name', {
                      required: 'Vui lòng nhập họ tên',
                    })}
                  />
                  {Error('name')}
                </div>
                <div className="flex-1">
                  <input
                    placeholder="Email"
                    className="w-full outline-none text-lg focus:border-0 border-0 box-border px-3 mb-3"
                    style={{ height: 50, background: '#D9D9D9' }}
                    {...register('email', {
                      required: 'Vui lòng nhập email',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email không hợp lệ',
                      },
                    })}
                  />
                  {Error('email')}
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="flex-1">
                  <input
                    placeholder="Số điện thoại"
                    className="w-full outline-none text-lg focus:border-0 border-0 box-border px-3 mb-3"
                    style={{ height: 50, background: '#D9D9D9' }}
                    {...register('phone', {
                      required: 'Vui lòng nhập số điện thoại',
                      pattern: {
                        value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
                        message: 'Số điện thoại không hợp lệ',
                      },
                    })}
                  />
                  {Error('phone')}
                </div>
                <div className="flex-1">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full outline-none mb-3 text-lg focus:border-0 box-border	px-3 border-0"
                    style={{ height: 50, background: '#D9D9D9' }}
                    {...register('password', {
                      required: 'Vui lòng nhập mật khẩu',
                      minLength: {
                        value: 6,
                        message: 'Mật khẩu phải trên 6 ký tự',
                      },
                      maxLength: {
                        value: 10,
                        message: 'Mật khẩu phải ít hơn 10 ký tự',
                      },
                    })}
                  />
                  {Error('password')}
                </div>
              </div>
              <div className="flex gap-x-4">
                <button
                  type="submit"
                  className="flex-1 text-white text-center text-2xl border-0 outline-none w-full"
                  style={{ height: 50, background: '#EE2D29' }}
                >
                  ĐĂNG KÝ
                </button>
                <div className="flex-1">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full outline-none mb-3 text-lg focus:border-0 box-border	px-3 border-0"
                    style={{ height: 50, background: '#D9D9D9' }}
                    {...register('confirmPassword', {
                      required: 'Vui lòng nhập lại mật khẩu',
                      minLength: {
                        value: 6,
                        message: 'Mật khẩu phải trên 6 ký tự',
                      },
                      maxLength: {
                        value: 10,
                        message: 'Mật khẩu phải ít hơn 10 ký tự',
                      },
                    })}
                  />
                  {Error('confirmPassword')}
                </div>
              </div>
            </form>
          </div>
          <div
            className="text-dart-red text-xl flex justify-end cursor-pointer"
            onClick={() => router.push('/sign-in')}
          >
            Đăng nhập
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

export default SignUp;
