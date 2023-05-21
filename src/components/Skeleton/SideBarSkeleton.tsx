import React from 'react';
import SideNavbarIcons from '../SideBar/SideNavbarIcons';
import {
  faBars,
  faBarsStaggered,
  faShekelSign,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {}

const SideBarSkeleton: React.FC<Props> = () => {
  return (
    <div
      className={
        ' w-fit min-full flex flex-col  justify-around text-white text-sm bg-red-500 p-2  rounded-[30px] shadow-2xl z-40'
      }
    >
      <div
        className={
          'flex items-center justify-between cursor-pointer ease-out duration-200  '
        }
      ></div>
      <div
        className={
          'search flex items-center cursor-pointer hover:bg-white rounded ease-out duration-200 hover:text-red-500'
        }
        onClick={(e) => {
          e.preventDefault();

          // @ts-ignore
          searchInput.current.focus();
        }}
      >
        <form action=''></form>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div
          key={i}
          className=' cursor-pointer hover:bg-white rounded ease-out duration-200 w-8 h-8 bg-red-500'
        ></div>
      ))}

      {/* <SideNavbarIcons icon={faShekelSign} title={'Newsfeed'} show={false} />
      <SideNavbarIcons icon={faShekelSign} title={'ToDo'} show={false} />
      <SideNavbarIcons icon={faShekelSign} title={'Profile'} show={false} />
      <SideNavbarIcons icon={faShekelSign} title={'Friends'} show={false} />
      <SideNavbarIcons icon={faShekelSign} title={'Messages'} show={false} />
      <SideNavbarIcons icon={faShekelSign} title={'Trends'} show={false} />
      <SideNavbarIcons icon={faShekelSign} title={'Settings'} show={false} /> */}
    </div>
  );
};

export default SideBarSkeleton;
