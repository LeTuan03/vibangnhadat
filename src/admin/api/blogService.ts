import { BlogPost } from "@/types";

const STORAGE_KEY = 'blog_posts';

// Lấy tất cả bài viết
export const getAllPosts = (): BlogPost[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

// Lấy bài viết theo ID
export const getPostById = (id: string): BlogPost | undefined => {
    const posts = getAllPosts();
    return posts.find(post => post.id === id);
};

// Tạo bài viết mới
export const createPost = (post: Omit<BlogPost, 'id'>): BlogPost => {
    const posts = getAllPosts();
    const newPost: BlogPost = {
        ...post,
        id: Date.now().toString(),
    };
    posts.push(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return newPost;
};

// Cập nhật bài viết
export const updatePost = (id: string, updatedPost: Partial<BlogPost>): BlogPost | null => {
    const posts = getAllPosts();
    const index = posts.findIndex(post => post.id === id);
    
    if (index === -1) return null;
    
    posts[index] = { ...posts[index], ...updatedPost };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return posts[index];
};

// Xóa bài viết
export const deletePost = (id: string): boolean => {
    const posts = getAllPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    
    if (filteredPosts.length === posts.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
    return true;
};

// Khởi tạo dữ liệu mẫu (chỉ chạy 1 lần)
export const initializePosts = (initialPosts: BlogPost[]): void => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
    }
};

export const blogService = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    initializePosts,
};