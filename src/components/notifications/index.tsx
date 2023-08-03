import React, { useState } from 'react';
import NotificationList from './components/NotificationList';
import Image from 'next/image';

interface NotificationProps {
  showNotification: boolean;
  setShowNotification: any;
}

const Notification = (props: NotificationProps) => {
  const { showNotification, setShowNotification } = props;
  return (
    <div
      style={{ zIndex: 45 }}
      className="fixed top-12 rounded-xl border-dart-red right-3 bg-white flex shadow"
    >
      {showNotification && (
        <div className="w-[40vw]">
          <div className="h-14 px-4 border-b border-dart-red flex items-center justify-between mb-0.1">
            <div className="text-red-600 text-2xl font-bold">Thông báo (6)</div>
            <div className="flex items-center">
              <div onClick={() => setShowNotification(false)}>
                <Image width={42} height={42} src="/close-icon.svg" alt={''} />
              </div>
            </div>
          </div>
          <NotificationList />
          <div className="border-t border-dart-red flex items-center justify-center py-3 text-dart-red text-lg font-bold cursor-pointer">
            Xem tất cả
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
