import { BaseFirebaseService } from './BaseFirebaseService';
import { Testimonial } from '../types';

class TestimonialFirebaseService extends BaseFirebaseService<Testimonial> {
  constructor() {
    super({ collectionName: 'testimonials' });
  }

  /**
   * Get all testimonials
   */
  async getAllTestimonials(): Promise<Testimonial[]> {
    return this.getAll();
  }

  /**
   * Get featured testimonials
   */
  async getFeaturedTestimonials(limit: number = 3): Promise<Testimonial[]> {
    try {
      const testimonials = await this.findWhere('featured', '==', true);
      return testimonials.slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured testimonials:', error);
      throw error;
    }
  }

  /**
   * Get testimonial by ID
   */
  async getTestimonialById(id: string): Promise<Testimonial | null> {
    return this.getById(id);
  }

  /**
   * Create new testimonial
   */
  async createTestimonial(data: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    return this.create(data);
  }

  /**
   * Update testimonial
   */
  async updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
    return this.update(id, data);
  }

  /**
   * Delete testimonial
   */
  async deleteTestimonial(id: string): Promise<void> {
    return this.delete(id);
  }
}

export default new TestimonialFirebaseService();
