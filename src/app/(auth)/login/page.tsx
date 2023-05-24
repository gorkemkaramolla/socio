'use client';
import Button from '@/components/UI/Button';
import React from 'react';

import { useRouter } from 'next/navigation';
import LoginPage from '@/components/Login/Login';
interface Props {}

const Login: React.FC<Props> = () => {
  const router = useRouter();

  return <LoginPage />;
};

export default Login;
