'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Heading from '@/components/UI/Heading';
import ContentContainer from '@/components/contentContainer';
import Button from '@/components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faL, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Shortcuts from '@/components/Shortcuts';
import axios from 'axios';
import { Post } from '@prisma/client';

interface Props {
  params: {
    username: string;
  };
}

const Dashboard = ({ params }: Props) => {
  const currentUser = useSelector((state: RootState) => state.user);
  const [requestedUser, setRequestedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>();

  const getUser = async () => {
    setLoading(true);
    try {
      const user = await axios.get('/user', {
        params: { username: params.username },
      });

      setRequestedUser(user.data.user);
    } catch (e) {
      setRequestedUser(null);
    } finally {
      setLoading(false);
    }
  };

  const getPosts = async () => {
    setLoading(true);
    if (requestedUser) {
      const posts = await axios.get('/post', {
        params: { user_id: requestedUser.id },
      });

      setPosts(posts.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (params.username) getUser();
  }, []);

  useEffect(() => {
    if (requestedUser) getPosts();
  }, [requestedUser]);

  const [show, setShow] = useState(false);

  const userPage = requestedUser?.id === currentUser.id;
  if (loading) {
    return <div>loading</div>;
  }
  if (requestedUser)
    return (
      <div className='flex flex-col overflow-y-scroll items-center px-3.5'>
        {/* Header */}
        <div className='sticky top-0 w-full h-fit flex md:justify-center justify-between items-center bg-white/75 drop-shadow-xl dark:bg-black/75 backdrop-blur-sm z-40'>
          <Heading heading='h6' size='sm' className='m-4'>
            {params.username}
          </Heading>
          <Button
            className='sidebarIconButtons ease-out duration-200 text-xl text-black dark:text-white px-10 md:hidden'
            variant='ghost'
            size='smSquare'
            onClick={() => setShow(!show)}
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
            <div className='w-[120px] h-[120px] rounded-full bg-white absolute -bottom-12 left-6 border-4 border-grey dark:border-blackSwan'>
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
              <img
                className='rounded-full object-cover w-full h-full'
                src={requestedUser.imageUri || requestedUser.image!}
                alt=''
              />
            </div>
          </div>

          {/* Bio Section */}
          <div className='w-full h-[140px] flex justify-end'>
            <div className='w-3/12 flex flex-col justify-end items-center gap-2'>
              {userPage && (
                <div className='bg-white dark:bg-blackSwan rounded-full px-3 py-1 w-10/12 text-center shadow-md cursor-pointer'>
                  <span className='md:block xs:hidden'>Edit Profile</span>
                  <span className='md:hidden'>Edit</span>
                </div>
              )}
              {userPage && (
                <div className='bg-white dark:bg-blackSwan rounded-full px-3 py-1 w-10/12 text-center shadow-md cursor-pointer'>
                  Settings
                </div>
              )}
            </div>
            <div className='w-9/12 bg-white dark:bg-blackSwan shadow-md rounded-2xl p-5 flex flex-col justify-center'>
              <span className='text-md font-semibold'>
                {requestedUser?.bio || 'bio:-'}
              </span>
              <p> {requestedUser?.bio || 'bio:-'}</p>
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

          <div className='w-full md:p-3 p-6'>
            {posts?.map((post, i) => (
              <ContentContainer
                key={i}
                header={{
                  img: requestedUser?.image! || requestedUser?.imageUri!,
                  name: requestedUser?.name!,
                  username: requestedUser?.username!,
                }}
                content={post.content!}
              />
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
  else {
    return <div>404 not found</div>;
  }
};

export default Dashboard;
