import { BaseFirebaseService } from './BaseFirebaseService';
import { ServiceArea } from '../types';

class ServiceAreaFirebaseService extends BaseFirebaseService<ServiceArea> {
  constructor() {
    super({ collectionName: 'serviceAreas' });
  }

  /**
   * Get all service areas
   */
  async getAllServiceAreas(): Promise<ServiceArea[]> {
    return this.getAll();
  }

  /**
   * Get service area by ID
   */
  async getServiceAreaById(id: string): Promise<ServiceArea | null> {
    return this.getById(id);
  }

  /**
   * Create new service area
   */
  async createServiceArea(data: Omit<ServiceArea, 'id'>): Promise<ServiceArea> {
    return this.create(data);
  }

  /**
   * Update service area
   */
  async updateServiceArea(id: string, data: Partial<ServiceArea>): Promise<ServiceArea> {
    return this.update(id, data);
  }

  /**
   * Delete service area
   */
  async deleteServiceArea(id: string): Promise<void> {
    return this.delete(id);
  }

  /**
   * Search service areas by name
   */
  async searchServiceAreas(searchTerm: string): Promise<ServiceArea[]> {
    try {
      const areas = await this.getAll();
      return areas.filter(area =>
        area.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (area.description && area.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } catch (error) {
      console.error('Error searching service areas:', error);
      throw error;
    }
  }
}

export default new ServiceAreaFirebaseService();
