'use client';
import Providers from '@/components/Providers';
import './globals.css';
import React from 'react';
import { Provider } from 'react-redux';
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
