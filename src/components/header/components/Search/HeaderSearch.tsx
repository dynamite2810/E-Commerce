import React from 'react';
import Image from 'next/image';
import CartDropDown from '../Cart/HeaderCartDropDown';
import { useRouter } from 'next/router';

const HeaderSearch = () => {
  const router = useRouter();
  return (
    <div className="flex max-h-16 items-center">
      <div>
        <Image
          className="cursor-pointer"
          src="/logo-white.svg"
          width={70}
          height={70}
          alt={''}
          onClick={() => router.push('/')}
        />
      </div>
      <div className="flex p-2 mt-1 bg-white rounded-3xl w-5/6 mx-6">
        <svg
          className=" w-7 h-7 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
        <input
          type="text"
          className="w-full text-xl text-black border-0 bg-transparent outline-none ml-2"
          placeholder="Search"
          required
        />
      </div>
      <div>
        <CartDropDown />
      </div>
    </div>
  );
};

export default HeaderSearch;
