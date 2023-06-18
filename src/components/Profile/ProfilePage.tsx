'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import Heading from '@/components/UI/Heading';
import ContentContainer from '@/components/ContentContainer';
import Button from '@/components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faPaperPlane,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { PostWithUser } from '@/lib/types/types';
import FormInput from '@/components/UI/Input';
import { useFormik } from 'formik';
import Error from '../Error/Error';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types/types';
import ProfileImage from './ProfileImage';
import Shortcuts from '../Shortcuts';
import { base64StringToBlob } from '@/util/base64StringtoBlob';
import { setUser } from '@/lib/redux/userSlice';
import { getImage } from '@/util/getImage';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  username: string;
  posts: PostWithUser[];
  requestedUser: User;
}

const ProfilePage = ({ username, requestedUser, posts }: Props) => {
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState<Blob | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostSent = async (
    user_id: number,
    content: string,
    title?: string
  ) => {
    try {
      setLoading(true);
      const post = await axios.post('/post', {
        title: '',
        content: content,
        user_id: user_id,
      });
      if (post) {
        toast.success('Successfully posted');
        // setPostProps([post.data as unknown as Post, ...postProps!]);

        formik.values.post = '';
      }

      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      toast.error(e.response.data);
    }
  };
  const formik = useFormik({
    initialValues: {
      post: '',
    },
    enableReinitialize: true,

    validate(values) {
      const errors: {
        post?: string;
      } = {};
      if (!values.post) {
        errors.post = 'Post field can not be empty';
      }
      return errors;
    },
    onSubmit: (values) => {
      handlePostSent(Number(currentUser.id), values.post, '');
      router.refresh();
    },
  });

  const currentUser = useSelector((state: RootState) => state.user);
  const mode = useSelector((state: RootState) => state.mode);

  const [show, setShow] = useState(false);

  const userPage = requestedUser?.id === currentUser.id;

  const changeProfilePicture = async (file: Blob) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', requestedUser.id);
    console.log('worked');

    try {
      const updatedUser = await axios.put('/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Add this header
        },
      });
      console.log(updatedUser);

      if (updatedUser) {
        dispatch(setUser(updatedUser.data.user));
        setLoading(false);
        toast.success('success');
      }
    } catch (e: any) {
      toast.error(e.response.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setImageSrc(currentUser.image!);
  }, [currentUser.image]);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const imgBlob = base64StringToBlob(base64String, file.type);
        changeProfilePicture(imgBlob!);
        userPage && setImageSrc(base64String);

        setImageFile(imgBlob);
      };
      reader.readAsDataURL(file);
    }
  };

  if (requestedUser)
    return (
      <div className='flex flex-col overflow-x-hidden overflow-y-scroll items-center px-3.5'>
        {/* Header */}
        <div className='sticky top-0 w-full h-fit flex md:justify-center justify-between items-center bg-white/75 drop-shadow-xl dark:bg-black/75 backdrop-blur-sm z-20'>
          <Heading heading='h6' size='sm' className='m-4'>
            {username}
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
          <div
            className={`${
              show ? '-right-4 ' : '-right-48'
            } top-16 md:hidden absolute ease-out duration-300  `}
          >
            <Shortcuts />
          </div>
        </div>

        <div className='h-fit w-full flex flex-col items-center'>
          <div className='w-full h-[150px] bg-fuchsia-600 rounded-2xl my-3 relative'>
            <div className=' overflow-hidden w-full h-[150px] rounded-2xl'>
              {userPage && (
                <div
                  className='w-full h-full absolute opacity-0 hover:opacity-100 rounded-2xl'
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(0,0,0,0.13769257703081228) 0%, rgba(0,0,0,0.13769257703081228) 100%)',
                  }}
                >
                  <Button
                    className='sidebarIconButtons ease-out duration-200 text-xl text-grey absolute right-5 bottom-2'
                    variant='ghost'
                    size='smSquare'
                  >
                    <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                  </Button>
                </div>
              )}
              <img
                className=''
                src='https://i.ibb.co/Ct8y2gk/wallpaper.jpg'
                alt=''
              />
            </div>
            {/* Profile Picture */}
            <div className='w-[120px] h-[120px] rounded-full bg-white absolute -bottom-12 left-6 border-4 border-lavender'>
              {/* Image Overlay */}
              {userPage && (
                <div
                  className='w-full h-full  absolute opacity-0 hover:opacity-100 rounded-full'
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(0,0,0,0.13769257703081228) 0%, rgba(0,0,0,0.13769257703081228) 100%)',
                  }}
                >
                  <Button
                    className='sidebarIconButtons ease-out duration-200 text-xl text-grey absolute right-3 bottom-3'
                    variant='ghost'
                    size='smSquare'
                  >
                    <label
                      htmlFor='image-upload'
                      className='w-full p-0 m-0 rounded-md cursor-pointer items-center flex justify-center '
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </label>
                    <input
                      type='file'
                      id='image-upload'
                      className='hidden p-0 m-0 '
                      accept='image/jpeg, image/png'
                      onChange={handleFileUpload}
                    />
                  </Button>
                </div>
              )}

              <ProfileImage
                imageSrc={imageSrc || requestedUser.image!}
                googleImage={requestedUser.imageUri}
                alt={requestedUser.username}
              />
            </div>
          </div>

          {/* Bio Section */}
          <div className='w-full h-[140px] mt-6 flex gap-3  justify-end'>
            <div className='w-3/12 flex flex-col justify-end items-center gap-2'>
              {userPage && (
                <div
                  className='
                bg-lavender
                text-white
                hover:bg-white
                hover:text-black
               transition-all duration-300
                rounded-full px-3 py-1 w-10/12 text-center shadow-md cursor-pointer'
                >
                  <span className='md:block xs:hidden'>Edit Profile</span>
                  <span className='md:hidden'>Edit</span>
                </div>
              )}
              {userPage && (
                <div
                  className='
                 bg-lavender
                text-white
                hover:bg-white
                hover:text-black
               transition-all duration-300
                rounded-full  py-1 w-10/12 text-center shadow-md cursor-pointer'
                >
                  Settings
                </div>
              )}
            </div>
            <div className='w-9/12 bg-white dark:bg-blackSwan shadow-md rounded-2xl p-5 flex flex-col justify-center'>
              <p className='flex gap-3'>
                <svg
                  className='mr-2'
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  viewBox='0 -960 960 960'
                  width='24'
                  fill={mode.mode === '' ? `black` : 'white'}
                >
                  <path d='M480-159q133-121 196.5-219.5T740-552q0-117.79-75.292-192.895Q589.417-820 480-820t-184.708 75.105Q220-669.79 220-552q0 75 65 173.5T480-159Zm0 79Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80ZM370-440h60v-120h100v120h60v-185l-110-73-110 73v185Zm110-112Z' />
                </svg>
                {requestedUser.location}
              </p>
              <p className='text-md font-semibold p-1 break-all'>
                {requestedUser?.bio || 'bio:-'}
              </p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className='flex w-full justify-evenly -mb-5'>
            <Heading
              heading='h6'
              size='xs'
              className='m-4 bg-white dark:bg-blackSwan shadow-2xl rounded-full px-6 py-1'
            >
              Posts
            </Heading>
            <Heading heading='h6' size='xs' className='m-4 px-6 py-1'>
              Replies
            </Heading>
            <Heading heading='h6' size='xs' className='m-4 px-6 py-1'>
              Likes
            </Heading>
          </div>

          {userPage && (
            <form
              className='flex w-full h-full justify-center px-6 gap-3 dark:text-white   items-center'
              onSubmit={formik.handleSubmit}
            >
              <TextareaAutosize
                id='post'
                name='post'
                placeholder='What do you think ? '
                className='bg-transparent w-full py-2 rounded-md resize-none'
                value={formik.values.post}
                onChange={formik.handleChange}
              />
              <Button
                variant={'default'}
                className=''
                isLoading={loading}
                disabled={loading}
                type='submit'
              >
                <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
              </Button>
            </form>
          )}
          {formik.touched.post && formik.errors.post ? (
            <Error>{formik.errors.post}</Error>
          ) : null}
          <div className='w-full md:p-3 p-6'>
            {posts?.map((post, i) => (
              <ContentContainer key={i} post={post!} user={requestedUser} />
            ))}
          </div>
          {/* {postLoading && <Loader className='h-4 w-4 animate-spin' />} */}
        </div>

        <div className='w-full flex justify-center items-center'>
          <Button
            className='px-20 py-2 mt-2 font-medium bg-gray-200 dark:bg-blackSwan/50 rounded-full focus:outline-none'
            variant='google'
            size='sm'
          >
            Load More
          </Button>
        </div>
        <Toaster position='bottom-left' />
      </div>
    );
  else {
    return <div>404 not found</div>;
  }
};

export default ProfilePage;
