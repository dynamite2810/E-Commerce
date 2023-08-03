import FooterComponent from '@/scenes/auth/components/Footer';
import HeaderSignIn from '@/scenes/auth/components/HeaderSignIn';
import SignIn from '@/scenes/auth/scenes/SignIn';
import React from 'react';

const SignInPage = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <HeaderSignIn />
      <SignIn />
      <FooterComponent />
    </div>
  );
};

export default SignInPage;
