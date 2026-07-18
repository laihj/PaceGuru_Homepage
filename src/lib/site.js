export const SITE_URL = 'https://paceguru.app';

export function absoluteUrl(pathname = '/') {
  if (pathname.startsWith('http://') || pathname.startsWith('https://')) {
    return pathname;
  }

  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return new URL(normalizedPath, `${SITE_URL}/`).toString();
}
