'use client';
import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import Button from '@/components/UI/Button';
import { toast } from 'react-hot-toast';
import FormInput from '../UI/Input';
import Label from '../UI/Label';
import GoogleIcon from '@mui/icons-material/Google';
import Heading from '../UI/Heading';
import Link from 'next/link';
import { useFormik } from 'formik';

import RegisterPage from './Register';

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const [registerLogin, setRegisterLogin] = useState(true);
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

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

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validate(values) {
      const errors: {
        name?: string;
        lastname?: string;
        email?: string;
        password?: string;
      } = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (
        !(values.password.length >= 8 && values.password.length <= 20)
      ) {
        errors.password = 'Şifre 8 ile 20 karakter arasında olmalı';
      }
      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <div className='justify-center  flex flex-col  h-screen items-center'>
      <div className='flex flex-col gap-3'>
        <Heading heading='h1'>Register</Heading>

        <form
          className=' flex flex-col gap-3 w-[300px] md:w-[400px]'
          onSubmit={formik.handleSubmit}
        >
          <div className='flex flex-col'>
            <Label htmlFor='email'>Email</Label>
            <FormInput
              ring
              id='email'
              name='email'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className=' text-rose-500'>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className='flex flex-col w-full'>
            <Label htmlFor='password'>Password</Label>
            <FormInput
              id='password'
              name='password'
              type='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className=' text-rose-500'>{formik.errors.password}</div>
            ) : null}
          </div>
          <p>
            Already have an account? <Link href='/register'>Sign in</Link>
          </p>
          <Button type='submit'>Register</Button>
        </form>
        <div className='bg-red-300'></div>
      </div>

      <Button onClick={loginWithGoogle}>
        <GoogleIcon sx={{ fontSize: '1.5em' }} />
        <p> Login with Google</p>
      </Button>
    </div>
  );
};

export default LoginPage;
