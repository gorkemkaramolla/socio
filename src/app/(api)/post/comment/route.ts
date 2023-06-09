import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { getCsrfToken, getSession } from 'next-auth/react';
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
export async function GET(req: Request) {
  const sharp = require('sharp');

  const { searchParams } = new URL(req.url);
  const post_id = Number(searchParams.get('post_id'));
  const skip = Number(searchParams.get('skip')) || 0;

  if (post_id) {
    const comments = await prisma.comment.findMany({
      skip: skip,
      take: 5,
      orderBy: { created_at: 'desc' },
      where: {
        post_id: post_id,
      },
      select: {
        content: true,
        id: true,
        post_id: true,
        created_at: true,
        user_id: true,
        user: {
          select: {
            id: true,
            image: true,
            username: true,
            imageUri: true,
          },
        },
      },
    });

    for (const comment of comments) {
      if (comment.user?.image) {
        const resizedImageBuffer = await sharp(comment.user.image)
          .resize(48)
          .toBuffer();

        // Update the comment object with the resized image buffer
        comment.user.image = resizedImageBuffer;
      }
    }
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
export async function DELETE(req: Request) {
  const token = await getToken({
    // @ts-ignore
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const { searchParams } = new URL(req.url);

  const comment_id = Number(searchParams.get('id'));
  const user_id = Number(searchParams.get('user_id'));

  console.log(user_id);
  console.log(token.id);
  try {
    if (token.id === user_id) {
      console.log('HELLO WORLD');
      const deletedComment = await prisma.comment.delete({
        where: {
          id: comment_id,
        },
      });
      if (deletedComment) {
        return new NextResponse(JSON.stringify(deletedComment), {
          status: 202,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new NextResponse('deleted', {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      return new NextResponse('You are unauthorized to do this delete action', {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: 'Something went wrong',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
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
