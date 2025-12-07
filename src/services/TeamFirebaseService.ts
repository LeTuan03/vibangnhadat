import { BaseFirebaseService } from './BaseFirebaseService';
import { TeamMember } from '../types';

class TeamFirebaseService extends BaseFirebaseService<TeamMember> {
  constructor() {
    super({ collectionName: 'teamMembers' });
  }

  /**
   * Get all team members
   */
  async getAllMembers(): Promise<TeamMember[]> {
    return this.getAll();
  }

  /**
   * Get team member by ID
   */
  async getMemberById(id: string): Promise<TeamMember | null> {
    return this.getById(id);
  }

  /**
   * Create new team member
   */
  async createMember(data: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    return this.create(data);
  }

  /**
   * Update team member
   */
  async updateMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
    return this.update(id, data);
  }

  /**
   * Delete team member
   */
  async deleteMember(id: string): Promise<void> {
    return this.delete(id);
  }

  /**
   * Get members by position
   */
  async getMembersByPosition(position: string): Promise<TeamMember[]> {
    return this.findWhere('position', '==', position);
  }
}

export default new TeamFirebaseService();
