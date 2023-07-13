import PostSkeleton from '@/components/Post/Skeleton/PostSkeleton';
import Heading from '@/components/UI/Heading';
import React from 'react';

const ContentContainerSkeleton = () => {
  return (
    <div className='w-full h-full px-3.5'>
      <div className='sticky top-0 w-full h-fit flex md:justify-center justify-between items-center bg-white/75 drop-shadow-xl dark:bg-black/75 backdrop-blur-sm z-40'>
        <Heading heading='h6' size={'md'} className={'m-4'}>
          NewsFeed
        </Heading>
      </div>

      {[1, 2, 3, 4, 5].map((post) => (
        <PostSkeleton key={post} />
      ))}
    </div>
  );
};

export default ContentContainerSkeleton;
