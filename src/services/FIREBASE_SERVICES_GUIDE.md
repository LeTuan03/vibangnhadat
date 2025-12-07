# Firebase Services Integration Guide

## Tổng Quan

Tất cả các Firebase services đã được ghép lại trong file `adminServices.ts`. Đây là điểm truy cập duy nhất cho tất cả các CRUD operations.

## Cấu Trúc

```
src/
├── services/
│   ├── BaseFirebaseService.ts          # Base class cho tất cả services
│   ├── BlogFirebaseService.ts
│   ├── ServiceFirebaseService.ts
│   ├── TeamFirebaseService.ts
│   ├── DocumentFirebaseService.ts
│   ├── QAFirebaseService.ts
│   ├── StatisticsFirebaseService.ts
│   ├── GalleryFirebaseService.ts
│   ├── TestimonialFirebaseService.ts
│   ├── ServiceAreaFirebaseService.ts
│   ├── FamilyLawFirebaseService.ts
│   ├── LegalArticleFirebaseService.ts
│   ├── LawExplanationFirebaseService.ts
│   ├── LegalTermFirebaseService.ts
│   ├── ReferenceFirebaseService.ts
│   ├── adminServices.ts                # Tổng hợp tất cả services
│   ├── index.ts                        # Export point
│   └── FIREBASE_SERVICES_GUIDE.md      # File hướng dẫn này
└── config/
    └── firebase.ts                     # Firebase config
```

## Cách Sử Dụng

### 1. Import Services

```typescript
// Cách 1: Import từ services
import { 
  getAllBlogPosts, 
  createBlogPost,
  updateBlogPost,
  deleteBlogPost 
} from '@/services';

// Cách 2: Import trực tiếp từ adminServices
import { getAllBlogPosts } from '@/services/adminServices';

// Cách 3: Import service class
import BlogFirebaseService from '@/services/BlogFirebaseService';
```

### 2. Sử Dụng Services

#### Blog Services
```typescript
// Lấy tất cả bài viết
const posts = await getAllBlogPosts();

// Lấy bài viết theo ID
const post = await getBlogPostById('postId');

// Tạo bài viết
const newPost = await createBlogPost({
  title: 'Tiêu đề',
  content: 'Nội dung',
  author: 'Tác giả',
  date: new Date(),
});

// Cập nhật bài viết
const updated = await updateBlogPost('postId', {
  title: 'Tiêu đề mới'
});

// Xóa bài viết
await deleteBlogPost('postId');
```

#### Document Services
```typescript
// Lấy tất cả tài liệu
const documents = await getAllDocuments();

// Tạo tài liệu
const newDoc = await createDocument({
  name: 'Tên tài liệu',
  category: 'Hôn nhân',
  content: 'Nội dung',
});

// Cập nhật tài liệu
const updated = await updateDocument('docId', {
  name: 'Tên mới'
});

// Xóa tài liệu
await deleteDocument('docId');
```

#### Team Services
```typescript
// Lấy tất cả thành viên
const team = await getAllTeamMembers();

// Tạo thành viên
const member = await createTeamMember({
  name: 'Tên thành viên',
  role: 'Luật sư',
  bio: 'Tiểu sử',
  image: 'URL ảnh',
});

// Cập nhật thành viên
const updated = await updateTeamMember('memberId', {
  name: 'Tên mới'
});

// Xóa thành viên
await deleteTeamMember('memberId');
```

#### Service Area Services
```typescript
// Lấy tất cả service areas
const areas = await getAllServiceAreas();

// Tạo service area
const area = await createServiceArea({
  name: 'Hà Nội',
  description: 'Mô tả',
  region: 'Miền Bắc',
});

// Cập nhật service area
const updated = await updateServiceArea('areaId', {
  name: 'Tên mới'
});

// Xóa service area
await deleteServiceArea('areaId');
```

#### Gallery Services
```typescript
// Lấy tất cả items
const items = await getAllGalleryItems();

// Tạo item
const item = await createGalleryItem({
  title: 'Tiêu đề',
  image: 'URL ảnh',
  category: 'Văn phòng',
});

// Cập nhật item
const updated = await updateGalleryItem('itemId', {
  title: 'Tiêu đề mới'
});

// Xóa item
await deleteGalleryItem('itemId');
```

#### Testimonial Services
```typescript
// Lấy tất cả testimonials
const testimonials = await getAllTestimonials();

// Tạo testimonial
const testimonial = await createTestimonial({
  clientName: 'Tên khách hàng',
  content: 'Nội dung',
  rating: 5,
});

// Cập nhật testimonial
const updated = await updateTestimonial('testimonialId', {
  clientName: 'Tên mới'
});

// Xóa testimonial
await deleteTestimonial('testimonialId');
```

#### Service Services
```typescript
// Lấy tất cả dịch vụ
const services = await getAllServices();

// Tạo dịch vụ
const service = await createService({
  name: 'Tên dịch vụ',
  description: 'Mô tả',
  icon: 'Biểu tượng',
});

// Cập nhật dịch vụ
const updated = await updateService('serviceId', {
  name: 'Tên mới'
});

// Xóa dịch vụ
await deleteService('serviceId');
```

#### Statistics Services
```typescript
// Lấy tất cả thống kê
const stats = await getAllStatistics();

// Tạo thống kê
const stat = await createStatistic({
  label: 'Trường hợp',
  value: 100,
});

// Cập nhật thống kê
const updated = await updateStatistic('statId', {
  value: 150
});

// Xóa thống kê
await deleteStatistic('statId');
```

#### QA Services
```typescript
// Lấy tất cả FAQs
const faqs = await getAllFAQs();

// Tạo FAQ
const faq = await createFAQ({
  question: 'Câu hỏi',
  answer: 'Trả lời',
  category: 'Chung',
});

// Cập nhật FAQ
const updated = await updateFAQ('faqId', {
  answer: 'Trả lời mới'
});

// Xóa FAQ
await deleteFAQ('faqId');
```

#### Family Law Services
```typescript
// Lấy tất cả Family Law QAs
const qas = await getAllFamilyLawQAs();

// Tạo Family Law QA
const qa = await createFamilyLawQA({
  question: 'Câu hỏi',
  answer: 'Trả lời',
  category: 'Hôn nhân',
});

// Cập nhật
const updated = await updateFamilyLawQA('qaId', {
  answer: 'Trả lời mới'
});

// Xóa
await deleteFamilyLawQA('qaId');
```

#### Legal Article Services
```typescript
// Lấy tất cả articles
const articles = await getAllLegalArticles();

// Lấy article theo ID
const article = await getLegalArticleById('articleId');

// Lấy articles theo category
const categoryArticles = await getLegalArticlesByCategory('Hôn nhân');

// Lấy featured articles
const featured = await getFeaturedLegalArticles(5);

// Tạo article
const newArticle = await createLegalArticle({
  title: 'Tiêu đề',
  content: 'Nội dung',
  category: 'Hôn nhân',
});

// Cập nhật
const updated = await updateLegalArticle('articleId', {
  title: 'Tiêu đề mới'
});

// Xóa
await deleteLegalArticle('articleId');
```

#### Law Explanation Services
```typescript
// Lấy tất cả explanations
const explanations = await getAllLawExplanations();

// Lấy explanation theo ID
const explanation = await getLawExplanationById('explanationId');

// Lấy explanation theo law number
const byLaw = await getLawExplanationByLawNumber('Luật 01/2023');

// Lấy explanations theo category
const byCategory = await getLawExplanationsByCategory('Hôn nhân');

// Tạo explanation
const newExplanation = await createLawExplanation({
  title: 'Tiêu đề',
  content: 'Nội dung',
  lawNumber: 'Luật 01/2023',
  category: 'Hôn nhân',
});

// Cập nhật
const updated = await updateLawExplanation('explanationId', {
  title: 'Tiêu đề mới'
});

// Xóa
await deleteLawExplanation('explanationId');
```

#### Legal Term Services
```typescript
// Lấy tất cả terms
const terms = await getAllLegalTerms();

// Lấy term theo ID
const term = await getLegalTermById('termId');

// Tìm kiếm terms
const searchResults = await searchLegalTerms('hôn nhân');

// Tạo term
const newTerm = await createLegalTerm({
  term: 'Thuật ngữ',
  definition: 'Định nghĩa',
  category: 'Hôn nhân',
});

// Cập nhật
const updated = await updateLegalTerm('termId', {
  definition: 'Định nghĩa mới'
});

// Xóa
await deleteLegalTerm('termId');
```

#### Reference Services
```typescript
// Lấy tất cả references
const references = await getAllReferences();

// Lấy reference theo ID
const reference = await getReferenceById('refId');

// Lấy references theo type
const byType = await getReferencesByType('Luật');

// Tạo reference
const newRef = await createReference({
  title: 'Tiêu đề',
  url: 'URL',
  type: 'Luật',
});

// Cập nhật
const updated = await updateReference('refId', {
  title: 'Tiêu đề mới'
});

// Xóa
await deleteReference('refId');
```

## Đặc Điểm

✅ **Ghép Tất Cả Services**: Tất cả 14 Firebase services đã được tổng hợp  
✅ **Import Gọn Gàng**: Một điểm import duy nhất  
✅ **Type Safe**: Tất cả các hàm có TypeScript types  
✅ **Async/Await**: Tất cả các operations hỗ trợ async/await  
✅ **Error Handling**: Các service có built-in error handling  
✅ **Dễ Mở Rộng**: Dễ thêm các operations mới  

## File Liên Quan

- `src/config/firebase.ts` - Firebase configuration
- `src/services/BaseFirebaseService.ts` - Base class với common methods
- `src/types/index.ts` - TypeScript types cho tất cả entities
- `src/services/adminServices.ts` - Admin services wrapper

## Lưu Ý

1. Tất cả các operations đều async, cần sử dụng `await`
2. Các errors được throw ra, cần handle với try/catch
3. IDs được tạo tự động bởi Firestore
4. Timestamps được quản lý tự động bởi services

## Ví Dụ Hoàn Chỉnh

```typescript
import { 
  getAllBlogPosts, 
  createBlogPost,
  updateBlogPost,
  deleteBlogPost 
} from '@/services';

async function manageBlogPosts() {
  try {
    // Lấy tất cả bài viết
    const posts = await getAllBlogPosts();
    console.log('Posts:', posts);

    // Tạo bài viết mới
    const newPost = await createBlogPost({
      title: 'Bài viết mới',
      content: 'Nội dung bài viết',
      author: 'Tác giả',
      date: new Date(),
    });
    console.log('Created:', newPost);

    // Cập nhật bài viết
    const updated = await updateBlogPost(newPost.id!, {
      title: 'Tiêu đề được cập nhật'
    });
    console.log('Updated:', updated);

    // Xóa bài viết
    await deleteBlogPost(newPost.id!);
    console.log('Deleted');

  } catch (error) {
    console.error('Error:', error);
  }
}
```
