'use client';
import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark.css';
import { Guide } from '@/lib/types/types';
import ReactDOMServer from 'react-dom/server';

import { Maximize, Copy } from 'lucide-react';

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

    let updatedContent = editorPost?.content!;
    codes.forEach((code) => {
      const updatedCode = code.replace(codeRegex, '$1');
      const replacement = `
        <div class="flex-col flex ">
          <div class="w-full flex items-end">
            <div class="btn-code expand-button">${expandButton}</div>
            <div class="btn-code copy-button" data-code="${updatedCode}">${copyButton}</div>
          </div>
          <code>${updatedCode}</code>
        </div>
      `;
      updatedContent = updatedContent.replaceAll(code, replacement);
    });

    setUpdatedContent(updatedContent);
  }, [editorPost]);

  return (
    <pre
      style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
      className='w-full parent-element'
      dangerouslySetInnerHTML={{ __html: updatedContent! }}
    ></pre>
  );
};

export default GuideComponent;
