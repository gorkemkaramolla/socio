import Image from 'next/image';
import React from 'react';

interface Props {
  imageSrc: string;
  googleImage: string;
  postsImage?: string;
  alt?: string;
  rounded?: boolean;
}

const ProfileImage: React.FC<Props> = ({
  googleImage,
  imageSrc,
  alt,
  postsImage,
  rounded = true,
}) => {
  return (
    <Image
      className={
        `${rounded ? 'rounded-full' : ''}` +
        ' w-full h-full  dark:bg-white object-cover border-2 border-lavender '
      }
      src={imageSrc || googleImage || postsImage || '/userdefault.png'}
      alt={'Socio user : ' + alt + ' profile picture' || '/userdefault.png'}
      width={64}
      height={64}
    />
  );
};

export default ProfileImage;
