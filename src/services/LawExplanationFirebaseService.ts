import { BaseFirebaseService } from './BaseFirebaseService';
import { LawExplanation } from '../types';

class LawExplanationFirebaseService extends BaseFirebaseService<LawExplanation> {
  constructor() {
    super({ collectionName: 'lawExplanations' });
  }

  /**
   * Get all law explanations
   */
  async getAllExplanations(): Promise<LawExplanation[]> {
    return this.getAll();
  }

  /**
   * Get explanation by law number
   */
  async getExplanationByLawNumber(lawNumber: string): Promise<LawExplanation | null> {
    try {
      const explanations = await this.findWhere('lawNumber', '==', lawNumber);
      return explanations.length > 0 ? explanations[0] : null;
    } catch (error) {
      console.error('Error fetching explanation by law number:', error);
      throw error;
    }
  }

  /**
   * Get explanations by category
   */
  async getExplanationsByCategory(category: string): Promise<LawExplanation[]> {
    return this.findWhere('category', '==', category);
  }

  /**
   * Get explanation by ID
   */
  async getExplanationById(id: string): Promise<LawExplanation | null> {
    return this.getById(id);
  }

  /**
   * Create new explanation
   */
  async createExplanation(data: Omit<LawExplanation, 'id'>): Promise<LawExplanation> {
    return this.create(data);
  }

  /**
   * Update explanation
   */
  async updateExplanation(id: string, data: Partial<LawExplanation>): Promise<LawExplanation> {
    return this.update(id, data);
  }

  /**
   * Delete explanation
   */
  async deleteExplanation(id: string): Promise<void> {
    return this.delete(id);
  }

  /**
   * Search explanations
   */
  async searchExplanations(searchTerm: string): Promise<LawExplanation[]> {
    try {
      const explanations = await this.getAll();
      return explanations.filter(exp =>
        exp.lawName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.lawNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching explanations:', error);
      throw error;
    }
  }
}

export default new LawExplanationFirebaseService();
