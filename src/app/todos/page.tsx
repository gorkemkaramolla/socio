import Editor from '@/components/Editor/GuidePostPage';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Guide } from '@/lib/types/types';
import { getServerSession } from 'next-auth';
import React from 'react';

interface Props {}

const todos = async () => {
  const session = await getServerSession(authOptions);
  const editorPosts: Guide[] = await prisma.guides.findMany({});
  console.log(editorPosts);
  if (session?.user.id)
    return (
      <div className='overflow-y-scroll'>
        <Editor user_id={session.user.id} guides={editorPosts}></Editor>
      </div>
    );
};

export default todos;
