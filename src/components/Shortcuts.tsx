import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Search from './Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faComments,
  faEye,
  faFireFlameCurved,
  faGear,
  faSearch,
  faShekelSign,
  faEdit,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Edit } from 'lucide-react';
import SideNavbarIcons from './SideBar/SideNavbarIcons';

interface SideNavbarIcon {
  href?: string;
  icon: any;
  title: string;
}

interface Props {}

const Shortcuts: FC<Props> = ({}) => {
  const { username } = useSelector((state: RootState) => state.user);

  const sideNavbarIcons: SideNavbarIcon[] = [
    {
      href: '/home',
      icon: faShekelSign,
      title: 'Newsfeed',
    },
    {
      href: '/new',
      icon: faEdit,
      title: 'Create Post',
    },
    {
      href: `/${username}`,
      icon: faUser,
      title: 'Profile',
    },
    {
      href: '/friends',
      icon: faEye,
      title: 'Friends',
    },
    {
      href: '/chat',
      icon: faComments,
      title: 'Messages',
    },
    {
      href: '/trends',
      icon: faFireFlameCurved,
      title: 'Trends',
    },
    {
      href: '/settings',
      icon: faGear,
      title: 'Settings',
    },
  ];

  return (
    <div className='bg-white w-full  shadow-2xl h-full dark:md:bg-blackSwan dark:bg-black rounded-2xl'>
      {sideNavbarIcons.map((icon, index) => (
        <SideNavbarIcons
          key={index}
          href={icon.href}
          icon={icon.icon}
          title={icon.title}
          show={false}
        />
      ))}
    </div>
  );
};

interface SideNavbarIconProps {
  href: string;
  icon: any;
  title: string;
}

export default Shortcuts;
