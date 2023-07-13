import ProfilePage from '@/components/Profile/ProfilePage';
import { prisma } from '@/lib/prisma';
import { getImage } from '@/util/getImage';
import axios from 'axios';
import { Metadata, ResolvingMetadata } from 'next';
import guides from './guides/page';
import { Suspense } from 'react';

interface Props {
  params: {
    username: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent?: Metadata | undefined
// ): Promise<Metadata> {
//   try {
//     const id = params.username;

//     const user = await axios.get('http://localhost:3000/user', {
//       params: { username: params.username },
//     });

//     // Generate description and keywords based on user data
//     const description = `Profile of ${user.data.user.username} ${user.data.user.bio} `;
//     const keywords = [
//       'profile',
//       'user',
//       'username',
//       '',
//       user.data.user.username,
//     ];

//     return {
//       title: user.data.user.username + ' | ' + user.data.user.name,
//       description: description,
//       keywords: keywords,
//       // openGraph: {
//       //   images: [getImage(user.data.user.image)],
//       // },
//     };
//   } catch (e) {
//     return {
//       title: '',
//       description: '',
//       keywords: '', // openGraph: {
//       //   images: [getImage(user.data.user.image)],
//       // },
//     };
//   }
// }

export default async function Profile({ params }: Props) {
  try {
    if (params.username) {
      const user = await axios.get('http://localhost:3000/user', {
        params: { username: params.username },
      });

      const posts = await axios.get('http://localhost:3000/post', {
        params: { user_id: user.data.user.id },
      });
      const usersGuides = await axios
        .get('http://localhost:3000/create_guide', {
          params: { username: params.username },
        })
        .then((res) => res.data);
      return (
        <Suspense fallback={<div className='h-screen w-screen bg-white'></div>}>
          <ProfilePage
            guides={usersGuides}
            requestedUser={{
              ...user.data.user,
              image: getImage(user.data.user.image),
            }}
            posts={posts.data}
            username={params.username}
          />
        </Suspense>
      );
    }
  } catch (e) {
    return <div>404</div>;
  }
}
