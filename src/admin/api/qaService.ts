import { FAQ } from '../../types';

/**
 * QAService - Manages FAQ/Q&A items with CRUD operations
 * Provides in-memory storage and search functionality
 */
class QAService {
    private faqs: FAQ[] = [];

    /**
     * Initialize service with initial FAQs
     * @param initialFAQs - Array of FAQs to initialize
     */
    initializeFAQs(initialFAQs: FAQ[]): void {
        this.faqs = JSON.parse(JSON.stringify(initialFAQs));
    }

    /**
     * Get all FAQs
     * @returns Copy of all FAQs array
     */
    getAllFAQs(): FAQ[] {
        return JSON.parse(JSON.stringify(this.faqs));
    }

    /**
     * Get FAQ by ID
     * @param id - FAQ ID
     * @returns FAQ if found, null otherwise
     */
    getFAQById(id: string): FAQ | null {
        return this.faqs.find(f => f.id === id) || null;
    }

    /**
     * Create new FAQ
     * @param faqData - FAQ data without ID
     * @returns Created FAQ with generated ID
     */
    createFAQ(faqData: Omit<FAQ, 'id'>): FAQ {
        const id = `faq-${Date.now()}`;
        const newFAQ: FAQ = { ...faqData, id };
        this.faqs.unshift(newFAQ);
        return newFAQ;
    }

    /**
     * Update existing FAQ
     * @param id - FAQ ID
     * @param faqData - Updated FAQ data
     * @returns Updated FAQ if found, null otherwise
     */
    updateFAQ(id: string, faqData: FAQ): FAQ | null {
        const index = this.faqs.findIndex(f => f.id === id);
        if (index !== -1) {
            this.faqs[index] = faqData;
            return faqData;
        }
        return null;
    }

    /**
     * Delete FAQ by ID
     * @param id - FAQ ID
     * @returns true if deleted, false if not found
     */
    deleteFAQ(id: string): boolean {
        const index = this.faqs.findIndex(f => f.id === id);
        if (index !== -1) {
            this.faqs.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Search FAQs by query
     * @param query - Search query
     * @returns FAQs matching the query
     */
    searchFAQs(query: string): FAQ[] {
        const q = query.toLowerCase();
        return this.faqs.filter(f =>
            f.question.toLowerCase().includes(q) ||
            f.answer.toLowerCase().includes(q)
        );
    }

    /**
     * Get FAQs by category
     * @param category - Category name
     * @returns FAQs in the category
     */
    getFAQsByCategory(category: string): FAQ[] {
        return this.faqs.filter(f => f.category === category);
    }
}

export const qaService = new QAService();
