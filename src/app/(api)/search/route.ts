import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    if (username) {
      await prisma.$connect();
      const user = await prisma.user.findMany({
        where: {
          username: {
            contains: username,
          },
        },
      });
      prisma.$disconnect();
      if (user) {
        return new NextResponse(JSON.stringify(user), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new NextResponse('no found', {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  } catch (e: any) {
    console.error(e);
    return new NextResponse(e, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
