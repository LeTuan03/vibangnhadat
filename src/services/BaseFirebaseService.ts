import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface FirebaseServiceConfig {
  collectionName: string;
}

/**
 * Base Firebase Service - Provides common CRUD operations
 */
export class BaseFirebaseService<T extends { id?: string }> {
  protected collectionName: string;

  constructor(config: FirebaseServiceConfig) {
    this.collectionName = config.collectionName;
  }

  /**
   * Get all documents from collection
   */
  async getAll(constraints: QueryConstraint[] = []): Promise<T[]> {
    try {
      console.log(`[${this.collectionName}] Fetching all documents...`);
      const collectionRef = collection(db, this.collectionName);
      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as T));
      console.log(`[${this.collectionName}] Found ${results.length} documents:`, results);
      return results;
    } catch (error) {
      console.error(`Error fetching all documents from ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Get document by ID
   */
  async getById(id: string): Promise<T | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as T;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching document ${id} from ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Create new document
   */
  async create(data: Omit<T, 'id'>): Promise<T> {
    try {
      console.log(`[${this.collectionName}] Creating new document:`, data);
      const collectionRef = collection(db, this.collectionName);
      const docRef = await addDoc(collectionRef, {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      const result = {
        id: docRef.id,
        ...data
      } as T;
      console.log(`[${this.collectionName}] Document created successfully:`, result);
      return result;
    } catch (error) {
      console.error(`Error creating document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Update existing document
   */
  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      console.log(`[${this.collectionName}] Updating document ${id}:`, data);
      const docRef = doc(db, this.collectionName, id);
      
      // Check if document exists before updating
      const existingDoc = await getDoc(docRef);
      if (!existingDoc.exists()) {
        throw new Error(`Document with id ${id} does not exist in ${this.collectionName}`);
      }
      
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
      
      const updatedDoc = await getDoc(docRef);
      if (!updatedDoc.exists()) {
        throw new Error(`Failed to fetch updated document ${id}`);
      }
      
      const result = {
        id: updatedDoc.id,
        ...updatedDoc.data()
      } as T;
      console.log(`[${this.collectionName}] Document updated successfully:`, result);
      return result;
    } catch (error) {
      console.error(`Error updating document ${id} in ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Delete document
   */
  async delete(id: string): Promise<void> {
    try {
      console.log(`[${this.collectionName}] Deleting document ${id}`);
      const docRef = doc(db, this.collectionName, id);
      
      // Check if document exists before deleting
      const existingDoc = await getDoc(docRef);
      if (!existingDoc.exists()) {
        throw new Error(`Document with id ${id} does not exist in ${this.collectionName}`);
      }
      
      await deleteDoc(docRef);
      console.log(`[${this.collectionName}] Document deleted successfully: ${id}`);
    } catch (error) {
      console.error(`Error deleting document ${id} from ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Query documents with where clause
   */
  async findWhere(fieldPath: string, operator: string, value: any): Promise<T[]> {
    try {
      const collectionRef = collection(db, this.collectionName);
      const q = query(collectionRef, where(fieldPath, operator as any, value));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as T));
    } catch (error) {
      console.error(`Error querying ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Get documents with ordering
   */
  async getOrdered(fieldPath: string, direction: 'asc' | 'desc' = 'asc', limitCount?: number): Promise<T[]> {
    try {
      const collectionRef = collection(db, this.collectionName);
      const constraints: QueryConstraint[] = [orderBy(fieldPath, direction)];
      if (limitCount) constraints.push(limit(limitCount));
      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as T));
    } catch (error) {
      console.error(`Error getting ordered documents from ${this.collectionName}:`, error);
      throw error;
    }
  }
}
