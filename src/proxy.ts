import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Legacy blog.php?id=XXX → /blog/[slug] redirect
  if (pathname === '/blog.php') {
    const id = searchParams.get('id');
    if (id) {
      // Redirect to blog listing with id hint; slug resolution happens server-side
      const url = request.nextUrl.clone();
      url.pathname = `/blog/id-${id}`;
      url.search = '';
      return NextResponse.redirect(url, { status: 301 });
    }
    const url = request.nextUrl.clone();
    url.pathname = '/blog';
    url.search = '';
    return NextResponse.redirect(url, { status: 301 });
  }

  // /contact → /contact-us/
  if (pathname === '/contact') {
    const url = request.nextUrl.clone();
    url.pathname = '/contact-us/';
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog.php', '/contact'],
};
