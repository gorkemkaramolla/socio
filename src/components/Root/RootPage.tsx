'use client';
import React, { useState } from 'react';
import HelloText from '@/components/HelloText';
import Heading from '@/components/UI/Heading';
import RegisterPage from '@/components/Login/Register';
import GorkemTypeWriter from '@/util/GorkemTypeWriter';
import { Toaster } from 'react-hot-toast';
import LoginPage from '@/components/Login/Login';
import { Metadata } from 'next';

export default function RootPage() {
  const [login, setLogin] = useState(false);
  return (
    <div className='w-screen overflow-y-auto  shadow-blackSwan gap-4 relative h-screen md:flex-row flex-col flex justify-center items-center'>
      <div
        style={{
          backgroundImage:
            "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('/homepage-socio.jpg')",
        }}
        className='w-full md:w-1/2 h-full md:flex hidden gap-4 flex-col object-contain bg-cover text-center justify-center items-center'
      >
        <div>
          <GorkemTypeWriter
            durationTime={5500}
            afterDelete={false}
            afterDeleteDuration={5000}
            infinite={false}
          >
            <div className='text-center flex justify-center mb-8 w-full items-center'>
              <Heading
                className='text-white dark:text-white'
                align={'center'}
                heading='h1'
                weight={'extra'}
                size={'xl'}
              >
                S O C I O
              </Heading>
            </div>
          </GorkemTypeWriter>
        </div>
        <GorkemTypeWriter
          durationTime={100}
          afterDelete={false}
          afterDeleteDuration={1000}
          infinite={false}
        >
          <div className='text-center flex justify-center  w-full items-center'>
            <Heading
              className='text-white dark:text-white'
              align={'center'}
              heading='h1'
              weight={'extra'}
              size={'xl'}
            >
              Always Stay connected
            </Heading>
          </div>
        </GorkemTypeWriter>
        <GorkemTypeWriter
          durationTime={3500}
          afterDelete={false}
          afterDeleteDuration={1000}
          infinite={false}
        >
          <div className='text-center flex justify-center w-full items-center'>
            <Heading
              className='text-white dark:text-white'
              align={'center'}
              heading='h1'
              weight={'extra'}
              size={'xl'}
            >
              Share
            </Heading>
          </div>
        </GorkemTypeWriter>
        <GorkemTypeWriter
          durationTime={4500}
          afterDelete={false}
          afterDeleteDuration={1000}
          infinite={false}
        >
          <div className='text-center flex justify-center w-full items-center'>
            <Heading
              className='text-white dark:text-white'
              align={'center'}
              heading='h1'
              weight={'extra'}
              size={'xl'}
            >
              & Discuss
            </Heading>
          </div>
        </GorkemTypeWriter>
      </div>

      <div className='w-full md:w-1/2  p-4 flex justify-center items-center'>
        {/* <Heading heading='h1' weight={'extra'} size={'xl'}>
          Stay connected
        </Heading> */}
        <div className='  w-full  md:h-[90vh] border-blackSwan'>
          {login ? (
            <div>
              <LoginPage />
              <p>
                You dont have an account?
                <span
                  className='cursor-pointer'
                  onClick={() => setLogin(false)}
                >
                  Sign up
                </span>
              </p>
            </div>
          ) : (
            <div>
              <RegisterPage />
              <p>
                Already have an account?
                <span className='cursor-pointer' onClick={() => setLogin(true)}>
                  Sign in
                </span>
              </p>
            </div>
          )}

          <Toaster position='top-center'></Toaster>
        </div>
      </div>
    </div>
  );
}
