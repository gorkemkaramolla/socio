import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  prisma.$connect();

  const { name, email, password } = await req.json();

  const isUserExists = await prisma.user.findFirst({
    where: { email: String(email)! },
  });

  if (isUserExists) {
    prisma.$disconnect();
    return new NextResponse(
      JSON.stringify({ message: 'Email already using by another user!' }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const hashedPassword = await hash(password.trim(), 10);

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      imageUri: '',
    },
  });

  prisma.$disconnect();

  if (newUser)
    return new NextResponse(
      JSON.stringify({
        status: true,
        user: { email: newUser.email, name: newUser.name, id: newUser.id },
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  else {
    return new NextResponse(
      JSON.stringify({ message: 'something went wrong' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
