import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/dashboard/login', request.url), { status: 302 });
  response.cookies.set('session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
  });
  return response;
}

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/dashboard/login', request.url), { status: 302 });
  response.cookies.set('session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
  });
  return response;
}
