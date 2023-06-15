export const revalidate = 5;
export const dynamic = 'force-dynamic';
import ProfilePage from '@/components/Profile/ProfilePage';
import { prisma } from '@/lib/prisma';
import { getImage } from '@/util/getImage';
import axios from 'axios';
import { Metadata, ResolvingMetadata } from 'next';
interface Props {
  params: {
    username: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}
export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const id = params.username;

  const user = await axios.get('http://localhost:3000/user', {
    params: { username: params.username },
  });

  // Generate description and keywords based on user data
  const description = `Profile of ${user.data.user.username} ${user.data.user.bio} `;
  const keywords = ['profile', 'user', 'username', '', user.data.user.username];

  return {
    title: user.data.user.username + ' | ' + user.data.user.name,
    description: description,
    keywords: keywords,
    // openGraph: {
    //   images: [getImage(user.data.user.image)],
    // },
  };
}

export default async function Profile({ params }: Props) {
  try {
    if (params.username) {
      const user = await axios.get('http://localhost:3000/user', {
        params: { username: params.username },
      });

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
    return <div>404</div>;
  }
}
