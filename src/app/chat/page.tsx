import Button from '@/components/UI/Button';
import { GetServerSideProps } from 'next';
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
