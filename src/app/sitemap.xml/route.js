import { getBlogPosts } from '../../lib/posts';
import { getAboutContent } from '../../lib/about';

export async function GET() {
  const baseUrl = 'https://paceguru.app';
  const locales = ['en', 'zh', 'ja'];
  
  // Build the sitemap XML
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  // Helper function to add URLs to sitemap
  const addUrl = (loc, lastmod, changefreq = 'weekly', priority = '0.8') => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${loc}</loc>\n`;
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
    sitemap += `    <changefreq>${changefreq}</changefreq>\n`;
    sitemap += `    <priority>${priority}</priority>\n`;
    
    // Add hreflang alternatives
    locales.forEach(locale => {
      sitemap += `    <xhtml:link rel="alternate" hreflang="${locale}" href="${loc.includes('/about') ? `${baseUrl}/about/${locale}` : loc.includes('/blog') && !loc.endsWith('/blog') ? loc.replace(/\/blog\/[^/]+\//, `/blog/${locale}/`) : loc.replace(/\/[^/]*$/, `/${locale}`)}" />\n`;
    });
    sitemap += '  </url>\n';
  };
  
  // Add homepage URLs
  locales.forEach(locale => {
    const homeUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;
    addUrl(homeUrl, new Date().toISOString().split('T')[0], 'daily', '1.0');
  });
  
  // Add about page URLs
  locales.forEach(locale => {
    const aboutUrl = `${baseUrl}/about/${locale}`;
    const aboutContent = getAboutContent(locale);
    const lastmod = aboutContent?.frontmatter?.date || new Date().toISOString().split('T')[0];
    addUrl(aboutUrl, lastmod, 'monthly', '0.8');
  });
  
  // Add blog listing URLs
  locales.forEach(locale => {
    const blogUrl = `${baseUrl}/blog/${locale}`;
    const posts = getBlogPosts(locale);
    const latestPost = posts[0];
    const lastmod = latestPost?.frontmatter?.date || new Date().toISOString().split('T')[0];
    addUrl(blogUrl, lastmod, 'weekly', '0.9');
  });
  
  // Add individual blog post URLs
  locales.forEach(locale => {
    const posts = getBlogPosts(locale);
    posts.forEach(post => {
      const postUrl = `${baseUrl}/blog/${locale}/${post.slug}`;
      addUrl(postUrl, post.frontmatter.date, 'monthly', '0.7');
    });
  });
  
  sitemap += '</urlset>';
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}