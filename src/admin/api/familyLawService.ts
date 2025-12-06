import type { FamilyLawQA } from '../../types';

const STORAGE_KEY = 'family_law_data';

class FamilyLawService {
    private familyLaws: FamilyLawQA[] = [];
    private subscribers: Array<() => void> = [];

    initialize(seed?: FamilyLawQA[]) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                this.familyLaws = JSON.parse(raw) as FamilyLawQA[];
            } catch (e) {
                this.familyLaws = seed || [];
                this.persist();
            }
        } else {
            this.familyLaws = seed || [];
            this.persist();
        }
        this.notify();
    }

    getAllFamilyLaws(): FamilyLawQA[] {
        return [...this.familyLaws];
    }

    getFamilyLawById(id: string): FamilyLawQA | undefined {
        return this.familyLaws.find(f => f.id === id);
    }

    createFamilyLaw(law: Omit<FamilyLawQA, 'id'>): FamilyLawQA {
        const newLaw: FamilyLawQA = {
            ...law,
            id: `faq-family-${Date.now()}`
        };
        this.familyLaws.push(newLaw);
        this.persist();
        this.notify();
        return newLaw;
    }

    updateFamilyLaw(id: string, updates: Partial<FamilyLawQA>): FamilyLawQA | null {
        const index = this.familyLaws.findIndex(f => f.id === id);
        if (index === -1) return null;
        
        this.familyLaws[index] = {
            ...this.familyLaws[index],
            ...updates,
            id: this.familyLaws[index].id
        };
        this.persist();
        this.notify();
        return this.familyLaws[index];
    }

    deleteFamilyLaw(id: string): boolean {
        const index = this.familyLaws.findIndex(f => f.id === id);
        if (index === -1) return false;
        
        this.familyLaws.splice(index, 1);
        this.persist();
        this.notify();
        return true;
    }

    private persist() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.familyLaws));
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

export const familyLawService = new FamilyLawService();
export default familyLawService;
