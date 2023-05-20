'use client';
import React, { FC, useRef, useState } from 'react';
import Button from '@/components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faMagnifyingGlass,
  faUser,
  faBars,
  faCube,
  faComments,
  faGear,
  faFireFlameCurved,
  faBarsStaggered,
} from '@fortawesome/free-solid-svg-icons';

import SideNavbarIcons from '@/components/SideNavbarIcons';

interface Props {}

const SideNavbar: FC<Props> = () => {
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchInput = useRef(null);
  return (
    <div>
      <div
        className={
          'fixed w-fit h-screen gap-12 flex flex-col justify-center items-start text-white bg-midnight pr-2 pl-5 shadow-2xl'
        }
      >
        <div
          className={
            'flex items-center justify-between cursor-pointer ease-out duration-200 '
          }
        >
          {
            <div
              className={
                !show
                  ? 'w-0 flex justify-center items-center ease-out duration-200 overflow-hidden opacity-0'
                  : 'w-[100px] flex justify-center items-center  ease-out duration-200  overflow-hidden'
              }
              onClick={(e) => {
                e.preventDefault();
                setShow(!show);
                setShowSearch(false);
              }}
            >
              <span className={'text-xl'}>socio</span>
            </div>
          }
          <Button
            variant={'nav'}
            size={'nav'}
            className={'ease-out duration-300 '}
            onClick={(e) => {
              e.preventDefault();
              setShow(!show);
              setShowSearch(false);
            }}
          >
            {show ? (
              <FontAwesomeIcon icon={faBarsStaggered} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </Button>
        </div>
        <div
          className={
            'search flex items-center gap-2 cursor-pointer ease-out duration-200'
          }
        >
          <Button
            variant={'nav'}
            size={'nav'}
            className={
              !showSearch
                ? 'text-white  ease-out duration-300 bg-pink hover:text-white '
                : 'text-white rotate-180 rounded-3xl ease-out duration-300 bg-pink hover:text-white'
            }
            onClick={(e) => {
              e.preventDefault();
              setShow(true);
              setShowSearch(!showSearch);
              // @ts-ignore
              searchInput.current.focus();
            }}
          >
            {showSearch ? '✕' : <FontAwesomeIcon icon={faMagnifyingGlass} />}
          </Button>

          <form
            action=''
            className={
              !showSearch
                ? 'w-0 flex justify-center items-center rounded ease-out duration-300 text-white h-full'
                : 'flex justify-center items-center bg-pink rounded w-[220px] ease-out duration-300 text-white ml-2 h-full '
            }
          >
            <div className={' text-sm text-center w-10/12 '}>
              <input
                className={
                  'bg-transparent w-full focus:outline-none placeholder:text-white placeholder:opacity-50'
                }
                type='text'
                ref={searchInput}
                autoFocus={showSearch}
                placeholder={'Type something..'}
              />{' '}
            </div>
          </form>
          <div
            className={
              show && !showSearch
                ? 'flex w-[100px]  ease-out duration-200 overflow-hidden'
                : 'flex w-0  overflow-hidden'
            }
          >
            Search
          </div>
        </div>

        <SideNavbarIcons icon={faUser} title={'User'} show={show} />
        <SideNavbarIcons icon={faEye} title={'Friends'} show={show} />
        <SideNavbarIcons icon={faComments} title={'Message'} show={show} />
        <SideNavbarIcons
          icon={faFireFlameCurved}
          title={'Trends'}
          show={show}
        />
        <SideNavbarIcons icon={faCube} title={'Dashboard'} show={show} />
        <SideNavbarIcons icon={faGear} title={'Settings'} show={show} />
      </div>
    </div>
  );
};

export default SideNavbar;
