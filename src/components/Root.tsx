import React, { FC, useEffect } from 'react';
import GorkemTypeWriter from '@/util/GorkemTypeWriter';
import Button from './UI/Button';
import Heading from './UI/Heading';
import Link from 'next/link';
import { redis } from '@/lib/db';
interface Props {}
const x = async () => {
  await redis.set('asd', 'asd');
};
const Root: FC<Props> = () => {
  useEffect(() => {
    x();
  }, []);

  return (
    <div className='container grid grid-cols-12 grid-rows-12 gap-5 mx-auto w-screen h-screen items-center'>
      <div className='col-span-6 '>
        <GorkemTypeWriter
          durationTime={2000}
          afterDelete={false}
          afterDeleteDuration={1000}
          infinite={false}
        >
          <Link href={'/'}>
            <Heading
              heading='h6'
              className='typewriter caret-thick'
              size={'biggest'}
            >
              SOCIO
            </Heading>
          </Link>
        </GorkemTypeWriter>
      </div>
      <div className='bg-blue-200 col-span-6 '></div>
    </div>
  );
};

export default Root;
