import Image from 'next/image';
import { useState, useContext, useEffect } from 'react';

import Wrap from '../../scenes/auth/components/Wrap';
import ChatBox from '../chat';
import Notification from '../notifications';
import HeaderSearch from './components/Search/HeaderSearch';
import HeaderUserDropdown from './components/User/HeaderUserDropDown';
import { getNotification } from '../notifications/notification.service';
import ConversationListCom from '../chat/conversation-list.chat';

const Header = () => {
  const [showChat, setShowChat] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [numberOfNotification, setNumberOfNotification] = useState();
  // console.log(ConversationListCom)
  const requestDataNotification = async () => {
    const data = await getNotification();
    setNumberOfNotification(data.list.length);
  };
  
  useEffect(() => {
    requestDataNotification();
  }, []);

  return (
    <Wrap className="bg-dart-red">
      <div className="text-white pt-3">
        <div className="flex justify-between">
          <div style={{ fontSize: 16 }} className="flex items-center font-sans">
            <p>Tải ứng dụng</p>
            <div className="w-[0.1rem] h-4 bg-white mx-2" />
            <p style={{ fontSize: 16 }} className="mr-2 font-sans">
              Kết nối
            </p>
            <Image className="mx-1" src="/facebook-logo 20.svg" width={30} height={30} alt={''} />
            <Image className="mx-1" src="/instagram-logo 20.svg" width={30} height={30} alt={''} />
            <Image className="mx-1" src="/linkedin 20.svg" width={30} height={30} alt={''} />
          </div>
          <div className="flex  items-center mr-8">
            <div className='flex relative'
              onClick={() => {
                setShowChat(false);
                setShowNotification(!showNotification);
              }}
            >
              
              <Image
                className="mx-2 cursor-pointer"
                src="/bell.svg"
                width={30}
                height={30}
                alt={''}
              />
              <div style={{ right: 2, top: -10, position: 'absolute', fontSize: 15 }}>
                 {numberOfNotification}
              </div>
              
            </div>
            <div className='flex relative'
              onClick={() => {
                setShowNotification(false);
                setShowChat(!showChat);
              }}
            >
              
              <Image
                className="mx-4 cursor-pointer"
                src="/message.svg"
                width={30}
                height={30}
                alt={''}
              />
              <div style={{ right: 4, top: -10, position: 'absolute', fontSize: 15 }}>
                {/* {ConversationListCom.length} */}
              </div>
            </div>
            <div className="flex items-center ml-2">
              <Image src="/language.svg" width={30} height={30} alt={''} />
              <select className="pointer bg-transparent outline-0	border-0 text-white cursor-pointer">
                <option
                  className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
                  defaultValue={'Tiếng Việt'}
                  value="TV"
                >
                  Tiếng Việt
                </option>
                <option
                  className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
                  value="EL"
                >
                  English
                </option>
                <option
                  className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
                  value="JP"
                >
                  日本
                </option>
              </select>
            </div>
            <div>
              <HeaderUserDropdown />
            </div>
          </div>
        </div>
        <HeaderSearch />
        <ChatBox showChat={showChat} setShowChat={setShowChat} />
        <Notification
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
      </div>
    </Wrap>
  );
};

export default Header;
