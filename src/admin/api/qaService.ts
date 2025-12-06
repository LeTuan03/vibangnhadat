import { FAQ } from '../../types';

class QAService {
    private faqs: FAQ[] = [];

    initializeFAQs(initialFAQs: FAQ[]) {
        this.faqs = JSON.parse(JSON.stringify(initialFAQs));
    }

    getAllFAQs(): FAQ[] {
        return JSON.parse(JSON.stringify(this.faqs));
    }

    getFAQById(id: string): FAQ | null {
        return this.faqs.find(f => f.id === id) || null;
    }

    createFAQ(faqData: Omit<FAQ, 'id'>): FAQ {
        const id = `faq-${Date.now()}`;
        const newFAQ: FAQ = { ...faqData, id };
        this.faqs.unshift(newFAQ);
        return newFAQ;
    }

    updateFAQ(id: string, faqData: FAQ): FAQ | null {
        const index = this.faqs.findIndex(f => f.id === id);
        if (index !== -1) {
            this.faqs[index] = faqData;
            return faqData;
        }
        return null;
    }

    deleteFAQ(id: string): boolean {
        const index = this.faqs.findIndex(f => f.id === id);
        if (index !== -1) {
            this.faqs.splice(index, 1);
            return true;
        }
        return false;
    }

    searchFAQs(query: string): FAQ[] {
        const q = query.toLowerCase();
        return this.faqs.filter(f =>
            f.question.toLowerCase().includes(q) ||
            f.answer.toLowerCase().includes(q)
        );
    }

    getFAQsByCategory(category: string): FAQ[] {
        return this.faqs.filter(f => f.category === category);
    }
}

export const qaService = new QAService();
