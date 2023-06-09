import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher/pusher';
import { Message } from '@prisma/client';
import { nanoid } from 'nanoid';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  try {
    const {
      message,
    }: {
      message: Message;
    } = await req.json();
    console.log(message);
    await pusherServer.trigger('chat', 'message', message);
    // await prisma.message.create({
    //   data: {
    //     sender_id: sender_id,
    //     receiver_id: receiver_id,
    //     message: message,
    //   },
    // });

    return new Response('OK');
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response('Internal Server Error', { status: 500 });
  }
}
