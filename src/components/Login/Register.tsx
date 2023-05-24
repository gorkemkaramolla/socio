'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Button from '@/components/UI/Button';
import { toast } from 'react-hot-toast';
import FormInput from '../UI/Input';
import Label from '../UI/Label';
import GoogleIcon from '@mui/icons-material/Google';
import Heading from '../UI/Heading';
import Link from 'next/link';
import { useFormik } from 'formik';
import Error from '../UI/Error';
import Paragraph from '../UI/Paragraph';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Props {}

const RegisterPage: React.FC<Props> = () => {
  const [PwOpen, setPwOpen] = useState<boolean>(false);
  const [focusState, setFocusState] = useState({
    focus1: false,
    focus2: false,
  });

  const handleFocus1 = () => {
    setFocusState((prevState) => ({ ...prevState, focus1: true }));
  };
  const handleFocus2 = () => {
    setFocusState((prevState) => ({ ...prevState, focus2: true }));
  };
  const handleBlur2 = () => {
    if (!(formik.values.password !== '' && focusState.focus2))
      setFocusState((prevState) => ({ ...prevState, focus2: false }));
  };
  const handleBlur1 = () => {
    if (!(formik.values.email !== '' && focusState.focus1))
      setFocusState((prevState) => ({ ...prevState, focus1: false }));
  };
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
        errors.email = 'Email is required please fill';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Password is required please fill';
      } else if (
        !(values.password.length >= 8 && values.password.length <= 20)
      ) {
        errors.password = 'Password must be 8 to 20 characters';
      }
      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });
  const mode = useSelector((state: RootState) => state.mode);

  return (
    <div className='justify-center p-12   w-[100%] h-[100%] flex flex-col  items-center'>
      <div className='gap-3 flex flex-col md:p-12  p-5  shadow-md shadow-pink-400   rounded-xl'>
        <div className='flex flex-col gap-8'>
          <Heading size={'md'} align={'center'} variant={'pink'} heading='h1'>
            Register
          </Heading>
          <Paragraph align={'center'}>
            Connect your friends and chat with socio
          </Paragraph>
          <Button variant={'google'} onClick={loginWithGoogle}>
            <GoogleIcon sx={{ fontSize: '1.5em' }} className='' />
            <p className=' pt-[0.5px]'> Login with Google</p>
          </Button>
          <form
            className='flex relative flex-col gap-8 w-[350px] md:w-[400px]'
            onSubmit={formik.handleSubmit}
          >
            <div className='flex group  transition-all flex-col'>
              <Label isFocus={focusState.focus1} className='' htmlFor='email'>
                Email
              </Label>
              <FormInput
                onBlur={handleBlur1}
                onFocus={handleFocus1}
                className='mt-2'
                ring
                id='email'
                name='email'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <Error variant={'error'}>{formik.errors.email}</Error>
              ) : null}
            </div>

            <div className='flex group transition-all flex-col'>
              <Label isFocus={focusState.focus2} htmlFor='password'>
                Password
              </Label>
              <FormInput
                onBlur={handleBlur2}
                onFocus={handleFocus2}
                className='mt-2 transition-all'
                ring
                id='password'
                name='password'
                type={PwOpen ? 'password' : 'text'}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <span>
                <span
                  onClick={() => {
                    setPwOpen(!PwOpen);
                  }}
                  className='text-slate-200 left-[90%] bottom-[130%] relative cursor-pointer'
                >
                  {PwOpen ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      fill={mode.mode === 'dark' ? '#f472b6' : 'black'}
                      viewBox='0 -960 960 960'
                      width='24'
                    >
                      <path d='M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z' />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill={mode.mode === 'dark' ? '#f472b6' : 'black'}
                      height='24'
                      viewBox='0 -960 960 960'
                      width='24'
                    >
                      <path d='m629-419-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650-500q0 22-5.5 43.5T629-419Zm129 129-40-40q49-36 85.5-80.5T857-500q-50-111-150-175.5T490-740q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485-800q143 0 261.5 81.5T920-500q-26 64-67 117t-95 93Zm58 226L648-229q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40-500q20-52 55.5-101.5T182-696L56-822l42-43 757 757-39 44ZM223-654q-37 27-71.5 71T102-500q51 111 153.5 175.5T488-260q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z' />
                    </svg>
                  )}
                </span>
              </span>

              {formik.touched.password && formik.errors.password ? (
                <Error variant={'error'}>{formik.errors.password}</Error>
              ) : null}
            </div>
            <p>
              Already have an account? <Link href='/login'> Sign in</Link>
            </p>
            <Button variant={'google'} type='submit'>
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
