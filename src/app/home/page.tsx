export const revalidate = 5;
export const dynamic = 'force-dynamic';
import { getImage } from '@/util/getImage';
import axios from 'axios';
import HomePage from '@/components/Home/Home';
import { prisma } from '@/lib/prisma';
import { PostWithUser, User } from '@/lib/types/types';
interface Props {}
export default async function Home() {
  const response = await axios.get('http://localhost:3000/post');
  const posts = response.data.posts;

  const postWithUserImage: PostWithUser[] = posts.map((post: any) => {
    const image = getImage(post.user.image);
    return {
      ...post,
      user: {
        ...post.user,
        image: image,
      },
    };
  });

  return <HomePage posts={postWithUserImage} />;
}
