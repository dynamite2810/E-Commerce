import React from 'react';
import HeaderComponent from '@/components/header/Header';
import FooterComponent from '@/scenes/auth/components/Footer';
import CreateOrder from '@/scenes/create-order/CreateOrder';
function CreateOrderPage() {
  return (
    <div>
      <HeaderComponent />
      <CreateOrder />
      <FooterComponent />
    </div>
  );
}

export default CreateOrderPage;
