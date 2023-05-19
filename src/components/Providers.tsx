import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <div className='w-screen h-screen container  grid grid-cols-12 '>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <Navbar />
      {children}
    </div>
  );
};

export default Providers;
