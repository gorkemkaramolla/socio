'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import Button from '../UI/Button';

const LogoutButton: React.FC = () => {
  const logoutSession = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `/login`,
    });
  };

  return <Button onClick={logoutSession}>Logout</Button>;
};

export default LogoutButton;
