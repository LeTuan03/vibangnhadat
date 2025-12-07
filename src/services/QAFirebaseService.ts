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
   * Search FAQs by question
   */
  async searchFAQs(searchTerm: string): Promise<FAQ[]> {
    try {
      const faqs = await this.getAll();
      return faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching FAQs:', error);
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
}

export default new QAFirebaseService();
