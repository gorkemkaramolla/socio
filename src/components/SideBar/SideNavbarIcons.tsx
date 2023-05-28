'use client';
import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/components/UI/Button';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
interface Props {
  icon: IconDefinition;
  title: string;
  show: boolean;
  href: string;
}

const SideNavbarIcons: FC<Props> = ({ icon, title, show, href }) => {
  return (
    <Link href={href}>
      <div
        className={
          ' flex gap-5 items-center cursor-pointer ease-out duration-200 hover:dark:bg-gray-700 hover:bg-grey rounded-2xl px-3 py-2 text-lg '
        }
      >
        <Button
          className={'sidebarIconButtons ease-out duration-200 text-lg'}
          disabled={true}
          variant={'nav'}
          size={'nav'}
        >
          <FontAwesomeIcon icon={icon} />
        </Button>
        <div
        // className={
        //   show
        //     ? 'flex w-[100px] ease-out duration-200 cursor-pointer'
        //     : 'flex w-0  overflow-hidden'
        // }
        >
          {title}
        </div>
        {/*{ !show &&*/}
        {/*    <span className="tooltiptext">{title}</span>*/}

        {/*}*/}
      </div>
    </Link>
  );
};

export default SideNavbarIcons;
