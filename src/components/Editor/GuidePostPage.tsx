'use client';
import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import DOMPurify from 'dompurify';
import ReactMarkdown from 'react-markdown';
import Button from '../UI/Button';
import Editor from './Editor';
import Heading from '../UI/Heading';
import { Guide } from '@/lib/types/types';
import { useRouter } from 'next/navigation';
import { Interweave } from 'interweave';
import { Markup } from 'interweave';
import 'highlight.js/styles/github-dark.css';

import axios from 'axios';
import { marked } from 'marked';
import { embedSite } from '@/util/embed';

interface Props {
  guides: Guide[];
  user_id: number;
}

const GuidePostPage: React.FC<Props> = ({ guides, user_id }) => {
  const router = useRouter();
  const [draftLength, setDraftLength] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);
  const [sanitizedHTML, setSanitizedHTML] = useState('');

  const handleSave = (value: boolean) => {
    setSaved(value);
  };
  useEffect(() => {
    setSaved(true);
    hljs.registerLanguage('javascript', javascript);

    const draftText = localStorage.getItem('draftText');
    const textNumRows = draftText?.split('\n').length!;
    setDraftLength(textNumRows);
    if (draftText) {
      highlightCode(draftText.toString());
      setContent(draftText);
    }
  }, []);

  const handleSend = async () => {
    try {
      const response = await axios.post('/create_guide', {
        user_id: user_id,
        content: sanitizedHTML,
      });
      if (response) {
        highlightCodeBLOCK();
        router.refresh();
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleContent = (s: string) => {
    setSaved(false);
    setContent(s);
    highlightCode(s);
  };

  useEffect(() => {
    const embedRegex = /{embed ([^}]+)}/g;
    if (embedRegex && sanitizedHTML) {
      const updatedHTML = sanitizedHTML.replace(
        embedRegex,
        (match, extractedContent) => {
          const embeddedContent = embedSite(extractedContent);
          return embeddedContent || ''; // Ensure a valid string is returned
        }
      );
      highlightCode(updatedHTML);
    }
  }, [saved]);

  const highlightCode = (code: string) => {
    const htmlContent = marked(code.replace(/\n/g, '\n'));

    const sanitizedContent = DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: [
        'iframe',
        'pre',
        'code',
        'div',
        'p',
        'h1',
        'strong',
        'em',
        'i',
        'b',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'br',
      ],
      ALLOWED_ATTR: ['class', 'src'],
      ADD_ATTR: ['class'],
      ALLOW_DATA_ATTR: false,
      ADD_TAGS: ['div'],
      ALLOWED_URI_REGEXP: /^(https?:\/\/|\/[^/])/,
    });

    setSanitizedHTML(sanitizedContent);

    hljs.highlightAll();
  };
  const highlightCodeBLOCK = () => {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((codeBlock) => {
      hljs.highlightBlock(codeBlock as HTMLElement);
    });
  };

  useEffect(() => {
    highlightCodeBLOCK();
  }, [sanitizedHTML, content, saved]);

  useEffect(() => {
    highlightCodeBLOCK();
  }, []);
  return (
    <div className='w-screen h-screen scroll flex md:flex-row mx-auto flex-col gap-2  overflow-y-scroll'>
      <div className='w-full md:w-2/4'>
        <Editor
          handleSave={handleSave}
          content={content}
          handleContent={handleContent}
          draftLength={draftLength}
        />
        <Button onClick={handleSend}>Submit</Button>
      </div>
      <div
        style={{ whiteSpace: 'pre-wrap' }}
        className='w-full md:w-2/4 break-words'
      >
        <div className='h-16 mt-1 flex items-center justify-center'>
          <Heading heading='h2'>Preview</Heading>
        </div>

        <div className='px-3 bg-grey max-h-[60vh] min-h-[60vh] overflow-y-scroll overflow-x-scroll scroll-bar  dark:bg-blackSwan'>
          {<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />}
          {/* {guides.map((guides) => (
            <div dangerouslySetInnerHTML={{ __html: guides.content! }}></div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default GuidePostPage;
