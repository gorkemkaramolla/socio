import Image from 'next/image';
import React from 'react';
interface Props {}

const Contacts: React.FC<Props> = () => {
  return (
    <div
      className={
        'w-full h-[60px] min-h-[60px] border-white dark:border-black border-b-2 bg-white/25 hover:bg-white/50 dark:bg-ash/20 hover:dark:bg-ash/25 cursor-pointer flex items-center px-2 gap-3'
      }
    >
      <div
        className={
          'w-[40px] h-[40px] border-ash border-2 rounded-full relative'
        }
      >
        <Image
          width={24}
          height={24}
          className={'rounded-full'}
          src='https://i.ibb.co/MV0c2sD/avatar6.jpg'
          alt=''
        />
        <div
          className={
            'w-[10px] h-[10px] bg-green-400 absolute rounded-full top-0 -right-1'
          }
        ></div>
      </div>
      <div className={'flex flex-col text-sm'}>
        <div className={''}>Gözde Gül</div>
        <div className={'text-xs text-ash'}>gfdgdfgdfg</div>
      </div>
    </div>
  );
};

export default Contacts;
