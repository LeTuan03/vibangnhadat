
// ============================================
// SERVICE SERVICE (Inline)

import { Service } from "@/types";

// ============================================
const STORAGE_KEY = 'services_data';

const serviceService = {
    getAllServices: (): Service[] => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    getServiceById: (id: string): Service | undefined => {
        const services = serviceService.getAllServices();
        return services.find(service => service.id === id);
    },

    createService: (service: Omit<Service, 'id'>): Service => {
        const services = serviceService.getAllServices();
        const newService: Service = {
            ...service,
            id: Date.now().toString(),
        };
        services.push(newService);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
        return newService;
    },

    updateService: (id: string, updatedService: Partial<Service>): Service | null => {
        const services = serviceService.getAllServices();
        const index = services.findIndex(service => service.id === id);

        if (index === -1) return null;

        services[index] = { ...services[index], ...updatedService };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
        return services[index];
    },

    deleteService: (id: string): boolean => {
        const services = serviceService.getAllServices();
        const filteredServices = services.filter(service => service.id !== id);

        if (filteredServices.length === services.length) return false;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredServices));
        return true;
    },

    initializeServices: (initialServices: Service[]): void => {
        const existing = localStorage.getItem(STORAGE_KEY);
        if (!existing) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialServices));
        }
    }
};

export default serviceService;