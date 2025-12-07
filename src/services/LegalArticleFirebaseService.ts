import { BaseFirebaseService } from './BaseFirebaseService';
import { LegalArticle } from '../types';

class LegalArticleFirebaseService extends BaseFirebaseService<LegalArticle> {
  constructor() {
    super({ collectionName: 'legalArticles' });
  }

  /**
   * Get all articles
   */
  async getAllArticles(): Promise<LegalArticle[]> {
    return this.getOrdered('datePublished', 'desc');
  }

  /**
   * Get featured articles
   */
  async getFeaturedArticles(limit: number = 3): Promise<LegalArticle[]> {
    try {
      const articles = await this.findWhere('featured', '==', true);
      return articles.slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      throw error;
    }
  }

  /**
   * Get articles by category
   */
  async getArticlesByCategory(category: string): Promise<LegalArticle[]> {
    return this.findWhere('category', '==', category);
  }

  /**
   * Get article by ID
   */
  async getArticleById(id: string): Promise<LegalArticle | null> {
    return this.getById(id);
  }

  /**
   * Create new article
   */
  async createArticle(data: Omit<LegalArticle, 'id'>): Promise<LegalArticle> {
    return this.create(data);
  }

  /**
   * Update article
   */
  async updateArticle(id: string, data: Partial<LegalArticle>): Promise<LegalArticle> {
    return this.update(id, data);
  }

  /**
   * Delete article
   */
  async deleteArticle(id: string): Promise<void> {
    return this.delete(id);
  }

  /**
   * Search articles
   */
  async searchArticles(searchTerm: string): Promise<LegalArticle[]> {
    try {
      const articles = await this.getAll();
      return articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    }
  }
}

export default new LegalArticleFirebaseService();
