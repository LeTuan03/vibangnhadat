import { BaseFirebaseService } from './BaseFirebaseService';
import type { Viban } from '../types';

export type { Viban } from '../types';

class VibanFirebaseService extends BaseFirebaseService<Viban> {
  constructor() {
    super({ collectionName: 'vibans' });
  }

  /**
   * Get all vibans ordered by title
   */
  async getAllVibans(): Promise<Viban[]> {
    return this.getAll();
  }

  /**
   * Search vibans by title or description
   */
  async searchVibans(searchTerm: string): Promise<Viban[]> {
    try {
      const vibans = await this.getAll();
      const term = searchTerm.toLowerCase();
      return vibans.filter(v =>
        v.title.toLowerCase().includes(term) ||
        v.description.toLowerCase().includes(term)
      );
    } catch (error) {
      console.error('Error searching vibans:', error);
      throw error;
    }
  }

  /**
   * Create new viban
   */
  async createViban(vibanData: Omit<Viban, 'id'>): Promise<Viban> {
    return this.create(vibanData);
  }

  /**
   * Update viban
   */
  async updateViban(id: string, vibanData: Partial<Viban>): Promise<Viban> {
    return this.update(id, vibanData);
  }

  /**
   * Delete viban
   */
  async deleteViban(id: string): Promise<void> {
    return this.delete(id);
  }

  /**
   * Get viban by ID
   */
  async getVibanById(id: string): Promise<Viban | null> {
    return this.getById(id);
  }
}

export default new VibanFirebaseService();
