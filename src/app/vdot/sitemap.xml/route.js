import { VDOT_LOCALES } from '../../../lib/vdot-i18n';
import { vdotLanguageAlternates, vdotUrl } from '../../../lib/vdot-seo';

export async function GET() {
  const alternates = Object.entries(vdotLanguageAlternates())
    .map(([locale, url]) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${url}" />`)
    .join('\n');
  const urls = VDOT_LOCALES.map((locale) => [
    '  <url>',
    `    <loc>${vdotUrl(locale)}</loc>`,
    alternates,
    '    <changefreq>monthly</changefreq>',
    '    <priority>0.8</priority>',
    '  </url>',
  ].join('\n')).join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
