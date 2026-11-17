import { site } from '../config';
const pages = ['/', '/affiliation', '/mentions-legales', '/confidentialite'];
export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
    .map((p) => `<url><loc>${new URL(p, site.url).href}</loc></url>`)
    .join('')}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
