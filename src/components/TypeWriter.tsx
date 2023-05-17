import React, { useEffect } from 'react';
import { typeWriter } from '@/util/typewriter';
interface Props {}

const TypeWriter: React.FC<Props> = () => {
  useEffect(() => {
    typeWriter('all', 2000, false, 1000);
  }, []);
  return (
    <div className='text_content container mx-auto mt-96  items-center'>
      <h2
        id='hello'
        className='typewriter caret text-indigo-700 text-5xl leading-2 '
      >
        Welcome to Socio, the next-generation social media app designed to
        connect and empower users worldwide.
      </h2>
    </div>
  );
};

export default TypeWriter;
