import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Validate Firebase config before initializing
if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  console.error('[firebase] ❌ MISSING FIREBASE CONFIG!', {
    hasProjectId: !!firebaseConfig.projectId,
    hasApiKey: !!firebaseConfig.apiKey,
  });
  console.error('Check .env.local for VITE_FIREBASE_* environment variables');
}

// Initialize Firebase (guard against multiple inits during HMR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Debug log
if (import.meta.env.DEV) {
  console.log('[firebase] ✅ Initialized successfully', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
  });
}

export default app;
