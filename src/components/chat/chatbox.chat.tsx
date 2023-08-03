import {
  ChatContainer,
  InputToolbox,
  MessageInput,
  MessageList,
  SendButton,
} from '@chatscope/chat-ui-kit-react';
import Cookies from 'js-cookie';
import { memo, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import UploadFile from '../../../helper/UploadImage';
import { useAppSelector } from '../../redux/hook';
import { authState } from '../../redux/slices/auth.slice';
import { getListMessages, sendMessage } from '../../services/api/chat.service';
import MessageItem from './message-item.chat';

interface IChatBoxMessage {
  conversationActive: string;
  requestDataConversation: any;
}

const ChatBoxMessage = ({ conversationActive, requestDataConversation }: IChatBoxMessage) => {
  const [value, setValue] = useState('');
  const [conversationListMessage, setConversationListMessage] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPage: 1,
    totalRecord: 10,
    limit: 20,
  });
  const [loadingMore, setLoadingMore] = useState(false);

  const authReducer = useAppSelector(authState);
  const { currentUser } = authReducer;
  const token = Cookies.get('token');

  const onSend = async (formData?: FormData) => {
    try {
      if (formData) {
        const { data } = await sendMessage(conversationActive, '', formData);
      } else {
        if (value.trim()) {
          const data = await sendMessage(conversationActive, value.trim(), null);
        }
        setValue('');
      }
    } catch (err) {}
  };

  const requestDataListMessage = async () => {
    try {
      const data = await getListMessages(conversationActive, 100);
      const { currentPage, totalPage, totalRecord } = data;
      setPageInfo({
        ...pageInfo,
        currentPage,
        totalPage,
        totalRecord,
      });
      setConversationListMessage(data.list);
      setLoadingMore(false);
    } catch (error) {
      setLoadingMore(false);
    }
  };

  const onYReachStart = async () => {
    // if (loadingMore === true) {
    //   return;
    // }
    // setLoadingMore(true)
    // await requestDataListMessage()
  };

  useEffect(() => {
    if (conversationActive) requestDataListMessage();
    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      query: {
        accessToken: token,
        userId: currentUser?.id,
      },
    });
    if (conversationActive && socket) {
      socket.emit('joinRoom', `ROOM-${conversationActive}`);
      socket.on('messageOnRoom', (msg: any) => {
        requestDataConversation(true);
        setConversationListMessage((prev) => {
          return [...prev, msg];
        });
      });
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [conversationActive]);

  return (
    <div
      style={{
        width: '100%',
        height: '460px',
      }}
      className="border-l border-dart-red"
    >
      <ChatContainer>
        <MessageList loadingMore={loadingMore} onYReachStart={onYReachStart}>
          <MessageItem
            conversationListMessage={conversationListMessage}
            currentUser={currentUser}
          />
        </MessageList>
        <MessageInput
          placeholder="Nhập nội dung tin nhắn"
          fancyScroll={false}
          onChange={(_, val) => setValue(val)}
          value={value}
          autoFocus
          onSend={() => onSend()}
          sendButton={false}
          attachButton={false}
        />
        <InputToolbox>
          <UploadFile onSend={onSend} />
          <SendButton
            onClick={() => {
              onSend();
            }}
          />
        </InputToolbox>
      </ChatContainer>
    </div>
  );
};

export default memo(ChatBoxMessage);
