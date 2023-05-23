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
    <div className={'  max-w-[1700px]  '}>
      {/*<Toaster position='top-center' reverseOrder={false}></Toaster>*/}
      {currentUser.id !== '' && <Navbar />}
      {/*<div className={'w-full h-[25px]'}>fgf</div>*/}
      <div className={' '}>
        <div className=''>{currentUser.id !== '' && <SideNavbar />}</div>
        <div className={' '}>{children}</div>
      </div>
    </div>
  );
};

export default Providers;
