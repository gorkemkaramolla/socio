'use client';
import React, { FC, useEffect, useState } from 'react';
import ContentContainer from '@/components/contentContainer';
import Stories from '@/components/Stories';
import Heading from '@/components/UI/Heading';
import Button from '@/components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/lib/redux/userSlice';
import axios from 'axios';
import Shortcuts from "@/components/Shortcuts";
interface Props {}

const Home: FC<Props> = () => {
  const [loading, setLoading] = useState(true); // Add the loading state
    const [show,setShow] = useState(false)
    const currentUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
      <div className={'flex flex-col overflow-y-scroll items-center px-3.5'}>
      <div
        className={
            'sticky top-0 w-full h-fit flex md:justify-center justify-between items-center bg-white/75 drop-shadow-xl dark:bg-black/75 backdrop-blur-sm z-40'
        }
      >
        <Heading heading='h6' size={'md'} className={'m-4'}>
          NewsFeed
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
          <div className={ `${show ? '-right-4 ' : '-right-48' } top-16 md:hidden absolute ease-out duration-300 `}>
              <Shortcuts/>
          </div>
      </div>
          <div className={'h-fit w-full flex flex-col items-center'}>
        <div className={'md:p-3'}>
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
                img: 'https://i.ibb.co/WxMs27X/avatar3.jpg',
                name: 'Kübra Yılmaz',
                username: '@kubraylmzz',
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
  );
};

export default Home;
