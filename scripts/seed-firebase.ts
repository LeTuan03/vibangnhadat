/**
 * Script to seed Firebase Firestore with mock data
 * Usage: npx ts-node scripts/seed-firebase.ts
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, setDoc, doc, writeBatch, getDocs, query, where } from 'firebase/firestore';
import * as dotenv from 'dotenv';
import {
  mockBlogPosts,
  mockServices,
  mockCategories,
  mockVibans,
  mockFAQs,
  mockTestimonials,
  mockLegalDocuments,
  mockTeamMembers,
  mockStatistics,
  mockContactInfo,
  mockCompanyInfo,
  mockServiceAreas,
  mockFamilyLawQAs,
  mockGalleryItems,
  mockNavigation
} from '../src/data/mockData';
import { qaSeedData } from '../src/data/qaSeedData';

// Load environment variables
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
};

// Validate config
if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  console.error('❌ Missing Firebase configuration. Check .env.local file.');
  process.exit(1);
}

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper function to seed a collection
async function seedCollection(collectionName: string, data: any[] | any) {
  try {
    console.log(`\n🌱 Seeding collection: ${collectionName}`);
    
    const batch = writeBatch(db);
    
    // Handle special case for contactInfo and companyInfo (single documents)
    if (collectionName === 'contactInfo' || collectionName === 'companyInfo') {
      const docRef = doc(db, collectionName, 'main');
      batch.set(docRef, data);
    } else {
      // Handle array of documents
      const dataArray = Array.isArray(data) ? data : [data];
      for (const item of dataArray) {
        const docRef = doc(db, collectionName, item.id);
        batch.set(docRef, item);
      }
    }
    
    await batch.commit();
    
    // Log count based on type
    if (collectionName === 'contactInfo' || collectionName === 'companyInfo') {
      console.log(`✅ Successfully seeded 1 document to ${collectionName}`);
    } else {
      const count = Array.isArray(data) ? data.length : 1;
      console.log(`✅ Successfully seeded ${count} documents to ${collectionName}`);
    }
  } catch (error) {
    console.error(`❌ Error seeding ${collectionName}:`, error);
    throw error;
  }
}

// Main seed function
async function seedFirebase() {
  try {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║  Firebase Firestore Seeding Script    ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`\n📍 Project ID: ${firebaseConfig.projectId}`);
    
    // Seed all collections
    await seedCollection('blogPosts', mockBlogPosts);
    await seedCollection('services', mockServices);
    await seedCollection('categories', mockCategories);
    await seedCollection('vibans', mockVibans);
    
    // Seed FAQ data - combine mockFAQs with qaSeedData
    const allFAQs = [...(mockFAQs || []), ...qaSeedData];
    await seedCollection('faqs', allFAQs);
    
    await seedCollection('testimonials', mockTestimonials);
    await seedCollection('legalDocuments', mockLegalDocuments);
    await seedCollection('teamMembers', mockTeamMembers);
    await seedCollection('statistics', mockStatistics);
    await seedCollection('contactInfo', mockContactInfo);
    await seedCollection('companyInfo', mockCompanyInfo);
    await seedCollection('serviceAreas', mockServiceAreas);
    await seedCollection('familyLawQAs', mockFamilyLawQAs);
    await seedCollection('gallery', mockGalleryItems);
    await seedCollection('navigation', mockNavigation);
    
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║  ✅ All collections seeded successfully! ║');
    console.log('╚════════════════════════════════════════╝\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seed function
seedFirebase();
