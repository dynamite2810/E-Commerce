import React from 'react';
import Cart from '@/scenes/cart/Cart';
import HeaderComponent from '@/components/header/Header';
import FooterComponent from '@/scenes/auth/components/Footer';

function CartPage() {
  return (
    <div className="w-full">
      <HeaderComponent />
      <Cart />
      <FooterComponent />
    </div>
  );
}

export default CartPage;
