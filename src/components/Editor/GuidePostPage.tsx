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
import { marked } from 'marked';
import Heading from '../UI/Heading';
import { useRouter } from 'next/navigation';
import { Guide } from '@/lib/types/types';
import FakeEditor from '../FakeEditor/FakeEditor';
import Editor from './Editor';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Button from '../UI/Button';

interface Props {
  guides: Guide[];
  user_id: number;
}

const GuidePostPage: React.FC<Props> = ({ guides, user_id }) => {
  const router = useRouter();
  const [draftLength, setDraftLength] = useState<number>(0);

  const [content, setContent] = useState<string>('');
  const [highlight, setHighlight] = useState<boolean>(false);
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.highlightAll();
  }, [content]);
  useEffect(() => {
    const draftText = localStorage.getItem('draftText');
    const textNumRows = draftText?.split('\n').length!;
    setDraftLength(textNumRows);
    if (draftText) setContent(draftText.toString());
  }, []);
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
        <Editor
          content={content}
          handleContent={handleContent}
          draftLength={draftLength}
        ></Editor>
        <Button onClick={handleSend}>Submit</Button>
      </div>
      <div
        style={{ whiteSpace: 'pre-wrap' }}
        className='w-full md:w-2/4 break-words	 '
      >
        <div className=''>
          <Heading heading='h2'>Preview</Heading>
        </div>
        <div
          className=' p-3 '
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        ></div>

        {/* <div className='code'>
          {guides.map((post: Guide, i) => (
            <div key={i} className='code m-6 tex-sm'>
              <pre>
                <code className='code'>{post.content}</code>
              </pre>
            </div>
          ))}
        </div> */}
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
