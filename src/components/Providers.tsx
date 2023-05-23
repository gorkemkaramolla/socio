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
    <div className={'w-screen h-screen bg-white dark:bg-black'}>
      {/*<Toaster position='top-center' reverseOrder={false}></Toaster>*/}
      {/*{currentUser.id !== '' && <Navbar />}*/}
      {/*<div className={'w-full h-[25px]'}>fgf</div>*/}
      <div className={'flex h-full'}>
        <div className='flex justify-end w-3/12'>
            <SideNavbar/>
        </div>
        <div className={'flex justify-center w-6/12'}>
            {children}
        </div>
          <div className='flex justify-start w-3/12'>
             dgfdgdf
          </div>
      </div>
    </div>
  );
};

export default Providers;
