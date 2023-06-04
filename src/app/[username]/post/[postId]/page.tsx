export const revalidate = 5;
export const dynamic = 'force-dynamic';
import PostPage from '@/components/Post/PostPage';
import axios from 'axios';
import { getImage } from '@/util/getImage';
import { Comment } from '@/lib/types/types';
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
}
