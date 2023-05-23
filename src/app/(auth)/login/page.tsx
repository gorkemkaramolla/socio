'use client';
import Button from '@/components/UI/Button';
import React from 'react';

import { useRouter } from 'next/navigation';
import Auth from '../../../components/Login/Auth';
interface Props {}

const Login: React.FC<Props> = () => {
  const router = useRouter();

  return <Auth />;
};

export default Login;
