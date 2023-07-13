'use client';
import { Loader } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
interface Props {}

const Loading: React.FC<Props> = () => {
  return (
    <div className='w-screen  flex-col gap-12 h-screen flex  justify-center items-center'>
      <Image
        width={48}
        height={48}
        className=' animate-bounce w-24 h-24  '
        src='/logo.png'
        alt=''
      />
      {/* <Loader className='animate-spin'></Loader> */}
    </div>
  );
};

export default Loading;
