// API configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.tropay.com';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
  
  // User endpoints
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  
  // Payment endpoints
  PAYMENTS: '/payments',
  PAYMENT_HISTORY: '/payments/history',
  
  // Transaction endpoints
  TRANSACTIONS: '/transactions',
  TRANSFER: '/transactions/transfer',
};

export { API_BASE_URL };