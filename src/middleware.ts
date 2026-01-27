import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  const { pathname } = request.nextUrl;

  // If user is not logged in and is trying to access protected routes, redirect to login
  if (!session && (pathname.startsWith('/form') || pathname.startsWith('/preview'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is logged in and tries to access login page, redirect to form
  if (session && pathname === '/') {
      return NextResponse.redirect(new URL('/form', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sealofup.jpg|GOVERNMENT_MONOGRAM.gif).*)'],
};
