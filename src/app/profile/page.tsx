'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Heading from '@/components/UI/Heading';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import { setUser } from '@/lib/redux/userSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useDispatch } from 'react-redux';
import { getSession } from 'next-auth/react';
import Paragraph from '@/components/UI/Paragraph';
import ContentContainer from '@/components/contentContainer';
import Button from '@/components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCircleXmark,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from 'lucide-react';
import SideNavbar from '@/components/SideBar/SideNavbar';
import Shortcuts from '@/components/Shortcuts';
import { boolean } from 'zod';

const DashBoard = () => {
  const selector = useSelector((state: RootState) => state.user);
  const currentUser = useSelector((state: RootState) => state.user);
  const [show, setShow] = useState(false);

  return (
    <div className={'flex flex-col overflow-y-scroll items-center px-3.5'}>
      <div
        className={
          'sticky top-0 w-full h-fit flex md:justify-center justify-between items-center bg-white/75 drop-shadow-xl dark:bg-black/75 backdrop-blur-sm z-40'
        }
      >
        <Heading heading='h6' size={'sm'} className={'m-4'}>
          {currentUser.name}
        </Heading>
        <Button
          className={
            'sidebarIconButtons ease-out duration-200 text-xl text-black dark:text-white px-10 md:hidden'
          }
          variant={'ghost'}
          size={'smSquare'}
          onClick={() => setShow(!show)}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <div
          className={`${
            show ? '-right-4 ' : '-right-48'
          } top-16 md:hidden absolute ease-out duration-300 `}
        >
          <Shortcuts />
        </div>
      </div>
      <div className={'h-fit w-full flex flex-col items-center'}>
        <div
          className={
            'w-full h-[150px] bg-fuchsia-600 rounded-2xl my-3 relative '
          }
        >
          <div className={'overflow-hidden w-full h-[150px] rounded-2xl  '}>
            <div
              className={
                'w-full h-full absolute opacity-0 hover:opacity-100 rounded-2xl '
              }
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,0,0,0.13769257703081228) 0%, rgba(0,0,0,0.13769257703081228) 100%)',
              }}
            >
              <Button
                className={
                  'sidebarIconButtons ease-out duration-200 text-xl text-grey absolute right-5 bottom-2'
                }
                variant={'ghost'}
                size={'smSquare'}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            </div>
            <img
              className={''}
              src='https://i.ibb.co/Ct8y2gk/wallpaper.jpg'
              alt=''
            />
          </div>
          <div
            className={
              'w-[120px] h-[120px] rounded-full  bg-white absolute -bottom-12 left-6 border-4 border-grey dark:border-blackSwan'
            }
          >
            <div
              className={
                'w-full h-full absolute opacity-0 hover:opacity-100 rounded-full '
              }
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,0,0,0.13769257703081228) 0%, rgba(0,0,0,0.13769257703081228) 100%)',
              }}
            >
              <Button
                className={
                  'sidebarIconButtons ease-out duration-200 text-xl text-grey absolute right-7 bottom-4'
                }
                variant={'ghost'}
                size={'smSquare'}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            </div>
            <img
              className={'rounded-full object-cover  w-full h-full'}
              src={selector.imageUri || selector.image!}
              alt=''
            />
          </div>
        </div>
        <div className={'w-full h-[140px] flex justify-end'}>
          <div
            className={'w-3/12  flex flex-col justify-end items-center gap-2'}
          >
            <div
              className={
                'bg-white dark:bg-blackSwan rounded-full px-3 py-1 w-10/12 text-center shadow-md cursor-pointer'
              }
            >
              <span className={'md:block xs:hidden'}>Edit Profile</span>
              <span className={'md:hidden'}>Edit</span>
            </div>
            <div
              className={
                'bg-white dark:bg-blackSwan rounded-full px-3 py-1 w-10/12 text-center shadow-md cursor-pointer'
              }
            >
              Settings
            </div>
          </div>
          <div
            className={
              'w-9/12 bg-white dark:bg-blackSwan shadow-md rounded-2xl p-5 flex flex-col justify-center '
            }
          >
            <span className={'text-md font-semibold'}>
              Web Developer at gfdgfdgdf
            </span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque,
              illum.
            </p>
          </div>
        </div>

        <div className={'flex w-full justify-evenly -mb-5'}>
          <Heading
            heading='h6'
            size={'xs'}
            className={
              'm-4 bg-white dark:bg-blackSwan shadow-2xl rounded-full px-6 py-1'
            }
          >
            Posts
          </Heading>
          <Heading heading='h6' size={'xs'} className={'m-4 px-6 py-1'}>
            Replies
          </Heading>
          <Heading heading='h6' size={'xs'} className={'m-4 px-6 py-1'}>
            Likes
          </Heading>
        </div>
        <div className={' md:p-3'}>
          {[
            'fgfdgfdghfdhdfh',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis corporis dolores enim et facilis fugit impedit ipsum iusto neque optio, perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n',
            'fgfdgfdghfdhdfh',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis corporis dolores enim et facilis fugit impedit ipsum iusto neque optio, perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis corporis dolores enim et facilis fugit impedit ipsum iusto neque optio, perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis corporis dolores enim et facilis fugit impedit ipsum iusto neque optio, perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n',
          ].map((content, i) => (
            <ContentContainer
              key={i}
              header={{
                img: selector.image! || selector.imageUri,
                name: currentUser?.name,
                username: '@nickname',
              }}
              content={content}
            />
          ))}
        </div>
      </div>
      <div className={'w-full flex justify-center'}>
        <Button variant={'ghost'} size={'lg'} isLoading={true}>
          Loading
        </Button>
      </div>
    </div>
    // <div className='mx-auto flex items-center flex-col  mt-5 w-full '>
    //   <div className='border-[1px] gap-3   border-red-400 p-12 flex flex-col items-center justify-center'>
    //     <img
    //       style={{ borderRadius: '50%' }}
    //       className='w-[60px] h-[60px] profile-img dark:bg-white object-cover rounded-full '
    //       src={
    //         selector.imageUri || getImage(selector.image!) || '/userdefault.png'
    //       }
    //       alt='/userdefault.png'
    //     />
    //     <Heading size={'md'} heading='h3'>
    //       {selector?.name}
    //     </Heading>
    //     <Heading heading='h5'>{selector?.email}</Heading>
    //     <LogoutButton />
    //     <Paragraph>{selector.bio}</Paragraph>
    //     <Paragraph>{selector.location}</Paragraph>
    //   </div>
    // </div>
  );
};

export default DashBoard;
