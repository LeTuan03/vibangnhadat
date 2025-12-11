/** Base entity type with required id */
export interface BaseEntity {
    id: string;
}

/** Generic service response type */
export type ServiceResponse<T> = {
    data: T;
    status: 'success' | 'error';
    message?: string;
};

/** Generic paginated response type */
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// ============ Service Types ============
export interface Service extends BaseEntity {
    title: string;
    description: string;
    icon: string;
    details: string[];
    benefits: string[];
    createdAt?: string;
    updatedAt?: string;
}

// ============ Team Types ============
export interface TeamMember extends BaseEntity {
    name: string;
    position: string;
    bio: string;
    image?: string;
    email?: string;
    phone?: string;
    specialization?: string[];
    socialLinks?: {
        facebook?: string;
        linkedin?: string;
        twitter?: string;
    };
}

// ============ Blog/News Types ============
export interface BlogPost extends BaseEntity {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    image?: string;
    tags?: string[];
    featured?: boolean;
    views?: number;
    status?: 'draft' | 'published' | 'archived';
    readTime?: number;
    relatedPosts?: string[];
    modifiedDate?: string;
}

// ============ FAQ/Q&A Types ============
export interface FAQ extends BaseEntity {
    question: string;
    answer: string;
    category: string;
    tags?: string[];
    relatedFAQs?: string[];
    helpfulCount?: number;
    views?: number;
    fullDescription?: string;
    // Chi tiết và tài liệu pháp luật
    relatedLaws?: string[];
    examples?: string[];
    detailedExplanation?: string;
    relatedDocuments?: string[];
    relatedTerms?: string[];
    caseStudies?: Array<{
        title: string;
        description: string;
        context?: string;
    }>;
    references?: Array<{
        title: string;
        url?: string;
        description?: string;
    }>;
    isImportant?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// ============ Legal Document Types ============
export interface LegalDocument extends BaseEntity {
    title: string;
    description: string;
    category: string;
    fileUrl?: string;
    publishDate: string;
    author?: string;
    version?: string;
    tags?: string[];
}

// ============ Legal Article Types ============
export interface LegalArticle extends BaseEntity {
    title: string;
    category: string;
    content: string;
    relatedLaws: string[];
    datePublished: string;
    author?: string;
    readTime?: number;
    tags?: string[];
    featured?: boolean;
}

// ============ Law Explanation Types ============
export interface LawExplanation extends BaseEntity {
    lawName: string;
    lawNumber: string;
    publishedDate: string;
    effectiveDate: string;
    mainPoints: string[];
    applicationScope: string;
    penalties?: string[];
    category?: string;
    relatedDocuments?: string[];
}

// ============ Legal Term Types ============
export interface LegalTerm extends BaseEntity {
    term: string;
    definition: string;
    relatedLaws: string[];
    examples?: string[];
    pronunciation?: string;
    englishEquivalent?: string;
}

// ============ Reference Types ============
export interface Reference extends BaseEntity {
    name: string;
    url: string;
    description: string;
    category: string;
    dateAdded?: string;
    isVerified?: boolean;
}

// ============ Testimonial Types ============
export interface Testimonial extends BaseEntity {
    name: string;
    position: string;
    company: string;
    content: string;
    rating: number;
    image?: string;
    date?: string;
    verified?: boolean;
}

// ============ Contact Types ============
export interface ContactInfo {
    phone: string;
    email: string;
    address: string;
    workingHours: string;
    zaloLink: string;
    facebookLink?: string;
    googleMapsLink: string;
    googleMapsEmbed: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

// ============ Statistics Types ============
export interface Statistic extends BaseEntity {
    label: string;
    value: number;
    suffix: string;
    icon: string;
    animationDuration?: number;
}

// ============ Navigation Types ============
export interface NavItem extends BaseEntity {
    label: string;
    href: string;
    children?: NavItem[];
    icon?: string;
    badge?: {
        text: string;
        color: string;
    };
}

// ============ Service Area Types ============
export interface ServiceArea extends BaseEntity {
    title: string;
    image: string;
    description: string;
    details?: string[];
    icon?: string;
    benefits?: string[];
    servicesOffered?: { title: string; description?: string }[];
    processSteps?: string[];
    contactCTA?: { phone?: string; email?: string; ctaText?: string };
}

// ============ Family Law Types ============
export interface FamilyLawQA extends BaseEntity {
    question: string;
    image: string;
    shortDescription: string;
    fullDescription?: string;
    category?: string;
    relatedQAs?: string[];
    date?: string;
    // Chi tiết nội dung
    overview?: string;
    definition?: string;
    relatedLaws?: string[];
    processSteps?: Array<{
        title: string;
        description: string;
    }>;
    tips?: string[];
    updatedAt?: string;
}

// ============ Viban (Notary) Types ============
export interface Viban extends BaseEntity {
    title: string;
    description: string;
    image?: string;
    requirements: string[];
    process: string[];
    fees: string;
    benefits?: string[];
    relatedDocuments?: string[];
    category?: string;
    createdAt?: string;
    updatedAt?: string;
}

// ============ Gallery Types ============
export interface GalleryItem extends BaseEntity {
    title: string;
    type: 'image' | 'video';
    thumbnail: string;
    videoId?: string;
    description: string;
    fullDescription?: string;
    category?: string;
    order?: number;
}

// ============ Language Types ============
export type Language = 'vi' | 'en';

// ============ Form Types ============
export interface QuestionSubmission {
    name: string;
    email: string;
    phone: string;
    category: string;
    question: string;
    agreedTerms: boolean;
    timestamp?: string;
}

export interface BookingFormData {
    name: string;
    phone: string;
    email: string;
    consultationType: 'online' | 'offline' | 'phone';
    consultationArea: string;
    preferredDate: string;
    description: string;
    agreedTerms: boolean;
    timestamp?: string;
}

// ============ Utility Types ============
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Partial<T> = { [P in keyof T]?: T[P] };
export type Required<T> = { [P in keyof T]-?: T[P] };
export type Readonly<T> = { readonly [P in keyof T]: T[P] };

// Generic collection type
export interface Collection<T extends BaseEntity> {
    items: T[];
    total: number;
    lastUpdated?: string;
}
