import React from 'react';
import Profile from '@/scenes/profile/Profile';
import HeaderComponent from '@/components/header/Header';
import FooterComponent from '@/scenes/auth/components/Footer';

function ProfilePage() {
  return (
    <div>
      <HeaderComponent />
      <Profile />
      <FooterComponent />
    </div>
  );
}

export default ProfilePage;
