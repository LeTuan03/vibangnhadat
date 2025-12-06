# 🚀 QUICK START GUIDE - Admin & Client Data Management

## Khởi động nhanh

### 1. **Bắt đầu dự án**
```bash
npm install
npm run dev
```

### 2. **Truy cập**
- **Client:** http://localhost:5173
- **Admin:** http://localhost:5173/admin (username: admin, password: admin)

---

## 📋 Các tính năng chính

### ✅ Admin Panel (Quản lý dữ liệu)
Tất cả dữ liệu được quản lý từ admin panel - không cần hardcode ở client

| Tính năng | URL | Chức năng |
|---------|-----|---------|
| Blog/Tin tức | `/admin/news` | Thêm/sửa/xóa bài viết |
| Dịch vụ | `/admin/services` | Quản lý dịch vụ pháp lý |
| Vi bằng | `/admin/viban` | Quản lý chứng chỉ vi bằng |
| Danh mục | `/admin/category` | Quản lý danh mục |
| Tài liệu | `/admin/documents` | Quản lý tài liệu pháp luật |
| Hỏi & Đáp | `/admin/qa` | Quản lý FAQ |
| **Thống kê** | `/admin/statistics` | 📊 Quản lý số liệu thống kê (NEW) |
| **Lĩnh vực dịch vụ** | `/admin/service-areas` | 🗺️ Quản lý lĩnh vực hoạt động (NEW) |
| **Hôn nhân - Gia đình** | `/admin/family-law` | 👨‍👩‍👧 Quản lý Q&A hôn nhân (NEW) |
| **Hình ảnh & Video** | `/admin/gallery` | 🖼️ Quản lý thư viện media (NEW) |
| **Đội ngũ** | `/admin/team` | 👥 Quản lý nhân sự (NEW) |
| **Thông tin công ty** | `/admin/company-info` | 🏢 Chỉnh sửa thông tin công ty (NEW) |
| Menu | `/admin/menu` | Chỉnh sửa menu client |

---

## 🎯 Cách sử dụng

### Thêm dữ liệu mới
1. Vào Admin Panel → Chọn module (vd: Blog)
2. Click nút "Thêm mới" (➕ icon)
3. Điền form → Click Save
4. Dữ liệu tự động hiển thị trên client

### Chỉnh sửa dữ liệu
1. Tìm item trong danh sách
2. Click nút "Chỉnh sửa" (✏️ icon)
3. Sửa thông tin → Click Save
4. Client tự động cập nhật

### Xóa dữ liệu
1. Click nút "Xóa" (🗑️ icon)
2. Xác nhận xóa
3. Dữ liệu bị xóa khỏi client ngay lập tức

---

## 🏗️ Kiến trúc dữ liệu

### Các entity chính
- **Blog** - Tin tức & bài viết
- **Services** - Dịch vụ pháp lý
- **FAQ** - Hỏi đáp
- **Documents** - Tài liệu pháp luật
- **Testimonials** - Bình luận khách hàng
- **TeamMembers** - Nhân sự
- **Statistics** - Thống kê (mới)
- **ServiceAreas** - Lĩnh vực (mới)
- **FamilyLawQA** - Hôn nhân gia đình (mới)
- **Gallery** - Ảnh & video (mới)
- **ContactInfo** - Thông tin liên hệ (mới)
- **CompanyInfo** - Thông tin công ty (mới)

### Lưu trữ dữ liệu
```
Admin Input → Service Layer → localStorage → Client Display
```

---

## 💡 Ví dụ thực tế

### Ví dụ 1: Thêm thống kê mới
```
1. Vào /admin/statistics
2. Click "Thêm mới"
3. Nhập:
   - Label: "Hôn nhân được bảo vệ"
   - Value: 1250
   - Suffix: "+"
   - Icon: FaHeart
4. Click Save
5. → Trang chủ tự động cập nhật thống kê
```

### Ví dụ 2: Thay đổi thông tin công ty
```
1. Vào /admin/company-info
2. Tab "Công ty":
   - Tên: "Văn phòng Thừa phát lại XYZ"
   - Slogan: "Bảo vệ quyền lợi của bạn"
   - Vision: "Trở thành đơn vị dẫn đầu..."
3. Click Save
4. → Header & Footer tự động cập nhật
```

### Ví dụ 3: Thêm bài viết blog
```
1. Vào /admin/news
2. Click "Thêm mới"
3. Điền thông tin bài viết
4. Click Save
5. → Blog page tự động hiển thị bài mới
```

---

## 🔍 Kiểm tra hệ thống

### Kiểm tra dữ liệu persist
```javascript
// Mở Console (F12) → paste:
JSON.parse(localStorage.getItem('statistics_data'))
// Sẽ thấy danh sách thống kê
```

### Reset dữ liệu
```javascript
// Xóa tất cả localStorage
localStorage.clear()
// Refresh page → dữ liệu reset về mock data mặc định
```

---

## ⚠️ Lưu ý quan trọng

### Dữ liệu lưu ở đâu?
- **Hiện tại:** localStorage (tạm thời)
- **Nhận xét:** Dữ liệu sẽ mất khi xóa cache hoặc đổi browser

### Để lưu vĩnh viễn:
1. **Tùy chọn 1:** Kết nối database (MongoDB/MySQL)
2. **Tùy chọn 2:** Tạo backend API (Node.js/Express)
3. **Tùy chọn 3:** Dùng Firebase

---

## 📱 Responsive Design
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

---

## 🎨 Styling & Themes
- **Framework:** Vite + React
- **Icons:** react-icons (FontAwesome, etc)
- **Notifications:** react-toastify
- **CSS:** Custom CSS + responsive grid

---

## 🔐 Admin Authentication
```
Default Login:
- Username: admin
- Password: admin

Lưu ý: Chỉ là demo frontend, không có backend security
Để production, cần implement:
- Secure password hashing
- JWT tokens
- Role-based access control
```

---

## 📂 File cần biết

### Data Sources
- **Mock Data:** `src/data/mockData.ts`
- **Service Layer:** `src/admin/api/*.ts`
- **Types:** `src/types/index.ts`

### Admin Components
- **CRUD UIs:** `src/admin/*/` (11 folders)
- **Admin Layout:** `src/admin/components/AdminLayout.tsx`

### Client Components
- **Pages:** `src/pages/*.tsx`
- **Components:** `src/components/*.tsx`
- **Routes:** `src/App.tsx`

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Output: `/dist` folder (ready to deploy)

### Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Your own server

---

## 📞 Troubleshooting

### Problem: Dữ liệu không hiển thị
**Solution:** 
- Kiểm tra browser console có error không
- Clear localStorage + F5 refresh
- Kiểm tra service có initialize mock data không

### Problem: Admin login không vào được
**Solution:**
- Username: `admin`
- Password: `admin`
- Dữ liệu lưu ở localStorage `adminLoggedIn`

### Problem: Build failed
**Solution:**
- Delete `node_modules`
- Run `npm install`
- Run `npm run build` lại

---

## 🎓 Học tập & Mở rộng

### Để hiểu hơn về hệ thống:
1. Đọc `src/admin/api/blogService.ts` - pattern chuẩn
2. Xem `src/components/Statistics.tsx` - client usage pattern
3. Check `App.tsx` - routing configuration

### Thêm entity mới:
1. Tạo mock data trong `mockData.ts`
2. Tạo service `src/admin/api/xxxService.ts`
3. Tạo admin component `src/admin/xxx/XxxAdmin.tsx`
4. Thêm route vào `App.tsx`
5. Thêm menu vào `AdminLayout.tsx`
6. Sử dụng trong client components

---

## 📊 System Stats

```
✅ Total Entities: 14
✅ Admin CRUD Components: 11
✅ Client Pages: 6
✅ Client Components: 15
✅ Service Classes: 13
✅ localStorage Keys: 14
✅ Routes: 30+
✅ Build Time: ~3.5s
✅ Bundle Size: 74.85 KB (gzip)
```

---

**Hệ thống sẵn sàng! Hãy bắt đầu quản lý dữ liệu từ Admin Panel!**

Nếu cần hỗ trợ, xem thêm:
- `SYSTEM_COMPLETENESS_CHECK.md` - Kiểm tra chi tiết
- `ADMIN_SETUP_GUIDE.md` - Hướng dẫn setup
- `ADMIN.md` - Admin panel guide
