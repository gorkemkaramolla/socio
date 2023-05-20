import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '@/components/UI/Button';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
interface Props {
  icon: IconDefinition;
  title: string;
  show: boolean;
}

const SideNavbarIcons: FC<Props> = ({ icon, title, show }) => {
  return (
    <div
      className={
        show
          ? 'flex items-center gap-2 cursor-pointer  hover:bg-pink rounded ease-out duration-200'
          : 'flex items-center gap-2 cursor-pointer  rounded ease-out duration-200'
      }
    >
      <Button
        className={' hover:bg-pink ease-out duration-200 '}
        variant={'nav'}
        size={'nav'}
      >
        <FontAwesomeIcon icon={icon} />
      </Button>
      <div
        className={
          show
            ? 'flex w-[100px]  ease-out duration-200 overflow-hidden'
            : 'flex w-0  overflow-hidden'
        }
      >
        {title}
      </div>
    </div>
  );
};

export default SideNavbarIcons;
