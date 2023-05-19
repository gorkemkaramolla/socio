import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import SideNavbar from './SideNavbar';
import Navbar from "@/components/Navbar";

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <div className={'wind flex justify-between w-screen h-screen bg-gray'}>
      {/*<Toaster position='top-center' reverseOrder={false}></Toaster>*/}
      <div className={'lwind h-full flex  min-w-[85px] '}>
          <SideNavbar />
      </div>
      <div className={'mwind flex flex-col w-full h-full items-center'}>
          <Navbar/>
           {children}
      </div>
        <div className={'rwind h-full  flex flex-col w-1/6 min-w-[250px] bg-white shadow-2xl'}> connectionsDiv</div>
    </div>
  );
};

export default Providers;
