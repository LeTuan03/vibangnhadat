import { FAQ } from '../../types';
import {
    getAllFAQs,
    createFAQ,
    updateFAQ,
    deleteFAQ,
} from '../../services';

/**
 * QAService - Firebase-backed FAQ management
 * Uses Firebase Firestore for data persistence
 */
class QAService {
    /**
     * Get all FAQs from Firebase
     */
    async getAllFAQs(): Promise<FAQ[]> {
        return getAllFAQs();
    }

    /**
     * Get FAQ by ID from Firebase
     */
    async getFAQById(id: string): Promise<FAQ | null> {
        // Using getAllFAQs and filtering since Firebase doesn't have getFAQById
        const faqs = await getAllFAQs();
        return faqs.find(f => f.id === id) || null;
    }

    /**
     * Create new FAQ in Firebase
     */
    async createFAQ(faqData: Omit<FAQ, 'id'>): Promise<FAQ> {
        return createFAQ(faqData);
    }

    /**
     * Update existing FAQ in Firebase
     */
    async updateFAQ(id: string, faqData: Partial<FAQ>): Promise<FAQ> {
        return updateFAQ(id, faqData);
    }

    /**
     * Delete FAQ from Firebase
     */
    async deleteFAQ(id: string): Promise<void> {
        return deleteFAQ(id);
    }
}

export const qaService = new QAService();
