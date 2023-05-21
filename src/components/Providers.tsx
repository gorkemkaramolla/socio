'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SideNavbar from './SideBar/SideNavbar';
import Navbar from '@/components/Navbar/Navbar';
import { useSession } from 'next-auth/react';
import SideBarSkeleton from './Skeleton/SideBarSkeleton';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  const currentUser = useSelector((state: RootState) => state.user);

  return (
    <div
      className={
        'wind flex flex-col w-screen max-h-screen max-w-[1700px] bg-gray shadow-2xl overflow-hidden'
      }
    >
      {/*<Toaster position='top-center' reverseOrder={false}></Toaster>*/}
      {currentUser && <Navbar />}
      {/*<div className={'w-full h-[25px]'}>fgf</div>*/}
      <div
        className={'bwind flex'}
        style={{
          height: '92%',
        }}
      >
        <div className={'lwind h-full w-[85px] flex p-5'}>
          {currentUser && <SideNavbar />}
        </div>
        <div
          className={'rwind flex w-full h-full justify-center overflow-y-auto'}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Providers;
