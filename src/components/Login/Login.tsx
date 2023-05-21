'use client';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Button from '@/components/UI/Button';
import { toast } from 'react-hot-toast';
import { Field, Form, Formik } from 'formik';
import FormInput from '../UI/Input';
import Label from '../UI/Label';
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/redux/userSlice';
import axios from 'axios';
interface Props {}

const Login: React.FC<Props> = () => {
  const loginWithGoogle = async () => {
    try {
      await signIn('google', {
        redirect: true,
        callbackUrl: `/dashboard`,
      });

      // Dispatch the setUser action with the extracted user data

      console.log('User logged in successfully');
    } catch (e) {
      toast.error('Something Went Wrong');
    }
  };

  return (
    <div className='grid grid-cols-12 gap-3'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        <Form className='col-span-12 md:col-span-6'>
          <div className='flex flex-col gap-3 w-full'>
            <div className='flex flex-col'>
              <Label htmlFor='email'>Email</Label>
              <FormInput ring id='email' name='email' type='text' />
            </div>

            <div className='flex flex-col w-full'>
              <Label htmlFor='password'>Password</Label>
              <FormInput id='password' name='password' type='password' />
            </div>
            <Button type='submit'>Register</Button>
          </div>
        </Form>
      </Formik>
      <Button
        className='col-span-12 flex gap-2 items-center justify-center'
        onClick={loginWithGoogle}
      >
        <GoogleIcon sx={{ fontSize: '1.5em' }} />
        <p> Login with google</p>
      </Button>
    </div>
  );
};

export default Login;
