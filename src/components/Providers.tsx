import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import SideNavbar from './SideNavbar';
import Navbar from "@/components/Navbar";

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <div className={'wind flex flex-col w-screen max-h-screen max-w-[1700px] bg-gray shadow-2xl overflow-hidden'}>
      {/*<Toaster position='top-center' reverseOrder={false}></Toaster>*/}
        <Navbar/>
        {/*<div className={'w-full h-[25px]'}>fgf</div>*/}
        <div className={'bwind flex'}
        style={{
            height: '92%'
        }}>
              <div className={'lwind h-full w-[85px] flex p-5'}>
                  <SideNavbar />
              </div>
              <div className={'rwind flex w-full h-full justify-center overflow-x-auto'}>
                  {children}
              </div>
        </div>

    </div>
  );
};

export default Providers;
