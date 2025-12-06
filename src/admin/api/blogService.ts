import { BlogPost } from '../../types';

/**
 * BlogService - Manages blog posts with CRUD operations
 * Provides in-memory storage for blog posts
 */
class BlogService {
    private posts: BlogPost[] = [];

    /**
     * Initialize service with initial blog posts
     * @param initialPosts - Array of blog posts to initialize
     */
    initializePosts(initialPosts: BlogPost[]): void {
        this.posts = JSON.parse(JSON.stringify(initialPosts));
    }

    /**
     * Get all blog posts
     * @returns Copy of all posts array
     */
    getAllPosts(): BlogPost[] {
        return JSON.parse(JSON.stringify(this.posts));
    }

    /**
     * Get blog post by ID
     * @param id - Post ID
     * @returns Post if found, null otherwise
     */
    getPostById(id: string): BlogPost | null {
        return this.posts.find(p => p.id === id) || null;
    }

    /**
     * Create new blog post
     * @param postData - Post data without ID
     * @returns Created post with generated ID
     */
    createPost(postData: Omit<BlogPost, 'id'>): BlogPost {
        const id = `blog-${Date.now()}`;
        const newPost: BlogPost = { ...postData, id };
        this.posts.unshift(newPost);
        return newPost;
    }

    /**
     * Update existing blog post
     * @param id - Post ID
     * @param postData - Updated post data
     * @returns Updated post if found, null otherwise
     */
    updatePost(id: string, postData: BlogPost): BlogPost | null {
        const index = this.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            this.posts[index] = postData;
            return postData;
        }
        return null;
    }

    /**
     * Delete blog post by ID
     * @param id - Post ID
     * @returns true if deleted, false if not found
     */
    deletePost(id: string): boolean {
        const index = this.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            this.posts.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Search posts by query string
     * @param query - Search query
     * @returns Posts matching the query
     */
    searchPosts(query: string): BlogPost[] {
        const q = query.toLowerCase();
        return this.posts.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.content.toLowerCase().includes(q) ||
            p.author.toLowerCase().includes(q)
        );
    }

    /**
     * Get posts by category
     * @param category - Category name
     * @returns Posts in the category
     */
    getPostsByCategory(category: string): BlogPost[] {
        return this.posts.filter(p => p.category === category);
    }
}

export const blogService = new BlogService();