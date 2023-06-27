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
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  post_id: number;
}
export default function CommentForm({ post_id }: Props) {
  const mode = useSelector((state: RootState) => state.mode);

  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);

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
    <div className='text-base '>
      <form
        className='flex h-full justify-center px-6 gap-3 dark:text-white   items-center'
        onSubmit={formik.handleSubmit}
      >
        <TextareaAutosize
          id='comment'
          name='comment'
          placeholder='What do you think ? '
          className='bg-transparent w-full py-2 rounded-md resize-none'
          value={formik.values.comment}
          onChange={formik.handleChange}
        />
        <Button
          variant={'default'}
          className=''
          isLoading={loading}
          type='submit'
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
