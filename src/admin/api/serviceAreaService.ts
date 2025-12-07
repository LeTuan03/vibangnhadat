import type { ServiceArea } from '../../types';
import {
    getAllServiceAreas,
    createServiceArea,
    updateServiceArea,
    deleteServiceArea,
} from '../../services';

/**
 * ServiceAreaService - Firebase-backed service area management
 * Uses Firebase Firestore for data persistence
 */
class ServiceAreaService {
    private subscribers: Array<() => void> = [];

    /**
     * Initialize service (kept for compatibility)
     */
    initialize() {
        this.notify();
    }

    /**
     * Get all service areas from Firebase
     */
    async getAllServiceAreas(): Promise<ServiceArea[]> {
        return getAllServiceAreas();
    }

    /**
     * Get service area by ID from Firebase
     */
    async getServiceAreaById(id: string): Promise<ServiceArea | undefined> {
        const areas = await getAllServiceAreas();
        return areas.find(s => s.id === id);
    }

    /**
     * Create new service area in Firebase
     */
    async createServiceArea(area: Omit<ServiceArea, 'id'>): Promise<ServiceArea> {
        const result = await createServiceArea(area);
        this.notify();
        return result;
    }

    /**
     * Update existing service area in Firebase
     */
    async updateServiceArea(id: string, updates: Partial<ServiceArea>): Promise<ServiceArea | null> {
        try {
            const result = await updateServiceArea(id, updates);
            this.notify();
            return result;
        } catch (error) {
            return null;
        }
    }

    /**
     * Delete service area from Firebase
     */
    async deleteServiceArea(id: string): Promise<boolean> {
        try {
            await deleteServiceArea(id);
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

export const serviceAreaService = new ServiceAreaService();
export default serviceAreaService;
