import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function POST(req: Request) {
  try {
    const { post_id, user_id } = await req.json();
    const existLiked = await prisma.postLike.findFirst({
      where: {
        AND: {
          post_id: post_id,
          user_id: user_id,
        },
      },
    });
    if (existLiked) {
      const like = await prisma.postLike.delete({
        where: {
          id: existLiked.id,
        },
      });
      like.liked = false;
      return new NextResponse(JSON.stringify(like), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const like = await prisma.postLike.create({
        data: {
          post_id: post_id,
          user_id: user_id,
          liked: true,
          reactions: '',
        },
      });
      return new NextResponse(JSON.stringify(like), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error liking post ', error);
    return new NextResponse(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
// export async function DELETE(req: Request) {
//   const { searchParams } = new URL(req.url);

//   try {
//     const id = searchParams.get('id');

//       like.liked = false;
//       return new NextResponse(JSON.stringify(like), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     } else {
//       return new NextResponse(
//         JSON.stringify({ error: 'Invalid request payload' }),
//         {
//           status: 400,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }
//   } catch (error) {
//     console.error('Error deleting post like', error);
//     return new NextResponse(
//       JSON.stringify({ error: 'An unexpected error occurred' }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }
