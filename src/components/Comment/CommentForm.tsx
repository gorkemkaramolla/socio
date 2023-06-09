'use client';
import { useFormik } from 'formik';
import FormInput from '../UI/Input';
import Button from '../UI/Button';
import { redirect, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Error from '../Error/Error';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import Textarea from '../UI/Textarea';
interface Props {
  post_id: number;
}
export default function CommentForm({ post_id }: Props) {
  const mode = useSelector((state: RootState) => state.mode);

  useEffect(() => {
    if (formik.values.comment === '') {
      if (inputRef.current) {
        inputRef.current.innerText = 'What do you think?';
        inputRef.current.style.color = '#ccc';
      }
    }
  }, []);
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const handleCommentSent = async (
    content: string,
    user_id: string,
    post_id: string
  ) => {
    setLoading(true);

    try {
      const response = await axios.post('/post/comment', {
        content: content,
        user_id: user_id,
        post_id: post_id,
      });

      if (response) {
        toast.success('Successfully sent');
        formik.values.comment = '';
        if (inputRef.current) inputRef.current.innerText = '';
      }
      router.refresh();
    } catch (e: any) {
      toast.error(e.response.status);
      if (Number(e.response.status) === 401) {
        router.push('/login');
      }
      router.refresh();
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    enableReinitialize: true,

    validate(values) {
      const errors: {
        comment?: string;
      } = {};
      if (!values.comment) {
        errors.comment = 'Post field can not be empty';
      }
      return errors;
    },
    onSubmit: (values) => {
      handleCommentSent(values.comment, currentUser.id, post_id.toString()!);
    },
  });
  return (
    <div className='text-md '>
      <form
        className='flex h-full justify-center px-6 gap-3 dark:text-white   items-center'
        onSubmit={formik.handleSubmit}
      >
        <div
          ref={inputRef}
          className='w-full pl-2 rounded-md flex items-center text-black  text-sm min-h-[2.5rem] border-brown border-2'
          style={{
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
          onFocus={() => {
            if (inputRef.current && formik.values.comment === '') {
              inputRef.current.innerText = '';
            }
          }}
          id='comment'
          contentEditable={true}
          onInput={(event: React.KeyboardEvent<HTMLDivElement>) => {
            const content = event.currentTarget.textContent;
            if (inputRef.current)
              inputRef.current.style.color =
                mode.mode === 'dark' ? '#d1d5db' : 'black';

            formik.setFieldValue('comment', content);
          }}
          onPaste={(event: React.ClipboardEvent<HTMLDivElement>) => {
            event.preventDefault();
            const text = event.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, text);
          }}
          onBlur={(event: React.FocusEvent<HTMLDivElement>) => {
            formik.handleBlur(event);
            if (inputRef.current && formik.values.comment === '') {
              inputRef.current.style.color = '#ccc';
              inputRef.current.innerText = 'What do you think';
            }
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              formik.handleSubmit();
            }
          }}
        />

        <Button
          variant={'default'}
          className=''
          isLoading={loading}
          onClick={() => {
            formik.submitForm();
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
        </Button>
      </form>
      {formik.touched.comment && formik.errors.comment ? (
        <Error className='px-6'>{formik.errors.comment}</Error>
      ) : null}
    </div>
  );
}
