import ProfilePage from '@/components/Profile/ProfilePage';
import { getImage } from '@/util/getImage';
import axios from 'axios';

interface Props {
  params: {
    username: string;
  };
}

export default async function Profile({ params }: Props) {
  try {
    if (params.username) {
      const user = await axios.get('http://localhost:3000/user', {
        params: { username: params.username },
      });
      console.log(user);
      const posts = await axios.get('http://localhost:3000/post', {
        params: { user_id: user.data.user.id },
      });
      return (
        <ProfilePage
          requestedUser={{
            ...user.data.user,
            image: getImage(user.data.user.image),
          }}
          posts={posts.data}
          username={params.username}
        />
      );
    }
  } catch (e) {
    return <div>404 NOT FOUND</div>;
  }
}
