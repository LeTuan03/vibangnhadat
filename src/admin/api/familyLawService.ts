import type { FamilyLawQA } from '../../types';
import {
    getAllFamilyLawQAs,
    createFamilyLawQA,
    updateFamilyLawQA,
    deleteFamilyLawQA,
} from '../../services';

/**
 * FamilyLawService - Firebase-backed family law management
 * Uses Firebase Firestore for data persistence
 */
class FamilyLawService {
    private subscribers: Array<() => void> = [];

    /**
     * Initialize service (kept for compatibility)
     */
    initialize() {
        this.notify();
    }

    /**
     * Get all family law QAs from Firebase
     */
    async getAllFamilyLaws(): Promise<FamilyLawQA[]> {
        return getAllFamilyLawQAs();
    }

    /**
     * Get family law QA by ID from Firebase
     */
    async getFamilyLawById(id: string): Promise<FamilyLawQA | undefined> {
        const laws = await getAllFamilyLawQAs();
        return laws.find(f => f.id === id);
    }

    /**
     * Create new family law QA in Firebase
     */
    async createFamilyLaw(law: Omit<FamilyLawQA, 'id'>): Promise<FamilyLawQA> {
        const result = await createFamilyLawQA(law);
        this.notify();
        return result;
    }

    /**
     * Update existing family law QA in Firebase
     */
    async updateFamilyLaw(id: string, updates: Partial<FamilyLawQA>): Promise<FamilyLawQA | null> {
        try {
            const result = await updateFamilyLawQA(id, updates);
            this.notify();
            return result;
        } catch (error) {
            return null;
        }
    }

    /**
     * Delete family law QA from Firebase
     */
    async deleteFamilyLaw(id: string): Promise<boolean> {
        try {
            await deleteFamilyLawQA(id);
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

export const familyLawService = new FamilyLawService();
export default familyLawService;
