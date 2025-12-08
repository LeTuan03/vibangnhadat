/* Verify serviceAreas in Firestore (CommonJS)
   Usage: node scripts/verify-serviceareas.cjs
*/

const { initializeApp, getApps } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const dotenv = require('dotenv');

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

if (!firebaseConfig.projectId) {
  console.error('Missing VITE_FIREBASE_PROJECT_ID in .env.local');
  process.exit(1);
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

async function verify() {
  try {
    console.log(`Project ID: ${firebaseConfig.projectId}`);
    const colRef = collection(db, 'serviceAreas');
    const snapshot = await getDocs(colRef);
    console.log(`Found ${snapshot.size} documents in collection 'serviceAreas'.`);
    let i = 0;
    snapshot.forEach(doc => {
      i++;
      console.log(`-- doc ${i}: id=${doc.id}`);
      console.log(JSON.stringify(doc.data(), null, 2));
      if (i >= 10) return; // limit output
    });
    process.exit(0);
  } catch (err) {
    console.error('Error reading serviceAreas:', err);
    process.exit(2);
  }
}

verify();
