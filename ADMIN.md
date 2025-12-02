# Hướng dẫn sử dụng Admin Panel (Demo)

## Đăng nhập Admin

Để truy cập trang quản trị, thêm `/admin` vào URL:

```
http://localhost:3000/admin
```

### Thông tin đăng nhập Demo:
- **Username**: `admin`
- **Password**: `admin123`

## Tính năng Admin (Frontend Demo)

### 1. Quản lý Tin tức
- Xem danh sách bài viết
- Thêm bài viết mới
- Sửa bài viết
- Xóa bài viết
- Upload ảnh đại diện

### 2. Quản lý Dịch vụ Thừa phát lại
- Cập nhật nội dung 4 dịch vụ chính
- Chỉnh sửa mô tả, lợi ích
- Quản lý chi tiết dịch vụ

### 3. Quản lý Lập vi bằng
- Quản lý 6 loại vi bằng
- Cập nhật yêu cầu hồ sơ
- Chỉnh sửa quy trình
- Cập nhật phí dịch vụ

## Lưu ý

⚠️ **Đây là phiên bản DEMO Frontend-only**

- Dữ liệu được lưu trong **localStorage**
- Khi refresh trình duyệt, dữ liệu sẽ bị mất
- Để lưu trữ vĩnh viễn, cần tích hợp Backend (Node.js/PHP + Database)

## Tích hợp Backend (Tùy chọn)

Để chuyển sang hệ thống thực tế, bạn cần:

1. **Backend API**:
   - Node.js + Express + MongoDB
   - Hoặc PHP + Laravel + MySQL

2. **Tính năng cần có**:
   - Authentication (JWT)
   - RESTful API cho CRUD
   - Upload file/image
   - Database để lưu trữ

3. **Bảo mật**:
   - Hash password
   - HTTPS
   - CORS configuration
   - Input validation

## Cấu trúc dữ liệu

### Blog Post
```typescript
{
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image?: string;
}
```

### Service
```typescript
{
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  benefits: string[];
}
```

### Vi bằng
```typescript
{
  id: string;
  title: string;
  description: string;
  requirements: string[];
  process: string[];
  fees: string;
}
```

## Liên hệ

Nếu cần hỗ trợ tích hợp Backend, vui lòng liên hệ.
