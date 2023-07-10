import Editor from '@/components/Editor/GuidePostPage';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Guide } from '@/lib/types/types';
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
interface Props {
  searchParams: {
    contentWithoutSanitize: string;
    titleWithoutSlug: string;
    title: string;
  };
}
import React from 'react';
const todos = async ({
  searchParams: { contentWithoutSanitize, titleWithoutSlug, title },
}: Props) => {
  const session = await getServerSession(authOptions);
  const editorPosts: Guide[] = await prisma.guides.findMany({});
  if (session?.user.id)
    return (
      <div className='overflow-y-scroll'>
        <Editor
          title={title}
          contentWithoutSanitize={contentWithoutSanitize}
          titleWithoutSlug={titleWithoutSlug}
          user_id={session.user.id}
          guides={editorPosts}
        ></Editor>
      </div>
    );
};

export default todos;
