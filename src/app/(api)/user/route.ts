import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  prisma.$connect();
  const id = Number(searchParams.get('id'));
  const username = searchParams.get('username');
  const post_id = searchParams.get('post_id');
  try {
    const user = await prisma.user.findFirstOrThrow({
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        bio: true,
        username: true,
        location: true,
      },
      where: {
        OR: [
          { id: id ? id : undefined },
          { username: username ? username : undefined },
        ],
      },
    });
    if (user)
      return new NextResponse(JSON.stringify({ user }), {
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
  } catch (e: any) {}
}
export async function PUT(req: Request) {
  const formData = await req.formData();
  const id = formData.get('id');
  const email = formData.get('email');
  const name = formData.get('name');
  const username = formData.get('username');
  const bio = formData.get('bio');
  const image = formData.get('image');
  const location = formData.get('location');

  prisma.$connect();
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: Number(id),
    },
  });

  if (user) {
    if (image && image instanceof Blob && image.size > 4 * 1024 * 1024) {
      return new NextResponse(
        JSON.stringify({ message: 'Image size exceeds the limit of 4MB' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const updatedData: {
      username?: string;
      email?: string;
      name?: string;
      bio?: string;
      image?: Buffer | null;
      location?: string;
    } = {};
    if (
      username !== '' &&
      username !== 'undefined' &&
      /^[a-zA-Z0-9_]{3,20}$/.test(username?.toString()!)
    ) {
      updatedData.username = username?.toString().trim().replace(' ', '');
    }

    if (
      email !== '' &&
      email !== 'undefined' &&
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,6}$/.test(
        email?.toString()!
      )
    ) {
      updatedData.email = email?.toString().trim().replace(' ', '');
    }

    if (
      name !== '' &&
      name !== 'undefined' &&
      /^[\p{L}\s]{2,}$/u.test(name?.toString()!)
    ) {
      updatedData.name = name?.toString().trim().replace(' ', '');
    }

    if (bio !== '' && bio !== 'undefined') {
      updatedData.bio = bio?.toString().trim();
    }
    if (location !== '' && location !== 'undefined') {
      updatedData.location = location?.toString().trim().replace(' ', '');
    }

    const buffer =
      image && image !== 'undefined'
        ? await new Response(image).arrayBuffer()
        : null;
    const imageData = buffer ? Buffer.from(buffer) : null;
    if (imageData && imageData.length > 2 * 1024 * 1024) {
      return new NextResponse('Image is too large it should be less then 4MB', {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (imageData) {
      updatedData.image = imageData;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: updatedData,
    });

    if (updatedUser)
      return new NextResponse(JSON.stringify({ updatedUser }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    else
      return new NextResponse(
        JSON.stringify({ message: 'Something went wrong' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
  }

  prisma.$disconnect();
}
