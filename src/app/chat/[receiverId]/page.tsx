import ChatPage from '@/components/Chat/Chat';
import { User } from '@/lib/types/types';
import { getImage } from '@/util/getImage';
import axios from 'axios';

interface Props {
  params: {
    receiverId: number;
  };
}
export default async function Chat({ params: { receiverId } }: Props) {
  const response = await axios
    .get('http://localhost:3000/user', {
      params: {
        id: receiverId,
      },
    })
    .then((res) => res.data.user);
  response.image = getImage(response.image);

  const receiverUser: User = response;
  return <ChatPage receiverUser={receiverUser} receiverId={receiverId} />;
}
