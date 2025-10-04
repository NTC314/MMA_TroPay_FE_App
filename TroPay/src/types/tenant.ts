// Types for Tenant Dashboard
export interface RoomInfo {
  roomNumber: string;
  roomType: 'Single' | 'Double' | 'Suite' | 'Studio';
  monthlyRent: number;
  dueDate: string;
  contractStatus: 'Active' | 'Expired' | 'Pending';
}

export interface Invoice {
  id: string;
  totalAmount: number;
  dueDate: string;
  status: 'Due Soon' | 'Overdue' | 'Paid' | 'Pending';
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  amount: number;
  type: 'rent' | 'electricity' | 'water' | 'internet' | 'other';
}

export interface ServiceUsage {
  electricity: {
    amount: number;
    unit: 'kWh';
    change: number; // percentage change
    changeType: 'increase' | 'decrease' | 'neutral';
  };
  water: {
    amount: number;
    unit: 'm³';
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
  };
  internet: {
    amount: number;
    unit: 'GB';
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
  };
}

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  action: () => void;
}

export interface RecentUpdate {
  id: string;
  type: 'payment' | 'issue' | 'notification' | 'maintenance';
  title: string;
  description: string;
  timestamp: string;
  status?: 'resolved' | 'pending' | 'in-progress';
}

export interface TenantProfile {
  id: string;
  name: string;
  avatar?: string;
  roomInfo: RoomInfo;
}

export interface TenantDashboardData {
  profile: TenantProfile;
  currentInvoice: Invoice;
  serviceUsage: ServiceUsage;
  quickActions: QuickAction[];
  recentUpdates: RecentUpdate[];
}