'use client';
import React, { FC } from 'react';
import Button from '@/components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
interface Props {}

const Navbar: FC<Props> = () => {
  return (
    <div
      className={'navbar w-screen fixed z-50  '}
      style={{
        height: '8%',
      }}
    >
      <div
        className={
          'flex justify-between px-3 items-center bg-white w-full h-4/6 rounded shadow-lg'
        }
      >
        <div className={'w-fit h-fit'}>
          <img
            className={'w-[160px]'}
            src='https://i.ibb.co/JBJQZHb/websocial.png'
            alt=''
          />
          <Link href={'/home'}></Link>
        </div>
        <form
          className={
            'flex w-[300px] bg-gray text-midnight h-3/5 justify-between rounded'
          }
          action=''
        >
          <input type='text' className={'p-3 bg-transparent w-full'} />
          <Button
            variant={'ghost'}
            className={'w-fit h-full text-midnight'}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {' '}
            <FontAwesomeIcon icon={faMagnifyingGlass} />{' '}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
