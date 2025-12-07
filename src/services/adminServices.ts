/**
 * Firebase Admin Services - Thay thế cho Admin API Services cũ
 * 
 * Các services này cung cấp CRUD operations cho Firebase Firestore
 * Sử dụng thay cho các services cũ trong admin/api/
 */

// ============ Blog Admin Service ============
import BlogFirebaseService from '../services/BlogFirebaseService';
import { BlogPost } from '../types';

// Lấy tất cả bài viết
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return BlogFirebaseService.getAllPosts();
}

// Lấy bài viết theo ID
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  return BlogFirebaseService.getById(id);
}

// Tạo bài viết mới
export async function createBlogPost(data: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  return BlogFirebaseService.create(data);
}

// Cập nhật bài viết
export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
  return BlogFirebaseService.update(id, data);
}

// Xóa bài viết
export async function deleteBlogPost(id: string): Promise<void> {
  return BlogFirebaseService.delete(id);
}

// ============ Service Admin Service ============
import ServiceFirebaseService from '../services/ServiceFirebaseService';
import { Service } from '../types';

// Lấy tất cả dịch vụ
export async function getAllServices(): Promise<Service[]> {
  return ServiceFirebaseService.getAllServices();
}

// Tạo dịch vụ
export async function createService(data: Omit<Service, 'id'>): Promise<Service> {
  return ServiceFirebaseService.createService(data);
}

// Cập nhật dịch vụ
export async function updateService(id: string, data: Partial<Service>): Promise<Service> {
  return ServiceFirebaseService.updateService(id, data);
}

// Xóa dịch vụ
export async function deleteService(id: string): Promise<void> {
  return ServiceFirebaseService.deleteService(id);
}

// ============ Team Admin Service ============
import TeamFirebaseService from '../services/TeamFirebaseService';
import { TeamMember } from '../types';

// Lấy tất cả thành viên
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return TeamFirebaseService.getAllMembers();
}

// Tạo thành viên
export async function createTeamMember(data: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  return TeamFirebaseService.createMember(data);
}

// Cập nhật thành viên
export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
  return TeamFirebaseService.updateMember(id, data);
}

// Xóa thành viên
export async function deleteTeamMember(id: string): Promise<void> {
  return TeamFirebaseService.deleteMember(id);
}

// ============ Document Admin Service ============
import DocumentFirebaseService from '../services/DocumentFirebaseService';
import { LegalDocument } from '../types';

// Lấy tất cả tài liệu
export async function getAllDocuments(): Promise<LegalDocument[]> {
  return DocumentFirebaseService.getAllDocuments();
}

// Tạo tài liệu
export async function createDocument(data: Omit<LegalDocument, 'id'>): Promise<LegalDocument> {
  return DocumentFirebaseService.createDocument(data);
}

// Cập nhật tài liệu
export async function updateDocument(id: string, data: Partial<LegalDocument>): Promise<LegalDocument> {
  return DocumentFirebaseService.updateDocument(id, data);
}

// Xóa tài liệu
export async function deleteDocument(id: string): Promise<void> {
  return DocumentFirebaseService.deleteDocument(id);
}

// ============ QA/FAQ Admin Service ============
import QAFirebaseService from '../services/QAFirebaseService';
import { FAQ } from '../types';

// Lấy tất cả FAQs
export async function getAllFAQs(): Promise<FAQ[]> {
  return QAFirebaseService.getAllFAQs();
}

// Tạo FAQ
export async function createFAQ(data: Omit<FAQ, 'id'>): Promise<FAQ> {
  return QAFirebaseService.create(data);
}

// Cập nhật FAQ
export async function updateFAQ(id: string, data: Partial<FAQ>): Promise<FAQ> {
  return QAFirebaseService.update(id, data);
}

// Xóa FAQ
export async function deleteFAQ(id: string): Promise<void> {
  return QAFirebaseService.delete(id);
}

// ============ Statistics Admin Service ============
import StatisticsFirebaseService from '../services/StatisticsFirebaseService';
import { Statistic } from '../types';

// Lấy tất cả thống kê
export async function getAllStatistics(): Promise<Statistic[]> {
  return StatisticsFirebaseService.getAllStatistics();
}

// Tạo thống kê
export async function createStatistic(data: Omit<Statistic, 'id'>): Promise<Statistic> {
  return StatisticsFirebaseService.createStatistic(data);
}

// Cập nhật thống kê
export async function updateStatistic(id: string, data: Partial<Statistic>): Promise<Statistic> {
  return StatisticsFirebaseService.updateStatistic(id, data);
}

// Xóa thống kê
export async function deleteStatistic(id: string): Promise<void> {
  return StatisticsFirebaseService.deleteStatistic(id);
}

// ============ Gallery Admin Service ============
import GalleryFirebaseService from '../services/GalleryFirebaseService';
import { GalleryItem } from '../types';

// Lấy tất cả items
export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  return GalleryFirebaseService.getAllItems();
}

// Tạo item
export async function createGalleryItem(data: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
  return GalleryFirebaseService.createItem(data);
}

// Cập nhật item
export async function updateGalleryItem(id: string, data: Partial<GalleryItem>): Promise<GalleryItem> {
  return GalleryFirebaseService.updateItem(id, data);
}

// Xóa item
export async function deleteGalleryItem(id: string): Promise<void> {
  return GalleryFirebaseService.deleteItem(id);
}

// ============ Testimonial Admin Service ============
import TestimonialFirebaseService from '../services/TestimonialFirebaseService';
import { Testimonial } from '../types';

// Lấy tất cả testimonials
export async function getAllTestimonials(): Promise<Testimonial[]> {
  return TestimonialFirebaseService.getAllTestimonials();
}

// Tạo testimonial
export async function createTestimonial(data: Omit<Testimonial, 'id'>): Promise<Testimonial> {
  return TestimonialFirebaseService.createTestimonial(data);
}

// Cập nhật testimonial
export async function updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
  return TestimonialFirebaseService.updateTestimonial(id, data);
}

// Xóa testimonial
export async function deleteTestimonial(id: string): Promise<void> {
  return TestimonialFirebaseService.deleteTestimonial(id);
}

// ============ Service Area Admin Service ============
import ServiceAreaFirebaseService from '../services/ServiceAreaFirebaseService';
import { ServiceArea } from '../types';

// Lấy tất cả service areas
export async function getAllServiceAreas(): Promise<ServiceArea[]> {
  return ServiceAreaFirebaseService.getAllServiceAreas();
}

// Tạo service area
export async function createServiceArea(data: Omit<ServiceArea, 'id'>): Promise<ServiceArea> {
  return ServiceAreaFirebaseService.createServiceArea(data);
}

// Cập nhật service area
export async function updateServiceArea(id: string, data: Partial<ServiceArea>): Promise<ServiceArea> {
  return ServiceAreaFirebaseService.updateServiceArea(id, data);
}

// Xóa service area
export async function deleteServiceArea(id: string): Promise<void> {
  return ServiceAreaFirebaseService.deleteServiceArea(id);
}

// ============ Family Law Admin Service ============
import FamilyLawFirebaseService from '../services/FamilyLawFirebaseService';
import { FamilyLawQA } from '../types';

// Lấy tất cả family law QAs
export async function getAllFamilyLawQAs(): Promise<FamilyLawQA[]> {
  return FamilyLawFirebaseService.getAllQAs();
}

// Tạo family law QA
export async function createFamilyLawQA(data: Omit<FamilyLawQA, 'id'>): Promise<FamilyLawQA> {
  return FamilyLawFirebaseService.createQA(data);
}

// Cập nhật family law QA
export async function updateFamilyLawQA(id: string, data: Partial<FamilyLawQA>): Promise<FamilyLawQA> {
  return FamilyLawFirebaseService.updateQA(id, data);
}

// Xóa family law QA
export async function deleteFamilyLawQA(id: string): Promise<void> {
  return FamilyLawFirebaseService.deleteQA(id);
}
