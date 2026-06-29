import { NextResponse } from 'next/server';
import { auth } from './lib/auth';
import { headers } from 'next/headers';

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isLoggedIn = !!session;

  // ── Logged in user cannot access auth pages ──
  const authRoutes = ['/auth/signin', '/auth/register'];
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/auth/signin', '/auth/register'],
};
