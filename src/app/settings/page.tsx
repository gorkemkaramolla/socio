'use client';
import FormInput from '@/components/UI/Input';
import Label from '@/components/UI/Label';
import { RootState } from '@/store';
import Button from '@/components/UI/Button';
import { useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import Heading from '@/components/UI/Heading';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/redux/userSlice';

interface Props {}

const Settings: React.FC<Props> = () => {
  const selector = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { email: selector.email, name: selector.name },
    enableReinitialize: true,

    validate(values) {
      const errors: {
        name?: string;
        lastname?: string;
        email?: string;
        password?: string;
      } = {};
      if (!values.name) {
        errors.name = 'Email is required please fill';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: (values) => {
      event?.preventDefault();
      updateUser(values.email, values.name);
    },
  });
  const updateUser = async (email: string, name: string) => {
    const updatedUser = await axios.put('/user', {
      id: selector.id,
      email: email,
      name: name,
    });
    if (updatedUser) {
      dispatch(setUser(updatedUser.data.user));
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='w-full h-screen justify-start flex items-start my-12 flex-col gap-12'
    >
      <Heading variant={'pink'} heading='h1'>
        Settings{' '}
      </Heading>
      <div className='w-[50%]'>
        <Label isFocus>Name</Label>
        <FormInput
          name='name'
          id='name'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.name}
        ></FormInput>
      </div>
      <div className='w-[50%]'>
        <Label isFocus>Email</Label>
        <FormInput
          name='name'
          id='email'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.email}
        ></FormInput>
      </div>
      <Button variant={'ghost'}>Submit</Button>
    </form>
  );
};

export default Settings;
