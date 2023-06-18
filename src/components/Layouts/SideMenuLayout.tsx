import { ReactNode } from 'react';
import SideNavbar from '../SideBar/SideNavbar';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const SideMenuLayout = ({ children }: Props) => {
  return (
    <div
      className={'w-screen relative h-[100dvh] dark:bg-black overflow-hidden'}
    >
      <div className={'flex h-full'}>
        <div className='flex justify-center w-0 md:min-w-[330px] h-full xl:w-3/12 '>
          <SideNavbar />
        </div>

        <div className={'flex justify-center xl:w-6/12 w-full'}>{children}</div>

        <div className='flex flex-col  justify-center w-0 xl:w-3/12 min-w-3/12  xl:min-w-[430px]'>
          <div>occupied</div>
        </div>
      </div>
    </div>
  );
};

export default SideMenuLayout;
