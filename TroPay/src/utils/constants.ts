// App constants
export const APP_NAME = 'TroPay';
export const APP_VERSION = '1.0.0';

// API constants
export const API_TIMEOUT = 30000; // 30 seconds
export const RETRY_ATTEMPTS = 3;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Transaction types
export const TRANSACTION_TYPES = {
  TRANSFER: 'transfer',
  PAYMENT: 'payment',
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  REFUND: 'refund',
} as const;

// Transaction status
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

// Payment methods
export const PAYMENT_METHODS = {
  BANK_TRANSFER: 'bank_transfer',
  CREDIT_CARD: 'credit_card',
  DIGITAL_WALLET: 'digital_wallet',
  CASH: 'cash',
} as const;

// Currency codes
export const CURRENCIES = {
  VND: 'VND',
  USD: 'USD',
  EUR: 'EUR',
} as const;

// Theme colors (moved from theme.ts if needed)
export const COLORS = {
  PRIMARY: '#007AFF',
  SECONDARY: '#5856D6',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  ERROR: '#FF3B30',
  INFO: '#5AC8FA',
  LIGHT: '#F2F2F7',
  DARK: '#000000',
  WHITE: '#FFFFFF',
  GRAY: {
    50: '#F9F9F9',
    100: '#F2F2F7',
    200: '#E5E5EA',
    300: '#D1D1D6',
    400: '#C7C7CC',
    500: '#AEAEB2',
    600: '#8E8E93',
    700: '#636366',
    800: '#48484A',
    900: '#1C1C1E',
  },
} as const;

// Screen dimensions breakpoints
export const BREAKPOINTS = {
  SMALL: 360,
  MEDIUM: 768,
  LARGE: 1024,
  EXTRA_LARGE: 1440,
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;