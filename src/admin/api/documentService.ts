import { LegalDocument } from '../../types';
import {
    getAllDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument,
} from '../../services';

/**
 * DocumentService - Firebase-backed legal document management
 * Uses Firebase Firestore for data persistence
 */
class DocumentService {
    /**
     * Get all documents from Firebase
     */
    async getAllDocuments(): Promise<LegalDocument[]> {
        return getAllDocuments();
    }

    /**
     * Get document by ID from Firebase
     */
    async getDocumentById(id: string): Promise<LegalDocument | null> {
        return getDocumentById(id);
    }

    /**
     * Create new document in Firebase
     */
    async createDocument(docData: Omit<LegalDocument, 'id'>): Promise<LegalDocument> {
        return createDocument(docData);
    }

    /**
     * Update existing document in Firebase
     */
    async updateDocument(id: string, docData: Partial<LegalDocument>): Promise<LegalDocument> {
        return updateDocument(id, docData);
    }

    /**
     * Delete document from Firebase
     */
    async deleteDocument(id: string): Promise<void> {
        return deleteDocument(id);
    }
}

export const documentService = new DocumentService();