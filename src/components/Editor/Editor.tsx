'use client';
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import { useRouter } from 'next/router';
import { tools } from './toolList';
import UnsavedChangesPrompt from './UnsavedChanges';
import { Toaster, toast } from 'react-hot-toast';
import DOMPurify from 'dompurify';
import { GuidePost } from './GuidePostPage';
import { title } from 'process';
import { lastIndexOf } from 'lodash';
import { Tooltip } from '@nextui-org/react';
import { Image } from 'lucide-react';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import { useSession } from 'next-auth/react';

interface Props {
  handleContent: (guidePost: GuidePost) => void;
  handleSave: (value: boolean) => void;
  guidePost: GuidePost;
  draftLength: number;
  contentWithoutSanitize?: string;
  titleWithoutSlug?: string;
}

const Editor: React.FC<Props> = ({
  handleSave,
  handleContent,
  draftLength,
  guidePost,
  contentWithoutSanitize,
  titleWithoutSlug,
}) => {
  const [changesSaved, setChangesSaved] = useState<boolean>(false);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [temporaryImageId, setTemporaryImageId] = useState();
  const cld = new Cloudinary({ cloud: { cloudName: 'dq1n9iiup' } });
  const session = useSession();
  function getTextOnCurrentLine(textarea: any) {
    const text = textarea.value;
    const caretPosition = textarea.selectionStart;
    let start = caretPosition;
    let end = caretPosition;
    while (start > 0 && text[start - 1] !== '\n') {
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
    if (textAreaContentRef.current) {
      setUndoStack([...undoStack, value]);
    }
    guidePost.content = value;

    handleContent(guidePost);
  }
  useEffect(() => {
    setRedoStack([...redoStack, guidePost.content]);
  }, [guidePost.content]);
  const handleUndo = () => {
    if (textAreaContentRef.current && undoStack.length > 0) {
      const previousContent = undoStack[undoStack.length - 1];

      textAreaContentRef.current.value = previousContent;

      handleContent({ title: title, content: previousContent });

      const updatedUndoStack = undoStack.slice(0, undoStack.length - 1);
      setUndoStack(updatedUndoStack);
    }
  };

  const handleRedo = () => {
    if (textAreaContentRef.current && redoStack.length > 0) {
      const nextContent = redoStack[redoStack.length - 1];

      textAreaContentRef.current.value = nextContent;
      handleContent({ title: title, content: nextContent });

      const updatedRedoStack = redoStack.slice(0, redoStack.length - 1);
      setRedoStack(updatedRedoStack);
    }
  };

  function handleTitleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { selectionStart, value } = event.target;
    // guidePost.title = value;
    handleContent({ ...guidePost, title: value });
  }

  const textAreaContentRef = useRef<HTMLTextAreaElement>(null);

  const textAreaTitleRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaContentRef.current)
      textAreaContentRef.current.value = guidePost.content;
    if (textAreaTitleRef.current)
      textAreaTitleRef.current.value = guidePost.title;
  }, [textAreaContentRef.current, guidePost.content]);
  useEffect(() => {
    const draft = localStorage.getItem('draftText');
    if (guidePost.content) {
      if (draft?.toString() !== guidePost.content) {
        setChangesSaved(true);
      }
    }
  }, [guidePost.content]);
  useEffect(() => {
    if (
      contentWithoutSanitize &&
      titleWithoutSlug &&
      textAreaContentRef.current &&
      textAreaTitleRef.current
    ) {
      textAreaContentRef.current.value = contentWithoutSanitize;
      textAreaTitleRef.current.value = titleWithoutSlug;
      handleContent({
        title: titleWithoutSlug,
        content: contentWithoutSanitize,
      });
    }
  }, [
    contentWithoutSanitize,
    titleWithoutSlug,
    textAreaContentRef.current,
    textAreaTitleRef.current,
  ]);
  const textAreaWrapperRef = useRef<HTMLDivElement>(null);

  function handleEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && textAreaContentRef.current) {
      event.preventDefault();
      const textarea = textAreaContentRef.current;

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
      handleContent({ title: guidePost.title, content: newContent });
    }
    if (
      (event.ctrlKey && event.key === 'z') ||
      (event.metaKey && event.key === 'z')
    ) {
      event.preventDefault();
      handleUndo();
    } else if (
      (event.ctrlKey && event.key === 'y') ||
      (event.metaKey && event.key === 'y')
    ) {
      event.preventDefault();
      handleRedo();
    }
    if (event.metaKey && event.key === 'b') {
      event.preventDefault();
      handleFormatting('bold');
    } else if (event.metaKey && event.key === 'i') {
      event.preventDefault();

      handleFormatting('italic');
    } else if (event.metaKey && event.key === 'h') {
      event.preventDefault();

      handleFormatting('heading');
    } else if (event.metaKey && event.key === 'u') {
      event.preventDefault();

      handleFormatting('ul');
    } else if (event.metaKey && event.key === 'o') {
      event.preventDefault();

      handleFormatting('ol');
    } else if (event.metaKey && event.key === '<') {
      event.preventDefault();
      handleFormatting('ol');
    }

    if (
      (event.ctrlKey && event.key === 'l') ||
      (event.metaKey && event.key === 'l')
    ) {
      event.preventDefault();

      const { start, end } = getTextOnCurrentLine(textAreaContentRef.current);
      textAreaContentRef.current?.setSelectionRange(start, end);
    }
  }
  const saveFunction = () => {
    localStorage.setItem('draftText', JSON.stringify({ guidePost }));
    setChangesSaved(false);
    toast.success('Successfully Saved');
    handleSave(true);
  };
  useEffect(() => {
    const handleSaved = (event: any): void => {
      if (event.metaKey && event.key === 's') {
        event.preventDefault();
        saveFunction();
      }
    };

    window.addEventListener('keydown', handleSaved);

    return () => {
      window.removeEventListener('keydown', handleSaved);
    };
  });
  const handleFormatting = (style: string, url?: string) => {
    if (textAreaContentRef.current && textAreaContentRef) {
      var selectedText = textAreaContentRef.current.value.substring(
        textAreaContentRef.current.selectionStart,
        textAreaContentRef.current.selectionEnd
      );

      const bold = /^\*\*[\s\S]*\*\*$/;
      const italic = /^_[\s\S]*_$/;
      const code = /^```[\s\S]*```$/;
      const embed = /^{*embed [\s\S]*}$/;

      const quote = /^>[\s\S]*$/;
      let newText = '';
      let cursorPosition = 0;
      if (style === 'bold') {
        if (selectedText)
          if (selectedText.match(bold)) {
            newText = selectedText.replaceAll('**', '').trim();
          } else {
            newText = `**${selectedText}**`.trim();
          }
        else {
          newText = '****';
        }
      } else if (style === 'italic') {
        if (selectedText)
          if (selectedText.match(italic)) {
            newText = selectedText.trim().replaceAll('_', '');
          } else {
            newText = `_${selectedText.trim()}_`;
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
        cursorPosition = textAreaContentRef.current.selectionEnd + 4; // Set cursor position after the inserted code
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
      } else if (style === 'Ordered List') {
        newText = '\n1. element';
      } else if (style === 'Unordered List') {
        newText = '\n- element';
      } else if (style === 'link') {
        if (selectedText) {
          newText = `[](${selectedText})`;
        } else {
          newText = '[]()';
        }
      } else if (style === 'image') {
        newText = `\n![Image description](${url?.trim()})`;
      }
      const selectionStart = textAreaContentRef.current.selectionStart;
      const selectionEnd = textAreaContentRef.current.selectionEnd;
      setUndoStack([...undoStack, textAreaContentRef.current.value]);

      textAreaContentRef.current.setRangeText(
        newText,
        selectionStart,
        selectionEnd,
        'end'
      );
      handleContent({
        title: guidePost.title,
        content:
          guidePost.content.substring(0, selectionStart) +
          newText +
          guidePost.content.substring(selectionEnd),
      });

      // Set cursor position after inserted text
      textAreaContentRef.current.setSelectionRange(
        cursorPosition,
        cursorPosition
      );

      // Re-select the modified text
      if (selectedText) {
        if (style !== 'link') {
          const modifiedSelectionStart = selectionStart;
          const modifiedSelectionEnd = selectionStart + newText.length;
          textAreaContentRef.current.focus();
          textAreaContentRef.current.setSelectionRange(
            modifiedSelectionStart,
            modifiedSelectionEnd
          );
        } else {
          textAreaContentRef.current.setSelectionRange(1, 1);
          textAreaContentRef.current.focus();
        }
      } else {
        if (style === 'bold') {
          textAreaContentRef.current.setSelectionRange(
            selectionStart + 2,
            selectionStart + 2
          );
          textAreaContentRef.current.focus();
        } else if (style === 'italic') {
          textAreaContentRef.current.setSelectionRange(
            selectionStart + 1,
            selectionStart + 1
          );
          textAreaContentRef.current.focus();
        } else if (style === 'code') {
          textAreaContentRef.current.setSelectionRange(
            selectionStart + 5,
            selectionStart + 5
          );
          textAreaContentRef.current.focus();
        } else if (style === 'quote') {
          textAreaContentRef.current.setSelectionRange(
            selectionStart + 1,
            selectionStart + 1
          );
          textAreaContentRef.current.focus();
        } else if (style === 'heading') {
          const modifiedSelectionStart = selectionStart;
          const modifiedSelectionEnd = selectionStart + newText.length;
          textAreaContentRef.current.focus();
          textAreaContentRef.current.setSelectionRange(
            modifiedSelectionStart,
            modifiedSelectionEnd
          );
        } else if (style === 'Unordered List') {
          const modifiedSelectionEnd = selectionStart + newText.length;
          textAreaContentRef.current.focus();
          textAreaContentRef.current.setSelectionRange(
            selectionStart + 3,
            modifiedSelectionEnd
          );
        } else if (style === 'Ordered List') {
          const modifiedSelectionEnd = selectionStart + newText.length;
          textAreaContentRef.current.focus();
          textAreaContentRef.current.setSelectionRange(
            selectionStart + 4,
            modifiedSelectionEnd
          );
        } else if (style === 'link') {
          if (selectedText) {
            textAreaContentRef.current.setSelectionRange(1, 1);
            textAreaContentRef.current.focus();
          } else {
            textAreaContentRef.current.focus();
            textAreaContentRef.current.setSelectionRange(3, 3);
          }
        }
      }
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ujjmucji');
      formData.append('cloud_name', 'dq1n9iiup');
      formData.append('folder', `temporary/${session.data?.user.id}`);
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dq1n9iiup/image/upload',
        formData
      );
      if (response) {
        setTemporaryImageId(response.data.public_id);
      }
      handleFormatting('image', response.data.url);

      // Handle the successful upload here
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };
  const deleteImageFromCloudinary = async (publicId: string) => {
    try {
      await axios.delete(
        `https://api.cloudinary.com/v1_1/dq1n9iiup/image/destroy/${publicId}`
      );
    } catch (error) {
      console.error('Image deletion failed:', error);
      throw error;
    }
  };

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      try {
        uploadImageToCloudinary(file);
      } catch (error) {
        console.error('Image upload failed:', error);
        // Handle the upload error here
      }
    }
  }

  return (
    <div className=' flex-col flex'>
      <div className='flex gap-1 my-4 justify-between '>
        {tools.map((tool: any, i: number) => {
          return (
            <Tooltip key={i} content={tool.shortcut} rounded placement='bottom'>
              <button
                className='hover:bg-gray-100  dark:hover:bg-[#4d5fb8aa] p-4 rounded transition-all'
                onClick={() => {
                  handleFormatting(tool.name);
                }}
              >
                <tool.iconName />
              </button>
            </Tooltip>
          );
        })}
        <button className='hover:bg-gray-100 dark:hover:bg-[#4d5fb8aa] p-4 rounded transition-all'>
          <input
            type='file'
            id='image-upload'
            className='hidden p-0 m-0 '
            accept='image/jpeg, image/png'
            onChange={handleImage}
          />
          <label
            htmlFor='image-upload'
            className='w-full rounded-md cursor-pointer items-center flex justify-center '
          >
            <Image></Image>
          </label>
        </button>
      </div>
      <div>
        <TextareaAutosize
          className='w-full text-4xl  font-extrabold text-black dark:text-white scroll-bar resize-none p-2 rounded-xl dark: bg-stone-100  dark:bg-blackSwan'
          autoCorrect='false'
          placeholder='Title of your guide'
          spellCheck='false'
          onChange={handleTitleChange}
          ref={textAreaTitleRef}
        />
      </div>
      <div ref={textAreaWrapperRef} className='textarea-wrapper '>
        <TextareaAutosize
          value={guidePost.content}
          autoCorrect='false'
          spellCheck='false'
          minRows={draftLength > 8 ? draftLength : 8}
          onKeyDown={handleEnter}
          ref={textAreaContentRef}
          className='w-full max-h-[65vh]  text-xl  resize-none p-2 rounded-xl dark: bg-stone-100  dark:bg-blackSwan'
          placeholder='Now you are useful'
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
