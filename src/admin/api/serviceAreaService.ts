import type { ServiceArea } from '../../types';

const STORAGE_KEY = 'service_areas_data';

class ServiceAreaService {
    private serviceAreas: ServiceArea[] = [];
    private subscribers: Array<() => void> = [];

    initialize(seed?: ServiceArea[]) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                this.serviceAreas = JSON.parse(raw) as ServiceArea[];
            } catch (e) {
                this.serviceAreas = seed || [];
                this.persist();
            }
        } else {
            this.serviceAreas = seed || [];
            this.persist();
        }
        this.notify();
    }

    getAllServiceAreas(): ServiceArea[] {
        return [...this.serviceAreas];
    }

    getServiceAreaById(id: string): ServiceArea | undefined {
        return this.serviceAreas.find(s => s.id === id);
    }

    createServiceArea(area: Omit<ServiceArea, 'id'>): ServiceArea {
        const newArea: ServiceArea = {
            ...area,
            id: `area-${Date.now()}`
        };
        this.serviceAreas.push(newArea);
        this.persist();
        this.notify();
        return newArea;
    }

    updateServiceArea(id: string, updates: Partial<ServiceArea>): ServiceArea | null {
        const index = this.serviceAreas.findIndex(a => a.id === id);
        if (index === -1) return null;
        
        this.serviceAreas[index] = {
            ...this.serviceAreas[index],
            ...updates,
            id: this.serviceAreas[index].id
        };
        this.persist();
        this.notify();
        return this.serviceAreas[index];
    }

    deleteServiceArea(id: string): boolean {
        const index = this.serviceAreas.findIndex(a => a.id === id);
        if (index === -1) return false;
        
        this.serviceAreas.splice(index, 1);
        this.persist();
        this.notify();
        return true;
    }

    private persist() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.serviceAreas));
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

export const serviceAreaService = new ServiceAreaService();
export default serviceAreaService;
