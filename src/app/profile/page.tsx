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
import { getImage } from '../settings/page';

const DashBoard = () => {
  const selector = useSelector((state: RootState) => state.user);

  return (
    <div className='mx-auto flex items-center flex-col  mt-5 w-full '>
      <div className='border-[1px] gap-3   border-red-400 p-12 flex flex-col items-center justify-center'>
        <img
          style={{ borderRadius: '50%' }}
          className='w-[60px] h-[60px] profile-img dark:bg-white object-cover rounded-full '
          src={
            selector.imageUri || getImage(selector.image!) || '/userdefault.png'
          }
          alt='/userdefault.png'
        />
        <Heading size={'md'} heading='h3'>
          {selector?.name}
        </Heading>
        <Heading heading='h5'>{selector?.email}</Heading>
        <LogoutButton />
        <Paragraph>{selector.bio}</Paragraph>
        <Paragraph>{selector.location}</Paragraph>
      </div>
    </div>
  );
};

export default DashBoard;
