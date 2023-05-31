import Button from '@/components/UI/Button';
import React from 'react';

import { redirect, useRouter } from 'next/navigation';
import LoginPage from '@/components/Login/Login';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
interface Props {}

const Login = async () => {
  const session = await getServerSession();
  if (session) {
    redirect('/home');
  }
  return <LoginPage />;
};

export default Login;
