export type Category = {
    id: string;
    name: string;
    description?: string;
    slug?: string;
    // target page or route (e.g. '/blog', '/documents')
    target?: string;
    // whether to show this category as a menu item in client navigation
    showInMenu?: boolean;
    // if created as a menu item, store the nav item id
    menuItemId?: string;
};

const STORAGE_KEY = 'categories_store';

class CategoryService {
    private categories: Category[] = [];
    private subscribers: Array<() => void> = [];

    initializeCategories(initialCategories: Category[]) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                this.categories = JSON.parse(raw) as Category[];
            } catch (e) {
                this.categories = JSON.parse(JSON.stringify(initialCategories));
                this.persist();
            }
        } else {
            this.categories = JSON.parse(JSON.stringify(initialCategories));
            this.persist();
        }
        this.notify();
    }

    getAllCategories(): Category[] {
        return JSON.parse(JSON.stringify(this.categories));
    }

    getCategoryById(id: string): Category | null {
        return this.categories.find(c => c.id === id) || null;
    }

    createCategory(categoryData: Omit<Category, 'id'>): Category {
        const id = `cat-${Date.now()}`;
        const slug = categoryData.slug ?? categoryData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const newCategory: Category = { ...categoryData, id, slug };
        this.categories.unshift(newCategory);
        this.persist();
        this.notify();
        return newCategory;
    }

    updateCategory(id: string, patch: Partial<Category>): Category | null {
        const index = this.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            this.categories[index] = { ...this.categories[index], ...patch };
            this.persist();
            this.notify();
            return this.categories[index];
        }
        return null;
    }

    deleteCategory(id: string): boolean {
        const index = this.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            this.categories.splice(index, 1);
            this.persist();
            this.notify();
            return true;
        }
        return false;
    }

    searchCategories(query: string): Category[] {
        const q = query.toLowerCase();
        return this.categories.filter(c =>
            (c.name || '').toLowerCase().includes(q) ||
            (c.description || '').toLowerCase().includes(q)
        );
    }

    subscribe(cb: () => void) {
        this.subscribers.push(cb);
        return () => { this.subscribers = this.subscribers.filter(s => s !== cb); };
    }

    private notify() {
        this.subscribers.forEach(s => s());
    }

    private persist() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.categories));
        } catch (e) { /* ignore */ }
    }
}

export const categoryService = new CategoryService();
