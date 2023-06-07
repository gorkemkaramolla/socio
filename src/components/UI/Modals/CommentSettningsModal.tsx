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

import Button from '../Button';
import { Dropdown } from '@nextui-org/react';
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface MenuItem {
  key: string;
  name: string;
}

export default function CommentSettingsModal() {
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
        console.log(true);
      } else {
        // Reset placement
        dropdownRef.current.style.bottom = 'auto';
        console.log(false);
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
        console.log('outside');
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
            className='flex  items-center justify-center gap-3 '
            variant={'dropdown'}
          >
            <div> Report this comment</div>

            <FontAwesomeIcon onClick={handleDrop} icon={faExclamation} />
          </Button>

          <Button
            className='flex items-center justify-center gap-3 '
            variant={'dropdown'}
          >
            <div> Share this comment</div>
            <FontAwesomeIcon onClick={handleDrop} icon={faShare} />
          </Button>
          <Button
            className='flex items-center justify-center gap-3 '
            variant={'dropdown'}
          >
            <div>Save this comment</div>
            <FontAwesomeIcon onClick={handleDrop} icon={faSave} />
          </Button>
          <Button
            className='flex bg-red-500 items-center justify-center gap-3 '
            variant={'dropdown'}
          >
            <div> Delete this comment</div>

            <FontAwesomeIcon onClick={handleDrop} icon={faTrash} />
          </Button>
        </div>
      )}
    </div>
  );
}
