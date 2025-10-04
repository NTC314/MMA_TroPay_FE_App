import { RoomContractData } from '../../types/roomContract';

// Mock data for room and contract details
export const mockRoomContractData: RoomContractData = {
  room: {
    roomNumber: 'B-205',
    roomType: 'Single Bed',
    monthlyRent: 850,
    status: 'Occupied',
  },
  contract: {
    contractId: 'CONTRACT-2024-001',
    startDate: 'Jan 15, 2024',
    endDate: 'Jan 15, 2025',
    totalAmount: 1700,
    status: 'Active',
    contractUrl: 'https://example.com/contract.pdf', // Mock PDF URL
  },
  notice: {
    id: 'notice-001',
    title: 'Thông báo quan trọng',
    description: 'Hợp đồng của bạn sẽ hết hạn trong 45 ngày nữa, hãy liên hệ với quản lý để có thể gia hạn hợp đồng',
    type: 'warning',
    daysRemaining: 45,
  },
};