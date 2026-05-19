import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const email = String(data.get('email') ?? '').trim().toLowerCase();
    const password = String(data.get('password') ?? '');

    const allowedEmail = (process.env.PORTAL_EMAIL ?? 'user@dpdpconsultants.com').toLowerCase();
    const allowedPassword = process.env.PORTAL_PASSWORD ?? 'User@2025!';

    if (email !== allowedEmail || password !== allowedPassword) {
      const url = new URL(request.url);
      url.pathname = '/dashboard/login';
      url.searchParams.set('error', '1');
      return NextResponse.redirect(url, { status: 302 });
    }

    const sessionToken = crypto.randomUUID();
    const response = NextResponse.redirect(new URL('/dashboard', request.url), { status: 302 });
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      path: '/',
      maxAge: 28800, // 8 hours
      sameSite: 'lax',
    });
    return response;
  } catch {
    const url = new URL(request.url);
    url.pathname = '/dashboard/login';
    url.searchParams.set('error', '1');
    return NextResponse.redirect(url, { status: 302 });
  }
}
