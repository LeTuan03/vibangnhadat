#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const DOMAIN = process.env.VITE_DOMAIN || 'https://thuaphatlaihoangmai.com';
const STATIC_PAGES = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/blog', priority: '0.9', changefreq: 'daily' },
  { url: '/services', priority: '0.8', changefreq: 'monthly' },
  { url: '/service-areas', priority: '0.8', changefreq: 'monthly' },
  { url: '/legal-knowledge', priority: '0.8', changefreq: 'monthly' },
  { url: '/family-law', priority: '0.8', changefreq: 'monthly' },
  { url: '/qa', priority: '0.7', changefreq: 'weekly' },
  { url: '/documents', priority: '0.7', changefreq: 'weekly' },
  { url: '/contact', priority: '0.6', changefreq: 'monthly' },
];

function generateSitemap(pages) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((page) => {
      const urlPath = String(page.url || '').replace(/#.*$/, '');
      const lastmod = page.lastmod || new Date().toISOString().split('T')[0];
      return `  <url>\n    <loc>${DOMAIN}${urlPath}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${page.changefreq || 'monthly'}</changefreq>\n    <priority>${page.priority || '0.5'}</priority>\n  </url>`;
    })
    .join('\n')}\n</urlset>`;
  return xml;
}

(function main(){
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  const xml = generateSitemap(STATIC_PAGES);
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
  console.log('Generated public/sitemap.xml with DOMAIN=' + DOMAIN);
})();