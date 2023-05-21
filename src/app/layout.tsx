'use client';
import Providers from '@/components/Providers';
import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import store from '@/store';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang='en'>
        <body
          className={
            inter.className +
            ' flex justify-center w-screen h-screen overflow-hidden'
          }

        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </Provider>
  );
}
