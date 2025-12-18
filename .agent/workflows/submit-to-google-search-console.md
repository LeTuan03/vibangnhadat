---
description: Submit website to Google Search Console for indexing
---

# Submit Website to Google Search Console

Workflow này hướng dẫn bạn submit website lên Google Search Console để Google có thể index và hiển thị trên kết quả tìm kiếm.

## Bước 1: Truy cập Google Search Console

1. Mở trình duyệt và truy cập: https://search.google.com/search-console
2. Đăng nhập bằng tài khoản Google của bạn
3. Nếu chưa có tài khoản Google, tạo một tài khoản mới

## Bước 2: Thêm Property (Website)

1. Click vào dropdown ở góc trên bên trái (hiện "Search property")
2. Click "Add property"
3. Chọn "URL prefix" (không chọn Domain)
4. Nhập URL: `https://thuaphatlaihoangmai.com`
5. Click "Continue"

## Bước 3: Xác minh quyền sở hữu

Google sẽ hiển thị nhiều phương thức xác minh. Chọn **HTML tag** vì website đã có sẵn meta tag:

1. Chọn tab "HTML tag"
2. Google sẽ hiển thị một meta tag như: 
   ```html
   <meta name="google-site-verification" content="YOUR_CODE_HERE" />
   ```
3. Kiểm tra xem code trong tag có khớp với code trong file `index.html` không:
   - Mở file `index.html`
   - Tìm dòng: `<meta name="google-site-verification" content="jDx4KyTfmB258qt8DCRxbIsSrAfTgg5Fn8vCf4Tn_aw" />`
   - Nếu code khớp, click "Verify"
   - Nếu không khớp, copy code mới từ Google và cập nhật vào `index.html`, sau đó deploy lại website

4. Click "Verify"
5. Nếu thành công, bạn sẽ thấy thông báo "Ownership verified"

## Bước 4: Submit Sitemap

1. Sau khi xác minh thành công, vào menu bên trái
2. Click "Sitemaps" (trong phần "Indexing")
3. Trong ô "Add a new sitemap", nhập: `sitemap.xml`
4. Click "Submit"
5. Đợi vài giây, status sẽ chuyển sang "Success"

## Bước 5: Request Indexing cho các trang quan trọng

Google sẽ tự động crawl website, nhưng bạn có thể request indexing thủ công để nhanh hơn:

1. Vào menu "URL Inspection" (ở đầu trang)
2. Nhập URL cần index, ví dụ: `https://thuaphatlaihoangmai.com`
3. Đợi Google kiểm tra
4. Click "Request Indexing"
5. Đợi 1-2 phút để Google xử lý
6. Lặp lại với các trang quan trọng khác:
   - `https://thuaphatlaihoangmai.com/blog`
   - `https://thuaphatlaihoangmai.com/services`
   - `https://thuaphatlaihoangmai.com/contact`

**Lưu ý:** Bạn chỉ có thể request indexing giới hạn số lần mỗi ngày (khoảng 10-20 URLs/ngày)

## Bước 6: Kiểm tra Coverage

1. Vào menu "Coverage" hoặc "Pages" (trong phần "Indexing")
2. Xem số trang được index
3. Kiểm tra xem có lỗi nào không
4. Nếu có lỗi, click vào để xem chi tiết và khắc phục

## Bước 7: Thiết lập Email Notifications

1. Click vào icon bánh răng (Settings) ở góc trên bên trái
2. Chọn "Users and permissions"
3. Thêm email của bạn
4. Bật notifications để nhận thông báo về issues

## Bước 8: Theo dõi Performance

Sau 1-2 tuần, kiểm tra performance:

1. Vào menu "Performance" (ở đầu danh sách)
2. Xem số liệu:
   - **Clicks**: Số lần người dùng click vào website từ Google
   - **Impressions**: Số lần website hiển thị trên kết quả tìm kiếm
   - **CTR**: Click-through rate (tỷ lệ click)
   - **Position**: Vị trí trung bình trên kết quả tìm kiếm
3. Xem các query (từ khóa) mà người dùng tìm kiếm

## Timeline dự kiến

| Thời gian | Kết quả |
|-----------|---------|
| Ngay sau khi submit | Sitemap được ghi nhận |
| 1-3 ngày | Google bắt đầu crawl website |
| 3-7 ngày | Một số trang được index |
| 1-2 tuần | Hầu hết các trang được index |
| 2-4 tuần | Bắt đầu xuất hiện trên kết quả tìm kiếm |
| 1-3 tháng | Ranking cải thiện dần |

## Troubleshooting

### Vấn đề: "Ownership verification failed"

**Giải pháp:**
1. Kiểm tra lại meta tag trong `index.html`
2. Đảm bảo website đã được deploy với code mới nhất
3. Clear cache trình duyệt và thử lại
4. Thử phương thức xác minh khác (HTML file upload)

### Vấn đề: "Sitemap could not be read"

**Giải pháp:**
1. Kiểm tra URL sitemap: `https://thuaphatlaihoangmai.com/sitemap.xml`
2. Mở URL trong trình duyệt để xem có lỗi XML không
3. Validate sitemap tại: https://www.xml-sitemaps.com/validate-xml-sitemap.html
4. Chạy lại: `npm run generate-sitemap`

### Vấn đề: "Discovered - currently not indexed"

**Giải pháp:**
1. Đây là trạng thái bình thường, Google đã phát hiện trang nhưng chưa index
2. Đợi thêm vài ngày
3. Cải thiện chất lượng nội dung
4. Thêm internal links đến trang đó
5. Request indexing thủ công

### Vấn đề: "Crawled - currently not indexed"

**Giải pháp:**
1. Google đã crawl nhưng chưa index vì nội dung chưa đủ giá trị
2. Cải thiện nội dung: thêm text, hình ảnh, video
3. Đảm bảo nội dung độc đáo, không duplicate
4. Thêm structured data
5. Cải thiện page speed

## Công cụ hữu ích

- **Rich Results Test**: https://search.google.com/test/rich-results
  - Test structured data của website
  
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
  - Kiểm tra website có thân thiện với mobile không
  
- **PageSpeed Insights**: https://pagespeed.web.dev/
  - Kiểm tra tốc độ tải trang
  
- **Sitemap Validator**: https://www.xml-sitemaps.com/validate-xml-sitemap.html
  - Validate sitemap.xml

## Best Practices

1. **Cập nhật nội dung thường xuyên**: Google ưu tiên website có nội dung mới
2. **Tối ưu tốc độ**: Website nhanh = ranking cao hơn
3. **Mobile-first**: Đảm bảo website hoạt động tốt trên mobile
4. **Quality content**: Nội dung chất lượng là yếu tố quan trọng nhất
5. **Internal linking**: Liên kết các trang với nhau
6. **External backlinks**: Có link từ website khác trỏ về
7. **Structured data**: Sử dụng schema.org markup
8. **HTTPS**: Website phải dùng HTTPS (đã có ✅)
9. **Sitemap cập nhật**: Chạy lại `npm run generate-sitemap` khi có nội dung mới
10. **Monitor regularly**: Kiểm tra Search Console hàng tuần

## Checklist

- [ ] Đăng nhập Google Search Console
- [ ] Thêm property với URL đúng
- [ ] Xác minh quyền sở hữu
- [ ] Submit sitemap.xml
- [ ] Request indexing cho homepage
- [ ] Request indexing cho các trang quan trọng
- [ ] Thiết lập email notifications
- [ ] Test rich results
- [ ] Test mobile-friendly
- [ ] Kiểm tra PageSpeed score
- [ ] Theo dõi coverage sau 1 tuần
- [ ] Kiểm tra performance sau 2 tuần

## Ghi chú

- SEO là quá trình dài hạn, cần kiên nhẫn
- Google có thể mất 1-4 tuần để index đầy đủ
- Ranking tốt có thể mất 3-6 tháng
- Tiếp tục cập nhật nội dung và theo dõi metrics
