# 🔍 SEO Implementation Guide - Văn phòng Thừa phát lại

## Overview

This guide covers all SEO optimizations implemented for your website, including meta tags, structured data, sitemaps, and best practices.

---

## 1. Meta Tags & Page Titles

### Implementation

All dynamic pages use the `useSEO` hook to manage meta tags automatically:

```tsx
import { useSEO } from '../hooks/useSEO';

const MyPage: React.FC = () => {
  useSEO({
    title: 'Page Title - Văn phòng Thừa phát lại',
    description: 'Page description for search results',
    keywords: 'keyword1, keyword2',
    ogImage: '/path-to-image.jpg',
    structuredData: { /* JSON-LD schema */ }
  });

  return (/* ... */);
};
```

### Key Meta Tags

- **Title Tag**: 50-60 characters for optimal display
- **Meta Description**: 150-160 characters
- **Keywords**: Relevant, comma-separated terms
- **Open Graph**: For social media sharing
- **Twitter Cards**: For Twitter sharing
- **Canonical URLs**: Prevent duplicate content issues

---

## 2. Blog & Article SEO

### ArticlePage (Single Blog Post View)

✅ **Implemented Features:**
- Dynamic title with post name
- Auto-generated meta description from excerpt
- Category tags as keywords
- Featured image as Open Graph image
- BlogPosting structured data (JSON-LD)
- Breadcrumb navigation
- Related articles section
- Reading time indicator
- Author and publish date display

### BlogPage (Blog List View)

✅ **Implemented Features:**
- Optimized list page title and description
- Proper canonical URLs
- Daily content change frequency hint
- High priority for search engines

---

## 3. Structured Data (Schema.org)

### BlogPosting Schema

Applied to all article pages. Includes:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "description": "Article excerpt",
  "image": "featured-image-url",
  "datePublished": "2024-01-01T00:00:00Z",
  "dateModified": "2024-01-15T00:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "Văn phòng Thừa phát lại"
  }
}
```

**Benefits:**
- Better search result display (Rich Snippets)
- Enhanced Google Knowledge Graph integration
- Improved SERP appearance with images and dates

### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Văn phòng Thừa phát lại",
  "url": "https://vibangnhadat.com",
  "logo": "https://vibangnhadat.com/logo.png",
  "description": "Professional enforcement officer services",
  "sameAs": [
    "https://facebook.com/vibangnhadat",
    "https://instagram.com/vibangnhadat"
  ]
}
```

### Breadcrumb Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://vibangnhadat.com"
    }
  ]
}
```

---

## 4. Sitemap Management

### Automated Sitemap Generation

Run the sitemap generator script:

```bash
npm run generate-sitemap
# or
node scripts/generate-sitemap.js
```

### Generated Sitemaps

1. **sitemap.xml** - Static pages only
2. **blog-sitemap.xml** - Blog posts (auto-fetched from Firebase)
3. **documents-sitemap.xml** - Legal documents
4. **sitemap-index.xml** - Master sitemap index

### Sitemap Features

- ✅ Auto-generated from Firebase data
- ✅ Last modified dates
- ✅ Change frequency hints
- ✅ Priority indicators
- ✅ Image inclusion for featured content
- ✅ Proper XML format for search engines

### Update Strategy

**Recommended Schedule:**
- Run after each content deployment
- Automate with CI/CD pipeline
- Update robots.txt to reference sitemaps

---

## 5. robots.txt Configuration

```text
# Location: /public/robots.txt

User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin-login
Allow: /blog
Allow: /documents
Crawl-delay: 1
Request-rate: 1/10

Sitemap: https://vibangnhadat.com/sitemap.xml
Sitemap: https://vibangnhadat.com/blog-sitemap.xml
```

**Key Rules:**
- Blocks admin pages from indexing
- Allows public content
- References all sitemaps
- Respects server resources with crawl delays

---

## 6. Open Graph & Social Media Tags

### Implementation

All pages automatically include:

```html
<meta property="og:type" content="website|article" />
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Description" />
<meta property="og:image" content="image-url" />
<meta property="og:url" content="page-url" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Description" />
<meta name="twitter:image" content="image-url" />
```

### Benefits

- Better preview in Facebook, Twitter, WhatsApp
- Increased click-through rates from social media
- Professional appearance in shares
- Better brand consistency

---

## 7. Page-Specific SEO Configurations

### Home Page

```tsx
useSEO({
  title: 'Văn phòng Thừa phát lại - Dịch vụ chuyên nghiệp',
  description: 'Dịch vụ thừa phát lại uy tín, chuyên nghiệp. Lập vi bằng, tống đạt văn bản, thi hành án.',
  keywords: 'thừa phát lại, lập vi bằng, tống đạt, thi hành án',
  ogImage: '/hero-image.jpg'
});
```

### Blog Listing Page

```tsx
useSEO({
  title: 'Thư viện bài viết pháp lý - Văn phòng Thừa phát lại',
  description: 'Khám phá các bài viết pháp lý chi tiết, hướng dẫn thử hành án...',
  keywords: 'bài viết pháp lý, hướng dẫn luật, tư vấn pháp luật',
  canonical: `${window.location.origin}/blog`
});
```

### Individual Article Pages

```tsx
useSEO({
  title: `${post.title} - Văn phòng Thừa phát lại`,
  description: post.excerpt,
  keywords: post.tags.join(', '),
  ogType: 'article',
  ogImage: post.image,
  structuredData: generateArticleStructuredData(post)
});
```

---

## 8. Content Optimization Tips

### Title Tags (50-60 characters)

✅ **Good:**
- "Hướng dẫn Lập Vi Bằng - Văn phòng Thừa phát lại"
- "Quy Trình Thi Hành Án | Tư vấn Pháp luật"

❌ **Bad:**
- "Blog" (too vague)
- "This is a very long title that exceeds the character limit for search results" (too long)

### Meta Descriptions (150-160 characters)

✅ **Good:**
- "Tìm hiểu chi tiết quy trình lập vi bằng, yêu cầu cần thiết và những sai lầm thường gặp trong quá trình thi hành án."

❌ **Bad:**
- "Read this article" (too vague)
- "Lorem ipsum dolor sit amet..." (not relevant)

### Heading Hierarchy

✅ **Use proper H1-H6 structure:**
```html
<h1>Main Article Title</h1>
<h2>Main Section</h2>
<h3>Subsection</h3>
<h4>Details</h4>
```

❌ **Avoid:**
- Multiple H1 tags per page
- Jumping from H1 to H3
- Using headings for styling instead of structure

### Internal Linking

✅ **Best Practices:**
- Link related articles naturally in content
- Use descriptive anchor text
- Include breadcrumb navigation
- Link to category pages

### Content Structure

✅ **Format for readability:**
- Short paragraphs (2-3 sentences max)
- Bullet points for lists
- Subheadings every 2-3 paragraphs
- Images with alt text
- Bold keywords naturally

---

## 9. Image Optimization

### Alt Text

Every image should have descriptive alt text:

```html
<!-- Good -->
<img src="img.jpg" alt="Quy trình lập vi bằng trong thi hành án" />

<!-- Bad -->
<img src="img.jpg" alt="image" />
```

### File Size & Format

- Use WebP format when supported
- Compress images to < 100KB for web
- Use descriptive filenames: `lap-vi-bang-process.jpg`

### Featured Images

```tsx
// In useSEO hook
ogImage: post.image || '/default-og-image.jpg'
```

---

## 10. Mobile & Core Web Vitals

### Meta Tags for Mobile

Already in `index.html`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="mobile-web-app-capable" content="yes" />
```

### Performance Optimization

- ✅ Lazy load blog components
- ✅ Optimize image serving
- ✅ Minimize CSS/JS bundles
- ✅ Use CDN for static assets
- ✅ Enable gzip compression

---

## 11. Monitoring & Tools

### Google Search Console

1. Add your sitemap: `https://vibangnhadat.com/sitemap.xml`
2. Monitor:
   - Search impressions & clicks
   - Indexing status
   - Mobile usability
   - Core Web Vitals
   - Security issues

### Google Analytics

Track:
- Page views by URL
- User engagement metrics
- Conversion rates
- Search keywords driving traffic

### Tools for Testing

- **Google PageSpeed Insights**: https://pagespeed.web.dev
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **Lighthouse**: Built into Chrome DevTools

---

## 12. Implementation Checklist

### During Development

- [ ] Add useSEO hook to all new pages
- [ ] Fill in all meta tag fields
- [ ] Include structured data for articles
- [ ] Add alt text to all images
- [ ] Create proper heading hierarchy
- [ ] Internal link related content

### Before Deployment

- [ ] Run generate-sitemap script
- [ ] Verify robots.txt directives
- [ ] Test with Google PageSpeed Insights
- [ ] Test Rich Results with Google Tool
- [ ] Check mobile responsiveness
- [ ] Verify all internal links work

### After Deployment

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Monitor indexing status daily for first week
- [ ] Check search console for errors
- [ ] Monitor Core Web Vitals

### Ongoing Maintenance

- [ ] Update robots.txt if routes change
- [ ] Regenerate sitemaps weekly
- [ ] Monitor search console weekly
- [ ] Review analytics monthly
- [ ] Update content regularly
- [ ] Fix crawl errors immediately

---

## 13. Common Issues & Solutions

### Issue: Pages not indexing

**Solutions:**
- Check Google Search Console for errors
- Verify robots.txt isn't blocking pages
- Ensure no `noindex` meta tag set
- Check for redirect loops
- Verify sitemap is valid XML

### Issue: Poor search rankings

**Solutions:**
- Write higher quality content (2000+ words)
- Get backlinks from authoritative sites
- Improve Core Web Vitals
- Update outdated content
- Target less competitive keywords

### Issue: Low CTR from search results

**Solutions:**
- Improve title tag clarity (include main keyword)
- Write compelling meta descriptions
- Use structured data for rich snippets
- Improve social proof (ratings, reviews)

---

## 14. Vietnamese SEO Best Practices

### Language Tag

Already in `index.html`:
```html
<html lang="vi">
```

### Vietnamese-Specific Keywords

Focus on:
- "Thừa phát lại" variations
- "Lập vi bằng"
- "Tống đạt văn bản"
- "Thi hành án"
- "Pháp luật Việt Nam"

### Content Localization

- Use Vietnamese date format: "01/01/2024"
- Include Vietnamese address
- Link to Vietnamese legal resources
- Reference Vietnamese laws & regulations

---

## 15. Quick Reference

### Update SEO for a Page

```tsx
import { useSEO } from '../hooks/useSEO';

const YourPage: React.FC = () => {
  useSEO({
    title: 'Your Title - Văn phòng Thừa phát lại',
    description: 'Your description (150-160 chars)',
    keywords: 'keyword1, keyword2, keyword3',
    ogImage: '/your-image.jpg',
    canonical: 'https://vibangnhadat.com/your-path'
  });

  return (/* Your page content */);
};
```

### Add Article Schema

```tsx
import { useSEO, generateArticleStructuredData } from '../hooks/useSEO';

const ArticlePage: React.FC = () => {
  useSEO({
    // ... other SEO config
    structuredData: generateArticleStructuredData({
      title: 'Article Title',
      description: 'Excerpt',
      image: 'featured-image-url',
      author: 'Author Name',
      publishedDate: '2024-01-01',
      content: 'Full content'
    })
  });
};
```

### Generate Sitemaps

```bash
npm run generate-sitemap
```

---

## 16. Additional Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Meta Tags Guide](https://metatags.io/)
- [Moz SEO Guide](https://moz.com/beginners-guide-to-seo)
- [Yoast SEO Blog](https://yoast.com/seo/)

---

## Summary

✅ **SEO Improvements Made:**

1. ✅ Dynamic meta tags via useSEO hook
2. ✅ Structured data (JSON-LD) for articles
3. ✅ Automated sitemap generation
4. ✅ Optimized robots.txt
5. ✅ Open Graph & Twitter card support
6. ✅ Blog page SEO optimization
7. ✅ Article page SEO optimization
8. ✅ Breadcrumb navigation
9. ✅ Related articles section
10. ✅ Mobile-friendly meta tags

**Next Steps:**
- Test all pages with Google Tools
- Submit sitemap to Search Console
- Monitor search impressions
- Create high-quality content regularly
- Build authoritative backlinks

---

**Last Updated:** December 2024  
**Version:** 1.0  
**Maintained By:** Development Team
