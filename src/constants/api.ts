export const CACHE_DURATION = {
  PRODUCTS: 1000 * 60 * 5, // 5 minutes
  CATEGORIES: 1000 * 60 * 30, // 30 minutes
} as const;

export const API = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
} as const;
