import FooterComponent from '@/scenes/auth/components/Footer';
import Header from '@/components/header/Header';
import React from 'react';
import ScanQrCode from '@/scenes/scanQrCode/ScanQrCode';

const MyWallet = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <ScanQrCode />
      <FooterComponent />
    </div>
  );
};

export default MyWallet;
