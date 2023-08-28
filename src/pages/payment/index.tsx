import FooterComponent from '@/scenes/auth/components/Footer';
import Header from '@/components/header/Header';
import React from 'react';
import Payment from '@/scenes/payment/Payment';

const MyWallet = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <Payment />
      <FooterComponent />
    </div>
  );
};

export default MyWallet;