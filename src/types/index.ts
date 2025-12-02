// Service types
export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    details: string[];
    benefits: string[];
}

// Team member types
export interface TeamMember {
    id: string;
    name: string;
    position: string;
    bio: string;
    image?: string;
    email?: string;
    phone?: string;
}

// Blog/News types
export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    image?: string;
}

// FAQ types
export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}

// Legal document types
export interface LegalDocument {
    id: string;
    title: string;
    description: string;
    category: string;
    fileUrl?: string;
    publishDate: string;
}

// Legal Article types
export interface LegalArticle {
    id: string;
    title: string;
    category: string;
    content: string;
    relatedLaws: string[];
    datePublished: string;
    author?: string;
}

// Law Explanation types
export interface LawExplanation {
    id: string;
    lawName: string;
    lawNumber: string;
    publishedDate: string;
    effectiveDate: string;
    mainPoints: string[];
    applicationScope: string;
    penalties?: string[];
}

// Legal Term types
export interface LegalTerm {
    id: string;
    term: string;
    definition: string;
    relatedLaws: string[];
    examples?: string[];
}

// Reference types
export interface Reference {
    id: string;
    name: string;
    url: string;
    description: string;
    category: string;
}

// Testimonial types
export interface Testimonial {
    id: string;
    name: string;
    position: string;
    company: string;
    content: string;
    rating: number;
    image?: string;
}

// Contact info types
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

// Statistics types
export interface Statistic {
    id: string;
    label: string;
    value: number;
    suffix: string;
    icon: string;
}

// Language types
export type Language = 'vi' | 'en';

// Navigation types
export interface NavItem {
    id: string;
    label: string;
    href: string;
    children?: NavItem[];
}
