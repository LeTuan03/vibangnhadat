import { useEffect } from 'react';

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  robots?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: Record<string, any>;
}

/**
 * Custom hook to manage SEO meta tags for pages
 * Dynamically updates document head with meta tags and structured data
 */
export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    const {
      title = 'Văn phòng Thừa phát lại - Dịch vụ chuyên nghiệp',
      description = 'Dịch vụ thừa phát lại chuyên nghiệp, uy tín',
      keywords,
      canonical,
      ogType = 'website',
      ogTitle,
      ogDescription,
      ogImage = '/logo.png',
      ogUrl,
      twitterCard = 'summary_large_image',
      twitterTitle,
      twitterDescription,
      twitterImage,
      author = 'Văn phòng Thừa phát lại',
      noindex = false,
      nofollow = false,
      structuredData,
    } = config;

    // Update page title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, property = false) => {
      let element = document.querySelector(
        property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      ) as HTMLMetaElement;

      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
    updateMetaTag('author', author);

    // Update robots meta tag
    let robotsContent = '';
    if (noindex) robotsContent += 'noindex,';
    if (nofollow) robotsContent += 'nofollow';
    if (robotsContent) {
      updateMetaTag('robots', robotsContent.replace(/,$/, ''));
    }

    // Update Open Graph tags
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:image', ogImage, true);
    if (ogUrl) {
      updateMetaTag('og:url', ogUrl, true);
    }

    // Update Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', twitterTitle || ogTitle || title);
    updateMetaTag('twitter:description', twitterDescription || ogDescription || description);
    updateMetaTag('twitter:image', twitterImage || ogImage);

    // Update or create canonical tag
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }

    // Add structured data (JSON-LD)
    if (structuredData) {
      // Remove existing structured data script if any
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const scriptElement = document.createElement('script');
      scriptElement.type = 'application/ld+json';
      scriptElement.textContent = JSON.stringify(structuredData);
      document.head.appendChild(scriptElement);
    }

    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      // Cleanup structured data when component unmounts
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script) {
        script.remove();
      }
    };
  }, [config]);
};

/**
 * Generate structured data for articles
 */
export const generateArticleStructuredData = (article: {
  title: string;
  description: string;
  image?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  content?: string;
  url?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image || '/logo.png',
    datePublished: article.publishedDate || new Date().toISOString(),
    dateModified: article.modifiedDate || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: article.author || 'Văn phòng Thừa phát lại',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url || typeof window !== 'undefined' ? window.location.href : '',
    },
  };
};

/**
 * Generate structured data for organization
 */
export const generateOrganizationStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Văn phòng Thừa phát lại',
    description: 'Dịch vụ thừa phát lại chuyên nghiệp, uy tín',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    logo: '/logo.png',
    sameAs: [
      'https://facebook.com/vibangnhadat',
      'https://instagram.com/vibangnhadat',
    ],
  };
};

/**
 * Generate structured data for breadcrumbs
 */
export const generateBreadcrumbStructuredData = (
  breadcrumbs: Array<{ name: string; url: string }>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

export default useSEO;
