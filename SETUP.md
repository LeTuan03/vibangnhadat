# Hướng dẫn khắc phục lỗi PowerShell và chạy dự án

## Vấn đề

Khi chạy `npm install` hoặc `npm run dev`, bạn gặp lỗi:
```
npm : File C:\nvm4w\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

## Giải pháp

### Cách 1: Thay đổi Execution Policy (Khuyến nghị)

1. **Mở PowerShell với quyền Administrator**:
   - Nhấn `Windows + X`
   - Chọn "Windows PowerShell (Admin)" hoặc "Terminal (Admin)"

2. **Chạy lệnh sau**:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Xác nhận** khi được hỏi bằng cách gõ `Y` và Enter

4. **Đóng PowerShell Admin** và mở lại PowerShell thường

5. **Chạy lại lệnh**:
   ```bash
   cd d:\reactjs\vibangnhadat
   npm install
   ```

### Cách 2: Sử dụng Command Prompt (CMD)

1. **Mở Command Prompt**:
   - Nhấn `Windows + R`
   - Gõ `cmd` và Enter

2. **Di chuyển đến thư mục dự án**:
   ```cmd
   cd d:\reactjs\vibangnhadat
   ```

3. **Chạy npm commands**:
   ```cmd
   npm install
   npm run dev
   ```

### Cách 3: Bypass Execution Policy (Tạm thời)

Trong PowerShell, chạy:
```powershell
powershell -ExecutionPolicy Bypass -Command "npm install"
```

## Các bước tiếp theo sau khi cài đặt thành công

### 1. Cài đặt dependencies
```bash
npm install
```

Quá trình này sẽ cài đặt:
- react, react-dom (UI framework)
- react-router-dom (routing)
- react-icons (icons)
- vite (build tool)
- typescript (type checking)
- @vitejs/plugin-react (Vite plugin)

### 2. Chạy development server
```bash
npm run dev
```

Website sẽ tự động mở tại: `http://localhost:3000`

### 3. Cập nhật nội dung

Mở file `src/data/content.ts` và cập nhật:

**Thông tin liên hệ thực tế**:
```typescript
export const contactInfo: ContactInfo = {
  phone: '0901234567',              // ← Thay số điện thoại thực
  email: 'contact@example.com',     // ← Thay email thực
  address: '123 Đường ABC...',      // ← Thay địa chỉ thực
  // ...
};
```

**Google Maps**:
1. Truy cập [Google Maps](https://www.google.com/maps)
2. Tìm địa chỉ văn phòng của bạn
3. Click "Share" → "Embed a map"
4. Copy iframe src URL
5. Paste vào `googleMapsEmbed` trong `content.ts`

**Tọa độ Google Maps**:
1. Click chuột phải vào vị trí trên Google Maps
2. Click vào tọa độ (ví dụ: 10.762622, 106.660172)
3. Cập nhật vào `coordinates` trong `content.ts`

### 4. Build cho production

Khi đã hoàn thành và muốn deploy:

```bash
npm run build
```

Files production sẽ được tạo trong thư mục `dist/`

### 5. Preview production build

```bash
npm run preview
```

## Cấu trúc dự án

```
d:/reactjs/vibangnhadat/
├── src/
│   ├── components/     # React components
│   ├── data/          # ← CẬP NHẬT NỘI DUNG Ở ĐÂY
│   ├── hooks/         # Custom hooks
│   ├── types/         # TypeScript types
│   ├── utils/         # Helper functions
│   └── index.css      # Global styles
├── public/            # Static files
├── index.html         # HTML template
└── package.json       # Dependencies
```

## Tính năng chính

✅ **Responsive design** - Hoạt động trên mọi thiết bị
✅ **Zalo integration** - Click để mở Zalo
✅ **Phone integration** - Click để gọi điện
✅ **Google Maps** - Click để mở chỉ đường
✅ **Contact form** - Form liên hệ với validation
✅ **SEO optimized** - Meta tags, sitemap
✅ **Modern animations** - Smooth, professional

## Troubleshooting

### Lỗi: Port 3000 đã được sử dụng

Thay đổi port trong `vite.config.ts`:
```typescript
server: {
  port: 3001, // Thay đổi port
  open: true,
}
```

### Lỗi: Module not found

Chạy lại:
```bash
npm install
```

### Website không hiển thị đúng

1. Xóa cache: Ctrl + Shift + R (hard refresh)
2. Kiểm tra console (F12) xem có lỗi không
3. Đảm bảo đã chạy `npm run dev`

## Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra file `README.md`
2. Xem `walkthrough.md` để biết chi tiết tính năng
3. Kiểm tra console log trong browser (F12)

---

**Chúc bạn thành công!** 🎉
