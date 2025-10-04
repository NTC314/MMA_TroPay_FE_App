import { RoomContractData } from '../../types/roomContract';
import { mockRoomContractData } from './roomContract';

// API service for room and contract operations
export class RoomContractApiService {
  private static instance: RoomContractApiService;
  private baseUrl = 'https://api.tropay.com'; // Replace with actual API URL

  private constructor() {}

  public static getInstance(): RoomContractApiService {
    if (!RoomContractApiService.instance) {
      RoomContractApiService.instance = new RoomContractApiService();
    }
    return RoomContractApiService.instance;
  }

  // Get room and contract details
  async getRoomContractDetails(tenantId: string): Promise<RoomContractData> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/room-contract`);
      // const data = await response.json();
      // return data;

      // For now, return mock data with a delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockRoomContractData;
    } catch (error) {
      console.error('Error fetching room contract details:', error);
      throw new Error('Failed to fetch room contract details');
    }
  }

  // Download contract PDF
  async downloadContract(contractId: string): Promise<{ downloadUrl: string }> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/contracts/${contractId}/download`);
      // const data = await response.json();
      // return data;

      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        downloadUrl: 'https://example.com/contract.pdf' // Mock download URL
      };
    } catch (error) {
      console.error('Error downloading contract:', error);
      throw new Error('Failed to download contract');
    }
  }

  // Request contract renewal
  async requestContractRenewal(tenantId: string, contractId: string): Promise<{ requestId: string }> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/contracts/${contractId}/renewal`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ tenantId })
      // });
      // const data = await response.json();
      // return data;

      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        requestId: `RENEWAL-${Date.now()}`
      };
    } catch (error) {
      console.error('Error requesting contract renewal:', error);
      throw new Error('Failed to request contract renewal');
    }
  }
}

// Export singleton instance
export const roomContractApiService = RoomContractApiService.getInstance();