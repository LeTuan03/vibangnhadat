import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';
import { initializeApp as initializeClientApp, getApps as getClientApps } from 'firebase/app';
import { getFirestore as getClientFirestore, collection, getDocs } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables from both .env and .env.local
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db = null;
let useAdmin = false;

// 1. Try to initialize Firebase Admin
const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT;
if (serviceAccountStr) {
  try {
    const serviceAccount = JSON.parse(serviceAccountStr);
    if (serviceAccount.project_id) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      db = admin.firestore();
      useAdmin = true;
      console.log('✅ Firebase Admin SDK initialized');
    }
  } catch (e) {
    console.warn('⚠️ Failed to parse FIREBASE_SERVICE_ACCOUNT env var');
  }
}

// 2. Fallback to Firebase Client SDK if Admin SDK not initialized
if (!db) {
  const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
  };

  if (firebaseConfig.projectId && firebaseConfig.apiKey) {
    try {
      const app = getClientApps().length ? getClientApps()[0] : initializeClientApp(firebaseConfig);
      db = getClientFirestore(app);
      useAdmin = false;
      console.log('✅ Firebase Client SDK initialized (using VITE_FIREBASE_* env vars)');
    } catch (e) {
      console.error('❌ Failed to initialize Firebase Client SDK:', e.message);
    }
  }
}

if (!db) {
  console.error('❌ No Firebase configuration found. Please set FIREBASE_SERVICE_ACCOUNT or VITE_FIREBASE_* environment variables.');
  process.exit(1);
}

const DOMAIN = process.env.VITE_DOMAIN || 'https://thuaphatlaihoangmai.com';
const STATIC_PAGES = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/blog', priority: '0.9', changefreq: 'daily' },
  { url: '/legal-knowledge', priority: '0.8', changefreq: 'monthly' },
  { url: '/family-law', priority: '0.8', changefreq: 'monthly' },
  { url: '/qa', priority: '0.7', changefreq: 'weekly' },
  { url: '/documents', priority: '0.7', changefreq: 'weekly' },
];

/**
 * Helper to fetch collection data regardless of SDK type
 */
async function getCollectionData(collectionName) {
  const items = [];
  try {
    if (useAdmin) {
      const snapshot = await db.collection(collectionName).get();
      snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
    } else {
      const colRef = collection(db, collectionName);
      const snapshot = await getDocs(colRef);
      snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
    }
  } catch (error) {
    console.warn(`⚠️ Could not fetch collection "${collectionName}":`, error.message);
  }
  return items;
}

/**
 * Generate XML sitemap
 */
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
${page.image
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

/**
 * Robust date formatter for lastmod
 */
function formatLastmod(dateVal) {
  try {
    if (!dateVal) return new Date().toISOString().split('T')[0];
    let date;
    if (dateVal.toDate && typeof dateVal.toDate === 'function') {
      date = dateVal.toDate();
    } else {
      date = new Date(dateVal);
    }
    // Check if valid date
    if (isNaN(date.getTime())) {
      return new Date().toISOString().split('T')[0];
    }
    return date.toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Generate sitemap index
 */
function generateSitemapIndex(sitemaps) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((sitemap) => `  <sitemap>
    <loc>${DOMAIN}${sitemap}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return xml;
}

/**
 * Main function
 */
async function generateSitemaps() {
  console.log('🗺️  Generating sitemaps with dynamic content...');

  try {
    // Fetch dynamic content
    const blogData = await getCollectionData('blogPosts');
    const blogPosts = blogData.map(data => ({
      url: `/blog/${data.id}`,
      lastmod: formatLastmod(data.updatedAt || data.date),
      changefreq: 'monthly',
      priority: data.featured ? '0.9' : '0.7',
      image: data.image,
      imageTitle: data.title,
    }));

    const docData = await getCollectionData('documents');
    const documents = docData.map(data => ({
      url: `/documents/${data.id}`,
      lastmod: formatLastmod(data.updatedAt || data.publishDate),
      changefreq: 'monthly',
      priority: '0.6',
    }));

    const areaData = await getCollectionData('serviceAreas');
    const serviceAreas = areaData.map(data => ({
      url: `/service-areas/${data.id}`,
      lastmod: formatLastmod(data.updatedAt),
      changefreq: 'monthly',
      priority: '0.8',
      image: data.image,
      imageTitle: data.title,
    }));

    const vibanData = await getCollectionData('viban');
    const vibans = vibanData.map(data => ({
      url: `/viban/${data.id}`,
      lastmod: formatLastmod(data.updatedAt),
      changefreq: 'monthly',
      priority: '0.8',
    }));

    const familyData = await getCollectionData('familyLawQAs');
    const familyLawQAs = familyData.map(data => ({
      url: `/family-law/${data.id}`,
      lastmod: formatLastmod(data.updatedAt || data.date),
      changefreq: 'monthly',
      priority: '0.8',
      image: data.image,
      imageTitle: data.question,
    }));

    const faqData = await getCollectionData('faqs');
    const faqs = faqData.map(data => ({
      url: `/qa/${data.id}`,
      lastmod: formatLastmod(data.updatedAt),
      changefreq: 'weekly',
      priority: '0.7',
    }));

    // Combine all pages for the main sitemap
    const allStaticPages = [...STATIC_PAGES];

    // Create output directory if it doesn't exist
    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // 1. Generate main sitemap (Static + Important dynamic categories)
    const mainSitemapPages = [
      ...allStaticPages,
      ...serviceAreas,
      ...vibans.slice(0, 10), // Include some vibans in main sitemap
    ];
    const mainSitemap = generateSitemap(mainSitemapPages);
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), mainSitemap);
    console.log(`✅ Generated sitemap.xml (${mainSitemapPages.length} URLs)`);

    // 2. Generate blog sitemap
    if (blogPosts.length > 0) {
      const blogSitemap = generateSitemap(blogPosts);
      fs.writeFileSync(path.join(publicDir, 'blog-sitemap.xml'), blogSitemap);
      console.log(`✅ Generated blog-sitemap.xml (${blogPosts.length} posts)`);
    }

    // 3. Generate documents sitemap
    if (documents.length > 0) {
      const docSitemap = generateSitemap(documents);
      fs.writeFileSync(path.join(publicDir, 'documents-sitemap.xml'), docSitemap);
      console.log(`✅ Generated documents-sitemap.xml (${documents.length} documents)`);
    }

    // 4. Generate QA sitemap
    const allQAPages = [...familyLawQAs, ...faqs];
    if (allQAPages.length > 0) {
      const qaSitemap = generateSitemap(allQAPages);
      fs.writeFileSync(path.join(publicDir, 'qa-sitemap.xml'), qaSitemap);
      console.log(`✅ Generated qa-sitemap.xml (${allQAPages.length} QA items)`);
    }

    // 5. Generate sitemap index
    const sitemapFiles = ['/sitemap.xml'];
    if (blogPosts.length > 0) sitemapFiles.push('/blog-sitemap.xml');
    if (documents.length > 0) sitemapFiles.push('/documents-sitemap.xml');
    if (allQAPages.length > 0) sitemapFiles.push('/qa-sitemap.xml');

    const sitemapIndex = generateSitemapIndex(sitemapFiles);
    fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
    console.log('✅ Generated sitemap-index.xml');

    console.log('\n✨ Sitemaps generated successfully with dynamic content!');
    const totalUrls = allStaticPages.length + blogPosts.length + documents.length + serviceAreas.length + vibans.length + familyLawQAs.length + faqs.length;
    console.log(`📍 Total URLs: ${totalUrls}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
    process.exit(1);
  }
}

// Run the generator
generateSitemaps();
