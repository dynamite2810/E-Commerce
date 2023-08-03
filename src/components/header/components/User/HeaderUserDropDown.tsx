import { LOCALSTORAGE } from '@/constants/config.constant';
import { useAppSelector } from '@/redux/hook';
import { authState } from '@/redux/slices/auth.slice';
import Cookies from 'js-cookie';
import { Url } from 'next/dist/shared/lib/router/router';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { shallowEqual } from 'react-redux';
import Router from 'next/router'
import { Route } from 'react-router-dom';

const HeaderUserDropdown = () => {
  const { currentUser } = useAppSelector(authState);
  const router = useRouter();

  const navigateTo = (path: Url) => {
    if (path === '/sign-in') {
      localStorage.clear();
    }
    router.push(path);
  };

  const renderMenuItem = (path: any, label: any) => (
    <div
      key={path}
      onClick={() => {
        navigateTo(path);
      }}
      className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
    >
      {label}
    </div>
  );

  return (
    <>
      <div className="group relative left-12 cursor-pointer px-5 py-1">
        <div className="flex items-center justify-between space-x-3 bg-red max-w-[190px]">
          <Image
            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
            src={
              currentUser?.avatar ||
              'https://tse4.explicit.bing.net/th?id=OIP.fMemMGJNIPd5fLTI6TwJwQHaHa&pid=Api&P=0&h=180'
            }
            alt="Default"
            height={40}
            width={40}
          />
          <a className="menu-hover text-base font-medium text-white line-clamp-1 overflow-hidden text-ellipsis">
            {currentUser?.name || 'Name_Customer'}
          </a>
        </div>
        <div
          className="invisible rounded-lg absolute z-50 w-52 bg-gray-100 py-2 px-4 text-gray-800 shadow-xl group-hover:visible"
          style={{ left: '50%', transform: 'translate(-50%, 0%)' }}
        >
          <div
            className="border-solid absolute block w-0 border-gray-100"
            style={{
              borderWidth: '0 10px 10px 10px',
              borderColor: '#EFEFED transparent',
              top: -5,
              left: 110,
            }}
          ></div>
          {[
            { path: '/profile', label: 'Thông Tin Tài Khoản' },
            { path: '/my-wallet', label: 'Ví Của Tôi' },
            { path: '/sign-in', label: 'Đăng Xuất' },
          ].map(({ path, label }) => renderMenuItem(path, label))}
        </div>
      </div>
    </>
  );
};

export default HeaderUserDropdown;
