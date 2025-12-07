# Firebase Quick Reference - Cheat Sheet

## Cấu hình Ban Đầu

### 1. Environment Variables (.env.local)
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_URL=your_database_url
```

### 2. Collections Cần Tạo
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

## Import Services

```typescript
// Lấy một service
import { BlogFirebaseService } from '../services';

// Hoặc lấy tất cả services
import * as FirebaseServices from '../services';
```

## Các Thao Tác Cơ Bản

### Blog Service

```typescript
// Lấy tất cả
const posts = await BlogFirebaseService.getAllPosts();

// Lấy by ID
const post = await BlogFirebaseService.getById(postId);

// Tạo mới
const newPost = await BlogFirebaseService.create({
  title: 'Tiêu đề',
  excerpt: 'Mô tả',
  content: 'Nội dung',
  author: 'Tác giả',
  date: '2024-01-15',
  category: 'Luật dân sự',
  featured: false,
  views: 0
});

// Cập nhật
await BlogFirebaseService.update(postId, {
  title: 'Tiêu đề mới'
});

// Xóa
await BlogFirebaseService.delete(postId);

// Tìm kiếm
const results = await BlogFirebaseService.searchPosts('hợp đồng');

// Lấy theo danh mục
const categoryPosts = await BlogFirebaseService.getPostsByCategory('Luật dân sự');

// Lấy featured
const featured = await BlogFirebaseService.getFeaturedPosts(3);

// Tăng lượt xem
await BlogFirebaseService.incrementViews(postId);
```

### Service Service

```typescript
// Lấy tất cả
const services = await ServiceFirebaseService.getAllServices();

// Tạo mới
const newService = await ServiceFirebaseService.createService({
  title: 'Tên dịch vụ',
  description: 'Mô tả',
  icon: 'FaIcon',
  details: ['Chi tiết 1', 'Chi tiết 2'],
  benefits: ['Lợi ích 1', 'Lợi ích 2']
});

// Cập nhật
await ServiceFirebaseService.updateService(serviceId, {
  title: 'Tên mới'
});

// Xóa
await ServiceFirebaseService.deleteService(serviceId);
```

### QA/FAQ Service

```typescript
// Lấy tất cả
const faqs = await QAFirebaseService.getAllFAQs();

// Lấy theo danh mục
const categoryFAQs = await QAFirebaseService.getFAQsByCategory('Luật dân sự');

// Tìm kiếm
const results = await QAFirebaseService.searchFAQs('hôn nhân');

// Tăng lượt hữu ích
await QAFirebaseService.incrementHelpful(faqId);

// Tăng lượt xem
await QAFirebaseService.incrementViews(faqId);

// Tạo FAQ
await QAFirebaseService.create({
  question: 'Câu hỏi?',
  answer: 'Câu trả lời',
  category: 'Danh mục',
  tags: ['tag1', 'tag2']
});
```

### Document Service

```typescript
// Lấy tất cả
const documents = await DocumentFirebaseService.getAllDocuments();

// Lấy theo danh mục
const categoryDocs = await DocumentFirebaseService.getDocumentsByCategory('Hôn nhân');

// Tìm kiếm
const results = await DocumentFirebaseService.searchDocuments('ly hôn');

// Tạo
await DocumentFirebaseService.createDocument({
  title: 'Tiêu đề',
  description: 'Mô tả',
  category: 'Danh mục',
  publishDate: '2024-01-15',
  fileUrl: 'https://...'
});

// Cập nhật
await DocumentFirebaseService.updateDocument(docId, {
  title: 'Tiêu đề mới'
});

// Xóa
await DocumentFirebaseService.deleteDocument(docId);
```

### Team Service

```typescript
// Lấy tất cả
const members = await TeamFirebaseService.getAllMembers();

// Lấy theo chức vị
const managers = await TeamFirebaseService.getMembersByPosition('Giám đốc');

// Tạo thành viên
await TeamFirebaseService.createMember({
  name: 'Tên',
  position: 'Chức vị',
  bio: 'Tiểu sử',
  email: 'email@example.com',
  phone: '0123456789'
});

// Cập nhật
await TeamFirebaseService.updateMember(memberId, {
  name: 'Tên mới'
});

// Xóa
await TeamFirebaseService.deleteMember(memberId);
```

### Testimonial Service

```typescript
// Lấy tất cả
const testimonials = await TestimonialFirebaseService.getAllTestimonials();

// Lấy featured
const featured = await TestimonialFirebaseService.getFeaturedTestimonials(3);

// Tạo
await TestimonialFirebaseService.createTestimonial({
  name: 'Tên',
  position: 'Chức vị',
  company: 'Công ty',
  content: 'Nội dung',
  rating: 5
});

// Cập nhật
await TestimonialFirebaseService.updateTestimonial(testimonialId, {
  rating: 4
});

// Xóa
await TestimonialFirebaseService.deleteTestimonial(testimonialId);
```

### Statistics Service

```typescript
// Lấy tất cả
const stats = await StatisticsFirebaseService.getAllStatistics();

// Tạo
await StatisticsFirebaseService.createStatistic({
  label: 'Khách hàng',
  value: 1000,
  suffix: '+',
  icon: 'FaUsers'
});

// Cập nhật
await StatisticsFirebaseService.updateStatistic(statId, {
  value: 1500
});

// Xóa
await StatisticsFirebaseService.deleteStatistic(statId);
```

### Gallery Service

```typescript
// Lấy tất cả
const items = await GalleryFirebaseService.getAllItems();

// Lấy theo danh mục
const categoryItems = await GalleryFirebaseService.getItemsByCategory('Sự kiện');

// Tạo
await GalleryFirebaseService.createItem({
  title: 'Tiêu đề',
  type: 'image',
  thumbnail: 'url',
  description: 'Mô tả',
  category: 'Sự kiện'
});

// Cập nhật
await GalleryFirebaseService.updateItem(itemId, {
  title: 'Tiêu đề mới'
});

// Xóa
await GalleryFirebaseService.deleteItem(itemId);
```

### Service Area Service

```typescript
// Lấy tất cả
const areas = await ServiceAreaFirebaseService.getAllServiceAreas();

// Lấy by ID
const area = await ServiceAreaFirebaseService.getServiceAreaById(areaId);

// Tìm kiếm
const results = await ServiceAreaFirebaseService.searchServiceAreas('Hà Nội');

// Tạo
await ServiceAreaFirebaseService.createServiceArea({
  title: 'Tên khu vực',
  image: 'url',
  description: 'Mô tả',
  details: ['Chi tiết 1']
});

// Cập nhật
await ServiceAreaFirebaseService.updateServiceArea(areaId, {
  title: 'Tên mới'
});

// Xóa
await ServiceAreaFirebaseService.deleteServiceArea(areaId);
```

### Family Law Service

```typescript
// Lấy tất cả
const qas = await FamilyLawFirebaseService.getAllQAs();

// Lấy by ID
const qa = await FamilyLawFirebaseService.getQAById(qaId);

// Tìm kiếm
const results = await FamilyLawFirebaseService.searchQAs('ly hôn');

// Tạo
await FamilyLawFirebaseService.createQA({
  question: 'Câu hỏi',
  image: 'url',
  shortDescription: 'Mô tả ngắn',
  category: 'Luật Gia đình'
});

// Cập nhật
await FamilyLawFirebaseService.updateQA(qaId, {
  question: 'Câu hỏi mới'
});

// Xóa
await FamilyLawFirebaseService.deleteQA(qaId);
```

### Legal Article Service

```typescript
// Lấy tất cả
const articles = await LegalArticleFirebaseService.getAllArticles();

// Lấy featured
const featured = await LegalArticleFirebaseService.getFeaturedArticles(3);

// Lấy theo danh mục
const categoryArticles = await LegalArticleFirebaseService.getArticlesByCategory('Luật dân sự');

// Tìm kiếm
const results = await LegalArticleFirebaseService.searchArticles('hợp đồng');

// Tạo
await LegalArticleFirebaseService.createArticle({
  title: 'Tiêu đề',
  category: 'Luật dân sự',
  content: 'Nội dung',
  relatedLaws: ['law1', 'law2'],
  datePublished: '2024-01-15',
  readTime: 5
});

// Cập nhật
await LegalArticleFirebaseService.updateArticle(articleId, {
  title: 'Tiêu đề mới'
});

// Xóa
await LegalArticleFirebaseService.deleteArticle(articleId);
```

### Law Explanation Service

```typescript
// Lấy tất cả
const explanations = await LawExplanationFirebaseService.getAllExplanations();

// Lấy theo số luật
const explanation = await LawExplanationFirebaseService.getExplanationByLawNumber('17/2020/QH14');

// Lấy theo danh mục
const categoryExp = await LawExplanationFirebaseService.getExplanationsByCategory('Luật dân sự');

// Tìm kiếm
const results = await LawExplanationFirebaseService.searchExplanations('hôn nhân');

// Tạo
await LawExplanationFirebaseService.createExplanation({
  lawName: 'Luật Hôn nhân và Gia đình',
  lawNumber: '17/2020/QH14',
  publishedDate: '2024-01-15',
  effectiveDate: '2024-02-01',
  mainPoints: ['Điểm 1', 'Điểm 2'],
  applicationScope: 'Toàn quốc'
});

// Cập nhật
await LawExplanationFirebaseService.updateExplanation(explanationId, {
  lawName: 'Tên mới'
});

// Xóa
await LawExplanationFirebaseService.deleteExplanation(explanationId);
```

### Legal Term Service

```typescript
// Lấy tất cả
const terms = await LegalTermFirebaseService.getAllTerms();

// Lấy by ID
const term = await LegalTermFirebaseService.getTermById(termId);

// Lấy theo tên thuật ngữ
const term = await LegalTermFirebaseService.getTermByName('Hợp đồng');

// Tìm kiếm
const results = await LegalTermFirebaseService.searchTerms('hợp đồng');

// Tạo
await LegalTermFirebaseService.createTerm({
  term: 'Hợp đồng',
  definition: 'Định nghĩa',
  relatedLaws: ['law1', 'law2'],
  pronunciation: 'Cách phát âm',
  englishEquivalent: 'Contract'
});

// Cập nhật
await LegalTermFirebaseService.updateTerm(termId, {
  definition: 'Định nghĩa mới'
});

// Xóa
await LegalTermFirebaseService.deleteTerm(termId);
```

### Reference Service

```typescript
// Lấy tất cả
const references = await ReferenceFirebaseService.getAllReferences();

// Lấy theo danh mục
const categoryRefs = await ReferenceFirebaseService.getReferencesByCategory('Luật dân sự');

// Lấy verified only
const verified = await ReferenceFirebaseService.getVerifiedReferences();

// Lấy by ID
const reference = await ReferenceFirebaseService.getReferenceById(refId);

// Tìm kiếm
const results = await ReferenceFirebaseService.searchReferences('hôn nhân');

// Tạo
await ReferenceFirebaseService.createReference({
  name: 'Tên tài liệu',
  url: 'https://example.com',
  description: 'Mô tả',
  category: 'Luật dân sự',
  isVerified: true
});

// Cập nhật
await ReferenceFirebaseService.updateReference(refId, {
  name: 'Tên mới'
});

// Xóa
await ReferenceFirebaseService.deleteReference(refId);
```

## Xử Lý Lỗi

```typescript
try {
  const data = await BlogFirebaseService.getAllPosts();
  // Xử lý dữ liệu
} catch (error) {
  console.error('Lỗi:', error);
  // Hiển thị thông báo lỗi cho người dùng
}
```

## Loading & Error States

```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<BlogPost[]>([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await BlogFirebaseService.getAllPosts();
      setData(result);
    } catch (err) {
      setError('Lỗi khi tải dữ liệu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
if (data.length === 0) return <EmptyState />;
```

## Utility Functions

```typescript
import {
  migrateCollection,
  clearCollection,
  checkCollection,
  printMigrationReport,
  backupCollection,
  validateData
} from '../utils/firebaseUtils';

// Migration
const result = await migrateCollection('blogPosts', mockBlogPosts);

// Clear collection
await clearCollection('blogPosts');

// Check size
const size = await checkCollection('blogPosts');

// Backup
const backup = await backupCollection('blogPosts');

// Validate
const { valid, errors } = validateData(data, {
  title: 'string',
  content: 'string'
});
```

## Firestore Rules Cơ Bản

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cho phép đọc công khai
    match /{document=**} {
      allow read: if true;
    }
    
    // Chỉ cho phép ghi cho authenticated users
    match /{document=**} {
      allow write: if request.auth.uid != null;
    }
  }
}
```

## Tips & Tricks

1. **Luôn sử dụng try-catch** khi gọi Firebase services
2. **Thêm loading states** để cải thiện UX
3. **Cache dữ liệu** nếu cần performance cao
4. **Sử dụng pagination** cho danh sách lớn
5. **Đặt indexes** cho các queries phức tạp
6. **Monitor console logs** để phát hiện lỗi
7. **Kiểm tra Firestore Rules** nếu có permission errors

## Tài Liệu Tham Khảo

- [FIREBASE_GUIDE.md](./FIREBASE_GUIDE.md) - Hướng dẫn chi tiết
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Hướng dẫn migration
- [Firebase Docs](https://firebase.google.com/docs)
