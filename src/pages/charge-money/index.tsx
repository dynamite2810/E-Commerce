import FooterComponent from '@/scenes/auth/components/Footer';
import Header from '@/components/header/Header';
import React from 'react';
import ChargeMoney from '@/scenes/chargeMoney/ChargeMoney';

const MyWallet = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <ChargeMoney />
      <FooterComponent />
    </div>
  );
};

export default MyWallet;
