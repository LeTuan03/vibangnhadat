import { mockNavigation } from '../../data/mockData';

export type NavItem = {
    id: string;
    label: string;
    href: string;
    children?: NavItem[];
};

const STORAGE_KEY = 'navigation_items';

class NavigationService {
    private items: NavItem[] = [];
    private subscribers: Array<() => void> = [];

    initialize(seed?: NavItem[]) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                this.items = JSON.parse(raw) as NavItem[];
            } catch (e) {
                this.items = seed ?? mockNavigation;
                this.persist();
            }
        } else {
            this.items = seed ?? mockNavigation;
            this.persist();
        }
        this.notify();
    }

    getAll() {
        return [...this.items];
    }

    findById(id: string): NavItem | undefined {
        return this.items.find((i) => i.id === id) ||
            this.items.flatMap(i => i.children ?? []).find(c => c.id === id);
    }

    create(item: NavItem, parentId?: string) {
        if (parentId) {
            const parent = this.items.find(i => i.id === parentId);
            if (parent) {
                parent.children = parent.children ?? [];
                parent.children.push(item);
            } else {
                // if parent not found, push as top-level
                this.items.push(item);
            }
        } else {
            this.items.push(item);
        }
        this.persist();
        this.notify();
    }

    update(id: string, patch: Partial<NavItem>) {
        const updateItem = (list: NavItem[]): boolean => {
            for (let i = 0; i < list.length; i++) {
                const it = list[i];
                if (it.id === id) {
                    list[i] = { ...it, ...patch };
                    return true;
                }
                if (it.children && updateItem(it.children)) return true;
            }
            return false;
        };

        updateItem(this.items);
        this.persist();
        this.notify();
    }

    delete(id: string) {
        const deleteFrom = (list: NavItem[]): boolean => {
            const idx = list.findIndex(i => i.id === id);
            if (idx >= 0) {
                list.splice(idx, 1);
                return true;
            }
            for (const i of list) {
                if (i.children && deleteFrom(i.children)) return true;
            }
            return false;
        };

        deleteFrom(this.items);
        this.persist();
        this.notify();
    }

    subscribe(cb: () => void) {
        this.subscribers.push(cb);
        return () => {
            this.subscribers = this.subscribers.filter(s => s !== cb);
        };
    }

    private notify() {
        this.subscribers.forEach((s) => s());
    }

    private persist() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
        } catch (e) {
            // ignore
        }
    }
}

const navigationService = new NavigationService();
export default navigationService;
