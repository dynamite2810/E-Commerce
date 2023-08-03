import {
  AttachmentButton,
  ChatContainer,
  InputToolbox,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
  SendButton,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
// import { useEffect, useState } from 'react';
// import UploadFile from '../../../helper/UploadImage';
import { Image, Popover } from 'antd';
import { convertDateTime, convertDateTimeByDay } from '@/helper/convert';

interface IMessage {
  content: string;
  createdAt: string;
  id: string;
  isOwner: boolean;
  roomId: string;
  files: any;
  sender: { id: string; email: string; role: string };
  type: string;
}

interface IMessageItem {
  conversationListMessage: Array<any>;
  currentUser: any;
}

const MessageItem = ({ conversationListMessage, currentUser }: IMessageItem) => {
  return (
    <>
      {conversationListMessage.length > 0 &&
        conversationListMessage.map((i: IMessage, index) => {
          if (i?.sender?.id == currentUser?.id) {
            //
            return (
              <Message
                key={i.content + index}
                model={{
                  direction: 'outgoing',
                  position: 'single',
                }}
              >
                <Message.CustomContent>
                  <Popover
                    placement="topRight"
                    content={<p>{convertDateTimeByDay(i.createdAt)}</p>}
                    arrow={false}
                  >
                    {i.type == 'FILE' ? (
                      <Image
                        style={{ maxWidth: 200, maxHeight: 200, zIndex: 1000 }}
                        src={i?.files[0]?.url}
                      />
                    ) : (
                      <div style={{ padding: '0.6em 0.9em' }}>{i.content}</div>
                    )}
                  </Popover>
                </Message.CustomContent>
                <Message.Footer sentTime={convertDateTime(i.createdAt)} />
              </Message>
            );
          }
          return (
            <>
              <Message
                key={i.content + index}
                model={{
                  direction: 'incoming',
                  position: 'single',
                }}
              >
                <Message.CustomContent>
                  <Popover
                    placement="topLeft"
                    content={<p>{convertDateTimeByDay(i.createdAt)}</p>}
                    arrow={false}
                  >
                    {i.type == 'FILE' ? (
                      <Image
                        style={{ maxWidth: 200, maxHeight: 200, zIndex: 1000 }}
                        src={i?.files[0]?.url}
                      />
                    ) : (
                      <div style={{ padding: '0.6em 0.9em' }}>{i.content}</div>
                    )}
                  </Popover>
                </Message.CustomContent>
                <Message.Footer sentTime={convertDateTime(i.createdAt)} />
              </Message>
            </>
          );
        })}
    </>
  );
};

export default MessageItem;
