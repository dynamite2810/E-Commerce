import React from 'react';
import FooterComponent from '@/scenes/auth/components/Footer';
import HeaderSignIn from '@/scenes/auth/components/HeaderSignIn';
import SignUp from '@/scenes/auth/scenes/SignUp';

const SignUpPage = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <HeaderSignIn />
      <SignUp />
      <FooterComponent />
    </div>
  );
};

export default SignUpPage;
