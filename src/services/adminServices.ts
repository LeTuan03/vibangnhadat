/**
 * Firebase Admin Services - Tổng hợp các Firebase Services
 * 
 * File này ghép tất cả các Firebase services lại với nhau
 * Cung cấp một điểm truy cập duy nhất cho tất cả CRUD operations
 * Thay thế cho các API services cũ trong admin/api/
 */

// ============ IMPORTS ============
import BlogFirebaseService from './BlogFirebaseService';
import ServiceFirebaseService from './ServiceFirebaseService';
import TeamFirebaseService from './TeamFirebaseService';
import DocumentFirebaseService from './DocumentFirebaseService';
import QAFirebaseService from './QAFirebaseService';
import StatisticsFirebaseService from './StatisticsFirebaseService';
import GalleryFirebaseService from './GalleryFirebaseService';
import TestimonialFirebaseService from './TestimonialFirebaseService';
import ServiceAreaFirebaseService from './ServiceAreaFirebaseService';
import FamilyLawFirebaseService from './FamilyLawFirebaseService';
import LegalArticleFirebaseService from './LegalArticleFirebaseService';
import LawExplanationFirebaseService from './LawExplanationFirebaseService';
import LegalTermFirebaseService from './LegalTermFirebaseService';
import ReferenceFirebaseService from './ReferenceFirebaseService';
import VibanFirebaseService from './VibanFirebaseService';
import CategoryFirebaseService from './CategoryFirebaseService';
import CompanyInfoFirebaseService from './CompanyInfoFirebaseService';
import NavigationFirebaseService from './NavigationFirebaseService';

import { 
  BlogPost, 
  Service, 
  TeamMember, 
  LegalDocument, 
  FAQ, 
  Statistic, 
  GalleryItem, 
  Testimonial, 
  ServiceArea, 
  FamilyLawQA,
  LegalArticle,
  LawExplanation,
  LegalTerm,
  Reference,
  ContactInfo
} from '../types';

// ============ BLOG SERVICES ============
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return BlogFirebaseService.getAllPosts();
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  return BlogFirebaseService.getById(id);
}

export async function createBlogPost(data: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  return BlogFirebaseService.create(data);
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
  return BlogFirebaseService.update(id, data);
}

export async function deleteBlogPost(id: string): Promise<void> {
  return BlogFirebaseService.delete(id);
}

// ============ SERVICE SERVICES ============
export async function getAllServices(): Promise<Service[]> {
  return ServiceFirebaseService.getAllServices();
}

export async function getServiceById(id: string): Promise<Service | null> {
  return ServiceFirebaseService.getServiceById(id);
}

export async function createService(data: Omit<Service, 'id'>): Promise<Service> {
  return ServiceFirebaseService.createService(data);
}

export async function updateService(id: string, data: Partial<Service>): Promise<Service> {
  return ServiceFirebaseService.updateService(id, data);
}

export async function deleteService(id: string): Promise<void> {
  return ServiceFirebaseService.deleteService(id);
}

// ============ TEAM SERVICES ============
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return TeamFirebaseService.getAllMembers();
}

export async function createTeamMember(data: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  return TeamFirebaseService.createMember(data);
}

export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
  return TeamFirebaseService.updateMember(id, data);
}

export async function deleteTeamMember(id: string): Promise<void> {
  return TeamFirebaseService.deleteMember(id);
}

// ============ DOCUMENT SERVICES ============
export async function getAllDocuments(): Promise<LegalDocument[]> {
  return DocumentFirebaseService.getAllDocuments();
}

export async function getDocumentById(id: string): Promise<LegalDocument | null> {
  return DocumentFirebaseService.getById(id);
}

export async function createDocument(data: Omit<LegalDocument, 'id'>): Promise<LegalDocument> {
  return DocumentFirebaseService.createDocument(data);
}

export async function updateDocument(id: string, data: Partial<LegalDocument>): Promise<LegalDocument> {
  return DocumentFirebaseService.updateDocument(id, data);
}

export async function deleteDocument(id: string): Promise<void> {
  return DocumentFirebaseService.deleteDocument(id);
}

// ============ QA/FAQ SERVICES ============
export async function getAllFAQs(): Promise<FAQ[]> {
  return QAFirebaseService.getAllFAQs();
}

export async function createFAQ(data: Omit<FAQ, 'id'>): Promise<FAQ> {
  return QAFirebaseService.create(data);
}

export async function updateFAQ(id: string, data: Partial<FAQ>): Promise<FAQ> {
  return QAFirebaseService.update(id, data);
}

export async function deleteFAQ(id: string): Promise<void> {
  return QAFirebaseService.delete(id);
}

// ============ STATISTICS SERVICES ============
export async function getAllStatistics(): Promise<Statistic[]> {
  return StatisticsFirebaseService.getAllStatistics();
}

export async function createStatistic(data: Omit<Statistic, 'id'>): Promise<Statistic> {
  return StatisticsFirebaseService.createStatistic(data);
}

export async function updateStatistic(id: string, data: Partial<Statistic>): Promise<Statistic> {
  return StatisticsFirebaseService.updateStatistic(id, data);
}

export async function deleteStatistic(id: string): Promise<void> {
  return StatisticsFirebaseService.deleteStatistic(id);
}

// ============ GALLERY SERVICES ============
export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  return GalleryFirebaseService.getAllItems();
}

export async function createGalleryItem(data: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
  return GalleryFirebaseService.createItem(data);
}

export async function updateGalleryItem(id: string, data: Partial<GalleryItem>): Promise<GalleryItem> {
  return GalleryFirebaseService.updateItem(id, data);
}

export async function deleteGalleryItem(id: string): Promise<void> {
  return GalleryFirebaseService.deleteItem(id);
}

// ============ TESTIMONIAL SERVICES ============
export async function getAllTestimonials(): Promise<Testimonial[]> {
  return TestimonialFirebaseService.getAllTestimonials();
}

export async function createTestimonial(data: Omit<Testimonial, 'id'>): Promise<Testimonial> {
  return TestimonialFirebaseService.createTestimonial(data);
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
  return TestimonialFirebaseService.updateTestimonial(id, data);
}

export async function deleteTestimonial(id: string): Promise<void> {
  return TestimonialFirebaseService.deleteTestimonial(id);
}

// ============ SERVICE AREA SERVICES ============
export async function getAllServiceAreas(): Promise<ServiceArea[]> {
  return ServiceAreaFirebaseService.getAllServiceAreas();
}

export async function createServiceArea(data: Omit<ServiceArea, 'id'>): Promise<ServiceArea> {
  return ServiceAreaFirebaseService.createServiceArea(data);
}

export async function updateServiceArea(id: string, data: Partial<ServiceArea>): Promise<ServiceArea> {
  return ServiceAreaFirebaseService.updateServiceArea(id, data);
}

export async function deleteServiceArea(id: string): Promise<void> {
  return ServiceAreaFirebaseService.deleteServiceArea(id);
}

// ============ FAMILY LAW SERVICES ============
export async function getAllFamilyLawQAs(): Promise<FamilyLawQA[]> {
  return FamilyLawFirebaseService.getAllQAs();
}

export async function createFamilyLawQA(data: Omit<FamilyLawQA, 'id'>): Promise<FamilyLawQA> {
  return FamilyLawFirebaseService.createQA(data);
}

export async function updateFamilyLawQA(id: string, data: Partial<FamilyLawQA>): Promise<FamilyLawQA> {
  return FamilyLawFirebaseService.updateQA(id, data);
}

export async function deleteFamilyLawQA(id: string): Promise<void> {
  return FamilyLawFirebaseService.deleteQA(id);
}

// ============ LEGAL ARTICLE SERVICES ============
export async function getAllLegalArticles(): Promise<LegalArticle[]> {
  return LegalArticleFirebaseService.getAllArticles();
}

export async function getLegalArticleById(id: string): Promise<LegalArticle | null> {
  return LegalArticleFirebaseService.getArticleById(id);
}

export async function getLegalArticlesByCategory(category: string): Promise<LegalArticle[]> {
  return LegalArticleFirebaseService.getArticlesByCategory(category);
}

export async function getFeaturedLegalArticles(limit?: number): Promise<LegalArticle[]> {
  return LegalArticleFirebaseService.getFeaturedArticles(limit);
}

export async function createLegalArticle(data: Omit<LegalArticle, 'id'>): Promise<LegalArticle> {
  return LegalArticleFirebaseService.createArticle(data);
}

export async function updateLegalArticle(id: string, data: Partial<LegalArticle>): Promise<LegalArticle> {
  return LegalArticleFirebaseService.updateArticle(id, data);
}

export async function deleteLegalArticle(id: string): Promise<void> {
  return LegalArticleFirebaseService.deleteArticle(id);
}

// ============ LAW EXPLANATION SERVICES ============
export async function getAllLawExplanations(): Promise<LawExplanation[]> {
  return LawExplanationFirebaseService.getAllExplanations();
}

export async function getLawExplanationById(id: string): Promise<LawExplanation | null> {
  return LawExplanationFirebaseService.getExplanationById(id);
}

export async function getLawExplanationByLawNumber(lawNumber: string): Promise<LawExplanation | null> {
  return LawExplanationFirebaseService.getExplanationByLawNumber(lawNumber);
}

export async function getLawExplanationsByCategory(category: string): Promise<LawExplanation[]> {
  return LawExplanationFirebaseService.getExplanationsByCategory(category);
}

export async function createLawExplanation(data: Omit<LawExplanation, 'id'>): Promise<LawExplanation> {
  return LawExplanationFirebaseService.createExplanation(data);
}

export async function updateLawExplanation(id: string, data: Partial<LawExplanation>): Promise<LawExplanation> {
  return LawExplanationFirebaseService.updateExplanation(id, data);
}

export async function deleteLawExplanation(id: string): Promise<void> {
  return LawExplanationFirebaseService.deleteExplanation(id);
}

// ============ LEGAL TERM SERVICES ============
export async function getAllLegalTerms(): Promise<LegalTerm[]> {
  return LegalTermFirebaseService.getAllTerms();
}

export async function getLegalTermById(id: string): Promise<LegalTerm | null> {
  return LegalTermFirebaseService.getTermById(id);
}

export async function searchLegalTerms(searchTerm: string): Promise<LegalTerm[]> {
  return LegalTermFirebaseService.searchTerms(searchTerm);
}

export async function createLegalTerm(data: Omit<LegalTerm, 'id'>): Promise<LegalTerm> {
  return LegalTermFirebaseService.createTerm(data);
}

export async function updateLegalTerm(id: string, data: Partial<LegalTerm>): Promise<LegalTerm> {
  return LegalTermFirebaseService.updateTerm(id, data);
}

export async function deleteLegalTerm(id: string): Promise<void> {
  return LegalTermFirebaseService.deleteTerm(id);
}

// ============ REFERENCE SERVICES ============
export async function getAllReferences(): Promise<Reference[]> {
  return ReferenceFirebaseService.getAllReferences();
}

export async function getReferenceById(id: string): Promise<Reference | null> {
  return ReferenceFirebaseService.getReferenceById(id);
}

export async function getReferencesByCategory(category: string): Promise<Reference[]> {
  return ReferenceFirebaseService.getReferencesByCategory(category);
}

export async function getVerifiedReferences(): Promise<Reference[]> {
  return ReferenceFirebaseService.getVerifiedReferences();
}

export async function searchReferences(searchTerm: string): Promise<Reference[]> {
  return ReferenceFirebaseService.searchReferences(searchTerm);
}

export async function createReference(data: Omit<Reference, 'id'>): Promise<Reference> {
  return ReferenceFirebaseService.createReference(data);
}

export async function updateReference(id: string, data: Partial<Reference>): Promise<Reference> {
  return ReferenceFirebaseService.updateReference(id, data);
}

export async function deleteReference(id: string): Promise<void> {
  return ReferenceFirebaseService.deleteReference(id);
}

// ============ VIBAN SERVICES ============
export async function getAllVibans() {
  return VibanFirebaseService.getAllVibans();
}

export async function createViban(data: any) {
  return VibanFirebaseService.createViban(data);
}

export async function updateViban(id: string, data: Partial<any>) {
  return VibanFirebaseService.updateViban(id, data);
}

export async function deleteViban(id: string) {
  return VibanFirebaseService.deleteViban(id);
}

export async function searchVibans(term: string) {
  return VibanFirebaseService.searchVibans(term);
}

// ============ CATEGORY SERVICES ============
export async function getAllCategories() {
  return CategoryFirebaseService.getAllCategories();
}

export async function getCategoryById(id: string) {
  return CategoryFirebaseService.getCategoryById(id);
}

export async function createCategory(data: any) {
  return CategoryFirebaseService.createCategory(data);
}

export async function updateCategory(id: string, data: Partial<any>) {
  return CategoryFirebaseService.updateCategory(id, data);
}

export async function deleteCategory(id: string) {
  return CategoryFirebaseService.deleteCategory(id);
}

export async function searchCategories(term: string) {
  return CategoryFirebaseService.searchCategories(term);
}

// ============ NAVIGATION SERVICES ============
export async function getAllNavigationItems() {
  const items = await NavigationFirebaseService.getAll();
  // Sort by order field if it exists, otherwise maintain original order
  return items.sort((a, b) => {
    const orderA = a.order ?? Infinity;
    const orderB = b.order ?? Infinity;
    return orderA - orderB;
  });
}

export async function createNavigationItem(data: any, parentId?: string) {
  return NavigationFirebaseService.create(data, parentId);
}

export async function updateNavigationItem(id: string, data: Partial<any>) {
  return NavigationFirebaseService.update(id, data);
}

export async function deleteNavigationItem(id: string) {
  return NavigationFirebaseService.delete(id);
}

// ============ COMPANY INFO SERVICES ============
export async function getContactInfo(): Promise<ContactInfo | null> {
  return CompanyInfoFirebaseService.getContactInfo();
}

export async function getCompanyInfo() {
  return CompanyInfoFirebaseService.getCompanyInfo();
}

export async function updateContactInfo(data: Partial<ContactInfo>) {
  return CompanyInfoFirebaseService.updateContactInfo(data);
}

export async function updateCompanyInfo(data: Partial<any>) {
  return CompanyInfoFirebaseService.updateCompanyInfo(data);
}
