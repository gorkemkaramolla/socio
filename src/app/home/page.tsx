import { getImage } from '@/util/getImage';
import axios from 'axios';
import HomePage from '@/components/Home/Home';
interface Props {}

export default async function Home() {
  const posts = await axios.get('http://localhost:3000/post');
  const modifiedPosts = posts.data.posts.map((post: any) => ({
    ...post,
    user: {
      ...post.user,
      image: getImage(post.user.image),
    },
  }));

  return <HomePage posts={modifiedPosts} />;
}
