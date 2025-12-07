import { BaseFirebaseService } from './BaseFirebaseService';
import { Service } from '../types';

class ServiceFirebaseService extends BaseFirebaseService<Service> {
  constructor() {
    super({ collectionName: 'services' });
  }

  /**
   * Get all services
   */
  async getAllServices(): Promise<Service[]> {
    return this.getAll();
  }

  /**
   * Get service by ID
   */
  async getServiceById(id: string): Promise<Service | null> {
    return this.getById(id);
  }

  /**
   * Create new service
   */
  async createService(data: Omit<Service, 'id'>): Promise<Service> {
    return this.create(data);
  }

  /**
   * Update service
   */
  async updateService(id: string, data: Partial<Service>): Promise<Service> {
    return this.update(id, data);
  }

  /**
   * Delete service
   */
  async deleteService(id: string): Promise<void> {
    return this.delete(id);
  }
}

export default new ServiceFirebaseService();
