import { API_BASE_URL } from './config';
import { storageService } from '../storage';

// Usage types
export interface ElectricityUsage {
  currentMonth: {
    amount: number;
    unit: 'kWh';
    cost: number;
    period: string; // YYYY-MM format
    readingDate: string;
    previousReading: number;
    currentReading: number;
  };
  previousMonth: {
    amount: number;
    unit: 'kWh';
    cost: number;
    period: string;
  };
  change: {
    amount: number;
    percentage: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  ratePerUnit: number; // VND per kWh
}

export interface WaterUsage {
  currentMonth: {
    amount: number;
    unit: 'm³';
    cost: number;
    period: string;
    readingDate: string;
    previousReading: number;
    currentReading: number;
  };
  previousMonth: {
    amount: number;
    unit: 'm³';
    cost: number;
    period: string;
  };
  change: {
    amount: number;
    percentage: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  ratePerUnit: number; // VND per m³
}

export interface InternetUsage {
  currentMonth: {
    amount: number;
    unit: 'GB';
    cost: number;
    period: string;
    planName: string;
    bandwidth: string; // e.g., "50 Mbps"
  };
  previousMonth: {
    amount: number;
    unit: 'GB';
    cost: number;
    period: string;
  };
  change: {
    amount: number;
    percentage: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  isUnlimited: boolean;
  monthlyFee: number;
}

export interface UsageHistory {
  period: string; // YYYY-MM
  electricity: {
    amount: number;
    cost: number;
  };
  water: {
    amount: number;
    cost: number;
  };
  internet: {
    amount: number;
    cost: number;
  };
  totalCost: number;
}

export interface UsageSummary {
  electricity: ElectricityUsage;
  water: WaterUsage;
  internet: InternetUsage;
}

class UsageApiService {
  private baseUrl = `${API_BASE_URL}`;

  private async getAuthHeaders() {
    const token = await storageService.getAccessToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  // Get electricity usage
  async getElectricityUsage(tenantId: string, period?: string): Promise<ElectricityUsage> {
    try {
      const headers = await this.getAuthHeaders();
      
      const queryParams = period ? `?period=${period}` : '';
      const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/usage/electricity${queryParams}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get electricity usage');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Get electricity usage error:', error);
      throw error;
    }
  }

  // Get water usage
  async getWaterUsage(tenantId: string, period?: string): Promise<WaterUsage> {
    try {
      const headers = await this.getAuthHeaders();
      
      const queryParams = period ? `?period=${period}` : '';
      const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/usage/water${queryParams}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get water usage');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Get water usage error:', error);
      throw error;
    }
  }

  // Get internet usage
  async getInternetUsage(tenantId: string, period?: string): Promise<InternetUsage> {
    try {
      const headers = await this.getAuthHeaders();
      
      const queryParams = period ? `?period=${period}` : '';
      const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/usage/internet${queryParams}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get internet usage');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Get internet usage error:', error);
      throw error;
    }
  }

  // Get all usage data (electricity, water, internet)
  async getAllUsage(tenantId: string, period?: string): Promise<UsageSummary> {
    try {
      const [electricity, water, internet] = await Promise.all([
        this.getElectricityUsage(tenantId, period),
        this.getWaterUsage(tenantId, period),
        this.getInternetUsage(tenantId, period),
      ]);

      return {
        electricity,
        water,
        internet,
      };
    } catch (error) {
      console.error('Get all usage error:', error);
      throw error;
    }
  }

  // Get usage history
  async getUsageHistory(
    tenantId: string, 
    months: number = 12,
    startDate?: string
  ): Promise<{
    history: UsageHistory[];
    summary: {
      totalMonths: number;
      averageElectricity: number;
      averageWater: number;
      averageInternet: number;
      totalCost: number;
    };
  }> {
    try {
      const headers = await this.getAuthHeaders();
      
      const queryParams = new URLSearchParams({
        months: months.toString(),
        ...(startDate && { startDate }),
      });

      const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/usage/history?${queryParams}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get usage history');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Get usage history error:', error);
      throw error;
    }
  }

  // Submit meter reading (for manual readings)
  async submitMeterReading(
    tenantId: string,
    readings: {
      electricityReading?: number;
      waterReading?: number;
      readingDate: string;
      images?: string[]; // Photos of meter readings
    }
  ): Promise<{ success: boolean; message: string }> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/usage/readings`, {
        method: 'POST',
        headers,
        body: JSON.stringify(readings),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to submit meter reading');
      }

      return await response.json();
    } catch (error) {
      console.error('Submit meter reading error:', error);
      throw error;
    }
  }

  // Get usage alerts/notifications
  async getUsageAlerts(tenantId: string): Promise<{
    alerts: {
      id: string;
      type: 'high_usage' | 'unusual_pattern' | 'meter_reading_due';
      service: 'electricity' | 'water' | 'internet';
      message: string;
      severity: 'info' | 'warning' | 'critical';
      createdAt: string;
      isRead: boolean;
    }[];
  }> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/usage/alerts`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get usage alerts');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Get usage alerts error:', error);
      throw error;
    }
  }

  // Mock methods for testing
  async getMockElectricityUsage(): Promise<ElectricityUsage> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      currentMonth: {
        amount: 180,
        unit: 'kWh',
        cost: 450000,
        period: '2024-10',
        readingDate: '2024-10-01',
        previousReading: 1200,
        currentReading: 1380,
      },
      previousMonth: {
        amount: 160,
        unit: 'kWh',
        cost: 400000,
        period: '2024-09',
      },
      change: {
        amount: 20,
        percentage: 12.5,
        type: 'increase',
      },
      ratePerUnit: 2500,
    };
  }

  async getMockWaterUsage(): Promise<WaterUsage> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      currentMonth: {
        amount: 15,
        unit: 'm³',
        cost: 225000,
        period: '2024-10',
        readingDate: '2024-10-01',
        previousReading: 85,
        currentReading: 100,
      },
      previousMonth: {
        amount: 18,
        unit: 'm³',
        cost: 270000,
        period: '2024-09',
      },
      change: {
        amount: -3,
        percentage: -16.7,
        type: 'decrease',
      },
      ratePerUnit: 15000,
    };
  }
}

export const usageApiService = new UsageApiService();