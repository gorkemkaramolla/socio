export const revalidate = 5;
export const dynamic = 'force-dynamic';
import { getImage } from '@/util/getImage';
import axios from 'axios';
import HomePage from '@/components/Home/Home';
import { prisma } from '@/lib/prisma';
import { PostWithUser, User } from '@/lib/types/types';
import { Metadata } from 'next';
interface Props {}
export const metadata: Metadata = {
  title: 'Socio',
  description:
    'Socio: Stay connected, share your thoughts, and discuss on the ultimate social media platform for developers. Connect with like-minded individuals, explore trending topics, and stay up-to-date with the latest in the developer community. Join Socio today and experience a new level of social interaction for developers.',
  keywords:
    'Socio, Stay connected, Share your thoughts, Discuss, Social Media platform, Developers, Developer community, Social interaction, Trending topics, Like-minded individuals, Latest updates, Connect, Explore',
};
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
