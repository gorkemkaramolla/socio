'use client';
import React, { FC, useRef, useState } from 'react';
import Button from '@/components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faUser,
  faBars,
  faMagnifyingGlass,
  faComments,
  faGear,
  faFireFlameCurved,
  faShekelSign,
  faBarsStaggered,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import SideNavbarIcons from './SideNavbarIcons';
import useBackgroundBlur from '@/lib/zustand/useEmoji';

interface Props {}

const SideNavbar: FC<Props> = () => {
  // @ts-ignore
  const setBlur = useBackgroundBlur((state) => state.setBlur);
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  return (

      <div className={'fixed h-full mx-10 flex flex-col justify-between px-3 py-9 '}>
              <div className={'flex flex-col gap-3'}>
                  <SideNavbarIcons icon={faShekelSign} title={'Newsfeed'} show={show} />
                  <SideNavbarIcons icon={faCheck} title={'ToDos'} show={show} />
                  <SideNavbarIcons icon={faUser} title={'Profile'} show={show} />
                  <SideNavbarIcons icon={faEye} title={'Friends'} show={show} />
                  <SideNavbarIcons icon={faComments} title={'Messages'} show={show} />
                  <SideNavbarIcons icon={faFireFlameCurved} title={'Trends'} show={show}/>
                  <SideNavbarIcons icon={faGear} title={'Settings'} show={show} />
              </div>
          <div>
            fgdfgdfgdfg
          </div>
      </div>

    // <div className={' z-30 h-full fixed items-center top-0 w-[85px]  flex p-5'}>
    //   <div
    //     className={
    //       ' h-[85%] w-fit min-full flex flex-col justify-around text-white text-sm bg-red-500 p-2  rounded-[30px] shadow-2xl z-40'
    //     }
    //   >
    //     <div
    //       className={
    //         'flex items-center justify-between cursor-pointer ease-out duration-200  '
    //       }
    //     >
    //       {
    //         <div
    //           className={
    //             !show
    //               ? 'w-0 flex justify-center items-center ease-out duration-200 overflow-hidden opacity-0'
    //               : 'w-[100px] flex justify-center items-center  ease-out duration-200  overflow-hidden'
    //           }
    //           onClick={(e) => {
    //             setShow(!show);
    //             setShowSearch(false);
    //             setBlur(false);
    //           }}
    //         >
    //           <span className={'text-lg'}>socio</span>
    //         </div>
    //       }
    //       <Button
    //         variant={'nav'}
    //         size={'nav'}
    //         className={'ease-out duration-300 text-sm '}
    //         onClick={(e) => {
    //           e.preventDefault();
    //           setShowSearch(false);
    //           setShow(!show);
    //           setBlur(false);
    //         }}
    //       >
    //         {show ? (
    //           <FontAwesomeIcon icon={faBarsStaggered} />
    //         ) : (
    //           <FontAwesomeIcon icon={faBars} />
    //         )}
    //       </Button>
    //     </div>
    //     {/*<div*/}
    //     {/*  className={*/}
    //     {/*    !showSearch*/}
    //     {/*      ? 'search flex items-center cursor-pointer hover:bg-white rounded ease-out duration-200 hover:text-red-500'*/}
    //     {/*      : 'search flex items-center cursor-pointer rounded ease-out duration-200 text-red-500'*/}
    //     {/*  }*/}
    //     {/*  onClick={(e) => {*/}
    //     {/*    e.preventDefault();*/}
    //     {/*    setShow(true);*/}
    //     {/*    setShowSearch(!showSearch);*/}
    //     {/*    setBlur(!showSearch);*/}
    //     {/*    searchInput?.current?.focus()!;*/}
    //     {/*  }}*/}
    //     {/*>*/}
    //     {/*  <Button*/}
    //     {/*    variant={'nav'}*/}
    //     {/*    size={'nav'}*/}
    //     {/*    className={*/}
    //     {/*      !showSearch*/}
    //     {/*        ? ' ease-out duration-300 '*/}
    //     {/*        : ' rotate-180 rounded-3xl ease-out duration-300 hover:text-red-500 bg-white '*/}
    //     {/*    }*/}
    //     {/*  >*/}
    //     {/*    {showSearch ? '✕' : <FontAwesomeIcon icon={faMagnifyingGlass} />}*/}
    //     {/*  </Button>*/}
    //
    //     {/*  <form*/}
    //     {/*    action=''*/}
    //     {/*    className={*/}
    //     {/*      !showSearch*/}
    //     {/*        ? 'w-[0] flex justify-center items-center rounded ease-out duration-300 text-white h-full'*/}
    //     {/*        : 'flex justify-center items-center bg-white rounded w-[170px] ease-out duration-300 text-red-500 ml-2 h-full '*/}
    //     {/*    }*/}
    //     {/*  >*/}
    //     {/*    <div className={' text-sm text-center w-10/12 '}>*/}
    //     {/*      <input*/}
    //     {/*        className={'bg-transparent w-full'}*/}
    //     {/*        type='text'*/}
    //     {/*        ref={searchInput}*/}
    //     {/*        autoFocus={showSearch}*/}
    //     {/*        onClick={(e) => e.stopPropagation()}*/}
    //     {/*      />{' '}*/}
    //     {/*    </div>*/}
    //     {/*  </form>*/}
    //     {/*  <div*/}
    //     {/*    className={*/}
    //     {/*      show && !showSearch*/}
    //     {/*        ? 'flex w-[100px]  ease-out duration-200 overflow-hidden'*/}
    //     {/*        : 'flex w-0  overflow-hidden'*/}
    //     {/*    }*/}
    //     {/*  >*/}
    //     {/*    Search*/}
    //     {/*  </div>*/}
    //     {/*</div>*/}
    //     <SideNavbarIcons icon={faShekelSign} title={'Newsfeed'} show={show} />
    //     <SideNavbarIcons icon={faCheck} title={'ToDos'} show={show} />
    //     <SideNavbarIcons icon={faUser} title={'Profile'} show={show} />
    //     <SideNavbarIcons icon={faEye} title={'Friends'} show={show} />
    //     <SideNavbarIcons icon={faComments} title={'Messages'} show={show} />
    //     <SideNavbarIcons
    //       icon={faFireFlameCurved}
    //       title={'Trends'}
    //       show={show}
    //     />
    //     <SideNavbarIcons icon={faGear} title={'Settings'} show={show} />
    //   </div>
    // </div>

  );
};

export default SideNavbar;
