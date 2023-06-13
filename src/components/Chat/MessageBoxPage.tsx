import { User } from '@/lib/types/types';
import { getImage } from '@/util/getImage';
import Link from 'next/link';
import React from 'react';

interface Props {
  messages: any;
  currentUserId: number;
}

const MessageBoxPage: React.FC<Props> = ({ messages, currentUserId }) => {
  return (
    <div className='w-full flex gap-3 flex-col justify-center pt-20  items-center '>
      <p>21/03/2022</p>
      {messages.map((message: any, i: number) => (
        <div key={i} className='w-full h-12  rounded-md dark:bg-blackSwan'>
          <Link
            href={`chat/${
              Number(message.receiver_id) !== Number(currentUserId)
                ? message.receiver_id
                : message.sender_id
            }`}
            className='flex items-center gap-2'
          >
            <img
              className='w-12 h-full rounded-full bg-white '
              src={
                getImage(message.receiver.image)! ||
                message.receiver.imageUri ||
                '/userdefault.png'
              }
            />
            <div className=''>
              <p>{message.receiver.username}</p>
              <p>{message.sender.username + ' : ' + message.message}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MessageBoxPage;
