export const config = {
  app: {
    name: 'Product Listing App',
    description: 'A professional e-commerce product listing application',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://fakestoreapi.com',
    timeout: 10000,
  },
  cache: {
    enabled: true,
  },
} as const;
