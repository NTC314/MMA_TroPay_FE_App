import { TenantDashboardData } from '../../types/tenant';

// Mock data for tenant dashboard
export const mockTenantData: TenantDashboardData = {
  profile: {
    id: '1',
    name: 'Sarah Johnson',
    avatar: undefined, // Will use default avatar
    roomInfo: {
      roomNumber: 'A-205',
      roomType: 'Single',
      monthlyRent: 450,
      dueDate: 'Dec 15',
      contractStatus: 'Active',
    },
  },
  currentInvoice: {
    id: 'INV-001',
    totalAmount: 485.50,
    dueDate: 'December 15, 2024',
    status: 'Due Soon',
    items: [
      {
        id: '1',
        description: 'Monthly Rent',
        amount: 450,
        type: 'rent',
      },
      {
        id: '2',
        description: 'Electricity',
        amount: 25.50,
        type: 'electricity',
      },
      {
        id: '3',
        description: 'Water',
        amount: 10,
        type: 'water',
      },
    ],
  },
  serviceUsage: {
    electricity: {
      amount: 125,
      unit: 'kWh',
      change: 8,
      changeType: 'increase',
    },
    water: {
      amount: 8.5,
      unit: 'm³',
      change: 3,
      changeType: 'decrease',
    },
    internet: {
      amount: 45,
      unit: 'GB',
      change: 0,
      changeType: 'neutral',
    },
  },
  quickActions: [
    {
      id: '1',
      title: 'Report Issue',
      icon: 'exclamationmark.triangle.fill',
      color: '#FF6B6B',
      action: () => console.log('Report Issue'),
    },
    {
      id: '2',
      title: 'View Invoices',
      icon: 'doc.text.fill',
      color: '#4ECDC4',
      action: () => console.log('View Invoices'),
    },
    {
      id: '3',
      title: 'Feedback',
      icon: 'message.fill',
      color: '#45B7D1',
      action: () => console.log('Feedback'),
    },
    {
      id: '4',
      title: 'Contact Landlord',
      icon: 'phone.fill',
      color: '#96CEB4',
      action: () => console.log('Contact Landlord'),
    },
  ],
  recentUpdates: [
    {
      id: '1',
      type: 'payment',
      title: 'Payment Reminder',
      description: 'Your rent payment is due in 3 days',
      timestamp: '2 hours ago',
      status: 'pending',
    },
    {
      id: '2',
      type: 'issue',
      title: 'Issue Resolved',
      description: 'AC repair in your room has been completed',
      timestamp: '1 day ago',
      status: 'resolved',
    },
  ],
};