import { NextResponse } from 'next/server';

// 仅做一件事：把当前请求的 pathname 注入到 request header，
// 让根 layout 能据此设置 <html lang>。
// （根 layout 是所有路由的公共祖先，无法直接拿到 [locale] 子段参数）
export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  const hostname = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  if (hostname === 'vdot.paceguru.app') {
    requestHeaders.set('x-vdot-site', '1');
    const localeMatch = request.nextUrl.pathname.match(/^\/(en|zh|ja)$/);
    const locale = localeMatch?.[1] || 'zh';
    requestHeaders.set('x-vdot-locale', locale);

    if (request.nextUrl.pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = '/vdot';
      return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    }

    if (localeMatch || request.nextUrl.pathname === '/robots.txt' || request.nextUrl.pathname === '/sitemap.xml') {
      const url = request.nextUrl.clone();
      url.pathname = `/vdot${request.nextUrl.pathname}`;
      return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // 匹配所有路由，但排除 Next 内部资产、API、静态文件
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
