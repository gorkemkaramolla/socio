'use client';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Heading from '@/components/UI/Heading';
import { redis } from '@/lib/db';
import {
  faEllipsisVertical,
  faPaperPlane,
  faPhoneVolume,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Messages from '@/components/messages';
import { Poppins } from '@next/font/google';
import axios from 'axios';
import { pusherClient } from '@/lib/pusher/pusher';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useSession } from 'next-auth/react';
import { Message } from '@/lib/types/types';

interface Props {
  params: {
    receiverId: number;
  };
}

const Page: React.FC<Props> = ({ params: { receiverId } }) => {
  const [messageList, setMessageList] = useState<Message[]>([]);

  const chat = useRef<HTMLDivElement>(null);
  const selector = useSelector((state: RootState) => state.user);

  const session = useSession();
  const currentUserId = Number(session.data?.user.id);
  const [message, setMessage] = useState<Message | null>(null);
  // Define a cache object
  const messageCache: { [key: string]: Message[] } = {};

  const getMessages = useCallback(async () => {
    try {
      const currentUserId = session?.data?.user.id!;
      const receiver_id = Number(receiverId);

      const cacheKey = `${currentUserId}:${receiver_id}`;

      // Check if messages are already cached
      if (messageCache[cacheKey]) {
        setMessageList(messageCache[cacheKey]);
        console.log('cached?');
        return;
      }

      // Fetch messages from Redis for the current user as the sender
      const sentMessages = await redis.keys(
        `message:${currentUserId}:${receiver_id}:*`
      );

      // Fetch messages from Redis for the current user as the receiver
      const receivedMessages = await redis.keys(
        `message:${receiver_id}:${currentUserId}:*`
      );

      const keys = sentMessages.concat(receivedMessages);

      const messages: Message[] = await Promise.all(
        keys.map(async (key) => {
          const messageData = key.split(':');
          const sender_id = Number(messageData[1]);
          const receiver_id = Number(messageData[2]);
          const dateString = messageData.slice(4).join(':');
          const created_at = new Date(dateString);
          const message: Message = {
            sender_id,
            receiver_id,
            message: messageData[3],
            created_at: created_at,
          };
          return message;
        })
      );

      messages.sort(
        (a, b) => a.created_at?.getTime()! - b.created_at?.getTime()!
      );

      // Cache the fetched messages
      messageCache[cacheKey] = messages;

      setMessageList(messages);
    } catch (error) {
      console.error('Error retrieving messages:', error);
    }
  }, [receiverId, session]);

  useEffect(() => {
    if (chat.current) chat.current.scrollTop = chat.current.scrollHeight;
    getMessages();
  }, [receiverId, session]);
  useEffect(() => {
    console.log(messageList);
  }, [messageList]);
  useEffect(() => {
    // let channel = pusherClient.channel('chat');

    let channel = pusherClient.subscribe('chat');

    const handleNewMessage = (message: Message) => {
      console.log(message);
      if (messageList)
        setMessageList((prevMessages) => [...prevMessages, message]);
    };

    channel.bind('message', handleNewMessage);

    return () => {
      channel.unbind('message', handleNewMessage);
      pusherClient.unsubscribe('chat');
    };
  }, []);
  const handleMessageSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (message?.message.trim() === '') return;
    if (session.data?.user && session)
      try {
        await axios.post('/chat/message', {
          message: message,
          receiver_id: Number(receiverId),
          sender_id: currentUserId,
        });
        const sender_id = currentUserId;
        const receiver_id = Number(receiverId);
        const created_at = new Date();
        redis.set(
          `message:${sender_id}:${receiver_id}:${message?.message}:${created_at}`,
          {
            sender_id,
            receiver_id,
            message: message?.message,
            created_at,
          }
        );
        setMessage({
          receiver_id: Number(receiverId),
          sender_id: sender_id,
          message: '',
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
  };
  function handleMesageChange(event: ChangeEvent<HTMLInputElement>): void {
    setMessage({
      receiver_id: Number(receiverId),
      sender_id: currentUserId,
      message: event.target.value,
    });
  }

  return (
    <div className={`chatPage w-full h-full flex flex-col justify-center`}>
      <div className={'chatText w-full  md:flex items-end mb-[10px] hidden'}>
        <Heading heading='h6' size='lg' className='font-bold'>
          Chat
        </Heading>
      </div>
      <div className={'chatContainer w-full md:h-5/6 h-full flex'}>
        <div
          className={
            'chatArea w-full h-full bg-white dark:bg-blackSwan md:rounded-2xl md:mr-3 xl:mr-0'
          }
        >
          <div
            className={
              'chatHeader w-full h-[10%] min-h-[70px] border-ash dark:border-black border-b-2 md:rounded-t-2xl flex justify-between'
            }
          >
            <div
              className={'contact w-fit h-full flex items-center gap-2 px-3'}
            >
              <div
                className={'w-[55px] h-[55px] rounded-full border-2 border-ash'}
              ></div>
              <div className={'w-fit h-full flex flex-col justify-center'}>
                <span>Gözde Gül</span>
                <span className={'text-sm text-ash'}>Junior Developer</span>
              </div>
            </div>
            <div
              className={
                'chatOptions w-[170px] h-full flex items-center justify-evenly'
              }
            >
              <div
                className={
                  'w-[35px] h-[35px] rounded-full border-2 border-ash flex justify-center items-center text-ash cursor-pointer'
                }
              >
                <FontAwesomeIcon icon={faPhoneVolume} />
              </div>
              <div
                className={
                  'w-[35px] h-[35px] rounded-full border-2 border-ash flex justify-center items-center text-ash cursor-pointer'
                }
              >
                <FontAwesomeIcon icon={faVideo} />
              </div>
              <div
                className={
                  'w-[35px] h-[35px] rounded-full border-2 border-ash flex justify-center items-center text-ash cursor-pointer'
                }
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </div>
          </div>
          <div
            className={
              'chats w-full h-[82%] border-b-2 border-ash dark:border-black overflow-auto pb-3'
            }
            ref={chat}
          >
            <div className={'w-full flex justify-start px-3'}></div>
            {messageList.map((message, index) => {
              if (Number(message.sender_id) === currentUserId) {
                return <Messages key={index} message={message.message} />;
              } else {
                return (
                  <div
                    className={
                      'max-w-[40%] h-fit bg-grey dark:bg-black dark:text-white rounded-2xl rounded-tl-none break-all py-2 px-4 mt-3 text-black'
                    }
                  >
                    {message.message}
                  </div>
                );
              }
            })}
          </div>
          <div
            className={
              'chatFooter w-full h-[8%] min-h-[50px] bg-ash dark:bg-blackSwan md:rounded-b-2xl px-3 flex items-center'
            }
          >
            <form
              action=''
              className={'w-full h-full flex items-center gap-2'}
              onSubmit={handleMessageSubmit}
            >
              <div
                className={
                  'w-10/12 h-[60%] rounded-full bg-white dark:bg-black px-6 '
                }
              >
                <input
                  className={`w-full h-full bg-transparent `}
                  type='text'
                  placeholder={'Mesaj yazın...'}
                  onChange={handleMesageChange}
                  value={message?.message}
                />
              </div>
              <div
                className={
                  'w-2/12 h-[60%] rounded-full bg-lavender text-white md:flex hidden justify-center items-center cursor-pointer'
                }
                onClick={handleMessageSubmit}
              >
                Send
              </div>
              <div
                className={
                  'w-2/12 h-[60%] rounded-full bg-lavender text-white flex md:hidden justify-center items-center cursor-pointer'
                }
                onClick={handleMessageSubmit}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
