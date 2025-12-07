# Hướng dẫn Migrate Dữ liệu từ Mock Data sang Firebase

## Bước 1: Chuẩn bị

### 1.1 Cấu hình Firebase
Tạo file `.env.local` ở thư mục gốc của dự án:

```env
VITE_FIREBASE_API_KEY=AIzaSyB...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc...
VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
```

Để lấy thông tin này:
1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Chọn dự án của bạn
3. Nhấp vào ⚙️ Settings
4. Chọn tab "Service accounts"
5. Chọn "Generate new private key"
6. Copy các giá trị vào `.env.local`

### 1.2 Tạo Collections trong Firestore

Để tạo collections tự động, bạn có thể:

**Option A: Tạo thủ công trong Firebase Console**
1. Truy cập [Firestore Database](https://console.firebase.google.com/)
2. Nhấp "Start collection"
3. Tạo các collection sau:
   - `blogPosts`
   - `services`
   - `faqs`
   - `legalDocuments`
   - `teamMembers`
   - `testimonials`
   - `statistics`
   - `serviceAreas`
   - `gallery`
   - `familyLawQAs`
   - `legalArticles`
   - `lawExplanations`
   - `legalTerms`
   - `references`

**Option B: Sử dụng script migration (sẽ tự tạo collections)**
Script migration sẽ tự động tạo collections khi upload dữ liệu.

## Bước 2: Chạy Migration

### 2.1 Phương pháp 1: Sử dụng Component Migration UI

Bạn có thể tạo một admin page để chạy migration:

```tsx
import React, { useState } from 'react';
import { 
  migrateCollection, 
  clearCollection, 
  printMigrationReport 
} from '../utils/firebaseUtils';
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

const MigrationPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleMigrate = async () => {
    setLoading(true);
    setStatus('Đang migrate dữ liệu...');

    const collections = [
      { name: 'blogPosts', data: mockBlogPosts },
      { name: 'services', data: mockServices },
      { name: 'faqs', data: mockFAQs },
      { name: 'legalDocuments', data: mockLegalDocuments },
      { name: 'teamMembers', data: mockTeamMembers },
      { name: 'testimonials', data: mockTestimonials },
      { name: 'statistics', data: mockStatistics },
      { name: 'serviceAreas', data: mockServiceAreas },
      { name: 'gallery', data: mockGalleryItems },
      { name: 'familyLawQAs', data: mockFamilyLawQAs },
      { name: 'legalArticles', data: mockLegalArticles },
      { name: 'lawExplanations', data: mockLawExplanations },
      { name: 'legalTerms', data: mockLegalTerms },
    ];

    const results = [];

    for (const col of collections) {
      try {
        const result = await migrateCollection(col.name, col.data);
        results.push({ collection: col.name, result });
      } catch (error) {
        console.error(`Error migrating ${col.name}:`, error);
        results.push({ 
          collection: col.name, 
          result: { success: 0, failed: col.data.length } 
        });
      }
    }

    printMigrationReport(results);
    setStatus('Migration hoàn thành! Kiểm tra console để xem chi tiết.');
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Firebase Migration Tool</h1>
      <button 
        onClick={handleMigrate} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Đang migrate...' : 'Bắt đầu Migration'}
      </button>
      {status && <p style={{ marginTop: '20px' }}>{status}</p>}
    </div>
  );
};

export default MigrationPage;
```

### 2.2 Phương pháp 2: Sử dụng Node Script

1. Tạo file `migrate.js` ở thư mục dự án:

```javascript
// migrate.js
const admin = require('firebase-admin');

const serviceAccount = {
  projectId: 'your-project-id',
  privateKey: 'your-private-key',
  clientEmail: 'your-client-email',
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const mockData = require('./src/data/mockData');

async function migrate() {
  const collections = [
    { name: 'blogPosts', data: mockData.mockBlogPosts },
    { name: 'services', data: mockData.mockServices },
    // ... thêm các collection khác
  ];

  for (const col of collections) {
    console.log(`Migrating ${col.name}...`);
    for (const item of col.data) {
      const { id, ...data } = item;
      if (id) {
        await db.collection(col.name).doc(id).set(data);
      } else {
        await db.collection(col.name).add(data);
      }
    }
    console.log(`✅ ${col.name} completed`);
  }

  console.log('Migration completed!');
  process.exit(0);
}

migrate().catch(error => {
  console.error(error);
  process.exit(1);
});
```

2. Chạy script:
```bash
node migrate.js
```

## Bước 3: Cập nhật Components

### 3.1 Thay thế Mock Data bằng Firebase Services

**Trước:**
```tsx
import { mockBlogPosts } from '../data/mockData';
import { blogService } from '../admin/api/blogService';

const MyComponent = () => {
  const [posts] = useState(() => {
    blogService.initializePosts(mockBlogPosts);
    return blogService.getAllPosts();
  });
  // ...
};
```

**Sau:**
```tsx
import { BlogFirebaseService } from '../services';
import { BlogPost } from '../types';

const MyComponent = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await BlogFirebaseService.getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  // ...
};
```

### 3.2 Cập nhật các component sau:

1. **BlogList.tsx** - ✅ Đã cập nhật
2. **Services.tsx**
3. **QA.tsx**
4. **Gallery.tsx**
5. **Testimonials.tsx**
6. **Statistics.tsx**
7. **LegalDocuments.tsx**
8. **Knowledge.tsx**
9. **About.tsx**
10. **Contact.tsx**

## Bước 4: Kiểm tra

### 4.1 Xác nhận dữ liệu trong Firebase

1. Truy cập [Firestore Database](https://console.firebase.google.com/)
2. Kiểm tra từng collection để đảm bảo dữ liệu đã được upload
3. Đảm bảo tất cả dữ liệu đã được migrate đúng

### 4.2 Kiểm tra trong ứng dụng

1. Chạy ứng dụng: `npm run dev`
2. Truy cập các trang và xác nhận dữ liệu hiển thị đúng
3. Kiểm tra Browser DevTools → Network để xem Firebase requests

## Bước 5: Dọn dẹp

### 5.1 Xóa Mock Data (tùy chọn)

Khi đã chắc chắn Firebase hoạt động đúng, bạn có thể xóa:

```bash
rm src/data/mockData.ts
```

### 5.2 Xóa Admin Services cũ (tùy chọn)

```bash
rm src/admin/api/*.ts
```

### 5.3 Cập nhật imports

Tìm và xóa tất cả các import từ `mockData` và `admin/api`:

```bash
# Tìm các import cần xóa
grep -r "from.*mockData" src/
grep -r "from.*admin/api" src/
```

## Troubleshooting

### Lỗi: Firebase không khởi tạo

**Giải pháp:**
- Kiểm tra `.env.local` có tất cả các giá trị
- Đảm bảo Firebase project đã được enable Firestore
- Kiểm tra kết nối internet

### Lỗi: Permission denied

**Giải pháp:**
- Cập nhật Firestore Security Rules (xem FIREBASE_GUIDE.md)
- Đảm bảo xác thực được cấu hình

### Dữ liệu không hiển thị

**Giải pháp:**
- Kiểm tra console log để xem có lỗi không
- Xác nhận collection name chính xác
- Kiểm tra Firestore Rules cho phép đọc

### Performance chậm

**Giải pháp:**
- Thêm indexes cho các queries thường dùng
- Implement pagination cho danh sách lớn
- Sử dụng caching nếu cần

## Tự động hóa Migration cho môi trường mới

Tạo file `scripts/setup.sh`:

```bash
#!/bin/bash

echo "🚀 Thiết lập Firebase Migration..."

# Kiểm tra .env.local
if [ ! -f .env.local ]; then
  echo "❌ .env.local không tìm thấy"
  echo "⚠️  Vui lòng tạo file .env.local với cấu hình Firebase"
  exit 1
fi

# Cài đặt dependencies
echo "📦 Cài đặt dependencies..."
npm install

# Chạy migration
echo "🔄 Bắt đầu migration..."
npm run migrate

echo "✅ Migration hoàn thành!"
echo "📝 Tiếp theo: Cập nhật các component để sử dụng Firebase Services"
```

Chạy:
```bash
bash scripts/setup.sh
```

## Tài liệu tham khảo

- [Firebase Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [React with Firebase](https://react.dev/learn#staying-up-to-date)

## Câu hỏi thường gặp

**Q: Tôi có cần xóa mock data không?**
A: Không bắt buộc, nhưng nên xóa để giảm kích thước bundle.

**Q: Tôi có thể rollback nếu có vấn đề không?**
A: Có, bạn có thể export dữ liệu từ Firebase về JSON để backup.

**Q: Tôi có thể chạy migration nhiều lần không?**
A: Có, nhưng nên xóa dữ liệu cũ trước để tránh trùng lặp.

**Q: Làm thế nào để thêm dữ liệu mới trong admin panel?**
A: Sử dụng các Firebase Services (ví dụ: BlogFirebaseService.create()).
