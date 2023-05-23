'use client';
import React, { FC, useEffect, useState } from 'react';
import Button from '@/components/UI/Button';
import {
  faCommentDots,
  faEllipsis,
  faFaceKissWinkHeart,
  faHeart,
  faIcons,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentEmojis from '@/components/contentEmojis';
import HomeCommentContainer from '@/components/homeCommentContainer';
interface Props {
  header: {
    name: string;
    username: string;
  };
  content: string;
}

const ContentContainer: FC<Props> = ({ header, content }) => {
  const [liked, setLiked] = useState(false);
  const [focused, setFocused] = useState(false);
  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleOptionsClick = () => {};
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
      className={`unBlured flex flex-col bg-white dark:bg-gorkem h-fit min-h-[50px] my-4 shadow-2xl rounded-xl relative ease-out duration-300 max-h-fit`}
    >
      <div
        className={
          ' flex items-center justify-between header h-fit px-4 w-full p-2 border-b-[1px] border-b-red-500 font-bold'
        }
      >
        <div
          className={
            'w-[40px] h-[40px] absolute -top-2 -left-2 rounded-full border-2 border-gray'
          }
        >
          <img
            className={'rounded-full'}
            src='https://i.ibb.co/MV0c2sD/avatar6.jpg'
            alt=''
          />
        </div>
        <div className={'ml-6 flex items-center'}>
          <span>{header.name}</span>
          <span className={'text-sm text-red-400 mx-2.5'}>
            {header.username}
          </span>
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
            onClick={handleLikeClick}
          >
            <FontAwesomeIcon icon={faHeart} />
          </Button>
          <Button
            variant={'ghost'}
            size={'smSquare'}
            className={'text-slate-500'}
          >
            <FontAwesomeIcon icon={faCommentDots} />
          </Button>
          <div onClick={handleOptionsClick}>
            <Button
              variant={'ghost'}
              size={'smSquare'}
              className={'sidebarIconButtons text-slate-900'}
              disabled={true}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </Button>
          </div>
        </div>
      </div>
      <div className={'px-4 py-2 relative'}>
        <div className={'content w-fit text-[0.95rem] font-light'}>
          {content}
        </div>
        <div className={'flex gap-5 items-center'}>
          <div
            className={
              'content pt-2 text-xs text-red-500 font-bold flex items-center cursor-pointer'
            }
          >
            <div
              className={`${
                liked ? 'scale-100 left-2' : 'scale-0 left-4'
              } w-5 h-5 bg-red-100 absolute z-0  bottom-3 rounded-full ease-out duration-300`}
            >
              <img
                className={'rounded-full'}
                src='https://i.ibb.co/VxNv13V/avatar12.jpg'
                alt=''
              />
            </div>
            <Button
              variant={'ghost'}
              size={'smSquare'}
              className={'text-red-500 flex justify-center items-center z-10'}
            >
              <FontAwesomeIcon icon={faHeart} />
            </Button>
            3.653 likes
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
        <ContentEmojis />
      </div>
      <HomeCommentContainer focused={focused} />
    </div>
  );
};

export default ContentContainer;
