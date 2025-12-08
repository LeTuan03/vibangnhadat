/**
 * Seed Blog Posts to Firebase
 * Usage: node seed-blog.js
 * This script uploads realistic blog posts from mockData to Firebase Firestore
 */

import admin from 'firebase-admin';
import { mockBlogPosts } from '../src/data/mockData';

// Initialize Firebase Admin
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://viban-phuong-luat.firebaseio.com'
});

const db = admin.firestore();

async function seedBlogPosts() {
    try {
        console.log('🌱 Starting blog posts seed...');
        
        const blogPostsCollection = db.collection('blogPosts');
        
        // Get existing posts
        const existingPosts = await blogPostsCollection.get();
        const existingIds = new Set(existingPosts.docs.map(doc => doc.id));
        
        let created = 0;
        let updated = 0;
        let skipped = 0;
        
        for (const post of mockBlogPosts) {
            try {
                if (existingIds.has(post.id)) {
                    // Update existing post
                    await blogPostsCollection.doc(post.id).set(post, { merge: true });
                    updated++;
                    console.log(`✏️  Updated: ${post.title}`);
                } else {
                    // Create new post
                    await blogPostsCollection.doc(post.id).set(post);
                    created++;
                    console.log(`✅ Created: ${post.title}`);
                }
            } catch (error) {
                skipped++;
                console.error(`❌ Error with ${post.title}:`, error);
            }
        }
        
        console.log('\n📊 Seed Summary:');
        console.log(`✅ Created: ${created}`);
        console.log(`✏️  Updated: ${updated}`);
        console.log(`⏭️  Skipped: ${skipped}`);
        console.log(`📝 Total: ${mockBlogPosts.length}`);
        
        console.log('\n✨ Blog posts seed completed successfully!');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding blog posts:', error);
        process.exit(1);
    }
}

// Run the seed
seedBlogPosts();
