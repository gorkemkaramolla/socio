'use client';
import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/components/UI/Button';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import useChatToggle from "@/lib/zustand/useChatToggle";
import {Poppins} from "@next/font/google";
const poppins = Poppins({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});
interface Props {
  icon: IconDefinition;
  title: string;
  show: boolean;
  href: string;
}

const SideNavbarIcons: FC<Props> = ({ icon, title, show, href }) => {
    const setChatStatus = useChatToggle(state => state.setShow);
    const handleClick = () => {
         (title === 'Messages') ? setChatStatus(true) : setChatStatus(false)
    }
    useEffect(() => {

        // (title === 'Messages') ? setChatStatus(true) : setChatStatus(false)
    },[])
  return (
    <Link href={`${href}`} onClick={handleClick}>
      <div
        className={
          ' flex gap-5 items-center cursor-pointer ease-out duration-200 hover:dark:bg-gray-700 hover:bg-grey rounded-2xl px-3 py-2 text-lg '
        }
      >
        <Button
          className={'sidebarIconButtons ease-out duration-200 text-lg '}
          disabled={true}
          variant={'nav'}
          size={'nav'}
        >
          <FontAwesomeIcon icon={icon} />
        </Button>
        <div className={poppins.className}
        >
          {title}
        </div>
      </div>
    </Link>
  );
};

export default SideNavbarIcons;
