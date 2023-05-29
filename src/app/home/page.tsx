'use client';
import React, { FC, useEffect, useState } from 'react';
import ContentContainer from '@/components/contentContainer';
import Stories from '@/components/Stories';
import Heading from '@/components/UI/Heading';
import Button from '@/components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/lib/redux/userSlice';
import axios from 'axios';
interface Props {}

const Home: FC<Props> = () => {
  const [loading, setLoading] = useState(true); // Add the loading state

  const currentUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <div className={'flex flex-col overflow-y-scroll items-center '}>
      <div
        className={
          'sticky top-0 w-full h-fit flex justify-center items-center bg-white/75 drop-shadow-xl dark:bg-black/75 backdrop-blur-sm z-40'
        }
      >
        <Heading heading='h6' size={'md'} className={'m-4'}>
          NewsFeed
        </Heading>
      </div>
      <div className={'h-fit w-full flex justify-center'}>
        <div className={' md:w-11/12 md:p-3 w-4/6'}>
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
        {/*<div className={'w-2/6'}>*/}
        {/*  <div*/}
        {/*    className={*/}
        {/*      'flex bg-white min-h-[150px] my-4 shadow-2xl rounded-xl'*/}
        {/*    }*/}
        {/*  >*/}
        {/*    3333*/}
        {/*  </div>*/}
        {/*  <div*/}
        {/*    className={*/}
        {/*      'flex bg-white min-h-[350px] my-4 shadow-2xl rounded-xl'*/}
        {/*    }*/}
        {/*  >*/}
        {/*    4444*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <div className={'w-full flex justify-center'}>
        <Button variant={'ghost'} size={'lg'} isLoading={true}>
          Loading
        </Button>
      </div>

      {/*<div className={'h-full w-1/5 flex flex-col items-center'}>*/}
      {/*  <div className={'w-full'}>*/}
      {/*    <Heading heading='h6' size={'md'} className={'mt-4 mb-0'}>*/}
      {/*      My Profile*/}
      {/*    </Heading>*/}
      {/*  </div>*/}
      {/*  /!*<div*!/*/}
      {/*  /!*  className={*!/*/}
      {/*  /!*    'w-full flex bg-red-500 text-white min-h-[350px] my-4 shadow-2xl rounded-xl'*!/*/}
      {/*  /!*  }*!/*/}
      {/*  /!*>*!/*/}
      {/*  /!*  search butonuna blur yaptım emin olamadım bakarsın dshglaga*!/*/}
      {/*  /!*</div>*!/*/}
      {/*  /!*<div className={'w-full'}>*!/*/}
      {/*  /!*  <Heading heading='h6' size={'md'} className={'mt-4 mb-0'}>*!/*/}
      {/*  /!*    Latest Connections*!/*/}
      {/*  /!*  </Heading>*!/*/}
      {/*  /!*</div>*!/*/}
      {/*  /!*<div*!/*/}
      {/*  /!*  className={*!/*/}
      {/*  /!*    'w-full flex bg-red-500 text-white min-h-[250px] my-4 shadow-2xl rounded-xl'*!/*/}
      {/*  /!*  }*!/*/}
      {/*  /!*>*!/*/}
      {/*  /!*  logoyu da ölesine koydum ama güzel oturdu*!/*/}
      {/*  /!*</div>*!/*/}
      {/*</div>*/}
    </div>
  );
};

export default Home;
