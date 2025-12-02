# React Router - Hướng dẫn sử dụng

## 🚀 Routes đã cấu hình

### Client Routes (Public)

#### Trang chủ
```
URL: http://localhost:3000/
Component: HomePage
```

Hiển thị tất cả sections:
- Hero
- About
- Statistics
- Services
- Vi bằng Services
- Testimonials
- Knowledge
- Contact
- Newsletter
- Footer

### Admin Routes (Protected)

#### Admin Login
```
URL: http://localhost:3000/admin/login
Component: AdminLoginPage
```

**Demo Credentials:**
- Username: `admin`
- Password: `admin123`

#### Admin Dashboard
```
URL: http://localhost:3000/admin/dashboard
Component: AdminDashboard
```

**Yêu cầu**: Phải đăng nhập

**Tính năng:**
- Quản lý Tin tức (CRUD)
- Quản lý Dịch vụ
- Quản lý Vi bằng
- Đăng xuất

#### Admin Redirect
```
URL: http://localhost:3000/admin
Redirect: /admin/login
```

### 404 Page
```
URL: Bất kỳ route không tồn tại
Component: NotFound
```

## 🔐 Authentication Flow

### Login Process
1. User truy cập `/admin/login`
2. Nhập username/password
3. Nếu đúng → Lưu vào localStorage → Redirect `/admin/dashboard`
4. Nếu sai → Hiển thị error message

### Protected Routes
- `/admin/dashboard` chỉ truy cập được khi đã login
- Nếu chưa login → Redirect về `/admin/login`
- Nếu đã login và vào `/admin/login` → Redirect về `/admin/dashboard`

### Logout Process
1. Click nút "Đăng xuất" trong Dashboard
2. Xóa localStorage
3. Redirect về `/admin/login`

## 📁 Cấu trúc Files

```
src/
├── App.tsx                      # Router configuration
├── pages/
│   ├── HomePage.tsx            # Client homepage
│   ├── AdminLoginPage.tsx      # Admin login
│   └── AdminDashboard.tsx      # Admin dashboard
└── components/
    ├── AdminLogin.tsx          # Login form component
    ├── NotFound.tsx            # 404 page
    └── ... (other components)
```

## 🔧 Navigation trong Code

### Link giữa các trang

```typescript
import { Link } from 'react-router-dom';

// Về trang chủ
<Link to="/">Trang chủ</Link>

// Đến admin
<Link to="/admin/login">Admin</Link>
```

### Programmatic Navigation

```typescript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate to home
navigate('/');

// Navigate to admin
navigate('/admin/dashboard');
```

### Redirect

```typescript
import { Navigate } from 'react-router-dom';

// Redirect component
<Navigate to="/admin/login" replace />
```

## 🛠️ Mở rộng Routes

### Thêm route mới

Trong `App.tsx`:

```typescript
<Routes>
  {/* Existing routes */}
  
  {/* New route */}
  <Route path="/new-page" element={<NewPage />} />
</Routes>
```

### Thêm nested routes

```typescript
<Route path="/admin" element={<AdminLayout />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="users" element={<Users />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

### Route với parameters

```typescript
// Define route
<Route path="/blog/:id" element={<BlogDetail />} />

// Use in component
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  // ...
};
```

## 📝 Best Practices

1. **Lazy Loading** (cho performance):
```typescript
const HomePage = lazy(() => import('./pages/HomePage'));

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
</Suspense>
```

2. **Protected Route Component**:
```typescript
const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('adminLoggedIn');
  return isAuth ? children : <Navigate to="/admin/login" />;
};
```

3. **404 Handling**:
```typescript
// Always put at the end
<Route path="*" element={<NotFound />} />
```

## 🔗 Useful Hooks

### useNavigate
```typescript
const navigate = useNavigate();
navigate('/path');
navigate(-1); // Go back
```

### useLocation
```typescript
const location = useLocation();
console.log(location.pathname); // Current path
```

### useParams
```typescript
const { id } = useParams();
```

### useSearchParams
```typescript
const [searchParams] = useSearchParams();
const query = searchParams.get('q');
```

## 🚨 Troubleshooting

### Issue: 404 khi refresh page
**Solution**: Configure server để serve `index.html` cho tất cả routes

Vite dev server đã tự động xử lý.

### Issue: Route không hoạt động
**Check**:
1. `BrowserRouter` đã wrap App chưa?
2. Import đúng components chưa?
3. Path có đúng không? (case-sensitive)

## 📚 Tài liệu tham khảo

- [React Router Docs](https://reactrouter.com/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
