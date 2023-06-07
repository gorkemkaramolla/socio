import React, { FC } from 'react';
import { Comment } from '@/lib/types/types';
interface Props {
  comment: Comment;
}
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './UI/Button';
import CommentSettingsModal from './UI/Modals/CommentSettningsModal';
import { useModal } from '@nextui-org/react';
import Paragraph from './UI/Paragraph';
import { formatDate } from '@/util/getDate';
import Link from 'next/link';

const CommentContainer: FC<Props> = ({ comment }) => {
  return (
    <div className=' px-6 text-sm '>
      <div className='p-4  dark:bg-brown  bg-gray-50  rounded-lg'>
        <div className='flex relative  gap-3'>
          <Link href={`/${comment.user.username}`} className='flex gap-3'>
            <img
              className='w-6 h-6 rounded-full   '
              src={comment.user.image || comment.user.imageUri}
              alt=''
            />
            <span>{comment.user.username}</span>
          </Link>
          <Paragraph className='absolute right-6'>
            {formatDate(comment.created_at?.toString())}
          </Paragraph>

          <CommentSettingsModal></CommentSettingsModal>
        </div>

        <p style={{ wordBreak: 'break-word' }} className='break-words	 px-12'>
          {comment.content}
        </p>
      </div>
    </div>
  );
};

export default CommentContainer;
