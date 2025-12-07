import { BaseFirebaseService } from './BaseFirebaseService';
import { FamilyLawQA } from '../types';

class FamilyLawFirebaseService extends BaseFirebaseService<FamilyLawQA> {
  constructor() {
    super({ collectionName: 'familyLawQAs' });
  }

  /**
   * Get all family law Q&As
   */
  async getAllQAs(): Promise<FamilyLawQA[]> {
    return this.getOrdered('date', 'desc');
  }

  /**
   * Get Q&A by ID
   */
  async getQAById(id: string): Promise<FamilyLawQA | null> {
    return this.getById(id);
  }

  /**
   * Create new Q&A
   */
  async createQA(data: Omit<FamilyLawQA, 'id'>): Promise<FamilyLawQA> {
    return this.create(data);
  }

  /**
   * Update Q&A
   */
  async updateQA(id: string, data: Partial<FamilyLawQA>): Promise<FamilyLawQA> {
    return this.update(id, data);
  }

  /**
   * Delete Q&A
   */
  async deleteQA(id: string): Promise<void> {
    return this.delete(id);
  }

  /**
   * Search Q&As
   */
  async searchQAs(searchTerm: string): Promise<FamilyLawQA[]> {
    try {
      const qas = await this.getAll();
      return qas.filter(qa =>
        qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qa.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching Q&As:', error);
      throw error;
    }
  }
}

export default new FamilyLawFirebaseService();
