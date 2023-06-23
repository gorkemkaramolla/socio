'use client';
import axios from 'axios';
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark.css';

import { useRouter } from 'next/navigation';
import { Guide } from '@/lib/types/types';
import FakeEditor from '../FakeEditor/FakeEditor';
import Editor from './Editor';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface Props {
  guides: Guide[];
  user_id: number;
}

const GuidePostPage: React.FC<Props> = ({ guides, user_id }) => {
  const oneAndTwo = '1 \n 2';
  console.log(oneAndTwo);
  hljs.registerLanguage('javascript', javascript);
  const router = useRouter();

  useEffect(() => {
    hljs.highlightAll();
    hljs.registerLanguage('javascript', javascript);
  }, []);

  const [content, setContent] = useState<string>('');
  const [contentModified, setContentModified] = useState<string>('');

  useEffect(() => {
    console.log(content);
  }, [content]);
  const handleSend = async () => {
    try {
      const response = await axios.post('/create_guide', {
        user_id: user_id,
        content: content,
      });
      if (response) router.refresh();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const handleContent = useCallback((s: string) => {
    setContent(s);
  }, []);
  return (
    <div className='w-screen h-screen flex md:flex-row flex-col gap-2  overflow-y-scroll'>
      <div className='w-full md:w-2/4'>
        <Editor content={content} handleContent={handleContent}></Editor>
        <button onClick={handleSend}>gönder</button>
      </div>
      <div
        style={{ whiteSpace: 'pre-wrap' }}
        className='w-full md:w-2/4 break-words	 '
      >
        <ReactMarkdown>{content}</ReactMarkdown>
        <div className='code'>
          {guides.map((post: Guide) => (
            <div className='code m-6 tex-sm'>
              <pre>
                <code>{post.content}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
      <div className='code m-6 tex-sm'></div>
      {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}

      {/* <div>
        {posts?.map((post: any, i: number) => (
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className='code'
            key={i}
            ref={i === 0 ? codeRef : undefined}
          ></div>
        ))}
      </div> */}
    </div>
  );
};

export default GuidePostPage;
