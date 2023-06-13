'use client';
import {
  faEllipsis,
  faDeleteLeft,
  faTrash,
  faSave,
  faShareAltSquare,
  faShare,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@nextui-org/react';
import { Comment } from '@/lib/types/types';

import Button from '../Button';
import { Dropdown } from '@nextui-org/react';
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface MenuItem {
  key: string;
  name: string;
}
interface Props {
  deletePost: () => void;
  comment: Comment;
}

export default function CommentSettingsModal({ deletePost, comment }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  const handleDrop = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useLayoutEffect(() => {
    if (dropdownOpen && dropdownRef.current) {
      const { bottom } = dropdownRef.current.getBoundingClientRect();
      if (bottom > window.innerHeight) {
        dropdownRef.current.style.bottom = '180px';
      } else {
        // Reset placement
        dropdownRef.current.style.bottom = 'auto';
      }
    }
  }, [dropdownOpen]);
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !iconRef?.current?.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className='right-0 absolute flex flex-col cursor-pointer'>
      <div className='relative'>
        <FontAwesomeIcon
          ref={iconRef}
          className='right-0 absolute '
          onClick={handleDrop}
          icon={faEllipsis}
        />
      </div>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className='w-54  z-50 my-4 shadow-md rounded-lg bg-white shadow-black flex flex-col justify-center items-start'
        >
          <Button
            onClick={() => {
              setDropdownOpen(false);
              deletePost();
            }}
            className='flex bg-white dark:bg-night dark:hover:bg-blackSwan hover:bg-gray-200 transition-all rounded-md items-center w-full justify-center gap-3 '
            variant={'ghost'}
          >
            <div> Report this comment</div>

            <FontAwesomeIcon onClick={handleDrop} icon={faExclamation} />
          </Button>

          <Button
            onClick={deletePost}
            className='flex bg-white dark:bg-night dark:hover:bg-blackSwan hover:bg-gray-200 transition-all rounded-md items-center w-full justify-center gap-3 '
            variant={'ghost'}
          >
            <div> Share this comment</div>
            <FontAwesomeIcon onClick={handleDrop} icon={faShare} />
          </Button>
          <Button
            onClick={deletePost}
            className='flex bg-white dark:bg-night dark:hover:bg-blackSwan hover:bg-gray-200 transition-all rounded-md items-center w-full justify-center gap-3 '
            variant={'ghost'}
          >
            <div>Save this comment</div>
            <FontAwesomeIcon onClick={handleDrop} icon={faSave} />
          </Button>
          <Button
            onClick={() => {
              setDropdownOpen(false);
              deletePost();
            }}
            className='flex bg-white dark:bg-night dark:hover:bg-blackSwan hover:bg-gray-200 transition-all rounded-md items-center w-full justify-center gap-3 '
            variant={'ghost'}
          >
            Delete this post
            <FontAwesomeIcon onClick={handleDrop} icon={faTrash} />
          </Button>
        </div>
      )}
    </div>
  );
}
