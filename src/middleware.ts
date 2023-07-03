import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const isAuth = await getToken({ req });
    const isLoginPage = pathname.startsWith('/login');
    const isRegisterPage = pathname.startsWith('/register');

    const sensitiveRoutes = ['/settings', '/chat'];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/home', req.url));
      } else {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } else if (isRegisterPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/home', req.url));
      } else {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL('/home', req.url));
    }

    if (pathname === '/' && isAuth) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matchter: ['/settings', '/login', '/home/:path*'],
};
