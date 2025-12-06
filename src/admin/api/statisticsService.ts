import type { Statistic } from '../../types';

const STORAGE_KEY = 'statistics_data';

class StatisticsService {
    private statistics: Statistic[] = [];
    private subscribers: Array<() => void> = [];

    initialize(seed?: Statistic[]) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                this.statistics = JSON.parse(raw) as Statistic[];
            } catch (e) {
                this.statistics = seed || [];
                this.persist();
            }
        } else {
            this.statistics = seed || [];
            this.persist();
        }
        this.notify();
    }

    getAllStatistics(): Statistic[] {
        return [...this.statistics];
    }

    getStatisticById(id: string): Statistic | undefined {
        return this.statistics.find(s => s.id === id);
    }

    createStatistic(stat: Omit<Statistic, 'id'>): Statistic {
        const newStat: Statistic = {
            ...stat,
            id: `stat-${Date.now()}`
        };
        this.statistics.push(newStat);
        this.persist();
        this.notify();
        return newStat;
    }

    updateStatistic(id: string, updates: Partial<Statistic>): Statistic | null {
        const index = this.statistics.findIndex(s => s.id === id);
        if (index === -1) return null;
        
        this.statistics[index] = {
            ...this.statistics[index],
            ...updates,
            id: this.statistics[index].id
        };
        this.persist();
        this.notify();
        return this.statistics[index];
    }

    deleteStatistic(id: string): boolean {
        const index = this.statistics.findIndex(s => s.id === id);
        if (index === -1) return false;
        
        this.statistics.splice(index, 1);
        this.persist();
        this.notify();
        return true;
    }

    private persist() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.statistics));
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

export const statisticsService = new StatisticsService();
export default statisticsService;
