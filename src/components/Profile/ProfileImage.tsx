import Image from 'next/image';
import React from 'react';

interface Props {
  imageSrc: string;
  googleImage: string;
  postsImage?: string;
}

const ProfileImage: React.FC<Props> = ({
  googleImage,
  imageSrc,
  postsImage,
}) => {
  return (
    <Image
      className=' w-full h-full profile-img dark:bg-white object-cover rounded-full border-2 border-lavender '
      src={imageSrc || googleImage || postsImage || '/userdefault.png'}
      alt='/userdefault.png'
      width={64}
      height={64}
    />
  );
};

export default ProfileImage;
