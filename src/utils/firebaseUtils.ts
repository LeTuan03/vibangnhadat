/**
 * Firebase Migration Utilities
 * 
 * Công cụ hỗ trợ migrate dữ liệu từ Mock Data lên Firebase
 */

import { db } from '../config/firebase';
import { collection, addDoc, setDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';

/**
 * Migrate một mảng dữ liệu lên Firestore
 * @param collectionName - Tên collection
 * @param data - Mảng dữ liệu cần migrate
 * @returns Kết quả migration
 */
export async function migrateCollection<T extends { id?: string }>(
  collectionName: string,
  data: T[]
): Promise<{ success: number; failed: number; errors: any[] }> {
  const result = { success: 0, failed: 0, errors: [] as any[] };

  console.log(`\n📦 Đang migrate collection: ${collectionName}`);
  console.log(`   Số lượng tài liệu: ${data.length}`);

  for (let i = 0; i < data.length; i++) {
    try {
      const { id, ...itemData } = data[i];
      
      if (id) {
        // Nếu có ID, sử dụng setDoc để giữ nguyên ID
        await setDoc(doc(db, collectionName, id), {
          ...itemData,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        // Nếu không có ID, tạo ID mới
        await addDoc(collection(db, collectionName), {
          ...itemData,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      result.success++;
      
      // Log tiến độ mỗi 10 item
      if ((i + 1) % 10 === 0) {
        console.log(`   ⏳ Đã migrate: ${i + 1}/${data.length}`);
      }
    } catch (error) {
      result.failed++;
      result.errors.push({ index: i, data: data[i], error });
      console.error(`   ❌ Lỗi khi migrate item ${i}:`, error);
    }
  }

  console.log(`   ✅ Hoàn thành: ${result.success} thành công, ${result.failed} thất bại`);
  return result;
}

/**
 * Xóa tất cả dữ liệu trong collection
 * @param collectionName - Tên collection
 */
export async function clearCollection(collectionName: string): Promise<number> {
  console.log(`\n🗑️  Đang xóa collection: ${collectionName}`);

  const querySnapshot = await getDocs(collection(db, collectionName));
  let deletedCount = 0;

  for (const docSnap of querySnapshot.docs) {
    try {
      await deleteDoc(doc(db, collectionName, docSnap.id));
      deletedCount++;
    } catch (error) {
      console.error(`   ❌ Lỗi khi xóa document ${docSnap.id}:`, error);
    }
  }

  console.log(`   ✅ Đã xóa: ${deletedCount} tài liệu`);
  return deletedCount;
}

/**
 * Kiểm tra xem collection có dữ liệu hay không
 * @param collectionName - Tên collection
 */
export async function checkCollection(collectionName: string): Promise<number> {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.size;
}

/**
 * Hiển thị báo cáo migration
 */
export function printMigrationReport(results: Array<{ collection: string; result: any }>) {
  console.log('\n════════════════════════════════════════════════════════════');
  console.log('📊 BÁO CÁO MIGRATION');
  console.log('════════════════════════════════════════════════════════════\n');

  let totalSuccess = 0;
  let totalFailed = 0;

  results.forEach(({ collection: name, result }) => {
    totalSuccess += result.success;
    totalFailed += result.failed;
    
    const status = result.failed === 0 ? '✅' : '⚠️';
    console.log(`${status} ${name}`);
    console.log(`   ✓ Thành công: ${result.success}`);
    if (result.failed > 0) {
      console.log(`   ✗ Thất bại: ${result.failed}`);
    }
  });

  console.log('\n════════════════════════════════════════════════════════════');
  console.log(`Tổng: ${totalSuccess} thành công, ${totalFailed} thất bại`);
  console.log('════════════════════════════════════════════════════════════\n');
}

/**
 * Tạo backup của collection (download dữ liệu)
 */
export async function backupCollection(collectionName: string): Promise<any[]> {
  console.log(`\n💾 Đang backup collection: ${collectionName}`);

  const querySnapshot = await getDocs(collection(db, collectionName));
  const backup = [];

  for (const docSnap of querySnapshot.docs) {
    backup.push({
      id: docSnap.id,
      ...docSnap.data(),
    });
  }

  console.log(`   ✅ Đã backup: ${backup.length} tài liệu`);
  
  // Download file
  const dataStr = JSON.stringify(backup, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `${collectionName}-backup-${new Date().toISOString()}.json`;
  
  if (typeof window !== 'undefined') {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  return backup;
}

/**
 * Import dữ liệu từ file JSON
 */
export async function importFromJSON(
  collectionName: string,
  jsonFile: File
): Promise<{ success: number; failed: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        const result = await migrateCollection(collectionName, data);
        resolve({ success: result.success, failed: result.failed });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Lỗi khi đọc file'));
    };

    reader.readAsText(jsonFile);
  });
}

/**
 * Validate dữ liệu trước khi migrate
 */
export function validateData<T extends object>(data: T[], schema: Record<string, any>): { valid: boolean; errors: any[] } {
  const errors: any[] = [];

  data.forEach((item, index) => {
    Object.entries(schema).forEach(([field, type]) => {
      if (!(field in item)) {
        errors.push({
          index,
          field,
          error: `Trường '${field}' bắt buộc`,
        });
      } else if (typeof item[field as keyof T] !== type) {
        errors.push({
          index,
          field,
          error: `Trường '${field}' phải là kiểu ${type}`,
        });
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
