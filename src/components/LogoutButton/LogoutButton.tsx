'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import Button from '../UI/Button';
interface Props {}
const LogoutButton: React.FC<Props> = () => {
  const logoutSession = async () => {
    localStorage.removeItem('userData');
    await signOut({
      redirect: true,
      callbackUrl: `/login`,
    });
  };

  return (
    <Button
      className='text-center self-center justify-self-center w-full items-center flex justify-center'
      onClick={logoutSession}
      variant={'ghost'}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
