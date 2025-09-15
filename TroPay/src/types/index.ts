// Navigation types
export interface RootStackParamList {
  Home: undefined;
  Explore: undefined;
  Profile: undefined;
  Settings: undefined;
  Login: undefined;
  Register: undefined;
  TransactionDetail: { transactionId: string };
  PaymentScreen: { recipientId?: string };
}

export interface TabParamList {
  HomeTab: undefined;
  ExploreTab: undefined;
  ProfileTab: undefined;
  SettingsTab: undefined;
}

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar?: string;
  balance: number;
  accountNumber: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends Omit<User, 'balance'> {
  dateOfBirth?: string;
  address?: string;
  city?: string;
  country?: string;
  occupation?: string;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Transaction types
export interface Transaction {
  id: string;
  type: 'transfer' | 'payment' | 'deposit' | 'withdrawal' | 'refund';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  amount: number;
  currency: string;
  description: string;
  fromUserId: string;
  toUserId: string;
  fromUserName: string;
  toUserName: string;
  paymentMethod: 'bank_transfer' | 'credit_card' | 'digital_wallet' | 'cash';
  transactionFee: number;
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
}

export interface TransactionSummary {
  totalTransactions: number;
  totalAmount: number;
  pendingAmount: number;
  completedAmount: number;
  failedAmount: number;
}

// Payment types
export interface PaymentRequest {
  recipientId: string;
  amount: number;
  currency: string;
  description: string;
  paymentMethod: string;
}

export interface PaymentMethod {
  id: string;
  type: 'bank_account' | 'credit_card' | 'digital_wallet';
  name: string;
  details: string;
  isDefault: boolean;
  isActive: boolean;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Error types
export interface ApiError {
  message: string;
  statusCode: number;
  details?: any;
}

export interface FormError {
  field: string;
  message: string;
}

// App State types
export interface AppState {
  auth: AuthState;
  transactions: TransactionState;
  user: UserState;
  app: GlobalAppState;
}

export interface TransactionState {
  transactions: Transaction[];
  currentTransaction: Transaction | null;
  summary: TransactionSummary | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserState {
  profile: UserProfile | null;
  paymentMethods: PaymentMethod[];
  isLoading: boolean;
  error: string | null;
}

export interface GlobalAppState {
  isInitialized: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    enabled: boolean;
    pushEnabled: boolean;
    emailEnabled: boolean;
  };
}