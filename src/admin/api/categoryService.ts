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

import { mockCategories } from '../../data/mockData';
import { db } from '../../config/firebase';
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    deleteDoc,
    onSnapshot,
    serverTimestamp,
} from 'firebase/firestore';

class CategoryService {
    private categories: Category[] = [];
    private subscribers: Array<() => void> = [];

    // Initialize: attach realtime listener and optionally seed mock data
    initializeCategories(initialCategories: Category[]) {
        const colRef = collection(db, 'categories');

        // Attach realtime listener
        onSnapshot(colRef, snapshot => {
            this.categories = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
            this.notify();
        }, err => {
            console.error('[categoryService] snapshot error', err);
        });

        // Seed initial data if collection is empty (fire-and-forget)
        (async () => {
            try {
                const snap = await getDocs(colRef);
                if (snap.empty && initialCategories && initialCategories.length) {
                    const promises = initialCategories.map(cat => {
                        const slug = cat.slug ?? cat.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        return addDoc(colRef, { ...cat, slug, createdAt: serverTimestamp() });
                    });
                    await Promise.all(promises);
                }
            } catch (e) {
                console.error('[categoryService] seed error', e);
            }
        })();
    }

    // Return a shallow copy of the in-memory cache. Realtime listener keeps it fresh.
    getAllCategories(): Category[] {
        return JSON.parse(JSON.stringify(this.categories));
    }

    // Synchronous cached getter (keeps compatibility with existing callers)
    getCategoryById(id: string): Category | null {
        return this.categories.find(c => c.id === id) || null;
    }

    async getCategoryByIdAsync(id: string): Promise<Category | null> {
        try {
            const d = await getDoc(doc(db, 'categories', id));
            if (!d.exists()) return null;
            return { id: d.id, ...(d.data() as any) } as Category;
        } catch (e) {
            console.error('[categoryService] getCategoryById error', e);
            return null;
        }
    }

    // Synchronous optimistic create (keeps previous local API). Triggers async background sync.
    createCategory(categoryData: Omit<Category, 'id'>): Category {
        const id = `cat-${Date.now()}`;
        const slug = categoryData.slug ?? categoryData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const newCategory: Category = { ...categoryData, id, slug } as Category;
        this.categories.unshift(newCategory);
        this.notify();
        // Fire-and-forget background write
        this.createCategoryAsync(categoryData).catch(e => console.error('[categoryService] background create failed', e));
        return newCategory;
    }

    async createCategoryAsync(categoryData: Omit<Category, 'id'>): Promise<Category | null> {
        try {
            const slug = categoryData.slug ?? categoryData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const payload = { ...categoryData, slug, createdAt: serverTimestamp() } as any;
            const ref = await addDoc(collection(db, 'categories'), payload);
            return { id: ref.id, ...categoryData, slug } as Category;
        } catch (e) {
            console.error('[categoryService] createCategory error', e);
            return null;
        }
    }

    // Synchronous optimistic update
    updateCategory(id: string, patch: Partial<Category>): Category | null {
        const index = this.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            this.categories[index] = { ...this.categories[index], ...patch };
            this.notify();
            // Background async update
            this.updateCategoryAsync(id, patch).catch(e => console.error('[categoryService] background update failed', e));
            return this.categories[index];
        }
        return null;
    }

    async updateCategoryAsync(id: string, patch: Partial<Category>): Promise<Category | null> {
        try {
            const ref = doc(db, 'categories', id);
            const dataToSet = { ...patch, updatedAt: serverTimestamp() } as any;
            await setDoc(ref, dataToSet, { merge: true });
            const updated = await getDoc(ref);
            if (!updated.exists()) return null;
            return { id: updated.id, ...(updated.data() as any) } as Category;
        } catch (e) {
            console.error('[categoryService] updateCategory error', e);
            return null;
        }
    }

    // Synchronous optimistic delete
    deleteCategory(id: string): boolean {
        const index = this.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            this.categories.splice(index, 1);
            this.notify();
            this.deleteCategoryAsync(id).catch(e => console.error('[categoryService] background delete failed', e));
            return true;
        }
        return false;
    }

    async deleteCategoryAsync(id: string): Promise<boolean> {
        try {
            await deleteDoc(doc(db, 'categories', id));
            return true;
        } catch (e) {
            console.error('[categoryService] deleteCategory error', e);
            return false;
        }
    }

    // Simple client-side search over cached categories.
    searchCategories(queryStr: string): Category[] {
        const q = (queryStr || '').toLowerCase();
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
}

export const categoryService = new CategoryService();

// Initialize with mock data (listener + optional seeding)
categoryService.initializeCategories(mockCategories);
