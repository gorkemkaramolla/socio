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
import ModalUi from '@/components/UI/Modals/Modal';
import { getLocation, getLocationDetails } from '@/util/getLocation';
import Paragraph from '@/components/UI/Paragraph';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import Error from '@/components/Error/Error';
import ProfileImage from '../Profile/ProfileImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Shortcuts from '../Shortcuts';
import { Edit, LocateIcon } from 'lucide-react';
import { base64StringToBlob } from '@/util/base64StringtoBlob';
interface Props {}

const SettingsPage: React.FC<Props> = () => {
  const [base64Image, setBase64Image] = useState<string>('');

  const [visible, setVisible] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const handler = () => setVisible(true);
  const [loading, setLoading] = useState<boolean>(false);
  const selector = useSelector((state: RootState) => state.user);
  const mode = useSelector((state: RootState) => state.mode);

  const [imageFile, setImageFile] = useState<Blob>();
  const dispatch = useDispatch();
  const successToast = () => toast.success('Successfully Changed');
  const errorToast = (e: any) => toast.error(e);
  const closeHandler = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (selector?.image) {
      let img = selector.image;
      setImageSrc(img);
    }
  }, [selector.image]);

  useEffect(() => {
    dispatch(setUser({ ...selector, image: imageSrc! }));
  }, [imageSrc]);
  useEffect(() => {}, [base64Image]);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = async () => {
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
    const formData = new FormData();
    formData.append('id', selector.id);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('location', location);
    formData.append('image', image);
    formData.append('username', username);

    try {
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
    } catch (e: any) {
      errorToast(e.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full overflow-x-hidden flex flex-col items-center h-[100dvh] overflow-auto '>
      <div className='sticky top-0 w-full h-fit flex md:justify-center justify-between items-center bg-white/75 drop-shadow-xl dark:bg-black/75 backdrop-blur-sm z-40'>
        <Heading heading='h6' size='sm' className='m-4'>
          Settings
        </Heading>
        <Button
          className={
            'sidebarIconButtons ease-out duration-200 text-xl text-black dark:text-white px-10 md:hidden'
          }
          variant={'ghost'}
          size={'smSquare'}
          onClick={() => setShow(!show)}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </div>
      <div className='w-full p-4 '>
        <div className='grid  items-center  grid-cols-12'>
          <div className='col-span-12 justify-center md:justify-start md:col-span-4 gap-3 w-full'>
            <div className=' w-36 h-36 lg:w-48 lg:h-48  group relative   border-2 rounded-full'>
              <ProfileImage
                googleImage={selector.imageUri}
                imageSrc={imageSrc!}
              />
              <button
                onClick={handler}
                className='p-0 m-0 group-hover:block absolute hidden -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2'
              >
                <Edit className='text-white w-12 h-12' />
              </button>
            </div>
          </div>

          <div className='col-span-12 md:col-span-8 w-full  gap-3'>
            <div className=''>
              <label htmlFor=''>Username</label>
              <div className=' rounded-full'>
                <FormInput
                  name='username'
                  id='username'
                  placeholder='your username'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.username}
                ></FormInput>
              </div>
              {formik.touched.username && formik.errors.username ? (
                <Error>{formik.errors.username}</Error>
              ) : null}
            </div>
            <div className='col-span-6'>
              <label htmlFor=''>Name</label>
              <div className='p-0.5 rounded-full'>
                <FormInput
                  name='name'
                  id='name'
                  placeholder='Whats your name'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                ></FormInput>
              </div>

              {formik.touched.name && formik.errors.name ? (
                <Error>{formik.errors.name.toString()}</Error>
              ) : null}
            </div>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className=' w-full flex flex-col '>
          <div className={'w-full flex md:flex-row flex-col '}>
            <div className='flex flex-col w-full  h-full justify-end pr-0 md:pr-5 gap-3'>
              <div>
                <ModalUi
                  userHasPic={!selector.image}
                  deleteCurrentPic={deleteCurrentPic}
                  handleFileUpload={handleFileUpload}
                  closeHandler={closeHandler}
                  visible={visible}
                />
              </div>

              <div className='grid grid-cols-12 gap-3 items-center'>
                <div className='flex self-end  flex-col   col-span-6 gap-2'>
                  <label htmlFor='justify-self-start'>Location </label>
                  <div className='flex w-full items-center gap-2'>
                    <Button
                      onClick={handleLocation}
                      variant={'ghost'}
                      className='p-0 m-0'
                    >
                      <LocateIcon className='w-8 h-8'></LocateIcon>
                    </Button>
                    {selector.location || location}
                  </div>
                </div>
                <div className='col-span-6'>
                  <label htmlFor=''>Email</label>
                  <div className=' p-0.5 rounded-full '>
                    <FormInput
                      name='name'
                      id='email'
                      type='text'
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    ></FormInput>
                  </div>

                  {formik.touched.email && formik.errors.email ? (
                    <Error>{formik.errors.email.toString()}</Error>
                  ) : null}
                </div>
              </div>
              <div className='BIO'>
                <label htmlFor=''>Bio</label>
                <div className=' p-0.5 rounded-2xl'>
                  <Textarea
                    style={{
                      resize: 'none',
                    }}
                    rows={2}
                    placeholder='Tell me about yourself'
                    name='bio'
                    id='bio'
                    onChange={formik.handleChange}
                    value={formik.values.bio}
                  ></Textarea>
                </div>
              </div>
            </div>
          </div>
          <div className=' flex  w-full justify-center items-center flex-col  my-5 gap-3'>
            <Button
              isLoading={loading}
              type='submit'
              disabled={loading}
              variant={'ghost'}
              className='bg-blackSwan text-white  w-3/4  flex justify-center rounded-full'
            >
              Save changes
            </Button>
            <div className=' w-3/4   bg-blackSwan text-white flex items-center rounded-full'>
              <LogoutButton></LogoutButton>
            </div>
          </div>
        </form>
      </div>
      <Toaster position='bottom-left' />
    </div>
  );
};

export default SettingsPage;
