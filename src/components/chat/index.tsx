import React, { useState, useEffect } from 'react';
// import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import ChatBoxMessage from './chatbox.chat';
import ConversationCom from './conversation-list.chat';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faAmbulance, faAnchor, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

import { Row, Col } from 'antd';
import { getRooms, getListMessages } from '../../services/api/chat.service';
import { useAppSelector } from '@/redux/hook';
import { authState } from '@/redux/slices/auth.slice';
import { apiClient } from '@/configs/api.config';
import { openNotificationWithIcon } from 'helper/notification_antd';

interface ChatBoxProps {
  showChat: boolean;
  setShowChat: any;
}

const ChatBox = (props: ChatBoxProps) => {
  const { showChat = false, setShowChat } = props;
  const authReducer = useAppSelector(authState);
  const [isCollapse, setIsCollapse] = useState(false);
  const [conversationList, setConversationList] = useState<Array<any>>([]);
  const [conversationActive, setConversationActive] = useState('');

  const requestDataConversation = async (isSetActive: boolean = true) => {
    try {
      const data = await getRooms();
      setConversationList(data.list);
      if (data?.list && data.list.length > 0 && isSetActive) {
        setConversationActive(data.list[0]?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickConversation = async (id: string, messageId: any) => {
    try {
      const { data } = await apiClient.patch('/chat/user-rooms', {
        messageId,
      });
      setIsCollapse(false);
      setConversationActive(id);
      requestDataConversation();
    } catch (error: any) {
      openNotificationWithIcon('error', error.message);
    }
  };

  useEffect(() => {
    requestDataConversation();
  }, []);

  return (
    <div
      style={{ zIndex: 45 }}
      className="fixed top-12 rounded-xl border-dart-red right-3 bg-white flex shadow cursor-pointer"
    >
      {showChat && (
        <div style={{ width: isCollapse ? '14vw' : '40vw' }}>
          <div
            className="h-14 px-4 border-b border-dart-red flex items-center justify-between mb-0.1"
            // style={{ boxShadow: '0 4px 2px -2px gray' }}
          >
            <div className="text-red-600 text-2xl font-bold">Chat</div>
            <div className="flex items-center">
              <div onClick={() => setIsCollapse(!isCollapse)}>
                <Image width={30} height={30} src="/collapse-icon.svg" alt={''} />
              </div>
              <div onClick={() => setShowChat(!showChat)}>
                <Image width={42} height={42} src="/close-icon.svg" alt={''} />
              </div>
            </div>
          </div>
          <Row className="pb-2">
            <Col span={!isCollapse ? 8 : 24}>
              <ConversationCom
                conversationList={conversationList}
                conversationActive={conversationActive}
                onClickConversation={handleClickConversation}
              />
            </Col>
            {!isCollapse && (
              <Col span={16}>
                <ChatBoxMessage
                  // conversationListMessage={conversationListMessage}
                  requestDataConversation={requestDataConversation}
                  conversationActive={conversationActive}
                />
              </Col>
            )}
          </Row>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
