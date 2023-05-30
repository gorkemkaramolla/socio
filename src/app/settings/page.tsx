'use client';
import { Buffer } from 'buffer';
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
import ModalUi from '@/components/UI/Modal';
import { getLocation, getLocationDetails } from '@/util/getLocation';
import Paragraph from '@/components/UI/Paragraph';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import Error from '@/components/UI/Error';
interface Props {}
export const getImage = (img: Buffer) => {
  if (img) {
    const buffer = Buffer.from(img);
    const base64String = buffer.toString('base64');
    let mimeType = 'image/png';

    // Check the file format based on the buffer content
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      mimeType = 'image/jpeg';
    }

    const dataURL = `data:${mimeType};base64,${base64String}`;
    return dataURL;
  }
  return '';
};
const Settings: React.FC<Props> = () => {
  const [base64Image, setBase64Image] = useState<string>('');

  const [visible, setVisible] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handler = () => setVisible(true);
  const [loading, setLoading] = useState<boolean>(false);
  const selector = useSelector((state: RootState) => state.user);
  const mode = useSelector((state: RootState) => state.mode);

  const [imageFile, setImageFile] = useState<Blob>();
  const dispatch = useDispatch();
  const successToast = () => toast.success('Successfully Changed');
  const errorToast = (e: any) => toast.success(e);
  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  useEffect(() => {
    if (selector?.image) {
      let img = getImage(selector.image);
      setImageSrc(img);
    }
  }, [selector.image]);

  useEffect(() => {
    console.log(base64Image);
  }, [base64Image]);
  const base64StringToBlob = (base64String: string, type: string): Blob => {
    const sliceSize = 512;
    const byteCharacters = atob(
      base64String.slice(base64String.indexOf(',') + 1)
    );
    const byteArrays: Uint8Array[] = [];
    let offset = 0;

    while (offset < byteCharacters.length) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
      offset += sliceSize;
    }

    return new Blob(byteArrays, { type });
  };

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const imgBlob = base64StringToBlob(base64String, file.type);
          setImageSrc(base64String);

          setImageFile(imgBlob);
        };
        reader.readAsDataURL(file);
      }
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
    setImageFile(undefined);
    dispatch(setUser({ ...selector, image: undefined }));
  };

  const formik = useFormik({
    initialValues: {
      username: selector.username,
      email: selector.email || '',
      name: selector.name || '',
      location: location!,
      bio: selector.bio || '',
      image: imageFile!,
    },
    enableReinitialize: true,

    validate(values) {
      const errors: {
        username?: string;
        bio?: string;
        name?: string;
        email?: string;
      } = {};
      if (!values.email) {
        errors.email = 'Email is required please fill';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if (!(values.bio.length >= 8 && values.bio.length <= 20)) {
        errors.bio = 'Password must be 8 to 20 characters';
      }
      if (!values.name) {
        errors.name = 'Name is required please fill';
      }
      if (!values.username) {
        errors.username = 'Username is required please fill';
      }
      return errors;
    },
    onSubmit: (values) => {
      updateUser(
        values.username,
        values.email,
        values.name,
        values.bio,
        values.image,
        values.location
      );
    },
  });

  const updateUser = async (
    username: string,
    email: string,
    name: string,
    bio: string,
    image: Blob,
    location: string
  ) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('id', selector.id);
      formData.append('email', email);
      formData.append('name', name);
      formData.append('bio', bio);
      formData.append('location', location);
      formData.append('image', image);
      formData.append('username', username);

      const updatedUser = await axios.put('/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Add this header
        },
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
            <img
              style={{ borderRadius: '50%' }}
              className='w-[60px] h-[60px] profile-img dark:bg-white object-cover rounded-full '
              src={selector.imageUri || imageSrc || '/userdefault.png'}
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
          <Label isFocus>Username</Label>
          <FormInput
            name='username'
            id='username'
            placeholder='your username'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.username}
          ></FormInput>
          {formik.touched.username && formik.errors.username ? (
            <Error>{formik.errors.username}</Error>
          ) : null}
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
          {formik.touched.name && formik.errors.name ? (
            <Error>{formik.errors.name}</Error>
          ) : null}
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
          {formik.touched.email && formik.errors.email ? (
            <Error>{formik.errors.email}</Error>
          ) : null}
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
                fill={mode.mode === '' ? `black` : 'white'}
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
        <Button
          isLoading={loading}
          type='submit'
          disabled={loading}
          variant={'ghost'}
        >
          Save changes
        </Button>
        <LogoutButton></LogoutButton>
        <Toaster position='bottom-left' />
      </form>
    </div>
  );
};

export default Settings;
