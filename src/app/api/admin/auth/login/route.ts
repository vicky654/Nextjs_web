import { NextResponse } from 'next/server';
import { createSession, hashPassword } from '@/lib/adminAuth';
import { cookies } from 'next/headers';

const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours in seconds

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body as { email: string; password: string };

    const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@dpdpconsultants.com';
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'Admin@2025!';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const emailMatch = email === adminEmail;
    let passwordMatch = false;

    if (adminPasswordHash) {
      passwordMatch = hashPassword(password) === adminPasswordHash;
    } else {
      passwordMatch = password === adminPassword;
    }

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = createSession(email);
    const cookieStore = await cookies();
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      path: '/admin',
      maxAge: SESSION_MAX_AGE,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
