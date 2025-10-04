import { API_BASE_URL } from './config';
import { storageService } from '../storage';

// Payment types
export interface PaymentRequest {
  tenantId: string;
  invoiceId: string;
  amount: number;
  returnUrl?: string;
  description?: string;
}

export interface PaymentResponse {
  success: boolean;
  data: {
    paymentId: string;
    paymentUrl: string;
    qrCode?: string;
  };
}

export interface PaymentStatus {
  paymentId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  amount: number;
  transactionId?: string;
  completedAt?: string;
  failureReason?: string;
}

export interface PaymentHistory {
  id: string;
  invoiceId: string;
  amount: number;
  status: 'completed' | 'failed' | 'cancelled';
  paymentMethod: 'vnpay' | 'bank_transfer' | 'cash';
  transactionId: string;
  paidAt: string;
  description: string;
}

class PaymentApiService {
  private baseUrl = `${API_BASE_URL}/payments`;

  private async getAuthHeaders() {
    const token = await storageService.getAccessToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  // Create VNPay payment URL
  async createVNPayPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/vnpay/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...paymentData,
          returnUrl: paymentData.returnUrl || 'app://payment-result',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to create payment');
      }

      return await response.json();
    } catch (error) {
      console.error('Create VNPay payment error:', error);
      throw error;
    }
  }

  // Handle VNPay callback (for web integration)
  async handleVNPayCallback(callbackData: Record<string, string>): Promise<PaymentStatus> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/vnpay/callback`, {
        method: 'POST',
        headers,
        body: JSON.stringify(callbackData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to process payment callback');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('VNPay callback error:', error);
      throw error;
    }
  }

  // Get payment status
  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/${paymentId}/status`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get payment status');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Get payment status error:', error);
      throw error;
    }
  }

  // Get payment history for tenant
  async getPaymentHistory(tenantId: string, page: number = 1, limit: number = 20): Promise<{
    payments: PaymentHistory[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(
        `${API_BASE_URL}/tenants/${tenantId}/payment-history?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get payment history');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Get payment history error:', error);
      throw error;
    }
  }

  // Cancel payment (if supported)
  async cancelPayment(paymentId: string, reason?: string): Promise<{ success: boolean; message: string }> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseUrl}/${paymentId}/cancel`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to cancel payment');
      }

      return await response.json();
    } catch (error) {
      console.error('Cancel payment error:', error);
      throw error;
    }
  }

  // Mock payment for testing (remove in production)
  async createMockPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      data: {
        paymentId: `PAY-${Date.now()}`,
        paymentUrl: `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?amount=${paymentData.amount}&orderInfo=${encodeURIComponent(paymentData.description || 'Payment')}&returnUrl=${encodeURIComponent(paymentData.returnUrl || 'app://payment-result')}`,
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      },
    };
  }
}

export const paymentApiService = new PaymentApiService();