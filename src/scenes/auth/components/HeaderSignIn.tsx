import React from 'react';
import Wrap from './Wrap';
import { useRouter } from 'next/router';
import Image from 'next/image';

const HeaderSignIn = () => {
  const router = useRouter();

  const getTextInLogo = (): string => {
    if (router.pathname === '/sign-in') return 'Đăng nhập';
    return 'Đăng ký';
  };

  return (
    <Wrap>
      <div className="flex justify-between items-end">
        <div className="flex items-center">
          <Image width={140} height={140} src="/logo-red.svg" alt={''} />
          <p className="text-[46px] font-normal ml-2">{getTextInLogo()}</p>
        </div>
        <div className="text-dart-red text-[24px] mb-2">Bạn cần trợ giúp?</div>
      </div>
    </Wrap>
  );
};

export default HeaderSignIn;
