import { Service } from "@/types";
import {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} from "@/services";

/**
 * ServiceService - Firebase-backed service management
 * Uses Firebase Firestore for data persistence
 */
const serviceService = {
    getAllServices: async (): Promise<Service[]> => {
        return getAllServices();
    },

    getServiceById: async (id: string): Promise<Service | undefined> => {
        const service = await getServiceById(id);
        return service || undefined;
    },

    createService: async (service: Omit<Service, 'id'>): Promise<Service> => {
        return createService(service);
    },

    updateService: async (id: string, updatedService: Partial<Service>): Promise<Service | null> => {
        try {
            return await updateService(id, updatedService);
        } catch (error) {
            return null;
        }
    },

    deleteService: async (id: string): Promise<boolean> => {
        try {
            await deleteService(id);
            return true;
        } catch (error) {
            return false;
        }
    },

    initializeServices: async (_initialServices: Service[]): Promise<void> => {
        // Firebase will initialize automatically
        // This is kept for compatibility
    }
};

export default serviceService;