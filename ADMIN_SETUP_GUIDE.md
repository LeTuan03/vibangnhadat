# Hệ Thống Admin CRUD với Mock Data

## 📋 Tổng Quan

Hệ thống đã được cấu hình với:
- ✅ Mock Data cho tất cả modules (Blog, Services, Viban, Category, Documents, QA)
- ✅ Hệ thống Service CRUD cho mỗi module
- ✅ Admin Panel đầy đủ với menu quản lý
- ✅ Kết nối giữa Admin và Client sử dụng chung mock data

## 📁 Cấu Trúc Dự Án

### Mock Data Layer
```
src/data/
  └── mockData.ts          // Tất cả mock data cho admin
```

### Admin Services (CRUD)
```
src/admin/api/
  ├── blogService.ts       // CRUD Blog/Tin tức
  ├── serviceService.ts    // CRUD Dịch vụ
  ├── documentService.ts   // CRUD Tài liệu pháp luật
  ├── qaService.ts         // CRUD Hỏi & Đáp
  ├── categoryService.ts   // CRUD Danh mục
  └── vibanService.ts      // CRUD Vi bằng
```

### Admin Components
```
src/admin/
  ├── components/AdminLayout.tsx    // Menu & Layout
  ├── news/NewAdmin.tsx             // CRUD Blog
  ├── services/ServicesAdmin.tsx    // CRUD Services
  ├── viban/VibanAdmin.tsx          // CRUD Viban
  ├── category/CategoryAdmin.tsx    // CRUD Category
  ├── documents/DocumentsAdmin.tsx  // CRUD Documents
  ├── qa/QAAdmin.tsx                // CRUD QA
  └── documents/Admin.css           // Styles chung
```

### Client Components (sử dụng mock data)
```
src/components/
  ├── BlogList.tsx         // Lấy dữ liệu từ blogService
  ├── Services.tsx         // Lấy dữ liệu từ serviceService
  ├── QA.tsx               // Lấy dữ liệu từ qaService
  └── LegalDocuments.tsx   // Lấy dữ liệu từ documentService
```

## 🚀 Cách Sử Dụng

### 1. Đăng Nhập Admin

Truy cập: `http://localhost:5173/admin/login`

**Tài khoản demo:** (Đã cài sẵn, không cần token)
- Có thể truy cập ngay bằng username/password (hoặc tùy chỉnh tại AdminLogin.tsx)

### 2. Quản Lý Menu

Admin Panel có các menu:
- 📰 **Quản lý Tin tức & Blog** - CRUD bài viết
- 📋 **Quản lý Dịch vụ** - CRUD dịch vụ
- 👥 **Quản lý Vi bằng** - CRUD vi bằng
- 🏷️ **Quản lý Danh mục** - CRUD danh mục
- 📚 **Quản lý Tài liệu** - CRUD tài liệu pháp luật
- ❓ **Quản lý Hỏi & Đáp** - CRUD FAQ

### 3. Thao Tác CRUD

Mỗi module hỗ trợ:
- **Thêm mới** (+) - Mở form nhập liệu
- **Sửa** (✏️) - Chỉnh sửa bản ghi
- **Xóa** (🗑️) - Xóa bản ghi
- **Tìm kiếm** - Tìm theo từ khóa

### 4. Dữ Liệu Client

Các trang client tự động lấy dữ liệu từ mock data:

```
Trang chủ
  ├── Dịch vụ: /src/components/Services.tsx
  │   └── Lấy từ: serviceService + mockServices
  │
Blog/Tin tức: /blog
  └── Lấy từ: blogService + mockBlogPosts
  
Hỏi & Đáp: /qa
  └── Lấy từ: qaService + mockFAQs
  
Tài liệu pháp luật: /documents
  └── Lấy từ: documentService + mockLegalDocuments
```

## 💾 Dữ Liệu Mock Hiện Có

### Blog Posts (3 bài)
- Hướng dẫn lập hợp đồng dân sự
- Quy trình giải quyết tranh chấp lao động
- Thủ tục ly hôn tại Việt Nam

### Services (4 dịch vụ)
- Luật Doanh Nghiệp
- Luật Đất Đai
- Luật Hôn Nhân Gia Đình
- Luật Lao Động

### Documents (3 tài liệu)
- Luật Hôn nhân và Gia đình năm 2000
- Bộ Luật Dân sự năm 2015
- Luật Lao động năm 2012

### FAQs (4 câu hỏi)
- Hợp đồng lao động phải có những gì?
- Thủ tục ly hôn bao lâu?
- Làm sao để bảo vệ quyền lợi người mua bất động sản?
- Nhân viên có quyền từ chối làm việc ngoài giờ không?

### Categories (5 danh mục)
- Luật dân sự
- Luật lao động
- Hôn nhân gia đình
- Luật đất đai
- Luật thương mại

### Vibans (2 mẫu vi bằng)
- Vi bằng Pháp lý số 001
- Vi bằng Hợp đồng số 002

## 🔄 Flow Dữ Liệu

```
Mock Data (mockData.ts)
    ↓
Service Layer (blogService, serviceService, etc.)
    ↓
  /  \
 /    \
Admin   Client
Panel   Pages
```

### Admin Panel Flow:
1. User đăng nhập
2. Admin mở menu CRUD
3. Service khởi tạo với mockData
4. User thêm/sửa/xóa → Service cập nhật state
5. Dữ liệu cập nhật trong bộ nhớ

### Client Flow:
1. Component mount (VD: Services.tsx)
2. Service khởi tạo với mockData
3. Component lấy getAllXXX() từ service
4. Render dữ liệu

## 📝 Thêm Dữ Liệu Mới

### 1. Thêm vào Mock Data

Sửa `src/data/mockData.ts`:
```typescript
export const mockBlogPosts: BlogPost[] = [
    {
        id: 'blog-1',
        title: 'Tiêu đề bài viết',
        excerpt: 'Mô tả ngắn',
        content: 'Nội dung',
        author: 'Tác giả',
        date: '2024-01-15',
        category: 'Danh mục',
        image: 'URL hình ảnh'
    },
    // ...
];
```

### 2. Khởi tạo Service ở Admin

```typescript
useEffect(() => {
    serviceXXX.initializeXXX(mockXXX);
    loadXXX();
}, []);
```

### 3. Hiển thị ở Client

```typescript
const [data] = useState(() => {
    serviceXXX.initializeXXX(mockXXX);
    return serviceXXX.getAllXXX();
});
```

## 🎨 Giao Diện

### Admin Styles
- CSS chung: `src/admin/documents/Admin.css`
- Hỗ trợ responsive design
- Themes: Xanh (Primary), Xanh lá (Success), Đỏ (Danger)

### Components
- Form Modal: Thêm/Sửa với validation
- Data Table: Hiển thị danh sách với actions
- Search Box: Tìm kiếm theo từ khóa

## 🛠️ Chỉnh Sửa/Mở Rộng

### Thêm Module Mới

1. **Tạo Mock Data** → `mockData.ts`
2. **Tạo Service** → `src/admin/api/xxxService.ts`
3. **Tạo Admin Component** → `src/admin/xxx/XxxAdmin.tsx`
4. **Thêm Route** → `App.tsx`
5. **Thêm Menu** → `AdminLayout.tsx`
6. **Tạo Client Component** nếu cần

### Thay Đổi Dữ Liệu

**⚠️ Lưu ý:** Mock data lưu trong state, không lưu persistence.
Để lưu lâu dài, cần:
1. Sử dụng localStorage
2. Kết nối database backend
3. Thêm API endpoints

## 🚨 Troubleshooting

### 1. Data không cập nhật
- Kiểm tra service đã initialize chưa
- Kiểm tra useState dependencies

### 2. Menu không hiển thị
- Verify AdminLayout.tsx có link route
- Check App.tsx routing

### 3. Component bị lỗi
- Kiểm tra import path (src/admin/api/...)
- Kiểm tra export default

## 📞 Hỗ Trợ

Tất cả services hỗ trợ:
- ✅ Initialize data
- ✅ Get all records
- ✅ Get by ID
- ✅ Create new
- ✅ Update
- ✅ Delete
- ✅ Search
- ✅ Filter by category

## 📌 Ghi Chú

- Mock data khởi tạo khi component mount
- Data lưu trong state (in-memory)
- Refresh page sẽ reset data về mock data ban đầu
- Có thể mở rộng để sử dụng database backend sau
