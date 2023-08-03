import React from 'react';
import { convertDateTimeByDay } from '../../../helper/convert';
import Image from 'next/image';

interface NotificationItemProps {
  item: any;
}

const NotificationItem = (props: NotificationItemProps) => {
  const { item } = props;
  return (
    <div className="flex items-center justify-between text-black my-2">
      <div className="flex">
        <div className='flex items-center min-w-[60px]'>
          <Image
          width={60}
          height={20}
          src="https://image.uniqlo.com/GU/ST3/jp/imagesgoods/345995/item/jpgoods_50_345995.jpg?width=300"
          alt={''}
          style={{display: 'flex', maxHeight: 60}}
        />
        </div>
        
        <div className="ml-3">
          <div className="font-bold">{item?.title}</div>
          <p className="text-sm max-w-sm overflow-hidden text-ellipsis font-sans line-clamp-1">
            {item?.content}
          </p>
          <p className="text-sm">{convertDateTimeByDay(item?.updatedAt)}</p>
        </div>
      </div>
      <button className="text-dart-red bg-gray-300 py-2 px-4 min-w-[80px] flex justify-center">Chi tiết</button>
    </div>
  );
};

export default NotificationItem;
