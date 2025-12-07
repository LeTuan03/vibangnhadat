# Firebase Integration Guide

## Tổng quan
Ứng dụng đã được cấu hình để sử dụng Firebase Firestore cho CRUD và hiển thị dữ liệu. Tất cả các dịch vụ được tổ chức trong thư mục `src/services/`.

## Cài đặt

### 1. Cấu hình Firebase
Sửa file `.env.local` với thông tin dự án Firebase của bạn:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_DATABASE_URL=your_database_url_here
```

### 2. Khởi tạo Firestore Collections
Trong Firebase Console, tạo các collection sau:
- `blogPosts` - Bài viết blog
- `services` - Dịch vụ
- `faqs` - Câu hỏi thường gặp
- `legalDocuments` - Tài liệu pháp lý
- `teamMembers` - Thành viên đội ngũ
- `testimonials` - Lời chứng thực
- `statistics` - Thống kê
- `serviceAreas` - Khu vực dịch vụ
- `gallery` - Thư viện ảnh
- `familyLawQAs` - Q&A Luật Gia đình
- `legalArticles` - Bài viết pháp lý
- `lawExplanations` - Giải thích pháp luật
- `legalTerms` - Thuật ngữ pháp lý
- `references` - Tài liệu tham khảo

## Cấu trúc Services

### BaseFirebaseService
Lớp cơ sở cung cấp các phương thức CRUD chung:
- `getAll(constraints?)` - Lấy tất cả tài liệu
- `getById(id)` - Lấy tài liệu theo ID
- `create(data)` - Tạo tài liệu mới
- `update(id, data)` - Cập nhật tài liệu
- `delete(id)` - Xóa tài liệu
- `findWhere(fieldPath, operator, value)` - Truy vấn với điều kiện
- `getOrdered(fieldPath, direction, limitCount)` - Lấy dữ liệu có sắp xếp

### Các Services Cụ Thể

#### BlogFirebaseService
```typescript
import { BlogFirebaseService } from '../services';

// Lấy tất cả bài viết
const posts = await BlogFirebaseService.getAllPosts();

// Lấy bài viết nổi bật
const featured = await BlogFirebaseService.getFeaturedPosts(3);

// Lấy bài viết theo danh mục
const categoryPosts = await BlogFirebaseService.getPostsByCategory('Luật dân sự');

// Lấy bài viết theo tác giả
const authorPosts = await BlogFirebaseService.getPostsByAuthor('Luật sư Nguyễn Văn A');

// Tìm kiếm bài viết
const results = await BlogFirebaseService.searchPosts('hợp đồng');

// Lấy bài viết theo slug
const post = await BlogFirebaseService.getPostBySlug('hướng-dẫn-lập-hợp-đồng-dân-sự');

// Tăng lượt xem
await BlogFirebaseService.incrementViews(postId);

// Tạo bài viết mới
const newPost = await BlogFirebaseService.create({
  title: 'Tiêu đề bài viết',
  excerpt: 'Mô tả ngắn',
  content: 'Nội dung đầy đủ',
  author: 'Tác giả',
  date: new Date().toISOString().split('T')[0],
  category: 'Luật dân sự',
  image: 'url_hình_ảnh',
  featured: false,
  views: 0
});

// Cập nhật bài viết
const updated = await BlogFirebaseService.update(postId, {
  title: 'Tiêu đề mới'
});

// Xóa bài viết
await BlogFirebaseService.delete(postId);
```

#### ServiceFirebaseService
```typescript
import { ServiceFirebaseService } from '../services';

// Lấy tất cả dịch vụ
const services = await ServiceFirebaseService.getAllServices();

// Lấy dịch vụ theo ID
const service = await ServiceFirebaseService.getServiceById(serviceId);

// Tạo dịch vụ mới
const newService = await ServiceFirebaseService.createService({
  title: 'Tên dịch vụ',
  description: 'Mô tả',
  icon: 'FaIcon',
  details: ['Chi tiết 1', 'Chi tiết 2'],
  benefits: ['Lợi ích 1', 'Lợi ích 2']
});

// Cập nhật dịch vụ
const updated = await ServiceFirebaseService.updateService(serviceId, {
  title: 'Tên dịch vụ mới'
});

// Xóa dịch vụ
await ServiceFirebaseService.deleteService(serviceId);
```

#### QAFirebaseService (FAQ)
```typescript
import { QAFirebaseService } from '../services';

// Lấy tất cả FAQs
const faqs = await QAFirebaseService.getAllFAQs();

// Lấy FAQs theo danh mục
const categoryFAQs = await QAFirebaseService.getFAQsByCategory('Luật dân sự');

// Tìm kiếm FAQs
const results = await QAFirebaseService.searchFAQs('hôn nhân');

// Tăng lượt hữu ích
await QAFirebaseService.incrementHelpful(faqId);

// Tăng lượt xem
await QAFirebaseService.incrementViews(faqId);
```

#### DocumentFirebaseService
```typescript
import { DocumentFirebaseService } from '../services';

// Lấy tất cả tài liệu
const documents = await DocumentFirebaseService.getAllDocuments();

// Lấy tài liệu theo danh mục
const categoryDocs = await DocumentFirebaseService.getDocumentsByCategory('Hôn nhân');

// Tìm kiếm tài liệu
const results = await DocumentFirebaseService.searchDocuments('ly hôn');

// Lấy tài liệu theo ID
const doc = await DocumentFirebaseService.getDocumentById(docId);

// Tạo tài liệu mới
const newDoc = await DocumentFirebaseService.createDocument({
  title: 'Tiêu đề tài liệu',
  description: 'Mô tả',
  category: 'Danh mục',
  publishDate: new Date().toISOString().split('T')[0],
  fileUrl: 'url_tệp'
});
```

#### TeamFirebaseService
```typescript
import { TeamFirebaseService } from '../services';

// Lấy tất cả thành viên
const members = await TeamFirebaseService.getAllMembers();

// Lấy thành viên theo ID
const member = await TeamFirebaseService.getMemberById(memberId);

// Lấy thành viên theo chức vị
const managers = await TeamFirebaseService.getMembersByPosition('Giám đốc');

// Tạo thành viên mới
const newMember = await TeamFirebaseService.createMember({
  name: 'Tên',
  position: 'Chức vị',
  bio: 'Tiểu sử',
  email: 'email@example.com',
  phone: '0123456789',
  image: 'url_hình_ảnh'
});
```

#### TestimonialFirebaseService
```typescript
import { TestimonialFirebaseService } from '../services';

// Lấy tất cả lời chứng thực
const testimonials = await TestimonialFirebaseService.getAllTestimonials();

// Lấy lời chứng thực nổi bật
const featured = await TestimonialFirebaseService.getFeaturedTestimonials(3);

// Tạo lời chứng thực mới
const newTestimonial = await TestimonialFirebaseService.createTestimonial({
  name: 'Tên',
  position: 'Chức vị',
  company: 'Công ty',
  content: 'Nội dung chứng thực',
  rating: 5,
  image: 'url_hình_ảnh'
});
```

#### StatisticsFirebaseService
```typescript
import { StatisticsFirebaseService } from '../services';

// Lấy tất cả thống kê
const stats = await StatisticsFirebaseService.getAllStatistics();

// Lấy thống kê theo ID
const stat = await StatisticsFirebaseService.getStatisticById(statId);

// Tạo thống kê mới
const newStat = await StatisticsFirebaseService.createStatistic({
  label: 'Khách hàng',
  value: 1000,
  suffix: '+',
  icon: 'FaUsers'
});
```

#### ServiceAreaFirebaseService
```typescript
import { ServiceAreaFirebaseService } from '../services';

// Lấy tất cả khu vực dịch vụ
const areas = await ServiceAreaFirebaseService.getAllServiceAreas();

// Tìm kiếm khu vực dịch vụ
const results = await ServiceAreaFirebaseService.searchServiceAreas('Hà Nội');

// Lấy khu vực dịch vụ theo ID
const area = await ServiceAreaFirebaseService.getServiceAreaById(areaId);
```

#### GalleryFirebaseService
```typescript
import { GalleryFirebaseService } from '../services';

// Lấy tất cả hình ảnh/video
const items = await GalleryFirebaseService.getAllItems();

// Lấy hình ảnh theo danh mục
const categoryItems = await GalleryFirebaseService.getItemsByCategory('Sự kiện');

// Lấy hình ảnh theo ID
const item = await GalleryFirebaseService.getItemById(itemId);

// Tạo hình ảnh mới
const newItem = await GalleryFirebaseService.createItem({
  title: 'Tiêu đề',
  type: 'image',
  thumbnail: 'url_hình_thumbnail',
  description: 'Mô tả',
  category: 'Sự kiện'
});
```

#### FamilyLawFirebaseService
```typescript
import { FamilyLawFirebaseService } from '../services';

// Lấy tất cả Q&A luật gia đình
const qas = await FamilyLawFirebaseService.getAllQAs();

// Lấy Q&A theo ID
const qa = await FamilyLawFirebaseService.getQAById(qaId);

// Tìm kiếm Q&A
const results = await FamilyLawFirebaseService.searchQAs('ly hôn');

// Tạo Q&A mới
const newQA = await FamilyLawFirebaseService.createQA({
  question: 'Câu hỏi',
  image: 'url_hình_ảnh',
  shortDescription: 'Mô tả ngắn',
  fullDescription: 'Mô tả đầy đủ',
  category: 'Luật Gia đình'
});
```

#### LegalArticleFirebaseService
```typescript
import { LegalArticleFirebaseService } from '../services';

// Lấy tất cả bài viết pháp lý
const articles = await LegalArticleFirebaseService.getAllArticles();

// Lấy bài viết nổi bật
const featured = await LegalArticleFirebaseService.getFeaturedArticles(3);

// Lấy bài viết theo danh mục
const categoryArticles = await LegalArticleFirebaseService.getArticlesByCategory('Luật dân sự');

// Tìm kiếm bài viết
const results = await LegalArticleFirebaseService.searchArticles('hợp đồng');
```

#### LawExplanationFirebaseService
```typescript
import { LawExplanationFirebaseService } from '../services';

// Lấy tất cả giải thích pháp luật
const explanations = await LawExplanationFirebaseService.getAllExplanations();

// Lấy giải thích theo số luật
const explanation = await LawExplanationFirebaseService.getExplanationByLawNumber('17/2020/QH14');

// Lấy giải thích theo danh mục
const categoryExplanations = await LawExplanationFirebaseService.getExplanationsByCategory('Luật dân sự');

// Tìm kiếm giải thích
const results = await LawExplanationFirebaseService.searchExplanations('hôn nhân');
```

#### LegalTermFirebaseService
```typescript
import { LegalTermFirebaseService } from '../services';

// Lấy tất cả thuật ngữ pháp lý
const terms = await LegalTermFirebaseService.getAllTerms();

// Tìm kiếm thuật ngữ
const results = await LegalTermFirebaseService.searchTerms('hợp đồng');

// Lấy thuật ngữ theo tên
const term = await LegalTermFirebaseService.getTermByName('Hợp đồng');
```

#### ReferenceFirebaseService
```typescript
import { ReferenceFirebaseService } from '../services';

// Lấy tất cả tài liệu tham khảo
const references = await ReferenceFirebaseService.getAllReferences();

// Lấy tài liệu tham khảo theo danh mục
const categoryRefs = await ReferenceFirebaseService.getReferencesByCategory('Luật dân sự');

// Lấy chỉ các tài liệu đã xác minh
const verified = await ReferenceFirebaseService.getVerifiedReferences();

// Tìm kiếm tài liệu tham khảo
const results = await ReferenceFirebaseService.searchReferences('hôn nhân');
```

## Sử dụng trong React Components

### Ví dụ 1: Component hiển thị danh sách bài viết
```typescript
import React, { useState, useEffect } from 'react';
import { BlogFirebaseService } from '../services';
import { BlogPost } from '../types';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await BlogFirebaseService.getAllPosts();
        setPosts(data);
      } catch (err) {
        setError('Lỗi khi tải bài viết');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
};

export default BlogList;
```

### Ví dụ 2: Component tạo/chỉnh sửa bài viết (Admin)
```typescript
import React, { useState } from 'react';
import { BlogFirebaseService } from '../services';
import { BlogPost } from '../types';

const BlogForm: React.FC<{ postId?: string }> = ({ postId }) => {
  const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    image: '',
    featured: false,
    views: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (postId) {
        // Cập nhật bài viết
        await BlogFirebaseService.update(postId, formData);
        alert('Cập nhật thành công!');
      } else {
        // Tạo bài viết mới
        await BlogFirebaseService.create(formData);
        alert('Tạo mới thành công!');
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          author: '',
          date: new Date().toISOString().split('T')[0],
          category: '',
          image: '',
          featured: false,
          views: 0
        });
      }
    } catch (err) {
      setError('Lỗi khi lưu bài viết');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Tiêu đề"
        required
      />
      <textarea
        name="excerpt"
        value={formData.excerpt}
        onChange={handleChange}
        placeholder="Mô tả ngắn"
        required
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Nội dung"
        required
      />
      {/* Thêm các trường khác... */}
      <button type="submit" disabled={loading}>
        {loading ? 'Đang lưu...' : 'Lưu'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default BlogForm;
```

## Xử lý lỗi

Tất cả các services đều có try-catch để xử lý lỗi. Ví dụ:

```typescript
try {
  const posts = await BlogFirebaseService.getAllPosts();
  // Sử dụng dữ liệu
} catch (error) {
  console.error('Lỗi:', error);
  // Hiển thị thông báo lỗi cho người dùng
}
```

## Chuyển đổi từ Mock Data

Để chuyển đổi từ mock data sang Firebase:

1. **Tìm tất cả nơi sử dụng mock data:**
   - Tìm import từ `mockData.ts`
   - Tìm các lệnh gọi service từ `admin/api/`

2. **Thay thế với Firebase Services:**
   ```typescript
   // Trước
   import { mockBlogPosts } from '../data/mockData';
   import { blogService } from '../admin/api/blogService';
   blogService.initializePosts(mockBlogPosts);
   const posts = blogService.getAllPosts();

   // Sau
   import { BlogFirebaseService } from '../services';
   const posts = await BlogFirebaseService.getAllPosts();
   ```

3. **Nhớ xử lý async/await:**
   - Thêm `async` vào function
   - Thêm `await` khi gọi Firebase services
   - Thêm error handling

4. **Tải dữ liệu lên Firebase:**
   - Sử dụng Firebase Console hoặc script để import mock data
   - Hoặc tạo API endpoint để upload từ mock data

## Firestore Rules (Bảo mật)

Cập nhật Firestore Rules trong Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cho phép đọc công khai
    match /{document=**} {
      allow read: if true;
    }
    
    // Cho phép ghi cho admin (tùy chỉnh theo nhu cầu)
    match /blogPosts/{document=**} {
      allow write: if request.auth.uid != null;
    }
    
    match /services/{document=**} {
      allow write: if request.auth.uid != null;
    }
    
    // Thêm các quy tắc khác tương tự...
  }
}
```

## Tips & Best Practices

1. **Luôn xử lý loading state:**
   ```typescript
   const [loading, setLoading] = useState(false);
   // Cập nhật loading khi gọi API
   ```

2. **Luôn xử lý error state:**
   ```typescript
   const [error, setError] = useState<string | null>(null);
   // Hiển thị thông báo lỗi
   ```

3. **Sử dụng useEffect để tải dữ liệu:**
   ```typescript
   useEffect(() => {
     fetchData();
   }, []); // Tải một lần khi mount
   ```

4. **Cache dữ liệu nếu cần:**
   ```typescript
   const [cache, setCache] = useState<Map<string, any>>(new Map());
   ```

5. **Optimize queries:**
   - Chỉ tải dữ liệu cần thiết
   - Sử dụng pagination cho danh sách lớn
   - Sử dụng filtering và searching server-side khi có thể

## Troubleshooting

### Lỗi: "Firebase config không hợp lệ"
- Kiểm tra file `.env.local`
- Đảm bảo tất cả các biến môi trường được đặt đúng

### Lỗi: "Permission denied"
- Kiểm tra Firestore Rules
- Đảm bảo authentication được cấu hình đúng

### Dữ liệu không tải
- Kiểm tra collection name trong Firestore
- Kiểm tra browser console cho lỗi
- Kiểm tra Firebase Console logs

Để biết thêm chi tiết, xem tài liệu Firebase: https://firebase.google.com/docs/firestore
