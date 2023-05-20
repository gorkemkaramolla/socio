import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Image from 'next/image';
import Heading from '@/components/UI/Heading';
import LogoutButton from '@/components/LogoutButton/LogoutButton';

interface Props {}

const DashBoard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className='mx-auto grid-cols-12 container'>
      <LogoutButton></LogoutButton>
      <div className='p-5 bg-indigo-200 inline-block rounded-xl m-5'>
        <Image
          src={session?.user?.image!}
          width={60}
          height={60}
          alt='evet'
        ></Image>

        <Heading size={'lg'} heading='h3'>
          {session?.user.name}
        </Heading>
        <div>adsasd</div>
        <Heading size='md' heading='h4'>
          {session?.user.id}
        </Heading>

        <Heading heading='h5'>{session?.user.email} </Heading>
      </div>
    </div>
  );
};

export default DashBoard;
