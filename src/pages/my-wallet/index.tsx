import FooterComponent from '@/scenes/auth/components/Footer';
import Header from '@/components/header/Header';
import React from 'react';
import UserWallet from '@/scenes/userWallet/UserWallet';

const MyWallet = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <UserWallet />
      <FooterComponent />
    </div>
  );
};

export default MyWallet;
