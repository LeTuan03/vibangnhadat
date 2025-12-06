import { Service } from '../../types';

class ServiceService {
    private services: Service[] = [];

    initializeServices(initialServices: Service[]) {
        this.services = JSON.parse(JSON.stringify(initialServices));
    }

    getAllServices(): Service[] {
        return JSON.parse(JSON.stringify(this.services));
    }

    getServiceById(id: string): Service | null {
        return this.services.find(s => s.id === id) || null;
    }

    createService(serviceData: Omit<Service, 'id'>): Service {
        const id = `service-${Date.now()}`;
        const newService: Service = { ...serviceData, id };
        this.services.unshift(newService);
        return newService;
    }

    updateService(id: string, serviceData: Service): Service | null {
        const index = this.services.findIndex(s => s.id === id);
        if (index !== -1) {
            this.services[index] = serviceData;
            return serviceData;
        }
        return null;
    }

    deleteService(id: string): boolean {
        const index = this.services.findIndex(s => s.id === id);
        if (index !== -1) {
            this.services.splice(index, 1);
            return true;
        }
        return false;
    }

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
