export const revalidate = 5;
export const dynamic = 'force-dynamic';
import PostPage from '@/components/Post/PostPage';
import axios from 'axios';
import { getImage } from '@/util/getImage';
import { Comment } from '@/lib/types/types';
import { Metadata, ResolvingMetadata } from 'next';
interface Props {
  params: {
    username: string;
    postId: number;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}
export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const response = await axios.get('http://localhost:3000/post', {
    params: { post_id: params.postId, username: params.username },
  });
  console.log(response.data);
  const post = response.data.post;
  if (post) {
    const userResponse = await axios.get('http://localhost:3000/user', {
      params: { username: params.username },
    });
    const user = userResponse.data.user;

    const keywords = ['post', 'user', 'username', user.username, post.title];

    const description = `Post by ${user.username}: ${post.content}`;

    return {
      title: post.content.slice(0, 20) + ' | ' + user.name,
      description: description,
      keywords: keywords,
      // openGraph: {
      //   images: [getImage(user.image)],
      // },
    };
  } else
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
      keywords: [],
    };
}
export default async function PostSlug({
  params: { postId, username },
}: Props) {
  try {
    const response = await axios.get('http://localhost:3000/post', {
      params: {
        post_id: postId,
        username: username,
      },
    });
    const post = response.data.post;
    if (post) {
      post.user.image = getImage(post.user.image);
      const comments = await axios
        .get('http://localhost:3000/post/comment', {
          params: { post_id: post.id },
        })
        .then((res) => res.data);
      const commentsImaged: Comment[] = comments.map((comment: any) => {
        const image = getImage(comment.user.image);
        return {
          ...comment,
          user: {
            ...comment.user,
            image: image,
          },
        };
      });
      // post.Comment = post.Comment.map((comment: any) => {
      //   comment.user.image = getImage(comment.user.image);
      //   return comment;
      // });
      return <PostPage post={post} comments={commentsImaged} />;
    }
  } catch (e) {
    return <div>404</div>;
  }
}
