/**
 * Internal Linking & Related Content System
 * Automatically suggests and generates internal links based on content relevance
 */

import { BlogPost, FAQ } from '../types';

export interface RelatedContent {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  type: 'blog' | 'document' | 'qa' | 'guide';
  relevanceScore: number;
  keywords: string[];
}

export interface InternalLink {
  text: string;
  url: string;
  contextText: string; // Text around the link
  relevance: 'high' | 'medium' | 'low';
}

/**
 * Calculate relevance score between two pieces of content
 */
export const calculateRelevance = (
  content1: { title: string; keywords?: string[]; tags?: string[] },
  content2: { title: string; keywords?: string[]; tags?: string[] }
): number => {
  let score = 0;

  // Title similarity
  const title1Lower = content1.title.toLowerCase();
  const title2Lower = content2.title.toLowerCase();
  const titleWords1 = title1Lower.split(/\s+/);
  const titleWords2 = title2Lower.split(/\s+/);
  const commonWords = titleWords1.filter((word) => titleWords2.includes(word)).length;
  score += commonWords * 20;

  // Keywords/tags overlap
  const keywords1 = [...(content1.keywords || []), ...(content1.tags || [])].map(
    (k) => k.toLowerCase()
  );
  const keywords2 = [...(content2.keywords || []), ...(content2.tags || [])].map(
    (k) => k.toLowerCase()
  );
  const commonKeywords = keywords1.filter((kw) => keywords2.includes(kw)).length;
  score += commonKeywords * 15;

  return Math.min(score, 100);
};

/**
 * Find related content based on keywords and topic
 */
export const findRelatedContent = (
  currentContent: BlogPost | FAQ | any,
  allContent: any[],
  limit: number = 5
): RelatedContent[] => {
  const related = allContent
    .filter(
      (content) =>
        content.id !== currentContent.id && (content.status === 'published' || !content.status)
    )
    .map((content) => ({
      id: content.id,
      title: content.title || content.question,
      excerpt: content.excerpt || content.answer?.substring(0, 150) || '',
      url: content.path || `/blog/${content.id}`,
      type: content.type || 'blog',
      relevanceScore: calculateRelevance(currentContent, content),
      keywords: [...(content.tags || []), ...(content.keywords || [])],
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);

  return related;
};

/**
 * Generate contextual internal links for content
 */
export const generateInternalLinks = (
  contentText: string,
  currentUrl: string,
): InternalLink[] => {
  const links: InternalLink[] = [];
  const textLower = contentText.toLowerCase();

  // Map of keywords to URLs
  const keywordMap: Record<string, string> = {
    'thừa phát lại': '/legal-knowledge#thua-phat-lai',
    'lập vi bằng': '/legal-knowledge#lap-vi-bang',
    'thi hành án': '/legal-knowledge#thi-hanh-an',
    'tống đạt': '/legal-knowledge#tong-dat',
    'ly hôn': '/family-law/ly-hon',
    'chia tài sản': '/family-law/chia-tai-san',
    'quyền nuôi con': '/family-law',
    'di chúc': '/family-law',
    'thừa kế': '/family-law',
  };

  // Find keywords in content and create links
  Object.entries(keywordMap).forEach(([keyword, url]) => {
    if (url !== currentUrl && textLower.includes(keyword)) {
      // Find context around the keyword
      const index = textLower.indexOf(keyword);
      const contextStart = Math.max(0, index - 50);
      const contextEnd = Math.min(contentText.length, index + keyword.length + 50);
      const contextText = contentText.substring(contextStart, contextEnd).trim();

      links.push({
        text: keyword,
        url,
        contextText: `...${contextText}...`,
        relevance: 'high',
      });
    }
  });

  return links;
};

/**
 * Create breadcrumb navigation
 */
export const generateBreadcrumbs = (
  currentUrl: string
): Array<{ text: string; url: string }> => {
  const breadcrumbs: Array<{ text: string; url: string }> = [
    { text: 'Trang chủ', url: '/' },
  ];

  if (currentUrl === '/') {
    return breadcrumbs;
  }

  const pathSegments = currentUrl.split('/').filter(Boolean);

  // Map segments to breadcrumb labels
  const segmentLabels: Record<string, string> = {
    blog: 'Bài viết',
    documents: 'Tài liệu pháp luật',
    'family-law': 'Hôn nhân & Gia đình',
    qa: 'Hỏi đáp',
    'legal-knowledge': 'Kiến thức pháp luật',
    services: 'Dịch vụ',
  };

  let urlPath = '';
  pathSegments.forEach((segment, index) => {
    urlPath += '/' + segment;

    if (index === pathSegments.length - 1) {
      // Last segment (current page) - no link
      breadcrumbs.push({
        text: segmentLabels[segment] || segment.replace(/-/g, ' '),
        url: urlPath,
      });
    } else {
      breadcrumbs.push({
        text: segmentLabels[segment] || segment.replace(/-/g, ' '),
        url: urlPath,
      });
    }
  });

  return breadcrumbs;
};

/**
 * Generate contextual "See also" sections
 */
export const generateSeeAlsoSection = (
  currentContent: any,
  allContent: any[],
): Array<{
  title: string;
  items: RelatedContent[];
}> => {
  const related = findRelatedContent(currentContent, allContent, 5);

  if (related.length === 0) {
    return [];
  }

  // Group by relevance
  const highRelevance = related.filter((r) => r.relevanceScore >= 70);
  const mediumRelevance = related.filter((r) => r.relevanceScore >= 40 && r.relevanceScore < 70);

  const sections: Array<{ title: string; items: RelatedContent[] }> = [];

  if (highRelevance.length > 0) {
    sections.push({
      title: 'Bài viết liên quan',
      items: highRelevance.slice(0, 3),
    });
  }

  if (mediumRelevance.length > 0) {
    sections.push({
      title: 'Bạn cũng có thể quan tâm',
      items: mediumRelevance.slice(0, 2),
    });
  }

  return sections;
};

/**
 * Smart link insertion in content
 * Inserts links naturally in paragraphs
 */
export const insertSmartLinks = (
  content: string,
  links: InternalLink[]
): string => {
  let updatedContent = content;
  const usedKeywords = new Set<string>();

  links.forEach((link) => {
    // Only insert each keyword once
    if (usedKeywords.has(link.text)) {
      return;
    }

    // Case-insensitive replacement for first occurrence only
    const regex = new RegExp(`\\b${link.text}\\b(?![^<]*<\\/a>)`, 'i');
    if (regex.test(updatedContent)) {
      updatedContent = updatedContent.replace(
        regex,
        `<a href="${link.url}" class="internal-link">${link.text}</a>`
      );
      usedKeywords.add(link.text);
    }
  });

  return updatedContent;
};

/**
 * Check internal linking quality
 */
export const evaluateInternalLinking = (content: {
  title: string;
  body: string;
  url: string;
  relatedCount?: number;
  internalLinkCount?: number;
}): {
  score: number;
  suggestions: string[];
} => {
  const suggestions: string[] = [];
  let score = 100;

  // Check for related content section
  if (!content.relatedCount || content.relatedCount < 3) {
    suggestions.push('Thêm ít nhất 3 bài viết liên quan');
    score -= 15;
  }

  // Check for internal links in content
  if (!content.internalLinkCount || content.internalLinkCount < 3) {
    suggestions.push('Thêm ít nhất 3 liên kết nội bộ trong nội dung');
    score -= 20;
  }

  // Check content length
  const wordCount = content.body.split(/\s+/).length;
  if (wordCount < 500) {
    suggestions.push(`Nội dung quá ngắn (${wordCount} từ). Mục tiêu: 1000+ từ`);
    score -= 25;
  }

  return { score, suggestions };
};

export default {
  calculateRelevance,
  findRelatedContent,
  generateInternalLinks,
  generateBreadcrumbs,
  generateSeeAlsoSection,
  insertSmartLinks,
  evaluateInternalLinking,
};
