import React from 'react';
import Heading from '@/components/UI/Heading';
import Button from '@/components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import FormInput from '@/components/UI/Input';
import PostSkeleton from '@/components/Post/Skeleton/PostSkeleton';

const ProfilePage = () => {
  return (
    <div>
      <div className='flex flex-col overflow-y-scroll items-center px-3.5'>
        <div className='sticky top-0 w-full h-fit flex md:justify-center justify-between items-center bg-white/75 drop-shadow-xl dark:bg-black/75 backdrop-blur-sm z-40'>
          <Heading heading='h6' size='sm' className='m-4'>
            <div className='flex'>
              <div className='text-stone-300 ease-out duration-300 w-8 h-8 bg-gray-300'></div>
              <div className='text-slate-300 w-8 h-8 bg-gray-300'></div>
              <div className='w-8 h-8 bg-gray-300'></div>
            </div>
          </Heading>
          <Button
            className='sidebarIconButtons ease-out duration-200 text-xl text-black dark:text-white px-10 md:hidden'
            variant='ghost'
            size='smSquare'
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
        <div className='h-fit w-full flex flex-col items-center'>
          <div className='w-full h-[150px] bg-fuchsia-600 rounded-2xl my-3 relative'>
            <div className='overflow-hidden w-full h-[150px] rounded-2xl'>
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
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
              </div>
              <img
                className=''
                src='https://i.ibb.co/Ct8y2gk/wallpaper.jpg'
                alt=''
              />
            </div>
            {/* Profile Picture */}
            <div className='w-[120px] h-[120px] rounded-full bg-gray-200 dark:bg-black absolute -bottom-12 left-6 border-4 border-lavender'>
              {/* Image Overlay */}
              <div
                className='w-full h-full absolute opacity-0 hover:opacity-100 rounded-full'
                style={{
                  background:
                    'linear-gradient(90deg, rgba(0,0,0,0.13769257703081228) 0%, rgba(0,0,0,0.13769257703081228) 100%)',
                }}
              >
                <Button
                  className='sidebarIconButtons ease-out duration-200 text-xl text-grey absolute right-7 bottom-4'
                  variant='ghost'
                  size='smSquare'
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
              </div>
              {/* <img
                className='rounded-full object-cover w-full h-full'
                // src='/userdefault.png'
                // src={requestedUser.imageUri || requestedUser.image!}
                alt=''
              /> */}
            </div>
          </div>

          {/* Bio Section */}
          <div className='w-full h-[140px] flex justify-end'>
            <div className='w-3/12  flex flex-col justify-end items-center gap-2'>
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
              <div
                className='
                 bg-lavender
                text-white
                hover:bg-white
                hover:text-black
               transition-all duration-300
                rounded-full px-3 py-1 w-10/12 text-center shadow-md cursor-pointer'
              >
                Settings
              </div>
            </div>
            <div className='w-9/12 bg-gray-200 dark:bg-blackSwan shadow-md rounded-2xl px-5 flex flex-col justify-center'>
              <p className='text-md font-semibold'>
                <div className='flex'>
                  <div className='text-stone-300 ease-out duration-300 w-8 h-8 bg-gray-300 dark:bg-black'></div>
                  <div className='text-slate-300 w-8 h-8 bg-gray-300 dark:bg-black'></div>
                  <div className='w-60 h-8 bg-gray-300 dark:bg-black'></div>
                </div>
              </p>
              {/* {requestedUser.location} */}
              <div className='flex  flex-col '>
                <div className='text-stone-300 mb-[2px] ease-out duration-300 w-8 dark:bg-black bg-gray-300'></div>
                <div className='text-slate-300 w-24  bg-gray-300 dark:bg-black '></div>
                <div className='w-36 h-6 bg-gray-300 dark:bg-black'></div>
              </div>
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
          <form className='flex items-center justify-center gap-1'>
            <FormInput
              name='post'
              id='post'
              placeholder='Say something'
              variant={'default'}
            ></FormInput>

            <Button type='submit' variant={'ghost'}>
              post
            </Button>
          </form>
          {[1, 2, 3, 4, 5].map((post) => (
            <div className='w-full'>
              <PostSkeleton />
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default ProfilePage;
