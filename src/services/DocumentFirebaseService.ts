import { BaseFirebaseService } from './BaseFirebaseService';
import { LegalDocument } from '../types';

class DocumentFirebaseService extends BaseFirebaseService<LegalDocument> {
  constructor() {
    super({ collectionName: 'legalDocuments' });
  }

  /**
   * Get all documents
   */
  async getAllDocuments(): Promise<LegalDocument[]> {
    return this.getOrdered('publishDate', 'desc');
  }

  /**
   * Get documents by category
   */
  async getDocumentsByCategory(category: string): Promise<LegalDocument[]> {
    return this.findWhere('category', '==', category);
  }

  /**
   * Search documents
   */
  async searchDocuments(searchTerm: string): Promise<LegalDocument[]> {
    try {
      const docs = await this.getAll();
      return docs.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching documents:', error);
      throw error;
    }
  }

  /**
   * Get document by ID
   */
  async getDocumentById(id: string): Promise<LegalDocument | null> {
    return this.getById(id);
  }

  /**
   * Create new document
   */
  async createDocument(data: Omit<LegalDocument, 'id'>): Promise<LegalDocument> {
    return this.create(data);
  }

  /**
   * Update document
   */
  async updateDocument(id: string, data: Partial<LegalDocument>): Promise<LegalDocument> {
    return this.update(id, data);
  }

  /**
   * Delete document
   */
  async deleteDocument(id: string): Promise<void> {
    return this.delete(id);
  }
}

export default new DocumentFirebaseService();
