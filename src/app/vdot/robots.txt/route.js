import { VDOT_SITE_URL } from '../../../lib/vdot-seo';

export async function GET() {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${VDOT_SITE_URL}/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
}
