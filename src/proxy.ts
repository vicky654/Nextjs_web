import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Legacy blog.php?id=XXX → /blog/id-[id]/ (301 permanent redirect)
  if (pathname === '/blog.php') {
    const id = searchParams.get('id');
    const url = request.nextUrl.clone();
    url.search = '';
    url.pathname = id ? `/blog/id-${id}` : '/blog/';
    return NextResponse.redirect(url, { status: 301 });
  }

  // Admin API protection — return 401 JSON if cookie missing
  // (API routes also call requireAdminSession; this is a belt-and-suspenders guard)
  if (
    pathname.startsWith('/api/admin/') &&
    !pathname.startsWith('/api/admin/auth/')
  ) {
    const adminSession = request.cookies.get('admin_session');
    if (!adminSession?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Admin page protection — redirect to login if cookie missing.
  // startsWith('/admin/login') covers both /admin/login and /admin/login/ (trailingSlash: true)
  if (
    pathname.startsWith('/admin') &&
    !pathname.startsWith('/admin/login')
  ) {
    const adminSession = request.cookies.get('admin_session');
    if (!adminSession?.value) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login/';
      url.search = '';
      return NextResponse.redirect(url);
    }
  }

  // Dashboard protection
  if (
    pathname.startsWith('/dashboard') &&
    !pathname.startsWith('/dashboard/login') &&
    !pathname.startsWith('/dashboard/register') &&
    !pathname.startsWith('/dashboard/forgot-password')
  ) {
    const session = request.cookies.get('session');
    if (!session) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/dashboard/login';
      loginUrl.search = '';
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/blog.php',
    '/admin/:path*',
    '/api/admin/:path*',
    '/dashboard/:path*',
  ],
};
