'use client';
import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import { Guide } from '@/lib/types/types';
import ReactDOMServer from 'react-dom/server';
import 'highlight.js/styles/github-dark.css';
import javascript from 'highlight.js/lib/languages/javascript';
import Balancer from 'react-wrap-balancer';

import { Maximize, Copy, Minimize } from 'lucide-react';
import ProfileImage from '../Profile/ProfileImage';
import { GuidePost } from '../Editor/GuidePostPage';
import { formatDate } from '@/util/getDate';
import Link from 'next/link';

interface Props {
  editorPost: Guide;
}

const GuideComponent: React.FC<Props> = ({ editorPost }) => {
  const [updatedContent, setUpdatedContent] = useState('');

  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.highlightAll();
  }, [updatedContent, editorPost.content]);

  useEffect(() => {
    const handleExpand = () => {
      const codeElements = document.querySelectorAll('code');
      codeElements.forEach((code) => code.classList.toggle('expanded'));
    };

    const handleCopy = (code: string) => {
      navigator.clipboard.writeText(code);
    };

    const attachEventListeners = () => {
      const expandButtons = document.querySelectorAll('.expand-button');
      expandButtons.forEach((expandButton) => {
        expandButton.addEventListener('click', handleExpand);
      });

      const copyButtons = document.querySelectorAll('.copy-button');
      copyButtons.forEach((copyButton) => {
        copyButton.addEventListener('click', () => {
          const code = copyButton.getAttribute('data-code');
          if (code) {
            handleCopy(code);
          }
        });
      });
    };

    attachEventListeners();

    return () => {
      const expandButtons = document.querySelectorAll('.expand-button');
      expandButtons.forEach((expandButton) => {
        expandButton.removeEventListener('click', handleExpand);
      });

      const copyButtons = document.querySelectorAll('.copy-button');
      copyButtons.forEach((copyButton) => {
        copyButton.removeEventListener('click', () => {
          const code = copyButton.getAttribute('data-code');
          if (code) {
            handleCopy(code);
          }
        });
      });
    };
  }, [updatedContent]);
  useEffect(() => {
    // Extract the code elements from editorPost.content
    const codeRegex = /<pre><code\b[^>]*>((?:.|\n)*?)<\/code><\/pre>/gs;
    const codeMatches = editorPost?.content?.match(codeRegex);
    const codes = codeMatches ? Array.from(codeMatches) : [];
    const expandButton = ReactDOMServer.renderToString(<Maximize />);
    const copyButton = ReactDOMServer.renderToString(<Copy />);
    const collapseButton = ReactDOMServer.renderToString(<Minimize />);

    let updatedContent = editorPost?.content!;
    codes.forEach((code) => {
      const updatedCode = code.replace(codeRegex, '$1');
      const expanded = code.includes('expanded');
      const renderExpandButton = `<div class="btn-code z-20  text-white  expand-button">${
        expanded ? collapseButton : expandButton
      }</div>`;

      const replacement = `
        <div class="flex-col flex ">
          <div class="w-full flex items-center bg-[#0d1117] p-[14px]">
                  
            ${renderExpandButton}
            <div class="btn-code z-20  text-white  copy-button" data-code="${updatedCode}">${copyButton}</div>
          </div>
          <code>${updatedCode}</code>
        </div>
      `;
      updatedContent = updatedContent.replaceAll(code, replacement);
    });

    setUpdatedContent(updatedContent);
  }, [editorPost]);

  return (
    <div className='flex flex-col'>
      <div className='mb-8'>
        <div className='w-full flex text-lg justify-between'>
          <div className='flex items-center gap-2'>
            <div className=' flex w-12 h-12  mb-2'>
              <ProfileImage
                imageSrc={editorPost?.user?.image!}
                googleImage={editorPost?.user?.imageUri!}
                rounded={false}
              />
            </div>
            <Link href={'/' + editorPost?.user?.username}>
              <span className='w-full'>{editorPost?.user?.name} - </span>
              <span className='w-full'>user: {editorPost?.user?.username}</span>
            </Link>
          </div>
          <div className='self-center'>
            {formatDate(editorPost.created_at?.toString())}
          </div>
        </div>
        <hr className='border-[1px] mt-2 w-full' />
      </div>

      <div>
        <Balancer className='block w-full'>
          <pre
            style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
            className='w-full parent-element'
            dangerouslySetInnerHTML={{ __html: updatedContent! }}
          ></pre>
        </Balancer>
      </div>
    </div>
  );
};

export default GuideComponent;
