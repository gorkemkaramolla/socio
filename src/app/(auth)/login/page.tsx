import React from 'react';

import { redirect } from 'next/navigation';
import LoginPage from '@/components/Login/Login';
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
