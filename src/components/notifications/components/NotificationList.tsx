
import React, { useEffect, useState, createContext } from 'react';
import NotificationItem from './NotificationItem';
import { openNotificationWithIcon } from 'helper/notification_antd';
import { getNotification } from '../notification.service';

const NotificationList = () => {
  const [listNotification, setListNotification] = useState([]);

  const requestDataNotification = async () => {
    try {
      const data = await getNotification();
      setListNotification(data?.list);
    } catch (error: any) {
      openNotificationWithIcon('error', error.message);
    }
  };
  useEffect(() => {
    requestDataNotification();
  }, []);
  return (
    <div className="py-2 px-4 max-h-[40vh]" style={{ overflow: 'scroll' }}>
      {listNotification.length > 0 ? (
        listNotification.map((item, idx) => {
          return (
            <div key={idx}>
              <NotificationItem item={item} />
            </div>
          );
        })
      ) : (
        <div className="text-center text-black text-lg">Hiện tại không có thông báo nào</div>
      )}
    </div>
  );
};

export default NotificationList;
