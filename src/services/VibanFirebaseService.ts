import { BaseFirebaseService } from './BaseFirebaseService';

export interface Viban {
  id?: string;
  title: string;
  description: string;
  requirements: string[];
  process: string[];
  fees: string;
}

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
}

export default new VibanFirebaseService();
