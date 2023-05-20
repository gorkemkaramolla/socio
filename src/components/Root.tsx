import React, { FC, useEffect } from 'react';

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
    <div className='container flex justify-center gap-3'>
      {/*<Heading*/}
      {/*    heading='h2'*/}
      {/*>*/}
      {/*  SOCIO*/}
      {/*</Heading>*/}
      {/*<div className=''>*/}
      {/*  <GorkemTypeWriter*/}
      {/*    durationTime={2000}*/}
      {/*    afterDelete={false}*/}
      {/*    afterDeleteDuration={1000}*/}
      {/*    infinite={false}*/}
      {/*  >*/}
      {/*    <div>*/}
      {/*      <Heading*/}
      {/*        heading='h6'*/}
      {/*        className='typewriter caret-thick'*/}
      {/*        size={'biggest'}*/}
      {/*      >*/}
      {/*        SOCIO*/}
      {/*      </Heading>*/}
      {/*    </div>*/}
      {/*  </GorkemTypeWriter>*/}
      {/*</div>*/}
    </div>
  );
};

export default Root;
