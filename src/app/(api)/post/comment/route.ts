import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { post_id } = await req.json();
  if (post_id) {
    const comments = await prisma.comment.findMany({
      where: {
        post_id: post_id,
      },
    });
    return new NextResponse(JSON.stringify(comments), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new NextResponse(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
export async function POST(req: Request) {
  try {
    const { content, post_id, user_id } = await req.json();
    if (content === '') {
      return new NextResponse('content cannot be empty', {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const createdComment = await prisma.comment.create({
      data: {
        user_id: Number(user_id),
        content: content,
        post_id: Number(post_id),
      },
    });

    if (createdComment) {
      return new NextResponse(JSON.stringify(createdComment), {
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
