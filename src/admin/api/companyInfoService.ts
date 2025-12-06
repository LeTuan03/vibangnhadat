import type { ContactInfo } from '../../types';

const CONTACT_STORAGE_KEY = 'contact_info_data';
const COMPANY_STORAGE_KEY = 'company_info_data';

interface CompanyInfo {
    name: string;
    fullName: string;
    slogan: string;
    description: string;
    vision: string;
    mission: string;
    values: string[];
}

class CompanyInfoService {
    private contactInfo: ContactInfo | null = null;
    private companyInfo: CompanyInfo | null = null;
    private subscribers: Array<() => void> = [];

    initializeContactInfo(seed?: ContactInfo) {
        const raw = localStorage.getItem(CONTACT_STORAGE_KEY);
        if (raw) {
            try {
                this.contactInfo = JSON.parse(raw) as ContactInfo;
            } catch (e) {
                this.contactInfo = seed || null;
                this.persistContactInfo();
            }
        } else {
            this.contactInfo = seed || null;
            this.persistContactInfo();
        }
        this.notify();
    }

    initializeCompanyInfo(seed?: CompanyInfo) {
        const raw = localStorage.getItem(COMPANY_STORAGE_KEY);
        if (raw) {
            try {
                this.companyInfo = JSON.parse(raw) as CompanyInfo;
            } catch (e) {
                this.companyInfo = seed || null;
                this.persistCompanyInfo();
            }
        } else {
            this.companyInfo = seed || null;
            this.persistCompanyInfo();
        }
        this.notify();
    }

    getContactInfo(): ContactInfo | null {
        return this.contactInfo ? { ...this.contactInfo } : null;
    }

    getCompanyInfo(): CompanyInfo | null {
        return this.companyInfo ? { ...this.companyInfo } : null;
    }

    updateContactInfo(updates: Partial<ContactInfo>): ContactInfo | null {
        if (!this.contactInfo) return null;
        
        this.contactInfo = {
            ...this.contactInfo,
            ...updates
        };
        this.persistContactInfo();
        this.notify();
        return { ...this.contactInfo };
    }

    updateCompanyInfo(updates: Partial<CompanyInfo>): CompanyInfo | null {
        if (!this.companyInfo) return null;
        
        this.companyInfo = {
            ...this.companyInfo,
            ...updates
        };
        this.persistCompanyInfo();
        this.notify();
        return { ...this.companyInfo };
    }

    private persistContactInfo() {
        if (this.contactInfo) {
            localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(this.contactInfo));
        }
    }

    private persistCompanyInfo() {
        if (this.companyInfo) {
            localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(this.companyInfo));
        }
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

export const companyInfoService = new CompanyInfoService();
export default companyInfoService;
