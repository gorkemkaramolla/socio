import MessageBoxPage from '@/components/Chat/MessageBoxPage';
import { authOptions } from '@/lib/auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';

interface Props {}

const MessageBox = async () => {
  const session = await getServerSession(authOptions);
  const messages = await axios
    .get('http://localhost:3000/user/activechats', {
      params: {
        user_id: session?.user.id,
      },
    })
    .then((messages) => messages.data.messages);

  return (
    <div className='px-8 w-screen h-screen  '>
      <MessageBoxPage
        messages={messages}
        currentUserId={session?.user.id!}
      ></MessageBoxPage>
    </div>
  );
};

export default MessageBox;
