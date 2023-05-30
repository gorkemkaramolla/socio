import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  prisma.$connect();
  const id = Number(searchParams.get('id'));
  const username = searchParams.get('username');

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
        { id: id ? id : undefined }, // Search by ID if it exists
        { username: username ? username : undefined }, // Search by username if it exists
      ],
    },
  });
  console.log(user);
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
}
export async function PUT(req: Request) {
  const formData = await req.formData();
  console.log(formData);
  const id = formData.get('id');
  const email = formData.get('email');
  const name = formData.get('name');
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
      console.log('yes');
      return new NextResponse(
        JSON.stringify({ message: 'Image size exceeds the limit of 4MB' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const updatedData: {
      email?: string;
      name?: string;
      bio?: string;
      image?: Buffer | null;
      location?: string;
    } = {};

    if (email !== '' && email !== 'undefined') {
      updatedData.email = email?.toString();
    }
    if (name !== '' && name !== 'undefined') {
      updatedData.name = name?.toString();
    }
    if (bio !== '' && bio !== 'undefined') {
      updatedData.bio = bio?.toString();
    }
    if (location !== '' && location !== 'undefined') {
      updatedData.location = location?.toString();
    }

    const buffer =
      image && image !== 'undefined'
        ? await new Response(image).arrayBuffer()
        : null;
    const imageData = buffer ? Buffer.from(buffer) : null;
    if (imageData && imageData.length > 4 * 1024 * 1024) {
      return new NextResponse('DATA BIG U CANT DO THAT', {
        status: 200,
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
