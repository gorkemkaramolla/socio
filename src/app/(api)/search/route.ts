import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resizeImage } from '@/util/imageSharp';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (username) {
    try {
      await prisma.$connect();
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: username } },
            { name: { contains: username } },
          ],
        },
        select: {
          name: true,
          email: true,
          image: true,
          id: true,
          bio: true,
          imageUri: true,
          username: true,
          location: true,
        },
      });
      // users.map(async (user) => {
      //   const resizedImageBuffer = await resizeImage(user.image!, 48);
      //   user.image = resizedImageBuffer;
      // });

      prisma.$disconnect();

      if (users.length > 0) {
        const data = JSON.stringify(users);
        const headers = {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        };

        const body = `data: ${data}\n\n`;

        return new NextResponse(body, {
          status: 200,
          headers,
        });
      } else {
        return new NextResponse('No users found', {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (e: any) {
      console.error(e);
      return new NextResponse(e, {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}
