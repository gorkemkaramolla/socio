'use client';
import React, { FC, useEffect, useState } from 'react';
import Button from '@/components/UI/Button';
import {
  faCommentDots,
  faEllipsis,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentEmojis from './ContentEmojis';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';
import Paragraph from './UI/Paragraph';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { PostWithUser, User } from '@/lib/types/types';
import FormInput from './UI/Input';
import CommentForm from './Comment/CommentForm';
import { formatDate } from '@/util/getDate';
import ProfileImage from './Profile/ProfileImage';
interface Props {
  post: PostWithUser;
  user?: User;
}

const ContentContainer: FC<Props> = ({ post, user }) => {
  console.log(post);
  const router = useRouter();

  const currentUser = useSelector((state: RootState) => state.user);
  // const [postState, setPostState] = useState<PostWithUsers>();
  const [liked, setLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [numberLikes, setNumberLikes] = useState<number>(
    post?.PostLike?.length!
  );
  const [focused, setFocused] = useState(false);
  const [bgColor, setBgColor] = useState<string>('bg-white dark:bg-blackSwan');
  useEffect(() => {}, []);
  useEffect(() => {
    setNumberLikes(post?.PostLike?.length!);

    const likeToDelete = post?.PostLike?.find((like) => {
      return (
        like.user_id === parseInt(currentUser?.id) && like.post_id === post.id
      );
    });

    if (likeToDelete && post.PostLike?.length! !== 0) setLiked(true);
    else setLiked(false);
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

  const handleSetLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    handleLikeClick(post.id);
  };
  const handleGoProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    router.push(`/${post?.user?.username || user?.username}`);
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

  return (
    <div
      className={` unBlured flex flex-col ${bgColor} h-fit min-h-[50px] my-4 shadow-2xl rounded-xl relative ease-out duration-300 max-h-fit`}
    >
      <div
        className={
          ' flex items-center justify-between header h-fit px-4 w-full p-2 border-b-[1px] border-b-lavender font-bold'
        }
      >
        <div
          onClick={handleGoProfile}
          className={
            'w-[40px] h-[40px] absolute  cursor-pointer -top-[0.5em] -left-[0.5em] rounded-full  bg-white"'
          }
        >
          <ProfileImage
            imageSrc={user?.image! || post.user?.image!}
            googleImage={user?.imageUri! || post.user?.image!}
          />
        </div>
        <div className={'ml-4 flex cursor-pointer items-center'}>
          <div
            onClick={handleGoProfile}
            className={'text-sm text-lavender mx-2.5 p-0 inline'}
          >
            @{post?.user?.username || user?.username}
          </div>
          <Paragraph
            className='text-sm'
            style={{
              fontWeight: 500,
            }}
          >
            {formatDate(post?.created_at?.toString()!)}
          </Paragraph>
        </div>
        <div className={'flex '}>
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
        <div
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
          className={'content break-words w-full text-[0.95rem]'}
        >
          {post?.content!}
        </div>
        <div className={'flex gap-5 items-center'}>
          <div
            className={`${
              liked ? 'text-red-500' : 'text-stone-300'
            } content pt-2 text-xs flex items-center cursor-pointer`}
          >
            <div
              className={`${
                liked ? 'scale-100 left-2' : 'scale-0 left-4'
              } w-5 h-5 bg-red-100 absolute z-0  bottom-3 rounded-full ease-out duration-300`}
            >
              <ProfileImage
                googleImage={currentUser.imageUri}
                imageSrc={currentUser.image!}
              />
            </div>
            <Button
              onClick={handleSetLike}
              variant={'ghost'}
              size={'smSquare'}
              className={' flex justify-center items-center z-10'}
            >
              <FontAwesomeIcon icon={faHeart} />
            </Button>
            <p className=''>{numberLikes?.toString()}</p>
          </div>

          <div
            className={
              'content pt-2 text-xs text-slate-500 flex items-center cursor-pointer'
            }
            onClick={handleCommentClick}
          >
            <Button
              variant={'ghost'}
              size={'smSquare'}
              className={'text-slate-500 flex justify-center  items-center'}
            >
              <FontAwesomeIcon icon={faCommentDots} />
            </Button>
            <Link
              className='font-bold'
              href={`/${post.user?.username || user?.username}/post/${post.id}`}
            >
              {post?.Comment?.length! > 0
                ? post?.Comment?.length! + ' comments'
                : ' comment'}
            </Link>
            {/* <div
              onClick={() => {
                setCommentOpen(!commentOpen);
              }}
            >
              Comment
            </div> */}
          </div>
        </div>
        <ContentEmojis setBgColor={setBgColor} />
      </div>
      {commentOpen && <CommentForm post_id={post.id} />}
    </div>
  );
};

export default ContentContainer;
