import { BaseFirebaseService } from './BaseFirebaseService';
import { FAQ } from '../types';

class QAFirebaseService extends BaseFirebaseService<FAQ> {
  constructor() {
    super({ collectionName: 'faqs' });
  }

  /**
   * Get all FAQs
   */
  async getAllFAQs(): Promise<FAQ[]> {
    return this.getOrdered('views', 'desc');
  }

  /**
   * Get FAQs by category
   */
  async getFAQsByCategory(category: string): Promise<FAQ[]> {
    return this.findWhere('category', '==', category);
  }

  /**
   * Get all categories
   */
  async getAllCategories(): Promise<string[]> {
    try {
      const faqs = await this.getAll();
      const categories = new Set(faqs.map(faq => faq.category));
      return Array.from(categories).sort();
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  }

  /**
   * Search FAQs by question, answer, and detailed explanation
   */
  async searchFAQs(searchTerm: string): Promise<FAQ[]> {
    try {
      const faqs = await this.getAll();
      const term = searchTerm.toLowerCase();
      return faqs.filter(faq =>
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term) ||
        faq.detailedExplanation?.toLowerCase().includes(term) ||
        faq.tags?.some(tag => tag.toLowerCase().includes(term)) ||
        faq.examples?.some(ex => ex.toLowerCase().includes(term))
      );
    } catch (error) {
      console.error('Error searching FAQs:', error);
      throw error;
    }
  }

  /**
   * Get FAQ by ID with full details
   */
  async getFAQById(id: string): Promise<FAQ | null> {
    try {
      return await this.getById(id);
    } catch (error) {
      console.error('Error getting FAQ by ID:', error);
      throw error;
    }
  }

  /**
   * Get related FAQs
   */
  async getRelatedFAQs(faqId: string): Promise<FAQ[]> {
    try {
      const faq = await this.getById(faqId);
      if (!faq || !faq.relatedFAQs || faq.relatedFAQs.length === 0) {
        return [];
      }
      
      const related = await Promise.all(
        faq.relatedFAQs.map(id => this.getById(id))
      );
      return related.filter(f => f !== null) as FAQ[];
    } catch (error) {
      console.error('Error getting related FAQs:', error);
      throw error;
    }
  }

  /**
   * Get important FAQs
   */
  async getImportantFAQs(): Promise<FAQ[]> {
    try {
      const faqs = await this.getAll();
      return faqs.filter(faq => faq.isImportant === true)
        .sort((a, b) => (b.views || 0) - (a.views || 0));
    } catch (error) {
      console.error('Error getting important FAQs:', error);
      throw error;
    }
  }

  /**
   * Get FAQs with specific tags
   */
  async getFAQsByTag(tag: string): Promise<FAQ[]> {
    try {
      const faqs = await this.getAll();
      return faqs.filter(faq => 
        faq.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    } catch (error) {
      console.error('Error getting FAQs by tag:', error);
      throw error;
    }
  }

  /**
   * Increment helpful count
   */
  async incrementHelpful(id: string): Promise<void> {
    try {
      const faq = await this.getById(id);
      if (faq) {
        const newCount = (faq.helpfulCount || 0) + 1;
        await this.update(id, { helpfulCount: newCount } as Partial<FAQ>);
      }
    } catch (error) {
      console.error('Error incrementing helpful count:', error);
      throw error;
    }
  }

  /**
   * Increment view count
   */
  async incrementViews(id: string): Promise<void> {
    try {
      const faq = await this.getById(id);
      if (faq) {
        const newViews = (faq.views || 0) + 1;
        await this.update(id, { views: newViews } as Partial<FAQ>);
      }
    } catch (error) {
      console.error('Error incrementing views:', error);
      throw error;
    }
  }

  /**
   * Get trending FAQs (most viewed)
   */
  async getTrendingFAQs(limit: number = 5): Promise<FAQ[]> {
    try {
      const faqs = await this.getOrdered('views', 'desc');
      return faqs.slice(0, limit);
    } catch (error) {
      console.error('Error getting trending FAQs:', error);
      throw error;
    }
  }

  /**
   * Get most helpful FAQs
   */
  async getMostHelpfulFAQs(limit: number = 5): Promise<FAQ[]> {
    try {
      const faqs = await this.getAll();
      return faqs
        .sort((a, b) => (b.helpfulCount || 0) - (a.helpfulCount || 0))
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting most helpful FAQs:', error);
      throw error;
    }
  }

  /**
   * Create new FAQ
   */
  async createFAQ(faqData: Omit<FAQ, 'id'>): Promise<FAQ> {
    try {
      const id = `qa-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const faq: FAQ = {
        ...faqData,
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        helpfulCount: 0,
      };
      await this.create(faq);
      return faq;
    } catch (error) {
      console.error('Error creating FAQ:', error);
      throw error;
    }
  }

  /**
   * Update FAQ
   */
  async updateFAQ(id: string, faqData: Partial<FAQ>): Promise<FAQ> {
    try {
      const updated = {
        ...faqData,
        updatedAt: new Date().toISOString(),
      };
      await this.update(id, updated);
      const result = await this.getById(id);
      return result as FAQ;
    } catch (error) {
      console.error('Error updating FAQ:', error);
      throw error;
    }
  }

  /**
   * Delete FAQ
   */
  async deleteFAQ(id: string): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      throw error;
    }
  }
}

export default new QAFirebaseService();
