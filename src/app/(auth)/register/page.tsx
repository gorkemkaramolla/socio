import RegisterPage from '@/components/Login/Register';
import React from 'react';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
interface Props {}

const Register = async () => {
  const session = await getServerSession();
  if (session) {
    redirect('/home');
  }
  return <RegisterPage />;
};

export default Register;
