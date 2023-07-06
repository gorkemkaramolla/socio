import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import slugifyText from '@/util/slugifyTitle';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const { content, user_id, title, contentWithoutSanitize } = await req.json();
  console.log(content === '');
  if (content === '') {
    return new NextResponse(
      JSON.stringify({ error: 'Content cannot be empty' }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  console.log('content' + content);
  const titleSlugified = slugifyText(title);
  const createdComment = await prisma.guides.create({
    data: {
      titleWithoutSlug: title,
      user_id: user_id,
      content: content,
      title: titleSlugified,
      contentWithoutSanitize: contentWithoutSanitize,
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
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const { title, user_id, content, contentWithoutSanitize } = await req.json();
  if (Number(user_id) === session?.user.id) {
    const guideWillChange = await prisma.guides.findFirst({
      where: {
        user_id: Number(user_id),
        title: title,
      },
    });
    if (guideWillChange) {
      const updatedGuide = await prisma.guides.update({
        where: { id: guideWillChange.id },
        data: {
          title: title,
          content: content,
          contentWithoutSanitize: contentWithoutSanitize,
          user_id: user_id,
        },
      });
      return new NextResponse(JSON.stringify(updatedGuide), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new NextResponse('Guide not exist', {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    return new NextResponse('Unauthorized to do this ', {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  const title = searchParams.get('title');
  if (username && title) {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (user) {
      const guide = await prisma.guides.findFirst({
        where: {
          AND: {
            user_id: user.id,
            title: title,
          },
        },
        include: {
          user: {
            select: {
              image: true,
              imageUri: true,
              username: true,
              name: true,
            },
          },
        },
      });
      if (guide) {
        return new NextResponse(JSON.stringify({ guide }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new NextResponse('Guide not found', {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      return new NextResponse('User not found', {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else if (username) {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (user) {
      const guides = await prisma.guides.findMany({
        where: {
          user_id: user.id,
        },
      });
      if (guides) {
        return new NextResponse(JSON.stringify(guides), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      return new NextResponse('User not found', {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    return new NextResponse('User not found', {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
