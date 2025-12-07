import { BaseFirebaseService } from './BaseFirebaseService';

export interface Category {
  id?: string;
  name: string;
  description?: string;
  slug?: string;
  target?: string;
  showInMenu?: boolean;
  menuItemId?: string;
}

class CategoryFirebaseService extends BaseFirebaseService<Category> {
  constructor() {
    super({ collectionName: 'categories' });
  }

  /**
   * Get all categories
   */
  async getAllCategories(): Promise<Category[]> {
    return this.getAll();
  }

  /**
   * Get category by ID
   */
  async getCategoryById(id: string): Promise<Category | null> {
    return this.getById(id);
  }

  /**
   * Create new category
   */
  async createCategory(categoryData: Omit<Category, 'id'>): Promise<Category> {
    const slug = categoryData.slug ?? categoryData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return this.create({
      ...categoryData,
      slug
    });
  }

  /**
   * Update category
   */
  async updateCategory(id: string, categoryData: Partial<Category>): Promise<Category> {
    return this.update(id, categoryData);
  }

  /**
   * Delete category
   */
  async deleteCategory(id: string): Promise<void> {
    return this.delete(id);
  }

  /**
   * Search categories
   */
  async searchCategories(searchTerm: string): Promise<Category[]> {
    try {
      const categories = await this.getAll();
      const term = searchTerm.toLowerCase();
      return categories.filter(c =>
        (c.name || '').toLowerCase().includes(term) ||
        (c.description || '').toLowerCase().includes(term)
      );
    } catch (error) {
      console.error('Error searching categories:', error);
      throw error;
    }
  }
}

export default new CategoryFirebaseService();
