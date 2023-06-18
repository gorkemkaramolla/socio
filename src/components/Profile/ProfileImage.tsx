import Image from 'next/image';
import React from 'react';

interface Props {
  imageSrc: string;
  googleImage: string;
  postsImage?: string;
  alt?: string;
}

const ProfileImage: React.FC<Props> = ({
  googleImage,
  imageSrc,
  alt,
  postsImage,
}) => {
  return (
    <Image
      className=' w-full h-full  dark:bg-white object-cover rounded-full border-2 border-lavender '
      src={imageSrc || googleImage || postsImage || '/userdefault.png'}
      alt={'Socio user : ' + alt + ' profile picture' || '/userdefault.png'}
      width={64}
      height={64}
    />
  );
};

export default ProfileImage;
