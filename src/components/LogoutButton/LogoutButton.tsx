'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

const LogoutButton: React.FC = () => {
  const logoutSession = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `/login`,
    });
  };

  return <button onClick={logoutSession}>Logout</button>;
};

export default LogoutButton;
