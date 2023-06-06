import React, { FC } from 'react';
import { Comment } from '@/lib/types/types';
interface Props {
  comment: Comment;
}

const CommentContainer: FC<Props> = ({ comment }) => {
  return (
    <div className=' px-6 py-1 '>
      <div className='p-4 bg-gray-200 rounded-lg'>
        <div className='flex  gap-3'>
          <img
            className='w-6 h-6 rounded-full   '
            src={comment.user.image || comment.user.imageUri}
            alt=''
          />
          <div>{comment.user.username}</div>
        </div>

        <p className='px-3 py-3'>{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentContainer;
