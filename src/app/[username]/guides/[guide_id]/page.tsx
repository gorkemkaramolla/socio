import Editor from '@/components/Editor/GuidePostPage';
import Heading from '@/components/UI/Heading';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Guide } from '@/lib/types/types';
import axios from 'axios';
import hljs from 'highlight.js';
import { getServerSession } from 'next-auth';
import { title } from 'process';
import React from 'react';

import { Suspense } from 'react';
import BasicLoader from '@/components/Loader/BasicLoader';
import GuideComponent from '@/components/Guide/Guide';

interface Props {
  params: {
    guide_id: string;
    username: string;
  };
}

const todos = async ({ params: { guide_id, username } }: Props) => {
  const session = await getServerSession(authOptions);
  try {
    const editorPost: Guide = await axios
      .get('http://localhost:3000/create_guide', {
        params: {
          title: guide_id,
          username: username,
        },
      })
      .then((res) => res.data.guide);
    console.log(editorPost);
    return (
      <div className=' flex-col w-screen  flex '>
        <div className='w-full p-3 mt-16'>
          <Heading size={'md'} heading='h1'>
            {editorPost.titleWithoutSlug}
          </Heading>
          <Suspense fallback={<BasicLoader />}>
            <GuideComponent editorPost={editorPost} />
          </Suspense>
        </div>
      </div>
    );
  } catch (e) {
    return <div>404</div>;
  }
};

export default todos;
