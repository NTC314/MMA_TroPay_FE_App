import { API_BASE_URL } from './config';
import { storageService } from '../storage';

// Issue types
export interface CreateIssueRequest {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'maintenance' | 'electrical' | 'plumbing' | 'noise' | 'security' | 'other';
  images?: string[]; // URLs to uploaded images
}

export interface Issue {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  status: 'submitted' | 'in-progress' | 'resolved' | 'closed';
  ticketNumber: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  assignedTo?: {
    id: string;
    name: string;
    role: string;
  };
}

export interface IssueComment {
  id: string;
  issueId: string;
  authorId: string;
  authorName: string;
  authorRole: 'tenant' | 'landlord' | 'maintenance';
  content: string;
  images?: string[];
  createdAt: string;
}

// Feedback types
export interface CreateFeedbackRequest {
  type: 'general' | 'service' | 'maintenance' | 'suggestion';
  rating: number; // 1-5 stars
  title: string;
  description: string;
  category?: string;
}

export interface Feedback {
  id: string;
  tenantId: string;
  type: string;
  rating: number;
  title: string;
  description: string;
  category?: string;
  status: 'submitted' | 'reviewed' | 'responded';
  createdAt: string;
  response?: {
    content: string;
    respondedBy: string;
    respondedAt: string;
  };
}

class IssueApiService {
  private baseUrl = `${API_BASE_URL}`;

  private async getAuthHeaders() {
    const token = await storageService.getAccessToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  // Issue Management
  async createIssue(tenantId: string, issueData: CreateIssueRequest): Promise<{ issueId: string; ticketNumber: string }> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/issues`, {
        method: 'POST',
        headers,
        body: JSON.stringify(issueData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to create issue');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Create issue error:', error);
      throw error;
    }
  }

  async getIssues(tenantId: string, status?: string, page: number = 1, limit: number = 20): Promise<{
    issues: Issue[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    try {
      const headers = await this.getAuthHeaders();
      
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status }),
      });

      const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/issues?${queryParams}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get issues');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Get issues error:', error);
      throw error;
    }
  }

  async getIssue(issueId: string): Promise<Issue> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/issues/${issueId}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get issue');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Get issue error:', error);
      throw error;
    }
  }

  async updateIssue(issueId: string, updates: Partial<CreateIssueRequest>): Promise<Issue> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/issues/${issueId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to update issue');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Update issue error:', error);
      throw error;
    }
  }

  // Issue Comments
  async addComment(issueId: string, content: string, images?: string[]): Promise<IssueComment> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/issues/${issueId}/comments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content, images }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to add comment');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Add comment error:', error);
      throw error;
    }
  }

  async getComments(issueId: string): Promise<IssueComment[]> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/issues/${issueId}/comments`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get comments');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Get comments error:', error);
      throw error;
    }
  }

  // Feedback Management
  async createFeedback(tenantId: string, feedbackData: CreateFeedbackRequest): Promise<{ feedbackId: string }> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/feedback`, {
        method: 'POST',
        headers,
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to create feedback');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Create feedback error:', error);
      throw error;
    }
  }

  async getFeedback(tenantId: string, page: number = 1, limit: number = 20): Promise<{
    feedback: Feedback[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/feedback?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get feedback');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Get feedback error:', error);
      throw error;
    }
  }

  // Mock methods for testing
  async createMockIssue(tenantId: string, issueData: CreateIssueRequest): Promise<{ issueId: string; ticketNumber: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      issueId: `ISSUE-${Date.now()}`,
      ticketNumber: `TR-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    };
  }

  async createMockFeedback(tenantId: string, feedbackData: CreateFeedbackRequest): Promise<{ feedbackId: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      feedbackId: `FEEDBACK-${Date.now()}`,
    };
  }
}

export const issueApiService = new IssueApiService();