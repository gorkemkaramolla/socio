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
  contentWithoutSanitize?: string;
  titleWithoutSlug?: string;
  title: string;
}
export interface GuidePost {
  title: string;
  content: string;
}

const GuidePostPage: React.FC<Props> = ({
  contentWithoutSanitize,
  titleWithoutSlug,
  guides,
  title,
  user_id,
}) => {
  const router = useRouter();
  const [draftLength, setDraftLength] = useState<number>(0);
  const [guidePost, setGuidePost] = useState<GuidePost>({
    content: '',
    title: '',
  });
  const [saved, setSaved] = useState<boolean>(false);
  const [sanitizedHTML, setSanitizedHTML] = useState('');

  const handleSave = (value: boolean) => {
    setSaved(value);
  };
  useEffect(() => {
    setSaved(true);
    hljs.registerLanguage('javascript', javascript);

    const draftObject = JSON.parse(localStorage.getItem('draftText')!);
    const guidePost: GuidePost = draftObject.guidePost;
    const textNumRows = guidePost.content?.split('\n').length!;
    setDraftLength(textNumRows);
    highlightCode({ title: guidePost.title, content: guidePost.content });
    setGuidePost(guidePost);
  }, []);

  const handleSend = async () => {
    if (!guidePost.title || !guidePost.content) {
      return;
    }
    if (!(contentWithoutSanitize && titleWithoutSlug)) {
      try {
        const response = await axios.post('/create_guide', {
          title: guidePost?.title,
          user_id: user_id,
          content: sanitizedHTML,
          contentWithoutSanitize: guidePost.content,
        });
        if (response) {
          highlightCodeBLOCK();
          router.refresh();
        }
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await axios.put('/create_guide', {
          title: title,
          user_id: user_id,
          content: sanitizedHTML,
          contentWithoutSanitize: guidePost.content,
        });
        if (response) {
          highlightCodeBLOCK();
          router.refresh();
        }
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    const embedRegex = /{embed ([^}]+)}/g;
    if (embedRegex && guidePost.content) {
      const updatedHTML = guidePost.content.replace(
        embedRegex,
        (match, extractedContent) => {
          const embeddedContent = embedSite(extractedContent);
          return embeddedContent || ''; // Ensure a valid string is returned
        }
      );
      highlightCode({ title: guidePost.title, content: updatedHTML });
    }
    highlightCodeBLOCK();
  }, [saved]);

  const handleContent = (guidePost: GuidePost) => {
    setSaved(false);
    setGuidePost(guidePost);

    highlightCode({ title: guidePost.title, content: guidePost.content });
    console.log(guidePost);
  };

  const highlightCode = (code: GuidePost) => {
    const htmlContent = marked(code?.content?.replace(/\n/g, '\n'));

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
        'ol',
        'ul',
        'blockquote',
        'li',
        'a',
      ],
      ALLOWED_ATTR: ['class', 'src', 'href'],
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
  }, [sanitizedHTML, guidePost?.content, saved]);

  useEffect(() => {
    highlightCodeBLOCK();
  }, []);
  return (
    <div className='w-screen h-screen scroll p-2 flex md:flex-row mx-auto flex-col gap-2  overflow-y-scroll'>
      <div className='w-full md:w-2/4'>
        <Editor
          contentWithoutSanitize={contentWithoutSanitize}
          titleWithoutSlug={titleWithoutSlug}
          handleSave={handleSave}
          guidePost={guidePost}
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

        <div className=' bg-grey max-h-[70vh]  px-4 output rounded-xl min-h-[70vh] overflow-y-scroll  scroll-bar  dark:bg-blackSwan'>
          {<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />}
        </div>
      </div>
    </div>
  );
};

export default GuidePostPage;
