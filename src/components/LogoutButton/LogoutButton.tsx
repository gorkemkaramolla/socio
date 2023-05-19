'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const logoutSession = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `/login`,
    });
  };

  return <button onClick={logoutSession}>Logout</button>;
};

export default LogoutButton;
