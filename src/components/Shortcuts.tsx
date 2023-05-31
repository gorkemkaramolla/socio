import React, { FC } from 'react';
import SideNavbarIcons from '@/components/SideBar/SideNavbarIcons';
import {
  faCheck,
  faComments,
  faEye,
  faFireFlameCurved,
  faGear,
  faShekelSign,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
interface Props {}

const Shortcuts: FC<Props> = ({}) => {
  const { username } = useSelector((state: RootState) => state.user);
  return (
    <div
      className={
        'bg-white shadow-2xl dark:md:bg-blackSwan dark:bg-black rounded-2xl'
      }
    >
      <SideNavbarIcons
        href='/home'
        icon={faShekelSign}
        title={'Newsfeed'}
        show={true}
      />
      <SideNavbarIcons
        href='/todos'
        icon={faCheck}
        title={'ToDos'}
        show={true}
      />
      <SideNavbarIcons
        href={`/${username}`}
        icon={faUser}
        title={'Profile'}
        show={true}
      />
      <SideNavbarIcons
        href='/friends'
        icon={faEye}
        title={'Friends'}
        show={true}
      />
      <SideNavbarIcons
        href='/messages'
        icon={faComments}
        title={'Messages'}
        show={true}
      />
      <SideNavbarIcons
        href='/trends'
        icon={faFireFlameCurved}
        title={'Trends'}
        show={true}
      />
      <SideNavbarIcons
        href='/settings'
        icon={faGear}
        title={'Settings'}
        show={true}
      />
    </div>
  );
};

export default Shortcuts;
