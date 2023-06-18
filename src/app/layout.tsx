'use client';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import Providers from '@/components/Providers';
import './globals.css';
import store from '@/store';

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
