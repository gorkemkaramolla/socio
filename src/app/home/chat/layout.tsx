'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import SideNavbar from '@/components/SideBar/SideNavbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useDispatch } from 'react-redux';
import { setTheme } from '@/lib/redux/darkMode';
import { SessionProvider, getSession, useSession } from 'next-auth/react';
import { setUser } from '@/lib/redux/userSlice';
import { Poppins } from '@next/font/google';
import BasicLoader from '@/components/Loader/BasicLoader';

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  const currentUser = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);
  return (
    <div
      className={'w-screen relative h-[100dvh] dark:bg-black overflow-hidden'}
    >
      <div className={'flex h-full'}>
        {currentUser.email !== '' ? (
          !loading ? (
            <div className='flex justify-center w-0 md:min-w-[330px] h-full xl:w-3/12 '>
              <SideNavbar />
            </div>
          ) : (
            <div className='flex justify-center w-0 md:min-w-[330px] h-full xl:w-3/12 '>
              <BasicLoader></BasicLoader>
            </div>
          )
        ) : null}
        <div className={'flex justify-center xl:w-6/12 w-full'}>{children}</div>

        <div className='flex flex-col  justify-center w-0 xl:w-3/12 min-w-3/12  xl:min-w-[430px]'>
          {currentUser?.email !== '' && <div>occupied</div>}
        </div>
      </div>
    </div>
  );
};

export default Providers;
