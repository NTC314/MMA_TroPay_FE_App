import { Invoice, RecentUpdate, RoomInfo, ServiceUsage, TenantDashboardData } from '../../types/tenant';
import { mockTenantData } from './tenant';

// API service class for tenant operations
export class TenantApiService {
  private static instance: TenantApiService;
  private baseUrl = 'https://api.tropay.com'; // Replace with actual API URL

  private constructor() {}

  public static getInstance(): TenantApiService {
    if (!TenantApiService.instance) {
      TenantApiService.instance = new TenantApiService();
    }
    return TenantApiService.instance;
  }

  // Get dashboard data for tenant
  async getDashboardData(tenantId: string): Promise<TenantDashboardData> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/dashboard`);
      // const data = await response.json();
      // return data;

      // For now, return mock data with a delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockTenantData;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  }

  // Get room information
  async getRoomInfo(tenantId: string): Promise<RoomInfo> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/room`);
      // const data = await response.json();
      // return data;

      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTenantData.profile.roomInfo;
    } catch (error) {
      console.error('Error fetching room info:', error);
      throw new Error('Failed to fetch room information');
    }
  }

  // Get current invoice
  async getCurrentInvoice(tenantId: string): Promise<Invoice> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/invoices/current`);
      // const data = await response.json();
      // return data;

      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTenantData.currentInvoice;
    } catch (error) {
      console.error('Error fetching current invoice:', error);
      throw new Error('Failed to fetch current invoice');
    }
  }

  // Get service usage data
  async getServiceUsage(tenantId: string): Promise<ServiceUsage> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/services/usage`);
      // const data = await response.json();
      // return data;

      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTenantData.serviceUsage;
    } catch (error) {
      console.error('Error fetching service usage:', error);
      throw new Error('Failed to fetch service usage');
    }
  }

  // Get recent updates
  async getRecentUpdates(tenantId: string): Promise<RecentUpdate[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/updates`);
      // const data = await response.json();
      // return data;

      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTenantData.recentUpdates;
    } catch (error) {
      console.error('Error fetching recent updates:', error);
      throw new Error('Failed to fetch recent updates');
    }
  }

  // Submit payment (placeholder for VNPay integration)
  async processPayment(tenantId: string, invoiceId: string, amount: number): Promise<{ paymentUrl: string }> {
    try {
      // TODO: Replace with actual VNPay API integration
      // const response = await fetch(`${this.baseUrl}/payments/vnpay/create`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ tenantId, invoiceId, amount })
      // });
      // const data = await response.json();
      // return data;

      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        paymentUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?...' // Mock VNPay URL
      };
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new Error('Failed to process payment');
    }
  }

  // Report an issue
  async reportIssue(tenantId: string, issueData: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    category: string;
  }): Promise<{ issueId: string }> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/issues`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(issueData)
      // });
      // const data = await response.json();
      // return data;

      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        issueId: `ISSUE-${Date.now()}`
      };
    } catch (error) {
      console.error('Error reporting issue:', error);
      throw new Error('Failed to report issue');
    }
  }
}

// Export singleton instance
export const tenantApiService = TenantApiService.getInstance();