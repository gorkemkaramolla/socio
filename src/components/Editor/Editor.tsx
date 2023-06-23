'use client';
import React, {
  ChangeEvent,
  useEffect,
  useReducer,
  KeyboardEvent,
  useRef,
  useState,
} from 'react';
import ReactMarkdown from 'react-markdown';
import ReactDom from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { height } from '@mui/system';

interface Props {
  handleContent: (s: string) => void;
  content: string;
}

const Editor: React.FC<Props> = ({ content, handleContent }) => {
  const [latestHeight, setLatestHeight] = useState(0);
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const { selectionStart, value } = event.target;

    handleContent(value);
  }
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textAreaWrapperRef = useRef<HTMLDivElement>(null);

  function handleEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && textAreaRef.current) {
      event.preventDefault();
      const textarea = textAreaRef.current;

      const { selectionStart, selectionEnd } = textarea;
      const value = textarea.value;

      // Get the text before and after the current selection
      const textBeforeSelection = value.substring(0, selectionStart);
      const textAfterSelection = value.substring(selectionEnd);

      // Calculate the indentation of the current line
      const currentLineIndentation =
        textBeforeSelection.match(/\s*$/)?.[0] || '';

      // Create the new content with the desired indentation
      const newContent =
        textBeforeSelection +
        '\n' +
        currentLineIndentation +
        textAfterSelection;

      // Update the textarea value and set the selection position
      textarea.value = newContent;
      textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;

      // Call your handleContent function with the updated content
      handleContent(newContent);
    }
  }

  const handleFormatting = (style: string) => {
    if (textAreaRef.current && textAreaRef) {
      const selection = window.getSelection();
      const selectedText = selection?.toString();
      if (
        selectedText &&
        selection &&
        selection.anchorNode === textAreaWrapperRef.current
      ) {
        var bold = /^\*\*.*\*\*$/;
        var italic = /^_.*_$/;
        var code = /^`.*`$/;
        let newText = '';
        if (style === 'bold') {
          if (selectedText.match(bold)) {
            newText = selectedText.replaceAll('**', '');
          } else {
            newText = `**${selectedText}**`;
          }
        } else if (style === 'italic') {
          if (selectedText.match(italic)) {
            newText = selectedText.replaceAll('_', '');
          } else {
            newText = `_${selectedText}_`;
          }
        } else if (style === 'code') {
          if (selectedText.match(code)) {
            newText = selectedText.replaceAll('`', '');
          }
          newText = `\`${selectedText}\``;
        } else if (style === 'h1') {
          newText = `# ${selectedText}`;
        } else if (style === 'h2') {
          newText = `## ${selectedText}`;
        } else if (style === 'h3') {
          newText = `### ${selectedText}`;
        } else if (style === 'h4') {
          newText = `#### ${selectedText}`;
        } else if (style === 'h5') {
          newText = `##### ${selectedText}`;
        } else if (style === 'h6') {
          newText = `###### ${selectedText}`;
        } else if (style === 'quote') {
          newText = `> ${selectedText} \n`;
        }
        const selectionStart = textAreaRef.current.selectionStart;
        const selectionEnd = textAreaRef.current.selectionEnd;
        if (selectedText.length > 0) {
          const updatedValue =
            textAreaRef.current.value.substring(0, selectionStart) +
            newText +
            textAreaRef.current.value.substring(selectionEnd);
          textAreaRef.current.value = updatedValue;
          handleContent(
            content.substring(0, selectionStart) +
              newText +
              content.substring(selectionEnd)
          );
        }

        textAreaRef.current.focus();
      }
    }
  };

  return (
    <div className=''>
      <div className='flex gap-2 '>
        <button
          onClick={() => {
            handleFormatting('bold');
          }}
        >
          bold
        </button>
        <button
          onClick={() => {
            handleFormatting('italic');
          }}
        >
          italic
        </button>
        <button
          onClick={() => {
            handleFormatting('code');
          }}
        >
          code
        </button>
        <button
          onClick={() => {
            handleFormatting('h1');
          }}
        >
          h1
        </button>
        <button
          onClick={() => {
            handleFormatting('h2');
          }}
        >
          h2
        </button>
        <button
          onClick={() => {
            handleFormatting('h3');
          }}
        >
          h3
        </button>
        <button
          onClick={() => {
            handleFormatting('h4');
          }}
        >
          h4
        </button>
        <button
          onClick={() => {
            handleFormatting('h5');
          }}
        >
          h5
        </button>
        <button
          onClick={() => {
            handleFormatting('h6');
          }}
        >
          h6
        </button>
        <button
          onClick={() => {
            handleFormatting('quote');
          }}
        >
          quote
        </button>
      </div>
      <div ref={textAreaWrapperRef} className='textarea-wrapper'>
        <TextareaAutosize
          onKeyDown={handleEnter}
          ref={textAreaRef}
          className='w-full h-full  border-2 p-2 resize-none'
          placeholder='Type'
          onChange={handleChange}
        />
      </div>
      <div className=' '>{/* <div>{content}</div> */}</div>
    </div>
  );
};

export default Editor;
