'use client';
import React from 'react';
import HelloText from '@/components/HelloText';
import Heading from '@/components/UI/Heading';
import RegisterPage from '@/components/Login/Register';

export default function Home() {
  return (
    <div className='w-screen p-4 gap-4 relative h-screen flex justify-center items-center'>
      <div className='w-1/2 flex justify-center items-center'>
        <Heading heading='h1' weight={'extra'} size={'xl'}>
          Always Stay connected
        </Heading>
      </div>
      <div className='w-1/2  p-4 flex justify-center items-center'>
        {/* <Heading heading='h1' weight={'extra'} size={'xl'}>
          Stay connected
        </Heading> */}
        <div className='dark:bg-blackSwan border-2  w-full h-[90vh] border-blackSwan'>
          <RegisterPage />
        </div>
      </div>
    </div>
  );
}
