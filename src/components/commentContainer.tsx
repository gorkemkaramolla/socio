import React, { FC } from 'react';
import { Comment } from '@/lib/types/types';
interface Props {
  comment: Comment;
}

import Button from './UI/Button';
import Dropdown from './UI/Modals/Dropdown';
import { useModal } from '@nextui-org/react';
import Paragraph from './UI/Paragraph';
import { formatDate } from '@/util/getDate';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const CommentContainer: FC<Props> = ({ comment }) => {
  const router = useRouter();
  const deletePost = async () => {
    try {
      const deleted = await axios.delete('http://localhost:3000/post/comment', {
        params: {
          id: comment.id,
          user_id: comment.user.id,
        },
      });
      if (deleted) toast.success('Successfully Deleted');
      router.refresh();
    } catch (e: any) {
      toast.error(e.response.data);
    }
  };
  return (
    <div className=' px-6 text-sm '>
      <div className='p-4  dark:bg-brown  bg-gray-50  rounded-lg'>
        <div className='flex relative  gap-3'>
          <Link href={`/${comment.user.username}`} className='flex gap-3'>
            <Image
              width={24}
              height={24}
              className='w-6 h-6 rounded-full   '
              src={comment.user.image || comment.user.imageUri}
              alt=''
            />
            <span>{comment.user.username}</span>
          </Link>
          <Paragraph className='absolute right-6'>
            {formatDate(comment.created_at?.toString())}
          </Paragraph>

          <Dropdown comment={comment!} buttonFunction={deletePost}></Dropdown>
        </div>

        <p style={{ wordBreak: 'break-word' }} className='break-words	 px-12'>
          {comment.content}
        </p>
      </div>
    </div>
  );
};

export default CommentContainer;
