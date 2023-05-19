import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      {children}
    </div>
  );
};

export default Providers;
