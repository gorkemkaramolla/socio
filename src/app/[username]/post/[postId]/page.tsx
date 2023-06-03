export const revalidate = 5;
export const dynamic = 'force-dynamic';
import PostPage from '@/components/Post/PostPage';
import axios from 'axios';
import { getImage } from '@/util/getImage';
interface Props {
  params: {
    username: string;
    postId: number;
  };
}
export default async function PostSlug({
  params: { postId, username },
}: Props) {
  const response = await axios.get('http://localhost:3000/post', {
    params: {
      post_id: postId,
    },
  });
  const post = response.data.post;
  if (post) {
    post.user.image = getImage(post.user.image);
    post.Comment = post.Comment.map((comment: any) => {
      comment.user.image = getImage(comment.user.image);
      return comment;
    });
  }

  if (post) {
    return <PostPage post={post} />;
  }
}
