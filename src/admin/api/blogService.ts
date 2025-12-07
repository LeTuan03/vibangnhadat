import { BlogPost } from '../../types';
import {
    getAllBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
} from '../../services';

/**
 * BlogService - Firebase-backed blog post management
 * Uses Firebase Firestore for data persistence
 */
class BlogService {
    /**
     * Get all blog posts from Firebase
     */
    async getAllPosts(): Promise<BlogPost[]> {
        return getAllBlogPosts();
    }

    /**
     * Get blog post by ID from Firebase
     */
    async getPostById(id: string): Promise<BlogPost | null> {
        return getBlogPostById(id);
    }

    /**
     * Create new blog post in Firebase
     */
    async createPost(postData: Omit<BlogPost, 'id'>): Promise<BlogPost> {
        return createBlogPost(postData);
    }

    /**
     * Update existing blog post in Firebase
     */
    async updatePost(id: string, postData: Partial<BlogPost>): Promise<BlogPost> {
        return updateBlogPost(id, postData);
    }

    /**
     * Delete blog post from Firebase
     */
    async deletePost(id: string): Promise<void> {
        return deleteBlogPost(id);
    }
}

export const blogService = new BlogService();