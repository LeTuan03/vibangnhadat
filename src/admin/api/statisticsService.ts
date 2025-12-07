import type { Statistic } from '../../types';
import {
    getAllStatistics,
    createStatistic,
    updateStatistic,
    deleteStatistic,
} from '../../services';

/**
 * StatisticsService - Firebase-backed statistics management
 * Uses Firebase Firestore for data persistence
 */
class StatisticsService {
    private subscribers: Array<() => void> = [];

    /**
     * Initialize service (kept for compatibility)
     */
    initialize() {
        this.notify();
    }

    /**
     * Get all statistics from Firebase
     */
    async getAllStatistics(): Promise<Statistic[]> {
        return getAllStatistics();
    }

    /**
     * Get statistic by ID from Firebase
     */
    async getStatisticById(id: string): Promise<Statistic | undefined> {
        const stats = await getAllStatistics();
        return stats.find(s => s.id === id);
    }

    /**
     * Create new statistic in Firebase
     */
    async createStatistic(stat: Omit<Statistic, 'id'>): Promise<Statistic> {
        const result = await createStatistic(stat);
        this.notify();
        return result;
    }

    /**
     * Update existing statistic in Firebase
     */
    async updateStatistic(id: string, updates: Partial<Statistic>): Promise<Statistic | null> {
        try {
            const result = await updateStatistic(id, updates);
            this.notify();
            return result;
        } catch (error) {
            return null;
        }
    }

    /**
     * Delete statistic from Firebase
     */
    async deleteStatistic(id: string): Promise<boolean> {
        try {
            await deleteStatistic(id);
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

export const statisticsService = new StatisticsService();
export default statisticsService;
