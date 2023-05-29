'use client';
import React from 'react';
import { Modal } from '@nextui-org/react';
import Button from './Button';
import Heading from './Heading';

interface Props {
  visible: boolean;
  closeHandler: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteCurrentPic: () => void;
  userHasPic: boolean;
}

const ModalUi: React.FC<Props> = ({
  closeHandler,
  visible = false,
  handleFileUpload,
  deleteCurrentPic,
  userHasPic,
}) => {
  return (
    <Modal
      closeButton
      aria-labelledby='modal-title'
      open={visible}
      className='cursor-auto'
      onClose={closeHandler}
    >
      <Modal.Header>
        <Heading heading='h1' size={'default'}>
          {' '}
          Change your profile picture
        </Heading>
      </Modal.Header>
      <Modal.Body className='flex flex-col justify-center items-center'>
        <input
          type='file'
          id='image-upload'
          className='hidden p-0 m-0 '
          accept='image/jpeg, image/png'
          onChange={handleFileUpload}
        />
        <Button className=' cursor-pointer' variant={'ghost'}>
          <label
            htmlFor='image-upload'
            className='w-full rounded-md cursor-pointer items-center flex justify-center '
          >
            Upload a new picture
          </label>
        </Button>
        <Button
          disabled={userHasPic}
          onClick={deleteCurrentPic}
          variant={'ghost'}
        >
          Delete current picture
        </Button>
      </Modal.Body>
      <Modal.Footer className='items-center flex justify-center '></Modal.Footer>
    </Modal>
  );
};

export default ModalUi;
