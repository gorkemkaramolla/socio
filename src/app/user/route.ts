import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  prisma.$connect();
  const user = await prisma.user.findFirstOrThrow({
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
    },
    where: {
      id: Number(searchParams.get('id')),
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
}
export async function PUT(req: Request) {
  const data = await req.json();
  console.log(data);
  prisma.$connect();
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: data.id,
    },
  });
  if (user) {
    const updatedUser = await prisma.user.update({
      where: {
        id: data.id, // Provide the valid user ID here
      },
      data: {
        email: data.email, // Provide the valid email here
        name: data.name,
      },
    });

    if (updatedUser)
      return new NextResponse(JSON.stringify({ updatedUser }), {
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
  prisma.$disconnect();
}
