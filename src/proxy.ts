import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Legacy blog.php?id=XXX → /blog/id-[id]/ (DB resolves to slug then 301)
  if (pathname === '/blog.php') {
    const id = searchParams.get('id');
    const url = request.nextUrl.clone();
    url.search = '';
    url.pathname = id ? `/blog/id-${id}` : '/blog';
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog.php'],
};
