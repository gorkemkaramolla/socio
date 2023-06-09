'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import ContentContainer from '@/components/ContentContainer';
import Heading from '@/components/UI/Heading';
import Button from '@/components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import Shortcuts from '@/components/Shortcuts';
import { Loader } from 'lucide-react';
import GorkemTypeWriter from '@/util/GorkemTypeWriter';
import { Fade } from 'react-awesome-reveal';
import { useRouter } from 'next/navigation';
import { PostWithUser } from '@/lib/types/types';
import { Toaster } from 'react-hot-toast';

interface Props {
  posts: PostWithUser[];
}

const HomePage: FC<Props> = ({ posts }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const currentUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    router.refresh();
  }, [router]);

  {
    return (
      <div
        className={
          'flex w-full overflow-x-hidden flex-col overflow-y-scroll items-center px-3.5'
        }
      >
        <div
          className={
            'sticky top-0 w-full h-fit flex md:justify-center justify-between items-center bg-white/75 drop-shadow-xl dark:bg-black/75 backdrop-blur-sm z-40'
          }
        >
          <Heading heading='h6' size={'md'} className={'m-4'}>
            NewsFeed
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
            } top-16 md:hidden absolute ease-out duration-300 `}
          >
            <Shortcuts />
          </div>
        </div>
        <div className={'w-full md:p-3 p-6'}>
          {posts.map((post, i) => (
            <ContentContainer key={i} post={post} />
          ))}
        </div>
        <Toaster position='bottom-left' />
      </div>
    );
  }
};

export default HomePage;
