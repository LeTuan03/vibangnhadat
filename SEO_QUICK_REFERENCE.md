# 🔑 SEO Quick Reference Guide

**For:** Văn phòng Thừa phát lại Website  
**Updated:** December 11, 2024

---

## 🎯 One-Page SEO Quick Reference

### Adding SEO to a Page (30 seconds)

```tsx
import { useSEO } from '../hooks/useSEO';

const MyNewPage: React.FC = () => {
  // Call the hook at the start of your component
  useSEO({
    title: 'Your Page Title - Văn phòng Thừa phát lại',      // 50-60 chars
    description: 'Your page description for search results', // 150-160 chars
    keywords: 'keyword1, keyword2, keyword3',
    ogImage: '/path-to-image.jpg',  // 1200x630px minimum
  });

  return (/* Your JSX */);
};

export default MyNewPage;
```

---

## 📋 Essential SEO Fields

| Field | Length | Example | Why |
|-------|--------|---------|-----|
| Title | 50-60 | "Hướng dẫn Lập Vi Bằng - Văn phòng Thừa phát lại" | Fits in Google search |
| Description | 150-160 | "Tìm hiểu chi tiết quy trình lập vi bằng..." | Fits in search snippet |
| Keywords | 5-10 | "lập vi bằng, thi hành án, pháp luật" | Relevant search terms |
| OG Image | 1200x630 | Featured image | Social media preview |

---

## 🔧 Common Patterns

### Blog/Article Page

```tsx
import { useSEO, generateArticleStructuredData } from '../hooks/useSEO';

const ArticlePage: React.FC = () => {
  const article = { /* your article data */ };

  useSEO({
    title: `${article.title} - Văn phòng Thừa phát lại`,
    description: article.excerpt,
    keywords: article.tags?.join(', '),
    ogType: 'article',
    ogImage: article.image,
    structuredData: generateArticleStructuredData({
      title: article.title,
      description: article.excerpt,
      image: article.image,
      author: article.author,
      publishedDate: article.date,
      content: article.content,
    })
  });

  return (/* Article content */);
};
```

### Service/Product Page

```tsx
useSEO({
  title: 'Dịch vụ Lập Vi Bằng - Văn phòng Thừa phát lại',
  description: 'Dịch vụ lập vi bằng chuyên nghiệp, uy tín với đội ngũ luật sư giàu kinh nghiệm',
  keywords: 'lập vi bằng, thi hành án, pháp luật',
  ogImage: '/service-image.jpg',
});
```

### List/Category Page

```tsx
useSEO({
  title: 'Danh Sách Bài Viết Pháp Lý - Văn phòng Thừa phát lại',
  description: 'Khám phá các bài viết pháp lý chi tiết về thi hành án, lập vi bằng, tương đạt văn bản',
  keywords: 'bài viết pháp luật, hướng dẫn, tư vấn',
  canonical: `${window.location.origin}/blog`,
});
```

---

## 🖼️ Open Graph Images

### Recommended Sizes

- **Optimal:** 1200 x 630 pixels
- **Minimum:** 600 x 315 pixels
- **Aspect Ratio:** 1.91:1
- **File Size:** < 100KB
- **Format:** JPG, PNG, or WebP

### Where Used

- Facebook shares
- LinkedIn posts
- WhatsApp previews
- Pinterest pins
- Other social media

### File Placement

Store images in `/public/`:
```
/public/
  og-image.jpg          # Default fallback
  og-home.jpg           # Home page
  og-blog.jpg           # Blog posts
  og-service.jpg        # Services
```

---

## 🚀 Commands Reference

```bash
# Generate/update sitemaps
npm run generate-sitemap

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔍 Testing URLs

### Google Tools

1. **PageSpeed Insights** (Page speed)
   - https://pagespeed.web.dev

2. **Rich Results Test** (Structured data)
   - https://search.google.com/test/rich-results

3. **Mobile-Friendly Test** (Mobile compatibility)
   - https://search.google.com/test/mobile-friendly

4. **Search Console** (Indexing & ranking)
   - https://search.google.com/search-console

### Facebook Tools

1. **Sharing Debugger** (OG tag preview)
   - https://developers.facebook.com/tools/debug/

---

## 📊 Checklist Before Publishing

- [ ] Title is 50-60 characters
- [ ] Description is 150-160 characters
- [ ] Keywords are relevant (5-10 words)
- [ ] Featured image exists (1200x630px)
- [ ] All links are relative (`/page` not `domain.com/page`)
- [ ] Images have alt text
- [ ] Content is 1000+ words (for articles)
- [ ] Headings are properly hierarchical (H1, H2, H3)
- [ ] No broken internal links
- [ ] Meta tags are reviewed for accuracy

---

## 🎨 Heading Structure Example

```tsx
<article>
  <h1>Main Article Title (appears once)</h1>
  
  <h2>Main Section 1</h2>
  <p>Content...</p>
  
  <h3>Subsection 1.1</h3>
  <p>Content...</p>
  
  <h3>Subsection 1.2</h3>
  <p>Content...</p>
  
  <h2>Main Section 2</h2>
  <p>Content...</p>
</article>
```

---

## 🔗 Internal Linking

### Good Practices

```html
<!-- ✅ Good: Descriptive anchor text -->
<a href="/blog/lap-vi-bang">Hướng dẫn chi tiết lập vi bằng</a>

<!-- ✅ Good: Links related content -->
<a href="/services/lap-vi-bang">Dịch vụ lập vi bằng</a>

<!-- ❌ Bad: Generic text -->
<a href="/blog/123">Click here</a>

<!-- ❌ Bad: Exact match anchors -->
<a href="/lap-vi-bang">lap vi bang</a>
```

### Linking Strategy

1. Link related articles naturally
2. Link blog posts to service pages
3. Link Q&A to relevant content
4. Create breadcrumb navigation
5. Link to category pages from posts

---

## 📱 Mobile Meta Tags

```html
<!-- Already in index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="theme-color" content="#0066cc" />
```

---

## 🤖 robots.txt Directives

```text
# Allow search engines to crawl
Allow: /

# Block admin from search results
Disallow: /admin
Disallow: /admin-login

# Respect server resources
Crawl-delay: 1

# Submit sitemaps
Sitemap: https://vibangnhadat.com/sitemap.xml
```

---

## 🗺️ Sitemap Files

| File | Contains | Generated |
|------|----------|-----------|
| `sitemap.xml` | Static pages | Manual + Auto |
| `blog-sitemap.xml` | Blog posts | Auto from Firebase |
| `documents-sitemap.xml` | Documents | Auto from Firebase |
| `sitemap-index.xml` | Master index | Auto |

**Generate all:**
```bash
npm run generate-sitemap
```

---

## 🏷️ Meta Tag Structure

```tsx
useSEO({
  // BASIC (Required for all pages)
  title: 'Page Title - Brand',
  description: 'Page description 150-160 chars',
  
  // KEYWORDS (For relevant pages)
  keywords: 'keyword1, keyword2, keyword3',
  
  // SOCIAL SHARING (For public pages)
  ogType: 'website',  // or 'article'
  ogTitle: 'Social title',
  ogDescription: 'Social description',
  ogImage: '/path-to-image.jpg',
  ogUrl: 'https://vibangnhadat.com/path',
  
  // TECHNICAL (For duplicate prevention)
  canonical: 'https://vibangnhadat.com/canonical-url',
  
  // SPECIAL (For sensitive pages)
  noindex: false,  // Set to true to hide from search
  nofollow: false, // Set to true to prevent crawling
  
  // STRUCTURED DATA (For rich results)
  structuredData: { /* JSON-LD */ }
});
```

---

## ✅ Quality Checklist

### Content Quality

- [ ] Original content (not copied)
- [ ] 1000+ words for articles
- [ ] Proper grammar and spelling
- [ ] Well-researched and accurate
- [ ] Helpful to readers
- [ ] Updated regularly

### Technical Quality

- [ ] Fast load time (< 3 seconds)
- [ ] Mobile responsive
- [ ] No 404 errors
- [ ] Working internal links
- [ ] HTTPS everywhere
- [ ] Clean URL structure

### SEO Quality

- [ ] Proper headings (H1-H6)
- [ ] Descriptive alt text
- [ ] Related content linked
- [ ] Keywords naturally used
- [ ] Meta tags accurate
- [ ] Structured data valid

---

## 💡 Quick Tips

### For Better Rankings

1. **Write high-quality content** - More important than keywords
2. **Get backlinks** - Links from authoritative sites
3. **Improve page speed** - < 3 seconds load time
4. **Update content regularly** - Shows freshness to Google
5. **Build authority** - Consistent, quality content over time

### For Better Social Sharing

1. **Use eye-catching images** - 1200x630px minimum
2. **Write compelling descriptions** - Make people want to click
3. **Include article dates** - Shows freshness and credibility
4. **Add author information** - Builds trust
5. **Use relevant hashtags** - In content, not in meta tags

### For Better Mobile Experience

1. **Responsive design** - Works on all screen sizes
2. **Fast load time** - Optimize images and code
3. **Readable text** - 16px minimum font size
4. **Easy navigation** - Clear menu and structure
5. **Avoid pop-ups** - Annoying on mobile

---

## 🚨 Common Mistakes to Avoid

| ❌ Mistake | ✅ Solution |
|-----------|-----------|
| Multiple H1 tags | Use only one H1 per page |
| Keyword stuffing | Use keywords naturally |
| Duplicate content | Use canonical tags |
| Missing alt text | Add descriptive alt text |
| Poor page speed | Optimize images & code |
| No mobile support | Use responsive design |
| Broken links | Check all internal links |
| Thin content | Write 1000+ word articles |

---

## 📚 Files & Locations

| What | Where |
|------|-------|
| SEO Hook | `/src/hooks/useSEO.ts` |
| Sitemap Generator | `/scripts/generate-sitemap.js` |
| Full Guide | `/SEO_GUIDE.md` |
| Checklist | `/SEO_CHECKLIST.md` |
| Summary | `/SEO_IMPLEMENTATION_SUMMARY.md` |
| robots.txt | `/public/robots.txt` |
| Sitemaps | `/public/sitemap*.xml` |

---

## 🆘 Need Help?

1. **Implementation question?** → Check `/SEO_GUIDE.md` (Section 14)
2. **Code example needed?** → See `/src/pages/ArticlePage.tsx`
3. **Troubleshooting?** → Check `/SEO_GUIDE.md` (Section 13)
4. **Status overview?** → Read `/SEO_IMPLEMENTATION_SUMMARY.md`

---

## 📞 Contact & Support

- **Documentation:** See `SEO_GUIDE.md`
- **Code:** Check `/src/hooks/useSEO.ts`
- **Examples:** Review page implementations
- **Tools:** Use Google Search Console

---

**Happy optimizing! 🚀**

*Remember: Quality content is the foundation of SEO. Tools and meta tags just help search engines understand what you've written.*
