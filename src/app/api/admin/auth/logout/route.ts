import { NextResponse } from 'next/server';
import { destroySession } from '@/lib/adminAuth';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (token) {
      destroySession(token);
    }
    cookieStore.set('admin_session', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
      sameSite: 'lax',
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
