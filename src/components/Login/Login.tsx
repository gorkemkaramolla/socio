import React from 'react';
import { signIn } from 'next-auth/react';
import Button from '@/components/UI/Button';
import { toast } from 'react-hot-toast';
import { Field, Form, Formik } from 'formik';
import FormInput from '../UI/Input';
import Heading from '../UI/Heading';
import Label from '../UI/Label';
interface Props {}

const Login: React.FC<Props> = () => {
  const loginWithGoogle = async () => {
    try {
      await signIn('google', {
        redirect: true,
        callbackUrl: `/dashboard`,
      });
    } catch (e) {
      toast.error('Something Went Wrong');
    }
  };
  const handleSubmit = async () => {};
  return (
    <div className='w-full'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        <Form>
          <div className='flex flex-col gap-3 w-full'>
            <div className='flex flex-col'>
              <Label htmlFor='email'>Label</Label>
              <FormInput ring id='email' name='email' type='text' />
            </div>

            <div className='flex flex-col w-full'>
              <Label htmlFor='password'>Label</Label>
              <FormInput id='email' name='password' type='password' />
            </div>
          </div>
          <Button type='submit'>submit</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
