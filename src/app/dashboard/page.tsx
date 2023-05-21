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

interface Props {}

const DashBoard = () => {
  const [loading, setLoading] = useState(true); // Add the loading state

  const currentUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const session = await axios.get('/api/auth/session');
    const userSession: User = session.data.user;
    if (userSession) dispatch(setUser(userSession));
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
    <div className='mx-auto grid-cols-12 container'>
      <LogoutButton />
      <div className='p-5 bg-indigo-200 inline-block rounded-xl m-5'>
        <Image src={currentUser?.image!} width={60} height={60} alt='' />

        <Heading size={'lg'} heading='h3'>
          {currentUser?.name}
        </Heading>
        <Heading size='md' heading='h4'>
          {currentUser?.id}
        </Heading>

        <Heading heading='h5'>{currentUser?.email}</Heading>
      </div>
    </div>
  );
};

export default DashBoard;
