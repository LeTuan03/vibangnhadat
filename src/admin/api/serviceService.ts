import { Service } from '../../types';
import {
    getAllServices,
    createService,
    updateService,
    deleteService,
} from '../../services';

/**
 * ServiceService - Firebase-backed service management
 * Uses Firebase Firestore for data persistence
 */
class ServiceService {
    /**
     * Get all services from Firebase
     */
    async getAllServices(): Promise<Service[]> {
        return getAllServices();
    }

    /**
     * Get service by ID from Firebase
     */
    async getServiceById(id: string): Promise<Service | null> {
        const services = await getAllServices();
        return services.find(s => s.id === id) || null;
    }

    /**
     * Create new service in Firebase
     */
    async createService(serviceData: Omit<Service, 'id'>): Promise<Service> {
        return createService(serviceData);
    }

    /**
     * Update existing service in Firebase
     */
    async updateService(id: string, serviceData: Partial<Service>): Promise<Service> {
        return updateService(id, serviceData);
    }

    /**
     * Delete service from Firebase
     */
    async deleteService(id: string): Promise<void> {
        return deleteService(id);
    }
}

export const serviceService = new ServiceService();

/**
 * Default export for backward compatibility
 */
export default serviceService;
