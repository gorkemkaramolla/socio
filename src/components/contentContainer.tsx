'use client';
import React, { FC, useEffect, useState } from 'react';
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
import Paragraph from './UI/Paragraph';
import axios from 'axios';
interface Props {
  post: PostWithUsers;
  user?: User;
}

const ContentContainer: FC<Props> = ({ post, user }) => {
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
    post?.PostLike?.length
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
  //
  useEffect(() => {}, [focused]);

  return (
    <div
      className={` unBlured flex flex-col ${bgColor} h-fit min-h-[50px] my-4 shadow-2xl rounded-xl relative ease-out duration-300 max-h-fit`}
    >
      <div
        className={
          ' flex items-center justify-between header h-fit px-4 w-full p-2 border-b-[1px] border-b-red-500 font-bold'
        }
      >
        <div
          className={
            'w-[40px] h-[40px] absolute -top-[0.5em] -left-[0.5em] rounded-full  bg-white"'
          }
        >
          <img
            className={'rounded-full w-[40px] object-cover h-[40px]'}
            src={user?.image! || post?.user?.image!}
            alt=''
          />
        </div>
        <div className={'ml-4 flex items-center'}>
          {/* <span>{user.name}</span> */}
          <Link
            href={`/${post?.user?.username || user?.username}`}
            className={'text-sm text-red-400 mx-2.5'}
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
        <div className={'content w-fit text-[0.95rem]'}>{post?.content!}</div>
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
                className={'bg-white rounded-full'}
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
            <Button
              variant={'ghost'}
              size={'smSquare'}
              className={'text-slate-500 flex justify-center items-center'}
            >
              <FontAwesomeIcon icon={faCommentDots} />
            </Button>
            50 comments
          </div>
        </div>
        <ContentEmojis setBgColor={setBgColor} />
      </div>
      {/*<HomeCommentContainer focused={focused} />*/}
    </div>
  );
};

export default ContentContainer;
