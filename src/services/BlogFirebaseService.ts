import { BaseFirebaseService } from './BaseFirebaseService';
import { BlogPost } from '../types';

class BlogFirebaseService extends BaseFirebaseService<BlogPost> {
  constructor() {
    super({ collectionName: 'blogPosts' });
  }

  /**
   * Get all blog posts ordered by date (newest first)
   */
  async getAllPosts(): Promise<BlogPost[]> {
    return this.getOrdered('date', 'desc');
  }

  /**
   * Get featured blog posts
   */
  async getFeaturedPosts(limitCount: number = 3): Promise<BlogPost[]> {
    try {
      const posts = await this.findWhere('featured', '==', true);
      return posts.slice(0, limitCount);
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      throw error;
    }
  }

  /**
   * Get posts by category
   */
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    return this.findWhere('category', '==', category);
  }

  /**
   * Get posts by author
   */
  async getPostsByAuthor(author: string): Promise<BlogPost[]> {
    return this.findWhere('author', '==', author);
  }

  /**
   * Search posts by title
   */
  async searchPosts(searchTerm: string): Promise<BlogPost[]> {
    try {
      const posts = await this.getAll();
      return posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error;
    }
  }

  /**
   * Get post by slug or title
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const posts = await this.getAll();
      return posts.find(p => 
        p.title.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
      ) || null;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      throw error;
    }
  }

  /**
   * Increment view count
   */
  async incrementViews(id: string): Promise<void> {
    try {
      const post = await this.getById(id);
      if (post) {
        const newViews = (post.views || 0) + 1;
        await this.update(id, { views: newViews } as Partial<BlogPost>);
      }
    } catch (error) {
      console.error('Error incrementing views:', error);
      throw error;
    }
  }
}

export default new BlogFirebaseService();
