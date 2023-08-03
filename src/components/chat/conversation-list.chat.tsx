import React from 'react';
import { Conversation, ConversationList, Sidebar, Search } from '@chatscope/chat-ui-kit-react';
import { convertDateTime } from '@/helper/convert';


const ConversationListCom = (props: {
  conversationList: Array<any>;
  conversationActive: string;
  onClickConversation: (id: string, idLastMessage: any) => void;
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '460px',
      }}
    >
      <Sidebar position="left" scrollable={false} className="pt-3">
        <div className="px-2">
          <Search placeholder="Search..." />
        </div>
        <ConversationList className="mt-3">
          {props.conversationList.map((item, idx) => {
            
            return (
              <Conversation
                key={item?.id || idx}
                onClick={() => {
                  if (item?.lastMessage?.id) {
                    props.onClickConversation(item?.id, item?.lastMessage?.id);
                  }
                }}
                active={props.conversationActive == item.id}
                name={item?.name}
                info={
                  <div className="flex justify-between">
                    <p className="max-line-1 mr-3.5">
                      {item?.lastMessage?.type == 'FILE'
                        ? '[Hình ảnh]'
                        : item?.lastMessage?.content}
                    </p>
                    <div className="flex">
                      <p>{convertDateTime(item?.lastMessage?.createdAt)}</p>
                      {item?.totalUnreadMessage > 0 ? (
                        <div
                          className="bg-red-500 w-4 h-4 flex justify-center items-center ml-1"
                          style={{ borderRadius: '50%' }}
                        >
                          {item?.totalUnreadMessage}
                        </div>
                      ) : null}
                    </div>
                  </div>
                }
              ></Conversation>
            );
          })}
          {/* {
                        Array(15).fill(0).map((c, idx) => <Conversation key={idx} name={'khanh'}>
                        </Conversation>)
                    } */}
        </ConversationList>
      </Sidebar>
    </div>
    //   </div>
    //   <ConversationList className="mt-3">
    //     {props.conversationList.map((item, idx) => {
    //       return (
    //         <Conversation
    //           key={item?.id || idx}
    //           onClick={() => {
    //             if (item?.lastMessage?.id) {
    //               props.onClickConversation(item?.id, item?.lastMessage?.id);
    //             }
    //           }}
    //           // style={{ background: item?.id == props.conversationActive ? '#D9D9D9' : 'white' }}
    //           active={props.conversationActive == item.id}
    //           name={item?.name}
    //           // lastSenderName="Lilly"
    //           info={
    //             <div className="flex justify-between">
    //               <p className="max-line-1 mr-3.5">
    //                 {item?.lastMessage?.type == 'FILE' ? '[Hình ảnh]' : item?.lastMessage?.content}
    //               </p>
    //               <div className="flex">
    //                 <p>{convertDateTime(item?.lastMessage?.createdAt)}</p>
    //                 {item?.totalUnreadMessage > 0 ? (
    //                   <div
    //                     className="bg-red-500 w-4 h-4 flex justify-center items-center ml-1"
    //                     style={{ borderRadius: '50%' }}
    //                   >
    //                     {item?.totalUnreadMessage}
    //                   </div>
    //                 ) : null}
    //               </div>
    //             </div>
    //           }
    //         ></Conversation>
    //       );
    //     })}
    //   </ConversationList>
    // </div>
  );
};

export default ConversationListCom;
