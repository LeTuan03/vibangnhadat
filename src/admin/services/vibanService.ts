import { VibangType } from "../viban/VibanAdmin";

const STORAGE_KEY = 'viban_types';

const vibanService = {
    getAllViban: (): VibangType[] => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    getVibanById: (id: string): VibangType | undefined => {
        const vibans = vibanService.getAllViban();
        return vibans.find(viban => viban.id === id);
    },

    createViban: (viban: Omit<VibangType, 'id'>): VibangType => {
        const vibans = vibanService.getAllViban();
        const newViban: VibangType = {
            ...viban,
            id: Date.now().toString(),
        };
        vibans.push(newViban);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(vibans));
        return newViban;
    },

    updateViban: (id: string, updatedViban: Partial<VibangType>): VibangType | null => {
        const vibans = vibanService.getAllViban();
        const index = vibans.findIndex(viban => viban.id === id);

        if (index === -1) return null;

        vibans[index] = { ...vibans[index], ...updatedViban };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(vibans));
        return vibans[index];
    },

    deleteViban: (id: string): boolean => {
        const vibans = vibanService.getAllViban();
        const filteredVibans = vibans.filter(viban => viban.id !== id);

        if (filteredVibans.length === vibans.length) return false;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredVibans));
        return true;
    },

    initializeViban: (initialVibans: VibangType[]): void => {
        const existing = localStorage.getItem(STORAGE_KEY);
        if (!existing) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialVibans));
        }
    }
};

export default vibanService;