'use client';
import Button from '@/components/UI/Button';
import React from 'react';

import { useRouter } from 'next/navigation';
import Login from '@/components/Login/Login';
import Heading from '@/components/UI/Heading';

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const router = useRouter();

  return (
    <div className='w-full'>
      <div className='container items-center justify-center  '>
        <div className='w-full p-6'>
          <Heading heading='h1'>Register</Heading>

          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
