#!/usr/bin/env node

/*
 * CommonJS wrapper for sitemap generator (works when package.json has "type": "module")
 */

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin
let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
} catch (e) {
  console.error('Failed to parse Firebase service account');
}

if (serviceAccount && serviceAccount.project_id) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.warn('Firebase service account not configured. Skipping dynamic content.');
}

const DOMAIN = process.env.VITE_DOMAIN || 'https://vibangnhadat.com';
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
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${pages
  .map((page) => {
    const urlPath = String(page.url || '').replace(/#.*$/, '');
    const lastmod = page.lastmod || new Date().toISOString().split('T')[0];
    return `  <url>
    <loc>${DOMAIN}${urlPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq || 'monthly'}</changefreq>
    <priority>${page.priority || '0.5'}</priority>
${
      page.image
        ? `    <image:image>
      <image:loc>${page.image}</image:loc>
      <image:title>${page.imageTitle || ''}</image:title>
    </image:image>`
        : ''
    }
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return xml;
}

function generateSitemapIndex(sitemaps) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps.map((sitemap) => `  <sitemap>\n    <loc>${DOMAIN}${sitemap}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n  </sitemap>`).join('\n')}\n</sitemapindex>`;

  return xml;
}

async function generateBlogSitemap() {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('blogPosts').get();
    const posts = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        url: `/blog/${doc.id}`,
        lastmod: data.updatedAt ? new Date(data.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: data.featured ? '0.9' : '0.7',
        image: data.image,
        imageTitle: data.title,
      });
    });

    return posts;
  } catch (error) {
    console.warn('Could not fetch blog posts from Firebase:', error.message);
    return [];
  }
}

async function generateDocumentsSitemap() {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('documents').get();
    const documents = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      documents.push({
        url: `/documents/${doc.id}`,
        lastmod: data.updatedAt ? new Date(data.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.6',
      });
    });

    return documents;
  } catch (error) {
    console.warn('Could not fetch documents from Firebase:', error.message);
    return [];
  }
}

async function generateSitemaps() {
  console.log('🗺️  Generating sitemaps...');

  try {
    const blogPosts = await generateBlogSitemap();
    const documents = await generateDocumentsSitemap();

    const allStaticPages = [...STATIC_PAGES];
    const allBlogPages = [...allStaticPages, ...blogPosts];
    const allDocumentsPages = [...STATIC_PAGES, ...documents];

    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const mainSitemap = generateSitemap(allStaticPages);
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), mainSitemap);
    console.log('✅ Generated sitemap.xml');

    if (blogPosts.length > 0) {
      const blogSitemap = generateSitemap(allBlogPages);
      fs.writeFileSync(path.join(publicDir, 'blog-sitemap.xml'), blogSitemap);
      console.log(`✅ Generated blog-sitemap.xml (${blogPosts.length} posts)`);
    }

    if (documents.length > 0) {
      const docSitemap = generateSitemap(allDocumentsPages);
      fs.writeFileSync(path.join(publicDir, 'documents-sitemap.xml'), docSitemap);
      console.log(`✅ Generated documents-sitemap.xml (${documents.length} documents)`);
    }

    const sitemapFiles = ['/sitemap.xml'];
    if (blogPosts.length > 0) sitemapFiles.push('/blog-sitemap.xml');
    if (documents.length > 0) sitemapFiles.push('/documents-sitemap.xml');

    const sitemapIndex = generateSitemapIndex(sitemapFiles);
    fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
    console.log('✅ Generated sitemap-index.xml');

    console.log('\n✨ Sitemaps generated successfully!');
    console.log(`📍 Total URLs: ${allStaticPages.length + blogPosts.length + documents.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
    process.exit(1);
  }
}

generateSitemaps();