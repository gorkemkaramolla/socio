import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher/pusher';
import { Message } from '@prisma/client';
import { nanoid } from 'nanoid';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const receiver_id = Number(searchParams.get('receiver_id'));
    const sender_id = Number(session.user.id);
    const messages = await prisma.message.findMany({
      orderBy: { created_at: 'asc' },
      where: {
        OR: [
          { sender_id: sender_id, receiver_id: receiver_id },
          { sender_id: receiver_id, receiver_id: sender_id },
        ],
      },
    });

    return new NextResponse(JSON.stringify({ messages }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return new NextResponse('Unauthorized', { status: 401 });
  // }
  try {
    const {
      message,
    }: {
      message: Message;
    } = await req.json();
    await pusherServer.trigger('chat', 'message', message);
    await prisma.message.create({
      data: {
        sender_id: Number(message.sender_id),
        receiver_id: Number(message.receiver_id),
        message: message.message,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response('Internal Server Error', { status: 500 });
  }
}
