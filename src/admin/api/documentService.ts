import { LegalDocument } from '../../types';

/**
 * DocumentService - Manages legal documents with CRUD operations
 * Handles document storage, retrieval, and search
 */
class DocumentService {
    private documents: LegalDocument[] = [];

    /**
     * Initialize service with initial documents
     * @param initialDocuments - Array of documents to initialize
     */
    initializeDocuments(initialDocuments: LegalDocument[]): void {
        this.documents = JSON.parse(JSON.stringify(initialDocuments));
    }

    /**
     * Get all documents
     * @returns Copy of all documents array
     */
    getAllDocuments(): LegalDocument[] {
        return JSON.parse(JSON.stringify(this.documents));
    }

    /**
     * Get document by ID
     * @param id - Document ID
     * @returns Document if found, null otherwise
     */
    getDocumentById(id: string): LegalDocument | null {
        return this.documents.find(d => d.id === id) || null;
    }

    /**
     * Create new document
     * @param docData - Document data without ID
     * @returns Created document with generated ID
     */
    createDocument(docData: Omit<LegalDocument, 'id'>): LegalDocument {
        const id = `doc-${Date.now()}`;
        const newDocument: LegalDocument = { ...docData, id };
        this.documents.unshift(newDocument);
        return newDocument;
    }

    /**
     * Update existing document
     * @param id - Document ID
     * @param docData - Updated document data
     * @returns Updated document if found, null otherwise
     */
    updateDocument(id: string, docData: LegalDocument): LegalDocument | null {
        const index = this.documents.findIndex(d => d.id === id);
        if (index !== -1) {
            this.documents[index] = docData;
            return docData;
        }
        return null;
    }

    /**
     * Delete document by ID
     * @param id - Document ID
     * @returns true if deleted, false if not found
     */
    deleteDocument(id: string): boolean {
        const index = this.documents.findIndex(d => d.id === id);
        if (index !== -1) {
            this.documents.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Search documents by query
     * @param query - Search query
     * @returns Documents matching the query
     */
    searchDocuments(query: string): LegalDocument[] {
        const q = query.toLowerCase();
        return this.documents.filter(d =>
            d.title.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q)
        );
    }

    /**
     * Get documents by category
     * @param category - Category name
     * @returns Documents in the category
     */
    getDocumentsByCategory(category: string): LegalDocument[] {
        return this.documents.filter(d => d.category === category);
    }
}

export const documentService = new DocumentService();
