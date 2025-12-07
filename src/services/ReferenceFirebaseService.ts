import { BaseFirebaseService } from './BaseFirebaseService';
import { Reference } from '../types';

class ReferenceFirebaseService extends BaseFirebaseService<Reference> {
  constructor() {
    super({ collectionName: 'references' });
  }

  /**
   * Get all references
   */
  async getAllReferences(): Promise<Reference[]> {
    return this.getOrdered('dateAdded', 'desc');
  }

  /**
   * Get references by category
   */
  async getReferencesByCategory(category: string): Promise<Reference[]> {
    return this.findWhere('category', '==', category);
  }

  /**
   * Get verified references only
   */
  async getVerifiedReferences(): Promise<Reference[]> {
    return this.findWhere('isVerified', '==', true);
  }

  /**
   * Get reference by ID
   */
  async getReferenceById(id: string): Promise<Reference | null> {
    return this.getById(id);
  }

  /**
   * Create new reference
   */
  async createReference(data: Omit<Reference, 'id'>): Promise<Reference> {
    return this.create(data);
  }

  /**
   * Update reference
   */
  async updateReference(id: string, data: Partial<Reference>): Promise<Reference> {
    return this.update(id, data);
  }

  /**
   * Delete reference
   */
  async deleteReference(id: string): Promise<void> {
    return this.delete(id);
  }

  /**
   * Search references
   */
  async searchReferences(searchTerm: string): Promise<Reference[]> {
    try {
      const references = await this.getAll();
      return references.filter(ref =>
        ref.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ref.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching references:', error);
      throw error;
    }
  }
}

export default new ReferenceFirebaseService();
