import { BaseFirebaseService } from './BaseFirebaseService';
import { doc, writeBatch, getDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface NavItem {
  id?: string;
  label: string;
  href: string;
  children?: NavItem[];
}

class NavigationFirebaseService extends BaseFirebaseService<NavItem> {
  constructor() {
    super({ collectionName: 'navigation' });
  }

  /**
   * Get all top-level navigation items
   */
  async getAll(): Promise<NavItem[]> {
    try {
      console.log('[navigation] Fetching all navigation items...');
      const items = await super.getAll();
      console.log('[navigation] Found', items.length, 'items');
      return items;
    } catch (error) {
      console.error('Error fetching navigation items:', error);
      throw error;
    }
  }

  /**
   * Find item by ID (including nested children)
   */
  async findById(id: string): Promise<NavItem | undefined> {
    try {
      const items = await this.getAll();
      
      const findInTree = (list: NavItem[]): NavItem | undefined => {
        for (const item of list) {
          if (item.id === id) return item;
          if (item.children) {
            const found = findInTree(item.children);
            if (found) return found;
          }
        }
        return undefined;
      };
      
      return findInTree(items);
    } catch (error) {
      console.error('Error finding navigation item:', error);
      throw error;
    }
  }

  /**
   * Create new navigation item
   */
  async create(item: Omit<NavItem, 'id'>): Promise<NavItem> {
    try {
      console.log('[navigation] Creating new item:', item);
      const result = await super.create(item);
      console.log('[navigation] Item created:', result);
      return result;
    } catch (error) {
      console.error('Error creating navigation item:', error);
      throw error;
    }
  }

  /**
   * Update navigation item
   */
  async update(id: string, data: Partial<NavItem>): Promise<NavItem> {
    try {
      console.log('[navigation] Updating item:', id, data);
      const result = await super.update(id, data);
      console.log('[navigation] Item updated:', result);
      return result;
    } catch (error) {
      console.error('Error updating navigation item:', error);
      throw error;
    }
  }

  /**
   * Delete navigation item (including nested items from parents)
   */
  async delete(id: string): Promise<void> {
    try {
      console.log('[navigation] Deleting item:', id);
      
      // Get all items from Firebase
      const items = await this.getAll();
      console.log('[navigation] Current items before delete:', items.map(i => i.id));
      
      // Helper function to find and remove item from tree
      const deleteFromTree = (list: NavItem[]): boolean => {
        // Try to delete from top level
        const idx = list.findIndex(i => i.id === id);
        if (idx >= 0) {
          console.log('[navigation] Found at top level, removing...');
          list.splice(idx, 1);
          return true;
        }
        
        // Try to delete from children
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          if (item.children) {
            const childIdx = item.children.findIndex(c => c.id === id);
            if (childIdx >= 0) {
              console.log('[navigation] Found in children of', item.id, ', removing...');
              item.children.splice(childIdx, 1);
              // Remove empty children array
              if (item.children.length === 0) {
                delete item.children;
              }
              return true;
            }
            // Recursively search deeper
            if (deleteFromTree(item.children)) {
              return true;
            }
          }
        }
        return false;
      };
      
      const found = deleteFromTree(items);
      console.log('[navigation] Item found and deleted from tree?', found);
      console.log('[navigation] Items after delete:', items.map(i => i.id));
      
      if (found) {
        // Clear and rebuild all navigation items
        console.log('[navigation] Rebuilding Firebase with remaining items...');
        const batch = writeBatch(db);
        
        // Get fresh list of ALL documents currently in Firebase
        const navCollection = collection(db, this.collectionName);
        const allDocsSnapshot = await getDocs(navCollection);
        
        // Delete all existing documents
        for (const docSnapshot of allDocsSnapshot.docs) {
          batch.delete(docSnapshot.ref);
        }
        
        // Re-add the remaining items
        for (const item of items) {
          if (item.id) {
            const docRef = doc(db, this.collectionName, item.id);
            batch.set(docRef, item);
          }
        }
        
        await batch.commit();
        console.log('[navigation] Firebase rebuilt successfully with', items.length, 'items');
      } else {
        // Item not found in tree - try direct delete from database
        console.log('[navigation] Item not found in tree, attempting direct delete from DB');
        const docRef = doc(db, this.collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await deleteDoc(docRef);
          console.log('[navigation] Document deleted directly from Firebase');
        } else {
          console.warn('[navigation] Document does not exist:', id);
          throw new Error(`Item with id ${id} not found`);
        }
      }
    } catch (error) {
      console.error('Error deleting navigation item:', error);
      throw error;
    }
  }
}

export default new NavigationFirebaseService();
