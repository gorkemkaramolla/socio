import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function GET(req: Request) {
  const sharp = require('sharp');

  const { searchParams } = new URL(req.url);
  const post_id = Number(searchParams.get('post_id'));

  const user_id = Number(searchParams.get('user_id'));
  const skip = Number(searchParams.get('user_id')) || 0;
  if (user_id) {
    try {
      prisma.$connect();
      const posts = await prisma.post.findMany({
        where: { user_id: user_id },
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          created_at: true,
          title: true,
          content: true,

          PostLike: {
            select: {
              id: true,
              user_id: true,
              post_id: true,
              liked: true,
            },
          },
          Comment: {
            select: {
              id: true,
            },
          },
        },
      });
      prisma.$disconnect();

      if (posts)
        return new NextResponse(JSON.stringify(posts), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      else
        return new NextResponse(
          JSON.stringify({ message: 'something went wrong' }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          }
        );
    } catch (error) {
      console.error('Error creating post:', error);
      return new NextResponse(
        JSON.stringify({ error: 'An unexpected error occurred' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } else if (post_id) {
    const post = await prisma.post.findFirst({
      where: {
        id: post_id,
      },
      select: {
        id: true,
        created_at: true,
        title: true,
        content: true,
        user: {
          select: {
            name: true,
            image: true,
            username: true,
            imageUri: true,
            location: true,
          },
        },
        PostLike: {
          select: {
            id: true,
            user_id: true,
            post_id: true,
            liked: true,
          },
        },
      },
    });
    if (post) {
      const resizedImageBuffer = await sharp(post.user.image)
        .resize(48)
        .toBuffer();

      post.user.image = resizedImageBuffer;
    }

    return new NextResponse(JSON.stringify({ post }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    const posts = await prisma.post.findMany({
      skip: skip,
      take: 5,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        created_at: true,
        title: true,
        content: true,
        user: {
          select: {
            name: true,
            image: true,
            username: true,
            imageUri: true,
            location: true,
          },
        },
        PostLike: {
          select: {
            id: true,
            user_id: true,
            post_id: true,
            liked: true,
          },
        },
        Comment: {
          select: {
            id: true,
          },
        },
      },
    });
    for (const post of posts) {
      if (post.user?.image) {
        const resizedImageBuffer = await sharp(post.user.image)
          .resize(48)
          .toBuffer();

        // Update the post object with the resized image buffer
        post.user.image = resizedImageBuffer;
      }
    }
    return new NextResponse(JSON.stringify({ posts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export async function POST(req: Request) {
  const token = await getToken({
    // @ts-ignore
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(token);

  if (!token) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const { title, content, user_id } = await req.json();
    if (content === '') {
      return new NextResponse('content cannot be empty', {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const createdPost = await prisma.post.create({
      data: { user_id: user_id, content: content, title: title },
    });

    if (createdPost) {
      return new NextResponse(JSON.stringify(createdPost), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new NextResponse(
        JSON.stringify({ error: 'Failed to create post' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Error creating post:', error);
    return new NextResponse(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
