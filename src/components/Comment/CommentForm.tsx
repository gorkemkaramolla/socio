'use client';
import { useFormik } from 'formik';
import FormInput from '../UI/Input';
import Button from '../UI/Button';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Error from '../Error/Error';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
interface Props {
  post_id: number;
}
export default function CommentForm({ post_id }: Props) {
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user);
  const handleCommentSent = async (
    content: string,
    user_id: string,
    post_id: string
  ) => {
    try {
      const response = await axios.post('/post/comment', {
        content: content,
        user_id: user_id,
        post_id: post_id,
      });
      console.log(response.data);
      toast.success('Successfully sent');
    } catch (e: any) {
      toast.error(e.response.message);
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
      router.refresh();
      handleCommentSent(values.comment, currentUser.id, post_id.toString()!);
    },
  });
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className='flex p-4 gap-2 justify-center items-center '
      >
        <FormInput
          id='comment'
          name='comment'
          onChange={formik.handleChange}
          value={formik.values.comment}
          placeholder='What do you think?'
          variant={'default'}
        ></FormInput>
        <Button type='submit'>Send</Button>
      </form>
      {formik.touched.comment && formik.errors.comment ? (
        <Error>{formik.errors.comment}</Error>
      ) : null}
    </div>
  );
}
