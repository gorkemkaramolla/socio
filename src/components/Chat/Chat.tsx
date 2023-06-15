'use client';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { pusherClient } from '@/lib/pusher/pusher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faPaperPlane,
  faPhoneVolume,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';
import { redirect } from 'next/navigation';
import Heading from '@/components/UI/Heading';
import Messages from '@/components/messages';
import { Message, User } from '@/lib/types/types';
import ProfileImage from '../Profile/ProfileImage';

interface Props {
  receiverId: number;
  receiverUser: User;
}

const ChatPage: React.FC<Props> = ({ receiverId, receiverUser }) => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const chat = useRef<HTMLDivElement>(null);
  const selector = useSelector((state: RootState) => state.user);
  const session = useSession();
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      const messages = await axios
        .get('/chat/message', {
          params: {
            receiver_id: receiverId,
          },
        })
        .then((res) => res.data.messages);
      setMessageList(messages);
    };

    if (chat.current) {
      chat.current.scrollTop = 2 * chat.current.scrollHeight;
    }
    getMessages();
  }, [receiverId, session]);

  useEffect(() => {
    const chatElement = chat.current;
    if (chatElement) {
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    const channel = pusherClient.subscribe('chat');

    const handleNewMessage = (message: Message) => {
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
    if (!message || message.message.trim() === '') return;

    if (session.data?.user && session) {
      try {
        await axios.post('/chat/message', {
          message,
          receiver_id: Number(receiverId),
          sender_id: Number(selector.id),
        });

        setMessage({
          receiver_id: Number(receiverId),
          sender_id: Number(selector.id),
          message: '',
        });

        const sender_id = Number(selector.id);
        const receiver_id = Number(receiverId);
        const created_at = new Date();

        if (sender_id !== receiver_id) {
          // redis.set(
          //   `message:${sender_id}:${receiver_id}:${message?.message}:${created_at}`,
          //   {
          //     sender_id,
          //     receiver_id,
          //     message: message?.message,
          //     created_at,
          //   }
          // );
          // setMessage({
          //   receiver_id: Number(receiverId),
          //   sender_id: sender_id,
          //   message: '',
          // });
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleMesageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage({
      receiver_id: Number(receiverId),
      sender_id: Number(selector.id),
      message: event.target.value,
    });
  };

  if (Number(selector.id) === Number(receiverId)) {
    return redirect('/chat');
  }

  return (
    <div className='chatPage w-full h-full flex flex-col justify-center'>
      <div className='chatText w-full md:flex items-end mb-[10px] hidden'>
        <Heading heading='h6' size='lg' className='font-bold'>
          Chat
        </Heading>
      </div>
      <div className='chatContainer w-full md:h-5/6 h-full flex'>
        <div className='chatArea w-full h-full bg-white dark:bg-blackSwan md:rounded-2xl md:mr-3 xl:mr-0'>
          <div className='chatHeader w-full h-[10%] min-h-[70px] border-ash dark:border-black border-b-2 md:rounded-t-2xl flex justify-between'>
            <Link
              href={`/${receiverUser.username}`}
              className='contact w-fit h-full flex items-center gap-2 px-3'
            >
              <div className='w-[55px] h-[55px] rounded-full border-2 border-ash'>
                {/* <img
                  className='w-full h-full rounded-full bg-white '
                  src={
                    receiverUser.imageUri ||
                    receiverUser.image! ||
                    '/userdefault.png'
                  }
                /> */}
                <ProfileImage
                  googleImage={receiverUser.imageUri}
                  imageSrc={receiverUser.image!}
                />
              </div>
              <div className='w-fit h-full flex flex-col justify-center'>
                <span>{receiverUser.name}</span>
                <span className='text-sm text-ash'>
                  {receiverUser.username}
                </span>
              </div>
            </Link>
            <div className='chatOptions w-[170px] h-full flex items-center justify-evenly'>
              <div className='w-[35px] h-[35px] rounded-full border-2 border-ash flex justify-center items-center text-ash cursor-pointer'>
                <FontAwesomeIcon icon={faPhoneVolume} />
              </div>
              <div className='w-[35px] h-[35px] rounded-full border-2 border-ash flex justify-center items-center text-ash cursor-pointer'>
                <FontAwesomeIcon icon={faVideo} />
              </div>
              <div className='w-[35px] h-[35px] rounded-full border-2 border-ash flex justify-center items-center text-ash cursor-pointer'>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </div>
          </div>
          <div
            className='chats w-full h-[82%] border-b-2 border-ash dark:border-black overflow-auto pb-3'
            ref={chat}
          >
            {messageList.map((message, index) => (
              <Messages key={index} current={selector} message={message} />
            ))}
          </div>
          <div className='chatFooter w-full h-[8%] min-h-[50px] bg-ash dark:bg-blackSwan md:rounded-b-2xl px-3 flex items-center'>
            <form
              action=''
              className='w-full h-full flex items-center gap-2'
              onSubmit={handleMessageSubmit}
            >
              <div className='w-10/12 h-[60%] rounded-full bg-white dark:bg-black px-6'>
                <input
                  className='w-full h-full bg-transparent'
                  type='text'
                  placeholder='Mesaj yazın...'
                  onChange={handleMesageChange}
                  value={message?.message}
                />
              </div>
              <div
                className='w-2/12 h-[60%] rounded-full bg-lavender text-white md:flex hidden justify-center items-center cursor-pointer'
                onClick={handleMessageSubmit}
              >
                Send
              </div>
              <div
                className='w-2/12 h-[60%] rounded-full bg-lavender text-white flex md:hidden justify-center items-center cursor-pointer'
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

export default ChatPage;
