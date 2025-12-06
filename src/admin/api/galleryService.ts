import type { GalleryItem } from '../../types';

const STORAGE_KEY = 'gallery_data';

class GalleryService {
    private items: GalleryItem[] = [];
    private subscribers: Array<() => void> = [];

    initialize(seed?: GalleryItem[]) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                this.items = JSON.parse(raw) as GalleryItem[];
            } catch (e) {
                this.items = seed || [];
                this.persist();
            }
        } else {
            this.items = seed || [];
            this.persist();
        }
        this.notify();
    }

    getAllGalleryItems(): GalleryItem[] {
        return [...this.items];
    }

    getGalleryItemById(id: string): GalleryItem | undefined {
        return this.items.find(item => item.id === id);
    }

    createGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
        const newItem: GalleryItem = {
            ...item,
            id: `gallery-${Date.now()}`
        };
        this.items.push(newItem);
        this.persist();
        this.notify();
        return newItem;
    }

    updateGalleryItem(id: string, updates: Partial<GalleryItem>): GalleryItem | null {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) return null;
        
        this.items[index] = {
            ...this.items[index],
            ...updates,
            id: this.items[index].id
        };
        this.persist();
        this.notify();
        return this.items[index];
    }

    deleteGalleryItem(id: string): boolean {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) return false;
        
        this.items.splice(index, 1);
        this.persist();
        this.notify();
        return true;
    }

    private persist() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    }

    subscribe(callback: () => void) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(cb => cb !== callback);
        };
    }

    private notify() {
        this.subscribers.forEach(cb => cb());
    }
}

export const galleryService = new GalleryService();
export default galleryService;
