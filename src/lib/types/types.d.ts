import { CommentLike } from '@prisma/client';

interface User {
  name: string;
  email: string;
  image?: string;
  id: string;
  bio: string;
  imageUri: string;
  username: string;
  location: string;
}
interface LocationUser {
  city: string;
  country: string;
}
interface Comment {
  id: string;
  content: string;
  post_id: number;
  user_id: number;
  user: {
    image: string;
    username: string;
    imageUri: string;
  };
}
interface PostWithUser {
  id: number;
  created_at: Date;
  title: string;
  content: string | null;
  user?: {
    name: string;
    image: string;
    username?: string;
    imageUri?: string;
    location?: string | null;
  };
  PostLike?: {
    id: number;
    user_id: number;
    post_id: number;
    liked: boolean;
  }[];
}
