// Types for Room & Contract Details Screen
export interface RoomDetails {
  roomNumber: string;
  roomType: string;
  monthlyRent: number;
  status: 'Occupied' | 'Available' | 'Maintenance';
}

export interface ContractDetails {
  contractId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'Active' | 'Expired' | 'Pending' | 'Terminated';
  contractUrl?: string; // PDF URL
}

export interface ImportantNotice {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'info' | 'success';
  daysRemaining?: number;
}

export interface RoomContractData {
  room: RoomDetails;
  contract: ContractDetails;
  notice?: ImportantNotice;
}