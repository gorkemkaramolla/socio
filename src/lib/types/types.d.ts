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
  created_at: Date;
  content: string;
  post_id: number;
  user_id: number;
  user: {
    id: number;
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
  Comment: {
    id: number;
  }[];
}
interface Message {
  receiver_id: number;
  sender_id: number;
  message: string;
  created_at?: Date;
}
interface Guide {
  id: number;
  titleWithoutSlug: string;
  contentWithoutSanitize: string;
  title: string;
  content: string | null;
  created_at: Date;
  user_id: number;
  user?: {
    imageUri: string;
    image: string;
    username: string;
    name: string;
  };
}
interface BlogPost {
  children: Block[];
}
interface Block {
  type: string;
  text: string;
  marks: string[];
}
