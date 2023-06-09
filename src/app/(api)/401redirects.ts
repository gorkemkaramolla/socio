// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';

// const redirect401 = async (req: Request) => {
//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   if (!token) {
//     return new NextResponse('Unauthorized', {
//       status: 401,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// };

// export redirect401
