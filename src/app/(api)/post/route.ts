import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = Number(searchParams.get('user_id'));
  try {
    prisma.$connect();
    const posts = await prisma.post.findMany({ where: { user_id: user_id } });
    console.log(posts);
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
}
export async function POST(req: Request) {
  try {
    const { title, content, user_id } = await req.json();
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
