'use client';
import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
interface Props {}

const Navbar: FC<Props> = () => {
  return (
    <div className={'navbar h-[80px]'}>
      <div
        className={
          'flex justify-between px-3 items-center bg-white w-full h-4/6 rounded shadow-lg'
        }
      >
        <div className={'w-fit h-fit'}>
          <Image
            width={160}
            height={160}
            className={'w-[160px]'}
            src='https://i.ibb.co/JBJQZHb/websocial.png'
            alt=''
          />
          <Link href={'/home'}></Link>
        </div>
        {/*<form*/}
        {/*  className={*/}
        {/*    'flex bg-gray'*/}
        {/*  }*/}
        {/*  action=''*/}
        {/*>*/}
        {/*  <input type='text' className={'p-3 bg-transparent w-full'} />*/}
        {/*  <Button*/}
        {/*    variant={'ghost'}*/}
        {/*    className={'w-fit h-full text-midnight'}*/}
        {/*    onClick={(e) => {*/}
        {/*      e.preventDefault();*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <FontAwesomeIcon icon={faMagnifyingGlass} />*/}
        {/*  </Button>*/}
        {/*</form>*/}
      </div>
    </div>
  );
};

export default Navbar;
