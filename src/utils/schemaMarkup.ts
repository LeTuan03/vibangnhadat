/**
 * Rich Schema Markup Generator
 * Creates comprehensive structured data for all content types
 * Supports: FAQ, Article, HowTo, Product, LocalBusiness, Event
 */

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

/**
 * FAQ Schema - For Q&A pages
 */
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
): SchemaMarkup => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Article Schema - For blog posts and articles
 */
export const generateArticleSchema = (article: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  wordCount?: number;
  keywords?: string[];
  url?: string;
}): SchemaMarkup => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.headline,
    description: article.description,
    image: article.image || '/logo.png',
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || 'Văn phòng Thừa phát lại',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Văn phòng Thừa phát lại',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
        width: 250,
        height: 250,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url || 'https://vibangnhadat.com',
    },
    ...(article.wordCount && { wordCount: article.wordCount }),
    ...(article.keywords && { keywords: article.keywords.join(', ') }),
  };
};

/**
 * HowTo Schema - For step-by-step guides
 */
export const generateHowToSchema = (howto: {
  name: string;
  description: string;
  image?: string;
  steps: Array<{ name: string; text: string; image?: string }>;
  totalTime?: string;
}): SchemaMarkup => {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howto.name,
    description: howto.description,
    ...(howto.image && { image: howto.image }),
    ...(howto.totalTime && { totalTime: howto.totalTime }),
    step: howto.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          '@type': 'ImageObject',
          url: step.image,
        },
      }),
    })),
  };
};

/**
 * LocalBusiness Schema - For company information
 */
export const generateLocalBusinessSchema = (business: {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  image: string;
  priceRange?: string;
  socialProfiles?: string[];
}): SchemaMarkup => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    image: business.image,
    logo: business.logo,
    url: business.website,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'VN',
      addressLocality: 'Thành phố Hồ Chí Minh',
      addressRegion: 'HCM',
      streetAddress: business.address,
    },
    ...(business.priceRange && { priceRange: business.priceRange }),
    ...(business.socialProfiles && {
      sameAs: business.socialProfiles,
    }),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: business.phone,
      email: business.email,
      availableLanguage: ['vi', 'en'],
    },
  };
};

/**
 * Product/Service Schema - For services offered
 */
export const generateServiceSchema = (service: {
  name: string;
  description: string;
  image?: string;
  price?: string;
  priceCurrency?: string;
  provider: string;
  areaServed?: string[];
}): SchemaMarkup => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    ...(service.image && { image: service.image }),
    provider: {
      '@type': 'Organization',
      name: service.provider,
    },
    ...(service.areaServed && {
      areaServed: service.areaServed.map((area) => ({
        '@type': 'AdministrativeArea',
        name: area,
      })),
    }),
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: service.priceCurrency || 'VND',
        availability: 'https://schema.org/InStock',
      },
    }),
  };
};

/**
 * BreadcrumbList Schema - For navigation breadcrumbs
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
): SchemaMarkup => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Event Schema - For legal seminars or training events
 */
export const generateEventSchema = (event: {
  name: string;
  description: string;
  image?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  organizer: string;
  url?: string;
  price?: string;
}): SchemaMarkup => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    ...(event.image && { image: event.image }),
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    organizer: {
      '@type': 'Organization',
      name: event.organizer,
      url: 'https://vibangnhadat.com',
    },
    ...(event.location && {
      location: {
        '@type': 'Place',
        name: event.location,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'VN',
        },
      },
    }),
    ...(event.price && {
      offers: {
        '@type': 'Offer',
        url: event.url || 'https://vibangnhadat.com',
        price: event.price,
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        validFrom: new Date().toISOString(),
      },
    }),
  };
};

/**
 * Aggregate Rating Schema - For reviews and ratings
 */
export const generateAggregateRatingSchema = (rating: {
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
  ratingCount: number;
  reviewCount?: number;
}): SchemaMarkup => {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: rating.ratingValue,
    bestRating: rating.bestRating || 5,
    worstRating: rating.worstRating || 1,
    ratingCount: rating.ratingCount,
    ...(rating.reviewCount && { reviewCount: rating.reviewCount }),
  };
};

/**
 * Legal Document Schema - For legal templates and documents
 */
export const generateLegalDocumentSchema = (doc: {
  name: string;
  description: string;
  datePublished: string;
  author: string;
  fileFormat?: string;
  url: string;
}): SchemaMarkup => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: doc.name,
    description: doc.description,
    datePublished: doc.datePublished,
    author: {
      '@type': 'Organization',
      name: doc.author,
    },
    ...(doc.fileFormat && { encodingFormat: doc.fileFormat }),
    mainEntity: {
      '@type': 'WebPage',
      '@id': doc.url,
    },
  };
};

/**
 * Apply schema markup to page head
 */
export const applySchemaMarkup = (schemas: SchemaMarkup | SchemaMarkup[]) => {
  // Remove existing schema scripts
  const existingScripts = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );
  existingScripts.forEach((script) => {
    // Keep only organization schema on home page
    const isOrgSchema = script.textContent?.includes('"@type":"Organization"');
    if (!isOrgSchema) {
      script.remove();
    }
  });

  // Add new schemas
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];
  schemaArray.forEach((schema) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
};

/**
 * Hook to automatically apply schemas
 */
export const useSchemaMarkup = (schemas: SchemaMarkup | SchemaMarkup[]) => {
  React.useEffect(() => {
    applySchemaMarkup(schemas);

    return () => {
      // Cleanup is handled in applySchemaMarkup
    };
  }, [schemas]);
};

// Helper function to import React in this file
import React from 'react';

export default {
  generateFAQSchema,
  generateArticleSchema,
  generateHowToSchema,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateEventSchema,
  generateAggregateRatingSchema,
  generateLegalDocumentSchema,
  applySchemaMarkup,
  useSchemaMarkup,
};
