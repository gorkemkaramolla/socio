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
}

const SideNavbarIcons: FC<Props> = ({ icon, title, show }) => {
  const [direction, setDirection] = useState('');

  useEffect(() => {
    title === 'Newsfeed' && setDirection('/home');
  }, []);

  return (
    <Link href={direction}>
      <div
        className={
          'flex items-center cursor-pointer hover:bg-white rounded ease-out duration-200 hover:text-red-500'
        }
      >
        <Button
          className={'sidebarIconButtons ease-out duration-200'}
          disabled={true}
          variant={'nav'}
          size={'nav'}
        >
          <FontAwesomeIcon icon={icon} />
        </Button>
        <div
          className={
            show
              ? 'flex w-[100px] ease-out duration-200 cursor-pointer'
              : 'flex w-0  overflow-hidden'
          }
        >
          {title}
        </div>
      </div>
    </Link>
  );
};

export default SideNavbarIcons;
