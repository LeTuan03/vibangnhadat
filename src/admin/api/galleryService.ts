import type { GalleryItem } from '../../types';
import {
    getAllGalleryItems,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
} from '../../services';

/**
 * GalleryService - Firebase-backed gallery management
 * Uses Firebase Firestore for data persistence
 */
class GalleryService {
    private subscribers: Array<() => void> = [];

    /**
     * Initialize service (kept for compatibility)
     */
    initialize() {
        this.notify();
    }

    /**
     * Get all gallery items from Firebase
     */
    async getAllGalleryItems(): Promise<GalleryItem[]> {
        return getAllGalleryItems();
    }

    /**
     * Get gallery item by ID from Firebase
     */
    async getGalleryItemById(id: string): Promise<GalleryItem | undefined> {
        const items = await getAllGalleryItems();
        return items.find(item => item.id === id);
    }

    /**
     * Create new gallery item in Firebase
     */
    async createGalleryItem(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
        const result = await createGalleryItem(item);
        this.notify();
        return result;
    }

    /**
     * Update existing gallery item in Firebase
     */
    async updateGalleryItem(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem | null> {
        try {
            const result = await updateGalleryItem(id, updates);
            this.notify();
            return result;
        } catch (error) {
            return null;
        }
    }

    /**
     * Delete gallery item from Firebase
     */
    async deleteGalleryItem(id: string): Promise<boolean> {
        try {
            await deleteGalleryItem(id);
            this.notify();
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Subscribe to changes
     */
    subscribe(callback: () => void) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(cb => cb !== callback);
        };
    }

    /**
     * Notify subscribers
     */
    private notify() {
        this.subscribers.forEach(cb => cb());
    }
}

export const galleryService = new GalleryService();
export default galleryService;
