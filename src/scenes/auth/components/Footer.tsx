import React from 'react';
import Wrap from './Wrap';
import Link from 'next/link';
import Image from 'next/image';

const FooterComponent = () => {
  return (
    <Wrap className="border-t-2 border-dart-red border-solid" background="#FFFFFF">
      <div className="max-h-[280px] flex flex-col justify-between py-3">
        <div className="flex justify-between">
          <div>
            <div className="text-lg mb-2">CHĂM SÓC KHÁCH HÀNG</div>
            {customerCareArr.map((item, idx) => {
              return (
                <Link
                  key={idx + item.text}
                  href={item.link}
                  className="no-underline font-normal text-black text-base"
                >
                  <div className="mb-2">{item.text}</div>
                </Link>
              );
            })}
          </div>
          <div>
            <div className="text-lg mb-2">VỀ CHÚNG TÔI</div>
            {aboutUsArr.map((item, idx) => {
              return (
                <Link
                  key={idx + item.text}
                  href={item.link}
                  className="no-underline text-black text-base"
                >
                  <div className="mb-2">{item.text}</div>
                </Link>
              );
            })}
          </div>
          <div>
            <div className="text-lg mb-2">THANH TOÁN</div>
            <Image src="/visa.svg" alt="" width={45} height={45} />
          </div>
          <div>
            <div className="text-lg mb-2">THEO DÕI CHÚNG TÔI</div>
            {followMeArr.map((item, idx) => {
              return (
                <Link
                  key={idx + item.text}
                  href={item.link}
                  className="no-underline text-black text-base"
                >
                  <div className="flex items-center mb-2">
                    <Image className="mr-2" width={36} height={36} src={item.icon} alt={''} />
                    <p>{item.text}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div>
            <div className="text-lg mb-2">TẢI ỨNG DỤNG</div>
            <div className="flex">
              <Image src="/qr.svg" width={94} height={92} alt={''} />
              <Image src="/app-download.png" width={111} height={83} alt={''} />{' '}
            </div>
          </div>
        </div>
        <div className="text-center font-normal text-2xl">Công Ty TNHH KinKin Logistic</div>
      </div>
    </Wrap>
  );
};

const customerCareArr = [
  {
    text: 'Trung tâm trợ giúp',
    link: '/',
  },
  {
    text: 'Hướng dẫn mua hàng',
    link: '/',
  },
  {
    text: 'Hướng dẫn bán hàng',
    link: '/',
  },
  {
    text: 'Hướng dẫn thanh toán',
    link: '/',
  },
  {
    text: 'Hướng dẫn trả hàng',
    link: '/',
  },
  {
    text: 'Chính sách bảo hành',
    link: '/',
  },
];

const aboutUsArr = [
  {
    text: 'Giới thiệu',
    link: '/',
  },
  {
    text: 'Tuyển dụng',
    link: '/',
  },
  {
    text: 'Điều khoản',
    link: '/',
  },
];

const followMeArr = [
  {
    text: 'Facebook',
    icon: '/icon-facebook.svg',
    link: '/',
  },
  {
    text: 'Instagram',
    icon: '/icon-instagram.svg',
    link: '/',
  },
  {
    text: 'Linkedln',
    icon: '/icon-linkedin.svg',
    link: '/',
  },
];

export default FooterComponent;
