import { Service } from '../../types';

/**
 * ServiceService - Manages legal services with CRUD operations
 * Handles services data in memory
 */
class ServiceService {
    private services: Service[] = [];

    /**
     * Initialize service with initial services list
     * @param initialServices - Array of services to initialize
     */
    initializeServices(initialServices: Service[]): void {
        this.services = JSON.parse(JSON.stringify(initialServices));
    }

    /**
     * Get all services
     * @returns Copy of all services array
     */
    getAllServices(): Service[] {
        return JSON.parse(JSON.stringify(this.services));
    }

    /**
     * Get service by ID
     * @param id - Service ID
     * @returns Service if found, null otherwise
     */
    getServiceById(id: string): Service | null {
        return this.services.find(s => s.id === id) || null;
    }

    /**
     * Create new service
     * @param serviceData - Service data without ID
     * @returns Created service with generated ID
     */
    createService(serviceData: Omit<Service, 'id'>): Service {
        const id = `service-${Date.now()}`;
        const newService: Service = { ...serviceData, id };
        this.services.unshift(newService);
        return newService;
    }

    /**
     * Update existing service
     * @param id - Service ID
     * @param serviceData - Updated service data
     * @returns Updated service if found, null otherwise
     */
    updateService(id: string, serviceData: Service): Service | null {
        const index = this.services.findIndex(s => s.id === id);
        if (index !== -1) {
            this.services[index] = serviceData;
            return serviceData;
        }
        return null;
    }

    /**
     * Delete service by ID
     * @param id - Service ID
     * @returns true if deleted, false if not found
     */
    deleteService(id: string): boolean {
        const index = this.services.findIndex(s => s.id === id);
        if (index !== -1) {
            this.services.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Search services by query
     * @param query - Search query
     * @returns Services matching the query
     */
    searchServices(query: string): Service[] {
        const q = query.toLowerCase();
        return this.services.filter(s =>
            s.title.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q)
        );
    }
}

const serviceService = new ServiceService();
export default serviceService;
