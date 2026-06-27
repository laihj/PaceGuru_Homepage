import { NextResponse } from 'next/server';

// 仅做一件事：把当前请求的 pathname 注入到 request header，
// 让根 layout 能据此设置 <html lang>。
// （根 layout 是所有路由的公共祖先，无法直接拿到 [locale] 子段参数）
export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // 匹配所有路由，但排除 Next 内部资产、API、静态文件
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
