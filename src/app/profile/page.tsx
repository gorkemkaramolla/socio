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

interface Props {}

const DashBoard = () => {
  const [loading, setLoading] = useState(true); // Add the loading state

  const currentUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const session = await getSession();
    const currentUser = await axios.get('/user', {
      params: {
        id: session?.user.id,
      },
    });
    if (session && currentUser) {
      dispatch(setUser(currentUser.data.user));
    }
    setLoading(false); // Set loading to false once the data is fetched
  };

  if (loading) {
    return (
      <div className='mx-auto grid-cols-12 container'>
        <div className='p-5 bg-indigo-200 flex justify-center items-center rounded-xl m-5 w-[550px] min-h-[250px]'>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto flex items-center flex-col  mt-5 w-full '>
      <div className='border-[1px] gap-3   border-red-400 p-12 flex flex-col items-center justify-center'>
        <Image
          className='rounded-full '
          src={currentUser?.image! || ''}
          width={90}
          height={90}
          alt='asda'
        />

        <Heading size={'md'} heading='h3'>
          {currentUser?.name}
        </Heading>
        <Heading heading='h5'>{currentUser?.email}</Heading>
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashBoard;
