import { BaseFirebaseService } from './BaseFirebaseService';
import { ContactInfo } from '../types';

export interface CompanyInfo {
  id?: string;
  name: string;
  fullName: string;
  slogan: string;
  description: string;
  vision: string;
  mission: string;
  values: string[];
}

class CompanyInfoFirebaseService {
  private contactService = new BaseFirebaseService<ContactInfo & { id?: string }>({ collectionName: 'contactInfo' });
  private companyService = new BaseFirebaseService<CompanyInfo>({ collectionName: 'companyInfo' });

  /**
   * Get contact info (assumes single document with id 'main')
   */
  async getContactInfo(): Promise<ContactInfo | null> {
    try {
      return await this.contactService.getById('main');
    } catch (error) {
      console.error('Error getting contact info:', error);
      return null;
    }
  }

  /**
   * Get company info (assumes single document with id 'main')
   */
  async getCompanyInfo(): Promise<CompanyInfo | null> {
    try {
      return await this.companyService.getById('main');
    } catch (error) {
      console.error('Error getting company info:', error);
      return null;
    }
  }

  /**
   * Update contact info
   */
  async updateContactInfo(updates: Partial<ContactInfo>): Promise<ContactInfo> {
    try {
      const existing = await this.getContactInfo();
      if (existing) {
        return await this.contactService.update('main', updates);
      } else {
        // Create if doesn't exist
        const result = await this.contactService.create({ ...updates } as any);
        return result;
      }
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw error;
    }
  }

  /**
   * Update company info
   */
  async updateCompanyInfo(updates: Partial<CompanyInfo>): Promise<CompanyInfo> {
    try {
      const existing = await this.getCompanyInfo();
      if (existing) {
        return await this.companyService.update('main', updates);
      } else {
        // Create if doesn't exist
        const result = await this.companyService.create({ ...updates } as any);
        return result;
      }
    } catch (error) {
      console.error('Error updating company info:', error);
      throw error;
    }
  }
}

export default new CompanyInfoFirebaseService();
