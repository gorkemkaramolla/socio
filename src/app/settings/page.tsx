'use client';
import FormInput from '@/components/UI/Input';
import Label from '@/components/UI/Label';
import { RootState } from '@/store';
import Button from '@/components/UI/Button';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Heading from '@/components/UI/Heading';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/redux/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import Textarea from '@/components/UI/Textarea';
import Image from 'next/image';
import ModalUi from '@/components/UI/Modal';
import { getLocation, getLocationDetails } from '@/util/getLocation';
import Paragraph from '@/components/UI/Paragraph';

interface Props {}

const Settings: React.FC<Props> = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const handler = () => setVisible(true);
  const [loading, setLoading] = useState<boolean>(false);
  const selector = useSelector((state: RootState) => state.user);

  const [imageFile, setImageFile] = useState<string>('');
  const dispatch = useDispatch();
  const successToast = () => toast.success('Successfully Changed');
  const errorToast = (e: any) => toast.success(e);
  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };
  useEffect(() => {
    console.log(imageFile);
  }, [imageFile]);
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      // Perform file upload logic here
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImageFile(dataUrl);
      };
      reader.readAsDataURL(file!);
    },
    []
  );

  const handleLocation = async () => {
    setLoading(true);
    try {
      const locationData: any = await getLocation();
      const { city, country } = await getLocationDetails(
        locationData.latitude,
        locationData.longitude
      );

      setLocation(country + ',' + city);
      setLoading(false);
    } catch (error) {
      console.error('Error retrieving location:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const deleteCurrentPic = () => {
    formik.values.image = '';
    setImageFile('');
    dispatch(setUser({ ...selector, image: '' }));
  };

  const formik = useFormik({
    initialValues: {
      email: selector.email || '',
      name: selector.name || '',
      location: location!,
      bio: selector.bio || '',
      image: imageFile!,
    },
    enableReinitialize: true,

    validate(values) {
      const errors: {
        name?: string;
        lastname?: string;
        email?: string;
        password?: string;
        image?: string;
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
      console.log(values.image);
      updateUser(
        values.email,
        values.name,
        values.bio,
        values.image,
        values.location
      );
    },
  });

  const updateUser = async (
    email: string,
    name: string,
    bio: string,
    image: string,
    location: string
  ) => {
    console.log('worked');
    setLoading(true);
    try {
      const updatedUser = await axios.put('/user', {
        id: selector.id,
        email: email,
        name: name,
        bio: bio,
        image: image,
        location: location,
      });
      if (updatedUser) {
        dispatch(setUser(updatedUser.data.user));
        setLoading(false);
        successToast();
      }
    } catch (e) {
      console.log('update error: ' + e);
      errorToast(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full flex flex-col items-center h-screen mt-12 '>
      <Heading
        weight={'extra'}
        align={'center'}
        size={'md'}
        variant={'default'}
        heading='h1'
      >
        Settings
      </Heading>

      <form
        onSubmit={formik.handleSubmit}
        className='px-12 w-full justify-start flex items-center  flex-col gap-12'
      >
        <div>
          <ModalUi
            userHasPic={!selector.image}
            deleteCurrentPic={deleteCurrentPic}
            handleFileUpload={handleFileUpload}
            closeHandler={closeHandler}
            visible={visible}
          />
        </div>
        <div className='lg:w-[85%] w-[95%] relative'>
          <div className='flex gap-8 items-center'>
            <Image
              className='profile-img dark:bg-white rounded-full '
              src={selector.image || imageFile || '/userdefault.png'}
              width={60}
              height={60}
              alt='/userdefault.png'
            />

            <Button
              className='active:text-blue-900'
              onClick={handler}
              variant={'ghost'}
            >
              <Heading
                className='transition-colors hover:text-blue-500   '
                weight={'default'}
                heading='h5'
                size={'default'}
              >
                Change your profile picture
              </Heading>
            </Button>
          </div>
        </div>
        <div className='lg:w-[85%] w-[95%]'>
          <Label isFocus>Name</Label>
          <FormInput
            name='name'
            id='name'
            placeholder='Whats your name'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.name}
          ></FormInput>
        </div>
        <div className='lg:w-[85%] w-[95%]'>
          <Label isFocus>Email</Label>
          <FormInput
            name='name'
            id='email'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.email}
          ></FormInput>
        </div>
        <div className='lg:w-[85%] w-[95%]'>
          <Label isFocus>Location</Label>
          <div className='flex  items-center r gap-3'>
            <Button className='p-0' variant={'ghost'} onClick={handleLocation}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 -960 960 960'
                width='24'
              >
                <path d='M480.089-490Q509-490 529.5-510.589q20.5-20.588 20.5-49.5Q550-589 529.411-609.5q-20.588-20.5-49.5-20.5Q451-630 430.5-609.411q-20.5 20.588-20.5 49.5Q410-531 430.589-510.5q20.588 20.5 49.5 20.5ZM480-159q133-121 196.5-219.5T740-552q0-117.79-75.292-192.895Q589.417-820 480-820t-184.708 75.105Q220-669.79 220-552q0 75 65 173.5T480-159Zm0 79Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-472Z' />
              </svg>
            </Button>
            <Paragraph>{selector.location || location}</Paragraph>
          </div>
        </div>
        <div className='lg:w-[85%] w-[95%]'>
          <Label isFocus>Bio</Label>
          <Textarea
            placeholder='Tell me about yourself'
            name='bio'
            id='bio'
            onChange={formik.handleChange}
            value={formik.values.bio}
          ></Textarea>
        </div>
        <Button type='submit' disabled={loading} variant={'ghost'}>
          Save changes
        </Button>
        <Toaster position='bottom-left' />
      </form>
    </div>
  );
};

export default Settings;
