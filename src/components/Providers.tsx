'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SideNavbar from './SideNavbar';
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  const session = useSession();
  const currentUser = session.data?.user;
  return (
    <div className={'wind flex justify-between w-screen h-screen '}>
      {/*<Toaster position='top-center' reverseOrder={false}></Toaster>*/}
      <div className={'lwind h-full flex  min-w-[85px] '}>
        {currentUser && <SideNavbar />}
      </div>
      <div className={'mwind flex flex-col w-full h-full items-center'}>
        {currentUser && <Navbar />}
        {children}
      </div>
      {currentUser && (
        <div
          className={
            'rwind h-full  hidden md:flex flex-col w-1/6  md:min-w-[250px]  bg-white shadow-2xl'
          }
        >
          connectionsDiv
        </div>
      )}
    </div>
  );
};

export default Providers;
