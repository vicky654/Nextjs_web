import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Legacy blog.php?id=XXX → /blog/id-[id]/ (DB resolves to slug then 301)
  if (pathname === '/blog.php') {
    const id = searchParams.get('id');
    const url = request.nextUrl.clone();
    url.search = '';
    url.pathname = id ? `/blog/id-${id}` : '/blog/';
    return NextResponse.redirect(url, { status: 301 });
  }

  // Admin panel protection — must use startsWith to handle trailingSlash: true (/admin/login/)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminSession = request.cookies.get('admin_session');
    if (!adminSession?.value) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login/';
      url.search = '';
      return NextResponse.redirect(url);
    }
  }

  // Protect all /dashboard/* routes — redirect to login if no session cookie
  if (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/login') && !pathname.startsWith('/dashboard/register') && !pathname.startsWith('/dashboard/forgot-password')) {
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
  matcher: ['/blog.php', '/dashboard/:path*', '/admin/:path*'],
};
