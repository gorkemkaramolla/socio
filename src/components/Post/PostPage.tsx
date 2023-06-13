'use client';
import React, { FC, useEffect, useState } from 'react';
import Button from '@/components/UI/Button';
import {
  faCommentDots,
  faEllipsis,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentEmojis from '@/components/ContentEmojis';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';
import Paragraph from '../UI/Paragraph';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { PostWithUser, User } from '@/lib/types/types';
import { Comment } from '@/lib/types/types';
import CommentForm from '../Comment/CommentForm';
import CommentContainer from '../CommentContainer';
import { formatDate } from '@/util/getDate';
import { getImage } from '@/util/getImage';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { error } from 'console';
interface Props {
  post: PostWithUser;
  user?: User;
  comments?: Comment[];
}
interface LoadError {
  message: string;
  error: boolean;
}

const PostPage: FC<Props> = ({ post, user, comments }) => {
  const [skipCount, setSkipCount] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<LoadError>({
    message: '',
    error: false,
  });
  const [loadedComments, setLoadedComments] = useState<Comment[]>();
  useEffect(() => {
    setLoadedComments(comments!);
    setSkipCount(5);
  }, [comments]);

  useEffect(() => {
    if (loadError.error) toast.error(loadError.message);
    setLoadError({ ...loadError, error: false });
  }, [loadError.error]);
  const currentUser = useSelector((state: RootState) => state.user);

  const [liked, setLiked] = useState(false);
  const [numberLikes, setNumberLikes] = useState<number>(
    post?.PostLike?.length!
  );
  const [focused, setFocused] = useState(false);
  const [bgColor, setBgColor] = useState<string>('bg-white dark:bg-blackSwan');

  useEffect(() => {
    const likeToDelete = post?.PostLike?.find(
      (like) => like.user_id === parseInt(currentUser?.id)
    );
    if (likeToDelete) setLiked(true);
  }, [post, currentUser]);

  const handleLikeClick = async (post_id: number) => {
    if (!loadError.error) {
      try {
        const response = await axios.post('/post/like', {
          user_id: currentUser.id,
          post_id: post_id,
        });

        if (response.data.liked) {
          setNumberLikes((prev) => prev + 1);
        } else {
          setNumberLikes((prev) => prev - 1);
        }
        setLiked(response.data.liked);
      } catch (error) {
        console.error('Error liking post', error);
      }
    } else {
      toast.error(loadError.message);
    }
  };

  const handleSetLike = () => {
    handleLikeClick(post.id);
  };
  const handleCommentClick = (e: any) => {
    if (!focused) {
      const unBluredContents = document.querySelectorAll('.unBlured');
      unBluredContents.forEach((x) => {
        x.classList.replace('unBlured', 'blured');
      });
      e.target.parentNode.parentNode.parentNode.classList.replace(
        'blured',
        'unBlured'
      );
    } else {
      const unBluredContents = document.querySelectorAll('.blured');
      unBluredContents.forEach((x) => {
        x.classList.replace('blured', 'unBlured');
      });
    }
    setFocused(!focused);
  };

  const loadMorePosts = async () => {
    setLoading(true);
    setSkipCount((prev) => prev + 5);
    try {
      if (!loadError.error) {
        const response = await axios
          .get('http://localhost:3000/post/comment', {
            params: {
              post_id: post.id,
              skip: skipCount,
            },
          })
          .then((res) => res.data);
        const commentsImaged: Comment[] = response.map((comment: any) => {
          const image = getImage(comment.user.image);
          return {
            ...comment,
            user: {
              ...comment.user,
              image: image,
            },
          };
        });
        if (response?.length === 0 && skipCount !== 5) {
          setLoadError({
            error: true,
            message: `${post?.user?.username} has no more posts.`,
          });
        }
        if (response.length !== 0) toast.success('Stalker');

        setLoadedComments((prevComments) => {
          if (Array.isArray(prevComments)) {
            return [...prevComments, ...commentsImaged];
          } else if (prevComments) {
            return [prevComments, ...commentsImaged];
          } else {
            return commentsImaged;
          }
        });
      } else {
        setLoading(false);
      }
    } catch (e: any) {
      setLoadError({
        message: e.response.message,
        error: true,
      });
      if (loadError.message) toast.error(loadError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={'w-full  overflow-y-scroll md:p-3 p-6'}>
      <div
        className={` unBlured flex flex-col ${bgColor} h-fit min-h-[50px] my-4 shadow-2xl rounded-xl relative ease-out duration-300 max-h-fit`}
      >
        <div
          className={
            ' flex items-center justify-between header h-fit px-4 w-full p-2 border-b-[1px] border-b-lavender font-bold'
          }
        >
          <Link
            href={`/${post?.user?.username || user?.username}`}
            className={
              'w-[40px] h-[40px] absolute -top-[0.5em] -left-[0.5em] rounded-full  bg-white"'
            }
          >
            <img
              className={
                'rounded-full border-2 border-lavender w-[40px] object-cover h-[40px]'
              }
              src={user?.image! || user?.imageUri || post?.user?.image!}
              alt=''
            />
          </Link>
          <div className={'ml-4 flex items-center'}>
            <Link
              href={`/${post?.user?.username || user?.username}`}
              className={'text-sm text-lavender mx-2.5'}
            >
              @{post?.user?.username || user?.username}
            </Link>
            <Paragraph>{formatDate(post?.created_at?.toString()!)}</Paragraph>
          </div>
          <div className={'flex'}>
            <Button
              variant={'ghost'}
              size={'smSquare'}
              className={
                liked
                  ? ' text-red-500 ease-out duration-300'
                  : 'heart text-stone-300 ease-out duration-300'
              }
              onClick={handleSetLike}
            >
              <FontAwesomeIcon icon={faHeart} />
            </Button>
            <Button
              variant={'ghost'}
              size={'smSquare'}
              className={'text-slate-300'}
            >
              <FontAwesomeIcon icon={faCommentDots} />
            </Button>
            <div>
              <Button
                variant={'ghost'}
                size={'smSquare'}
                className={'sidebarIconButtons text-slate-900 dark:text-white'}
                disabled={true}
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </Button>
            </div>
          </div>
        </div>
        <div className={'px-4  py-2 relative'}>
          <div
            style={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
            className={'content w-full text-[0.95rem]'}
          >
            {post?.content!}
            <hr className='mt-2' />
          </div>
          <div className={'flex gap-5 items-center'}>
            <div
              className={`${
                liked ? 'text-red-500' : 'text-stone-300'
              } content pt-2 text-xs font-bold flex items-center cursor-pointer`}
            >
              <div
                className={`${
                  liked ? 'scale-100 left-2' : 'scale-0 left-4'
                } w-5 h-5 bg-red-100 absolute z-0  bottom-3 rounded-full ease-out duration-300`}
              >
                <img
                  className={'bg-white w-full h-full rounded-full'}
                  src={
                    currentUser.imageUri ||
                    currentUser.image! ||
                    '/userdefault.png'
                  }
                  alt='/userdefault.png'
                />
              </div>
              <Button
                variant={'ghost'}
                size={'smSquare'}
                onClick={handleSetLike}
                className={' flex justify-center items-center z-10'}
              >
                <FontAwesomeIcon icon={faHeart} />
              </Button>
              <p className=''>{numberLikes?.toString()}</p>
            </div>

            <div
              className={
                'content pt-2 text-xs text-slate-500 font-bold flex items-center cursor-pointer'
              }
              onClick={handleCommentClick}
            ></div>
          </div>
        </div>
        <div className='w-fulloverflow-y-scroll flex flex-col gap-3 '>
          <CommentForm post_id={post.id}></CommentForm>

          {loadedComments?.map((comment: Comment, i: number) => (
            <CommentContainer key={i} comment={comment} />
          ))}
          {comments?.length! >= 5 &&
            (loading ? (
              <Loader className='animate-spin' />
            ) : (
              <p
                onClick={loadMorePosts}
                className='hover:underline cursor-pointer px-6'
              >
                Show more comments
              </p>
            ))}

          <ContentEmojis setBgColor={setBgColor} />
        </div>
      </div>
      <Toaster position='bottom-left' />
    </div>
  );
};

export default PostPage;
