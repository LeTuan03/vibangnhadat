import { LegalDocument } from '../../types';

class DocumentService {
    private documents: LegalDocument[] = [];

    initializeDocuments(initialDocuments: LegalDocument[]) {
        this.documents = JSON.parse(JSON.stringify(initialDocuments));
    }

    getAllDocuments(): LegalDocument[] {
        return JSON.parse(JSON.stringify(this.documents));
    }

    getDocumentById(id: string): LegalDocument | null {
        return this.documents.find(d => d.id === id) || null;
    }

    createDocument(docData: Omit<LegalDocument, 'id'>): LegalDocument {
        const id = `doc-${Date.now()}`;
        const newDocument: LegalDocument = { ...docData, id };
        this.documents.unshift(newDocument);
        return newDocument;
    }

    updateDocument(id: string, docData: LegalDocument): LegalDocument | null {
        const index = this.documents.findIndex(d => d.id === id);
        if (index !== -1) {
            this.documents[index] = docData;
            return docData;
        }
        return null;
    }

    deleteDocument(id: string): boolean {
        const index = this.documents.findIndex(d => d.id === id);
        if (index !== -1) {
            this.documents.splice(index, 1);
            return true;
        }
        return false;
    }

    searchDocuments(query: string): LegalDocument[] {
        const q = query.toLowerCase();
        return this.documents.filter(d =>
            d.title.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q)
        );
    }

    getDocumentsByCategory(category: string): LegalDocument[] {
        return this.documents.filter(d => d.category === category);
    }
}

export const documentService = new DocumentService();
