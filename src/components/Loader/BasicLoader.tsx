import { Loader } from 'lucide-react';
import React from 'react';

type Props = {};

const BasicLoader = (props: Props) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Loader className='animate-spin' />
    </div>
  );
};

export default BasicLoader;
