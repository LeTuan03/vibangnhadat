# Quick SEO Checklist - thuaphatlaihoangmai.com

## ✅ Đã hoàn thành

### Technical SEO
- [x] Meta title tag tối ưu
- [x] Meta description hấp dẫn
- [x] Meta keywords
- [x] Robots meta tag (index, follow)
- [x] Canonical URL
- [x] Google Site Verification tag
- [x] robots.txt file
- [x] sitemap.xml file
- [x] HTTPS enabled
- [x] Mobile responsive
- [x] Fast loading (Vite build)

### Structured Data
- [x] Organization schema
- [x] LocalBusiness/LegalService schema
- [x] WebSite schema with SearchAction
- [x] Opening hours
- [x] Geo coordinates
- [x] Contact information

### Social Media
- [x] Open Graph tags (Facebook)
- [x] Twitter Card tags
- [ ] og-image.jpg (cần tạo)

### Content
- [x] Unique, quality content
- [x] Vietnamese language
- [x] Proper heading structure
- [x] Internal linking
- [x] Alt text for images

## 🔄 Cần làm ngay

### 1. Tạo og-image.jpg
```bash
# Tạo hình ảnh 1200x630px với:
# - Logo công ty
# - Tên: "Văn phòng Thừa phát lại Hoàng Mai"
# - Slogan
# - Lưu vào: public/og-image.jpg
```

### 2. Submit lên Google Search Console
```bash
# Làm theo workflow:
# /submit-to-google-search-console
```

### 3. Kiểm tra SEO
```bash
npm run check-seo
```

### 4. Test website
- [ ] Rich Results Test: https://search.google.com/test/rich-results
- [ ] Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- [ ] PageSpeed Insights: https://pagespeed.web.dev/

## 📊 Monitoring (Sau khi submit)

### Tuần 1
- [ ] Kiểm tra Coverage trong Search Console
- [ ] Xem số trang được crawl
- [ ] Fix các lỗi nếu có

### Tuần 2-4
- [ ] Kiểm tra số trang được index
- [ ] Request indexing cho trang chưa được index
- [ ] Xem Performance metrics

### Tháng 2-3
- [ ] Theo dõi traffic từ Google
- [ ] Phân tích keywords
- [ ] Tối ưu content dựa trên data

## 🎯 KPIs to Track

| Metric | Target (3 tháng) |
|--------|------------------|
| Pages Indexed | 100% |
| Organic Traffic | 100+ visits/month |
| Average Position | < 20 |
| Click-through Rate | > 2% |
| Core Web Vitals | All Green |

## 🔧 Commands

```bash
# Kiểm tra SEO
npm run check-seo

# Tạo lại sitemap
npm run generate-sitemap

# Build production
npm run build

# Preview production build
npm run preview
```

## 📚 Resources

- SEO Guide: `SEO_OPTIMIZATION_GUIDE.md`
- Submit Workflow: `.agent/workflows/submit-to-google-search-console.md`
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com/

## 🚨 Common Issues

### Issue: Google chưa index sau 2 tuần
**Solution:**
1. Request indexing thủ công
2. Kiểm tra robots.txt không block
3. Thêm backlinks
4. Cải thiện content quality

### Issue: Ranking thấp
**Solution:**
1. Tối ưu keywords
2. Cải thiện page speed
3. Thêm nội dung chất lượng
4. Build backlinks
5. Cải thiện user experience

### Issue: High bounce rate
**Solution:**
1. Cải thiện page load speed
2. Tối ưu mobile experience
3. Làm content hấp dẫn hơn
4. Thêm call-to-actions
5. Cải thiện navigation

## 📞 Next Actions

1. **Immediate (Hôm nay)**
   - [ ] Tạo og-image.jpg
   - [ ] Submit lên Google Search Console
   - [ ] Request indexing cho homepage

2. **This Week**
   - [ ] Request indexing cho tất cả trang chính
   - [ ] Test với Rich Results
   - [ ] Kiểm tra mobile-friendly
   - [ ] Đăng ký Google My Business

3. **This Month**
   - [ ] Tạo backlinks
   - [ ] Viết thêm blog posts
   - [ ] Tối ưu page speed
   - [ ] Theo dõi metrics

4. **Ongoing**
   - [ ] Cập nhật content hàng tuần
   - [ ] Monitor Search Console
   - [ ] Phản hồi user feedback
   - [ ] A/B testing
