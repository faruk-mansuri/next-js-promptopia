import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  const isPublicRoute =
    path === '/signup' ||
    path === '/login' ||
    path === '/verifyEmail' ||
    path === '/forgot-password' ||
    path === '/reset-password';

  if (isPublicRoute && token)
    return NextResponse.redirect(new URL('/', request.nextUrl));

  if (!isPublicRoute && !token)
    return NextResponse.redirect(new URL('/login', request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/signup',
    '/login',
    // '/verifyEmail',
    // '/forgot-password',
    // '/reset-password',
    '/',
    // '/profile/:path*',
    // '/update-prompt',
  ],
};
