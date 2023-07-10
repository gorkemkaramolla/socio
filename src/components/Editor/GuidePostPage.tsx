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
import { toast } from 'react-hot-toast';

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
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('editor');
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
    if (!guidePost.content || !guidePost.title) {
      toast.error(
        !guidePost.content ? "Content can't be empty" : "Title can't be empty"
      );
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
          toast.success('Successfully created');
        }
      } catch (e: any) {
        toast.error(e.response.data.error);
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
          toast.success('Successfully created');
        }
      } catch (e: any) {
        toast.error(e.response.data.error);
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
  }, [output]);

  const handleContent = (guidePost: GuidePost) => {
    setSaved(false);
    setGuidePost(guidePost);

    highlightCode({ title: guidePost.title, content: guidePost.content });
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
        'img',
      ],
      ALLOWED_ATTR: ['class', 'src', 'href', 'alt'],
      ADD_ATTR: ['class', 'loading'],
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
    <div className='mt-8 w-screen h-[95dvh]  justify-center  p-2 flex flex-row mx-auto  gap-2  overflow-y-scroll'>
      {output === 'editor' && (
        <div className='w-full flex md:w-8/12  justify-center'>
          <div className='w-full'>
            <Button
              variant={'ghost'}
              onClick={() => {
                setOutput('output');
              }}
            >
              <Heading heading='h2'>Preview</Heading>
            </Button>
            <Editor
              contentWithoutSanitize={contentWithoutSanitize}
              titleWithoutSlug={titleWithoutSlug}
              handleSave={handleSave}
              guidePost={guidePost}
              handleContent={handleContent}
              draftLength={draftLength}
            />
            <Button disabled={loading} onClick={handleSend}>
              Submit
            </Button>
          </div>
        </div>
      )}

      {output === 'output' && (
        <div
          style={{ whiteSpace: 'pre-wrap' }}
          className=' md:w-8/12 break-words'
        >
          <div className='dark:bg-blackSwan h-[90vh]  py-1  px-4 output rounded-xl  overflow-y-scroll '>
            <Button
              variant={'ghost'}
              onClick={() => {
                setOutput('editor');
              }}
            >
              <Heading heading='h2'>Editor</Heading>
            </Button>
            <div className=' '>
              <Heading
                className='text-black font-extrabold mb-8'
                size={'xxl'}
                heading='h2'
              >
                {titleWithoutSlug || guidePost.title}
              </Heading>
            </div>
            {<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidePostPage;
