import React from 'react';

interface Props {}

const PostSkeleton: React.FC<Props> = () => {
  return (
    <div className=' p-3'>
      <div className='w-[100%]  unBlured bg-gray-200 dark:bg-blackSwan h-fit min-h-[50px] shadow-2xl rounded-xl relative ease-out duration-300 max-h-fit'>
        <div className='flex  items-center justify-between header h-fit px-4 w-full p-2 border-b-[1px] border-b-lavender font-bold'>
          <div className='w-[40px] h-[40px] absolute -top-[0.5em] -left-[0.5em] rounded-full bg-white dark:bg-black'></div>
          <div className='ml-4  flex items-center'>
            <div className='text-sm text-lavender mx-2.5 p-0 inline w-20 h-4 dark:bg-black bg-gray-300'></div>
            <div className='text-sm text-lavender mx-2.5 p-0 inline w-16 h-4 dark:bg-black bg-gray-300'></div>
          </div>
          <div className='flex'>
            <div className='text-stone-300 ease-out duration-300 w-8 h-8 dark:bg-black bg-gray-300'></div>
            <div className='text-slate-300 w-8 h-8 dark:bg-black bg-gray-300'></div>
            <div className='w-8 h-8 dark:bg-black bg-gray-300'></div>
          </div>
        </div>
        <div className='px-4 py-2 relative'>
          <div className='content break-words w-full '>
            <div className='w-full h-3 dark:bg-black bg-gray-300 mb-2'></div>
            <div className='w-full h-3 dark:bg-black bg-gray-300 mb-2'></div>
            <div className='w-3/4 h-3 dark:bg-black bg-gray-300'></div>
          </div>
          <div className='flex gap-5 items-center'>
            <div className='content pt-2 text-xs font-bold flex items-center cursor-pointer'>
              <div className='w-5 h-5 bg-red-100 dark:bg-black absolute z-0 bottom-3 rounded-full ease-out duration-300'></div>
              <div className='w-6 h-6 dark:bg-black bg-gray-300'></div>
              <p className=''></p>
            </div>
            <div className='content  pt-2 text-xs text-slate-500 font-bold flex items-center cursor-pointer'>
              <div className='w-36 h-6 dark:bg-black bg-gray-300'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
