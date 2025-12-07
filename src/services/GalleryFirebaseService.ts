import { BaseFirebaseService } from './BaseFirebaseService';
import { GalleryItem } from '../types';

class GalleryFirebaseService extends BaseFirebaseService<GalleryItem> {
  constructor() {
    super({ collectionName: 'gallery' });
  }

  /**
   * Get all gallery items
   */
  async getAllItems(): Promise<GalleryItem[]> {
    return this.getOrdered('order', 'asc');
  }

  /**
   * Get gallery items by category
   */
  async getItemsByCategory(category: string): Promise<GalleryItem[]> {
    return this.findWhere('category', '==', category);
  }

  /**
   * Get gallery item by ID
   */
  async getItemById(id: string): Promise<GalleryItem | null> {
    return this.getById(id);
  }

  /**
   * Create new gallery item
   */
  async createItem(data: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
    return this.create(data);
  }

  /**
   * Update gallery item
   */
  async updateItem(id: string, data: Partial<GalleryItem>): Promise<GalleryItem> {
    return this.update(id, data);
  }

  /**
   * Delete gallery item
   */
  async deleteItem(id: string): Promise<void> {
    return this.delete(id);
  }
}

export default new GalleryFirebaseService();
