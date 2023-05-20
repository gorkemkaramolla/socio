'use client';
import Providers from '@/components/Providers';
import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {/* <Provider store={store}> */}
        <SessionProvider>
          <Providers>{children}</Providers>
        </SessionProvider>
        {/* </Provider> */}
      </body>
    </html>
  );
}
