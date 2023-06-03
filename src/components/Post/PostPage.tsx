'use client';
import React, { FC, useEffect, useState } from 'react';
import Error from '../Error/Error';
import Button from '@/components/UI/Button';
import {
  faCommentDots,
  faEllipsis,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentEmojis from '@/components/contentEmojis';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';
import Paragraph from '../UI/Paragraph';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import FormInput from '../UI/Input';
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import { error } from 'console';
import { PostWithUsers, User } from '@/lib/types/types';
import { getImage } from '@/util/getImage';
interface Props {
  post: PostWithUsers;
  user?: User;
}

const PostPage: FC<Props> = ({ post, user }) => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
    });

    return formattedDate;
  };
  const currentUser = useSelector((state: RootState) => state.user);
  // const [postState, setPostState] = useState<PostWithUsers>();
  const [liked, setLiked] = useState(false);
  const [numberLikes, setNumberLikes] = useState<number>(
    post?.PostLike?.length!
  );
  const [focused, setFocused] = useState(false);
  const [bgColor, setBgColor] = useState<string>('bg-white dark:bg-blackSwan');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const likeToDelete = post?.PostLike?.find(
      (like) => like.user_id === parseInt(currentUser?.id)
    );
    if (likeToDelete) setLiked(true);
  }, [post, currentUser]);

  const handleLikeClick = async (post_id: number) => {
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

  const handlePostSent = async (
    user_id: number,
    content: string,
    title?: string
  ) => {
    try {
      setLoading(true);
      const post = await axios.post('/post', {
        title: '',
        content: content,
        user_id: user_id,
      });
      if (post) {
        toast.success('Successfully posted');
        // setPostProps([post.data as unknown as Post, ...postProps!]);
      }
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      toast.error(e.response.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    enableReinitialize: true,

    validate(values) {
      const errors: {
        comment?: string;
      } = {};
      if (!values.comment) {
        errors.comment = 'Post field can not be empty';
      }
      return errors;
    },
    onSubmit: (values) => {
      router.refresh();
      handleCommentSent(values.comment, currentUser.id, post?.id?.toString()!);
    },
  });
  const handleCommentSent = async (
    content: string,
    user_id: string,
    post_id: string
  ) => {
    try {
      const response = await axios.post('/post/comment', {
        content: content,
        user_id: user_id,
        post_id: post_id,
      });
      console.log(response.data);
      toast.success('Successfully sent');
    } catch (e: any) {
      toast.error(e.response.message);
    }
  };
  return (
    <div className={'w-full md:p-3 p-6'}>
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
              src={user?.image! || post?.user?.image!}
              alt=''
            />
          </Link>
          <div className={'ml-4 flex items-center'}>
            {/* <span>{user.name}</span> */}
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
        <div className={'px-4 py-2 relative'}>
          <div className={'content w-full text-[0.95rem]'}>
            {post?.content!}
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
            >
              {/* <Button
                variant={'ghost'}
                size={'smSquare'}
                className={'text-slate-500 flex justify-center items-center'}
              >
                <FontAwesomeIcon icon={faCommentDots} />
              </Button>
              <Link href={`/Post`}>50 comments</Link> */}
            </div>
          </div>
        </div>
        {/*<HomeCommentContainer focused={focused} />*/}
        {/* Comments */}
        <form
          onSubmit={formik.handleSubmit}
          className='flex p-4 gap-2 justify-center items-center my-6'
        >
          <FormInput
            id='comment'
            name='comment'
            onChange={formik.handleChange}
            value={formik.values.comment}
            placeholder='What do you think?'
            variant={'default'}
          ></FormInput>
          <Button type='submit'>Send</Button>
        </form>
        {formik.touched.comment && formik.errors.comment ? (
          <Error>{formik.errors.comment}</Error>
        ) : null}
        <div className='w-full flex flex-col gap-3 '>
          {post?.Comment?.map((comment) => (
            <div className='w-full  '>
              <img className={'w-4 h-4'} src={comment?.user?.image!} />
              <p>{comment.content}</p>
            </div>
          ))}
          <ContentEmojis setBgColor={setBgColor} />
        </div>
      </div>
      <Toaster position='bottom-left' />
    </div>
  );
};

export default PostPage;
