#!/usr/bin/env node

/**
 * Script to cleanup navigation items from Firebase
 * Removes items that don't match the default seed data
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const firebaseConfig = {
  apiKey: envVars.VITE_FIREBASE_API_KEY,
  authDomain: envVars.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envVars.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envVars.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.VITE_FIREBASE_APP_ID,
  databaseURL: envVars.VITE_FIREBASE_DATABASE_URL,
};

// Validate config
if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  console.error('❌ Missing Firebase configuration. Check .env.local file.');
  process.exit(1);
}

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Valid navigation IDs
const VALID_IDS = [
  'home',
  'about',
  'about-overview',
  'about-philosophy',
  'about-partners',
  'about-careers',
  'services',
  'news',
  'news-blog',
  'news-legal-docs',
  'family-law',
  'qa'
];

async function cleanupNavigation() {
  try {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║  Navigation Cleanup Script            ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`\n📍 Project ID: ${firebaseConfig.projectId}`);

    // Get all navigation documents
    const navCollection = collection(db, 'navigation');
    const snapshot = await getDocs(navCollection);

    console.log(`\n📋 Found ${snapshot.docs.length} navigation items in Firebase`);

    let deletedCount = 0;
    
    for (const docSnapshot of snapshot.docs) {
      const docId = docSnapshot.id;
      
      if (!VALID_IDS.includes(docId)) {
        console.log(`❌ Deleting invalid item: ${docId}`);
        await deleteDoc(doc(db, 'navigation', docId));
        deletedCount++;
      } else {
        console.log(`✅ Keeping valid item: ${docId}`);
      }
    }

    console.log(`\n╔════════════════════════════════════════╗`);
    console.log(`║  Cleanup Complete!                    ║`);
    console.log(`║  Deleted: ${deletedCount} invalid items              ║`);
    console.log(`╚════════════════════════════════════════╝\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Cleanup failed:', error);
    process.exit(1);
  }
}

cleanupNavigation();
