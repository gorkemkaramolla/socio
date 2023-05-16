import Button from '@/components/Button';
import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import { FC } from 'react';
interface Props {}

const Chat: FC<Props> = () => {
  return (
    <div>
      <Button title='gozde'></Button>
    </div>
  );
};
export default Chat;
