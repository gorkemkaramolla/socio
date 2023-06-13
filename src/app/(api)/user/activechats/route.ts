import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = Number(searchParams.get('user_id'));
  if (user_id) {
    // const user = await prisma.user.findFirst({
    //   where: {
    //     id: user_id,
    //   },
    //   select: {
    //     messages_received: true,
    //     messages_sent: true,
    //   },
    // });
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ sender_id: user_id }, { receiver_id: user_id }],
      },
      orderBy: { created_at: 'desc' },
      distinct: ['sender_id', 'receiver_id'],
      include: {
        receiver: true,
        sender: {
          select: {
            username: true,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify({ messages }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
