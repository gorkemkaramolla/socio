import { Message, User } from '@/lib/types/types';
import React from 'react';
interface Props {
  message: Message;
  current: User;
}

const Messages: React.FC<Props> = ({ message, current }) => {
  return (
    <>
      {Number(message.sender_id) === Number(current.id) ? (
        <div className={'w-full flex justify-end px-3'}>
          <div
            className={
              'max-w-[40%] h-fit bg-lavender rounded-2xl rounded-tr-none break-all py-2 px-4 mt-2 text-white'
            }
          >
            {message.message}
          </div>
        </div>
      ) : (
        <div
          className={
            'ml-3 max-w-[40%] h-fit bg-grey dark:bg-black dark:text-white rounded-2xl rounded-tl-none break-all py-2 px-4 mt-3 text-black'
          }
        >
          {message.message}
        </div>
      )}
    </>
  );
};

export default Messages;
