import { BaseFirebaseService } from './BaseFirebaseService';
import { Statistic } from '../types';

class StatisticsFirebaseService extends BaseFirebaseService<Statistic> {
  constructor() {
    super({ collectionName: 'statistics' });
  }

  /**
   * Get all statistics
   */
  async getAllStatistics(): Promise<Statistic[]> {
    return this.getAll();
  }

  /**
   * Get statistic by ID
   */
  async getStatisticById(id: string): Promise<Statistic | null> {
    return this.getById(id);
  }

  /**
   * Create new statistic
   */
  async createStatistic(data: Omit<Statistic, 'id'>): Promise<Statistic> {
    return this.create(data);
  }

  /**
   * Update statistic
   */
  async updateStatistic(id: string, data: Partial<Statistic>): Promise<Statistic> {
    return this.update(id, data);
  }

  /**
   * Delete statistic
   */
  async deleteStatistic(id: string): Promise<void> {
    return this.delete(id);
  }
}

export default new StatisticsFirebaseService();
