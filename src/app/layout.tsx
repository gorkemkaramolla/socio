'use client';
import Providers from '@/components/Providers';
import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import store, { RootState } from '@/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Providers>{children}</Providers>
    </Provider>
  );
}
