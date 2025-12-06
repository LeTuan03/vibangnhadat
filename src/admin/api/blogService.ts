import { BlogPost } from '../../types';

class BlogService {
    private posts: BlogPost[] = [];

    initializePosts(initialPosts: BlogPost[]) {
        this.posts = JSON.parse(JSON.stringify(initialPosts));
    }

    getAllPosts(): BlogPost[] {
        return JSON.parse(JSON.stringify(this.posts));
    }

    getPostById(id: string): BlogPost | null {
        return this.posts.find(p => p.id === id) || null;
    }

    createPost(postData: Omit<BlogPost, 'id'>): BlogPost {
        const id = `blog-${Date.now()}`;
        const newPost: BlogPost = { ...postData, id };
        this.posts.unshift(newPost);
        return newPost;
    }

    updatePost(id: string, postData: BlogPost): BlogPost | null {
        const index = this.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            this.posts[index] = postData;
            return postData;
        }
        return null;
    }

    deletePost(id: string): boolean {
        const index = this.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            this.posts.splice(index, 1);
            return true;
        }
        return false;
    }

    searchPosts(query: string): BlogPost[] {
        const q = query.toLowerCase();
        return this.posts.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.content.toLowerCase().includes(q) ||
            p.author.toLowerCase().includes(q)
        );
    }

    getPostsByCategory(category: string): BlogPost[] {
        return this.posts.filter(p => p.category === category);
    }
}

export const blogService = new BlogService();