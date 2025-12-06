interface Viban {
    id: string;
    name: string;
    description: string;
    category: string;
    status: string;
    createdDate: string;
}

class VibanService {
    private vibans: Viban[] = [];

    initializeVibans(initialVibans: Viban[]) {
        this.vibans = JSON.parse(JSON.stringify(initialVibans));
    }

    getAllVibans(): Viban[] {
        return JSON.parse(JSON.stringify(this.vibans));
    }

    getVibanById(id: string): Viban | null {
        return this.vibans.find(v => v.id === id) || null;
    }

    createViban(vibanData: Omit<Viban, 'id'>): Viban {
        const id = `viban-${Date.now()}`;
        const newViban: Viban = { ...vibanData, id };
        this.vibans.unshift(newViban);
        return newViban;
    }

    updateViban(id: string, vibanData: Viban): Viban | null {
        const index = this.vibans.findIndex(v => v.id === id);
        if (index !== -1) {
            this.vibans[index] = vibanData;
            return vibanData;
        }
        return null;
    }

    deleteViban(id: string): boolean {
        const index = this.vibans.findIndex(v => v.id === id);
        if (index !== -1) {
            this.vibans.splice(index, 1);
            return true;
        }
        return false;
    }

    searchVibans(query: string): Viban[] {
        const q = query.toLowerCase();
        return this.vibans.filter(v =>
            v.name.toLowerCase().includes(q) ||
            v.description.toLowerCase().includes(q)
        );
    }
}

export const vibanService = new VibanService();
