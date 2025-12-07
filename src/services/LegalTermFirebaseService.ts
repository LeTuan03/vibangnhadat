import { BaseFirebaseService } from './BaseFirebaseService';
import { LegalTerm } from '../types';

class LegalTermFirebaseService extends BaseFirebaseService<LegalTerm> {
  constructor() {
    super({ collectionName: 'legalTerms' });
  }

  /**
   * Get all legal terms
   */
  async getAllTerms(): Promise<LegalTerm[]> {
    return this.getOrdered('term', 'asc');
  }

  /**
   * Get term by ID
   */
  async getTermById(id: string): Promise<LegalTerm | null> {
    return this.getById(id);
  }

  /**
   * Create new term
   */
  async createTerm(data: Omit<LegalTerm, 'id'>): Promise<LegalTerm> {
    return this.create(data);
  }

  /**
   * Update term
   */
  async updateTerm(id: string, data: Partial<LegalTerm>): Promise<LegalTerm> {
    return this.update(id, data);
  }

  /**
   * Delete term
   */
  async deleteTerm(id: string): Promise<void> {
    return this.delete(id);
  }

  /**
   * Search terms by keyword
   */
  async searchTerms(searchTerm: string): Promise<LegalTerm[]> {
    try {
      const terms = await this.getAll();
      return terms.filter(term =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching terms:', error);
      throw error;
    }
  }

  /**
   * Get term by exact term name
   */
  async getTermByName(termName: string): Promise<LegalTerm | null> {
    try {
      const terms = await this.findWhere('term', '==', termName);
      return terms.length > 0 ? terms[0] : null;
    } catch (error) {
      console.error('Error fetching term by name:', error);
      throw error;
    }
  }
}

export default new LegalTermFirebaseService();
