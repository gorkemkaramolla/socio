'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import SideNavbar from './SideBar/SideNavbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Button from './UI/Button';
import { useDispatch } from 'react-redux';
import { setTheme } from '@/lib/redux/darkMode';
import { SessionProvider, getSession, useSession } from 'next-auth/react';
import { setUser } from '@/lib/redux/userSlice';
import { Poppins } from '@next/font/google';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Head from 'next/head';
import Search from './Search/Search';
import { getImage } from '@/util/getImage';
import ConnectionsContainer from '@/components/connectionsContainer';
import Heading from '@/components/UI/Heading';
import RightBar from '@/components/rightBar';
import BasicLoader from './Loader/BasicLoader';
const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});
interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const getUser = async () => {
    try {
      setLoading(true);

      const session = await getSession();
      if (session) {
        const currentUser = await axios.get('/user', {
          params: {
            id: session?.user.id,
          },
        });

        if (currentUser && currentUser.data.user) {
          const newData = currentUser.data.user;

          // Check if the data has changed
          // if (JSON.stringify(newData) !== cachedUserData) {
          // localStorage.setItem('userData', JSON.stringify(newData));
          const imgSrc = getImage(newData.image);
          dispatch(setUser({ ...newData, image: imgSrc }));
          // }
        } else {
          dispatch(setUser(null));
        }
      }
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const currentUser = useSelector((state: RootState) => state.user);
  useEffect(() => {
    getUser();
  }, []);

  const mode = useSelector((state: RootState) => state.mode);
  useEffect(() => {}, [mode.mode]);

  const dispatch = useDispatch();
  useEffect(() => {
    const storage = localStorage.getItem('mode');
    dispatch(setTheme(storage!));
  }, []);

  const handleModeChange = (theme: string) => {
    dispatch(setTheme(theme));
  };
  useEffect(() => {
    // setLoading(true);
    localStorage.setItem('mode', mode.mode!);
    // setLoading(false);
  }, [mode.mode]);

  return (
    <SessionProvider>
      <html lang='en' className={`${mode.mode} ${poppins.className}`}>
        <Head>
          <link rel='icon' href='/favicon.ico' sizes='96x96' />
        </Head>
        <body className=' text-lg leading-8 text-black dark:text-white '>
          <div className='w-screen  relative h-[100dvh] dark:bg-black overflow-x-hidden'>
            <div className='flex h-full'>{children}</div>
            <Button
              variant={'ghost'}
              className='absolute bottom-0 right-0 '
              onClick={() => {
                mode.mode === 'dark'
                  ? handleModeChange('')
                  : handleModeChange('dark');
              }}
            >
              {mode.mode === 'dark' ? (
                <svg
                  fill={'white'}
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  viewBox='0 -960 960 960'
                  width='24'
                >
                  <path d='M479.765-340Q538-340 579-380.765q41-40.764 41-99Q620-538 579.235-579q-40.764-41-99-41Q422-620 381-579.235q-41 40.764-41 99Q340-422 380.765-381q40.764 41 99 41Zm.235 60q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM70-450q-12.75 0-21.375-8.675Q40-467.351 40-480.175 40-493 48.625-501.5T70-510h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T170-450H70Zm720 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T790-510h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890-450H790ZM479.825-760Q467-760 458.5-768.625T450-790v-100q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-890v100q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Zm0 720Q467-40 458.5-48.625T450-70v-100q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-170v100q0 12.75-8.675 21.375Q492.649-40 479.825-40ZM240-678l-57-56q-9-9-8.629-21.603.37-12.604 8.526-21.5 8.896-8.897 21.5-8.897Q217-786 226-777l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494 495-56-57q-8-9-8-21.375T678.5-282q8.5-9 20.5-9t21 9l57 56q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q743-174 734-183Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.603-8.629 12.604.37 21.5 8.526 8.897 8.896 8.897 21.5Q786-743 777-734l-57 56q-8 8-20.364 8-12.363 0-21.636-8ZM182.897-182.897q-8.897-8.896-8.897-21.5Q174-217 183-226l57-56q8.8-9 20.9-9 12.1 0 20.709 9Q291-273 291-261t-9 21l-56 57q-9 9-21.603 8.629-12.604-.37-21.5-8.526ZM480-480Z' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  viewBox='0 -960 960 960'
                  width='24'
                >
                  <path d='M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480-120Zm0-60q109 0 190-67.5T771-406q-25 11-53.667 16.5Q688.667-384 660-384q-114.689 0-195.345-80.655Q384-545.311 384-660q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180-480q0 125 87.5 212.5T480-180Zm-4-297Z' />
                </svg>
              )}
            </Button>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
};

export default Providers;
