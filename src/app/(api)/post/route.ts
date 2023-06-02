import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = Number(searchParams.get('user_id'));
  const post_id = Number(searchParams.get('post_id'));
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
        Comment: true,
      },
    });
    return new NextResponse(JSON.stringify({ post }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    const posts = await prisma.post.findMany({
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
      },
    });

    return new NextResponse(JSON.stringify({ posts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export async function POST(req: Request) {
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
