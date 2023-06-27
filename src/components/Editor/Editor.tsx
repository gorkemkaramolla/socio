'use client';
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Bold,
  Italic,
  Code,
  Quote,
  Heading,
  List,
  ListOrdered,
  Zap,
  Link,
  ImagePlus,
} from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useRouter } from 'next/router';
import UnsavedChangesPrompt from './UnsavedChanges';
import { Toaster, toast } from 'react-hot-toast';
import DOMPurify from 'dompurify';
interface Props {
  handleContent: (s: string) => void;
  handleSave: (value: boolean) => void;
  content: string;
  draftLength: number;
}

const Editor: React.FC<Props> = ({
  content,
  handleSave,
  handleContent,
  draftLength,
}) => {
  const [changesSaved, setChangesSaved] = useState<boolean>(false);
  function getTextOnCurrentLine(textarea: any) {
    const text = textarea.value;
    const caretPosition = textarea.selectionStart;
    let start = caretPosition;
    let end = caretPosition;
    while (start > 0 && text[start - 1] !== '\n') {
      console.log(start);
      start--;
    }

    while (end < text.length && text[end] !== '\n') {
      end++;
    }

    return { start, end };
  }

  useEffect(() => {}, [draftLength]);

  function countCharacterOccurrences(selectedText: string) {
    let occurrences = selectedText.split('#').length - 1;
    if (occurrences === 0) {
      occurrences = 1;
    }
    return occurrences;
  }
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const { selectionStart, value } = event.target;

    handleContent(value);
  }

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) textAreaRef.current.value = content;
  }, [textAreaRef.current, content]);
  useEffect(() => {
    const draft = localStorage.getItem('draftText');
    if (content) {
      if (draft?.toString() !== content) {
        setChangesSaved(true);
      }
    }
  }, [content]);
  useEffect(() => {}, [changesSaved]);

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
    if (
      (event.ctrlKey && event.key === 'l') ||
      (event.metaKey && event.key === 'l')
    ) {
      event.preventDefault();

      const { start, end } = getTextOnCurrentLine(textAreaRef.current);
      textAreaRef.current?.setSelectionRange(start, end);
    }
    if (event.metaKey && event.key === 's') {
      event.preventDefault();

      localStorage.setItem('draftText', content);
      setChangesSaved(false);
      toast.success('Successfully Saved');
      handleSave(true);
    }
  }
  const handleFormatting = (style: string) => {
    if (textAreaRef.current && textAreaRef) {
      var selectedText = textAreaRef.current.value.substring(
        textAreaRef.current.selectionStart,
        textAreaRef.current.selectionEnd
      );

      const bold = /^\*\*.*\*\*$/;
      const italic = /^_.*_$/;
      const code = /^```[\s\S]*```$/;
      const embed = /^{*embed [\s\S]*}$/;

      const quote = /^>[\s\S]*$/;
      let newText = '';
      let cursorPosition = 0; // Track cursor position after inserting newText
      if (style === 'bold') {
        if (selectedText)
          if (selectedText.match(bold)) {
            newText = selectedText.replaceAll('**', '');
          } else {
            newText = `**${selectedText}**`;
          }
        else {
          newText = '****';
        }
      } else if (style === 'italic') {
        if (selectedText)
          if (selectedText.match(italic)) {
            newText = selectedText.replaceAll('_', '');
          } else {
            newText = `_${selectedText}_`;
          }
        else {
          newText = `__`;
        }
      } else if (style === 'code') {
        if (selectedText)
          if (selectedText.match(code)) {
            newText = selectedText.replaceAll('```', '');
          } else {
            newText = `\`\`\`\n${selectedText}\n\`\`\``;
          }
        else {
          newText = `\n\`\`\`\n\n\`\`\``;
        }
        cursorPosition = textAreaRef.current.selectionEnd + 4; // Set cursor position after the inserted code
      } else if (style === 'heading') {
        if (selectedText) {
          const numberHeadings = countCharacterOccurrences(selectedText);

          newText = `${'#'.repeat(
            numberHeadings > 3 ? 2 : numberHeadings + 1
          )} ${selectedText.replaceAll('#', '').trim()}`;
        } else {
          newText = '#';
        }
      } else if (style === 'quote') {
        if (selectedText)
          if (selectedText.match(quote)) {
            newText = `${selectedText.replace('>', '').trim()}`;
          } else {
            newText = `> ${selectedText}`;
          }
        else {
          newText = '> ';
        }
      } else if (style === 'embed') {
        if (selectedText.match(embed))
          newText = `${selectedText
            .replace('embed ', '')
            .replaceAll('{', '')
            .replaceAll('}', '')}`;
        else {
          newText = `{embed ${selectedText}}`;
        }
      }
      const selectionStart = textAreaRef.current.selectionStart;
      const selectionEnd = textAreaRef.current.selectionEnd;
      textAreaRef.current.setRangeText(
        newText,
        selectionStart,
        selectionEnd,
        'end'
      );
      handleContent(
        content.substring(0, selectionStart) +
          newText +
          content.substring(selectionEnd)
      );

      // Set cursor position after inserted text
      textAreaRef.current.setSelectionRange(cursorPosition, cursorPosition);

      // Re-select the modified text
      if (selectedText) {
        const modifiedSelectionStart = selectionStart;
        const modifiedSelectionEnd = selectionStart + newText.length;
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(
          modifiedSelectionStart,
          modifiedSelectionEnd
        );
      } else {
        if (style === 'bold') {
          textAreaRef.current.setSelectionRange(
            selectionStart + 2,
            selectionStart + 2
          );
          textAreaRef.current.focus();
        } else if (style === 'italic') {
          textAreaRef.current.setSelectionRange(
            selectionStart + 1,
            selectionStart + 1
          );
          textAreaRef.current.focus();
        } else if (style === 'code') {
          textAreaRef.current.setSelectionRange(
            selectionStart + 5,
            selectionStart + 5
          );
          textAreaRef.current.focus();
        } else if (style === 'quote') {
          textAreaRef.current.setSelectionRange(
            selectionStart + 1,
            selectionStart + 1
          );
          textAreaRef.current.focus();
        } else if (style === 'heading') {
          const modifiedSelectionStart = selectionStart;
          const modifiedSelectionEnd = selectionStart + newText.length;
          textAreaRef.current.focus();
          textAreaRef.current.setSelectionRange(
            modifiedSelectionStart,
            modifiedSelectionEnd
          );
        }
      }
    }
  };

  return (
    <div className='  flex-col flex justify-center'>
      <div className='flex gap-1   justify-evenly '>
        <button
          className='hover:bg-gray-100 dark:hover:bg-[#4d5fb8aa] p-2 rounded transition-all'
          onClick={() => {
            handleFormatting('bold');
          }}
        >
          <Bold />
        </button>
        <button
          className='hover:bg-gray-100 dark:hover:bg-blackSwan p-2 rounded transition-all'
          onClick={() => {
            handleFormatting('italic');
          }}
        >
          <Italic />
        </button>
        <button
          className='hover:bg-gray-100 dark:hover:bg-blackSwan p-2 rounded transition-all'
          onClick={() => {
            handleFormatting('heading');
          }}
        >
          <Heading />
        </button>
        <button
          className='hover:bg-gray-100 dark:hover:bg-blackSwan p-2 rounded transition-all'
          onClick={() => {
            handleFormatting('italic');
          }}
        >
          <ListOrdered size={28} />
        </button>
        <button
          className='hover:bg-gray-100 dark:hover:bg-blackSwan p-2 rounded transition-all'
          onClick={() => {
            handleFormatting('italic');
          }}
        >
          <List size={28} />
        </button>
        <button
          className='hover:bg-gray-100 dark:hover:bg-blackSwan p-2 rounded transition-all'
          onClick={() => {
            handleFormatting('code');
          }}
        >
          <Code />
        </button>
        <button
          className='hover:bg-gray-100 dark:hover:bg-blackSwan p-2 rounded transition-all'
          onClick={() => {
            handleFormatting('embed');
          }}
        >
          <Zap />
        </button>
        <button
          className='hover:bg-gray-100 dark:hover:bg-blackSwan p-2 rounded transition-all'
          onClick={() => {
            handleFormatting('code');
          }}
        >
          <Link />
        </button>

        <button
          className='hover:bg-gray-100 dark:hover:bg-blackSwan p-2 rounded transition-all'
          onClick={() => {
            handleFormatting('quote');
          }}
        >
          <Quote />
        </button>

        <button className='hover:bg-gray-100 dark:hover:bg-blackSwan p-2 rounded transition-all'>
          <ImagePlus />
        </button>
      </div>
      <div ref={textAreaWrapperRef} className='textarea-wrapper '>
        <TextareaAutosize
          autoCorrect='false'
          spellCheck='false'
          minRows={draftLength}
          onKeyDown={handleEnter}
          ref={textAreaRef}
          className='w-full max-h-[65vh] min-h-[65vh] scroll-bar resize-none p-2 rounded-xl dark: bg-stone-100  dark:bg-blackSwan'
          placeholder='Type'
          onChange={handleChange}
        />
        <div className=' '>{/* <div>{content}</div> */}</div>
        <UnsavedChangesPrompt changesSaved={changesSaved} />
        <Toaster position='top-center'></Toaster>
      </div>
    </div>
  );
};

export default Editor;
