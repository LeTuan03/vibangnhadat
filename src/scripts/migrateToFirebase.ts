/**
 * Migration Script - Transfer Mock Data to Firebase
 * 
 * Cách sử dụng:
 * 1. Đảm bảo Firebase config (.env.local) đã được cấu hình đúng
 * 2. Chạy script này: node src/scripts/migrateToFirebase.js
 * 
 * Script này sẽ:
 * - Đọc tất cả mock data
 * - Tạo collections trong Firestore
 * - Upload dữ liệu lên Firebase
 */

import { db } from '../config/firebase';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import {
  mockBlogPosts,
  mockServices,
  mockFAQs,
  mockLegalDocuments,
  mockTeamMembers,
  mockTestimonials,
  mockStatistics,
  mockServiceAreas,
  mockGalleryItems,
  mockFamilyLawQAs,
  mockLegalArticles,
  mockLawExplanations,
  mockLegalTerms,
} from '../data/mockData';

const migrationData = [
  { collection: 'blogPosts', data: mockBlogPosts },
  { collection: 'services', data: mockServices },
  { collection: 'faqs', data: mockFAQs },
  { collection: 'legalDocuments', data: mockLegalDocuments },
  { collection: 'teamMembers', data: mockTeamMembers },
  { collection: 'testimonials', data: mockTestimonials },
  { collection: 'statistics', data: mockStatistics },
  { collection: 'serviceAreas', data: mockServiceAreas },
  { collection: 'gallery', data: mockGalleryItems },
  { collection: 'familyLawQAs', data: mockFamilyLawQAs },
  { collection: 'legalArticles', data: mockLegalArticles },
  { collection: 'lawExplanations', data: mockLawExplanations },
  { collection: 'legalTerms', data: mockLegalTerms },
];

/**
 * Migrate all mock data to Firebase
 */
export async function migrateAllData() {
  console.log('Bắt đầu migration dữ liệu từ Mock Data lên Firebase...\n');

  for (const { collection: collectionName, data } of migrationData) {
    try {
      console.log(`📦 Đang migrate collection: ${collectionName}`);
      console.log(`   Số lượng tài liệu: ${data.length}`);

      const collectionRef = collection(db, collectionName);

      for (const item of data) {
        const { id, ...itemData } = item;
        
        try {
          // Sử dụng ID hiện tại hoặc tạo ID mới
          if (id) {
            await setDoc(doc(db, collectionName, id), {
              ...itemData,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          } else {
            await addDoc(collectionRef, {
              ...itemData,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        } catch (itemError) {
          console.error(`   ❌ Lỗi khi migrate item: ${JSON.stringify(itemData)}`, itemError);
        }
      }

      console.log(`   ✅ Hoàn thành: ${collectionName}\n`);
    } catch (error) {
      console.error(`❌ Lỗi khi migrate collection ${collectionName}:`, error);
    }
  }

  console.log('✨ Hoàn thành migration dữ liệu!');
  console.log('\n⚠️  Lưu ý:');
  console.log('1. Kiểm tra Firebase Console để xác nhận dữ liệu');
  console.log('2. Cập nhật các component để sử dụng Firebase Services');
  console.log('3. Xóa mock data nếu không còn cần dùng');
}

// Chạy migration nếu script được gọi trực tiếp
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateAllData().catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
}
