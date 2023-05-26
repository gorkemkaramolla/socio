'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Heading from '@/components/UI/Heading';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import { setUser } from '@/lib/redux/userSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useDispatch } from 'react-redux';
import { getSession } from 'next-auth/react';
import Paragraph from '@/components/UI/Paragraph';

interface Props {}

const DashBoard = () => {
  const currentUser = useSelector((state: RootState) => state.user);

  return (
    <div className='mx-auto flex items-center flex-col  mt-5 w-full '>
      <div className='border-[1px] gap-3   border-red-400 p-12 flex flex-col items-center justify-center'>
        <Image
          className='profile-img dark:bg-white rounded-full '
          src={currentUser.image || '/userdefault.png'}
          width={90}
          height={90}
          alt='asda'
        />

        <Heading size={'md'} heading='h3'>
          {currentUser?.name}
        </Heading>
        <Heading heading='h5'>{currentUser?.email}</Heading>
        <LogoutButton />
        <Paragraph>{currentUser.bio}</Paragraph>
        <Paragraph>{currentUser.location}</Paragraph>
      </div>
    </div>
  );
};

export default DashBoard;
