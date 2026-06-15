'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Product } from '@/types/product';
import { getAllProducts, getProductById, getCategories } from '@/lib/api';

export function useProducts(): UseQueryResult<Product[]> {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useProduct(id: string): UseQueryResult<Product | null> {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!id, // Only fetch if id exists
  });
}

export function useCategories(): UseQueryResult<string[]> {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes (categories change less frequently)
    gcTime: 1000 * 60 * 60, // 60 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useProductsByCategory(category: string): UseQueryResult<Product[]> {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: async () => {
      const products = await getAllProducts();
      return products.filter(p => p.category === category);
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!category,
  });
}

export function useSearchProducts(searchTerm: string): UseQueryResult<Product[]> {
  return useQuery({
    queryKey: ['products', 'search', searchTerm],
    queryFn: async () => {
      const products = await getAllProducts();
      if (!searchTerm.trim()) return products;
      
      const lowercaseSearch = searchTerm.toLowerCase();
      return products.filter(p =>
        p.title.toLowerCase().includes(lowercaseSearch) ||
        p.description.toLowerCase().includes(lowercaseSearch)
      );
    },
    staleTime: 1000 * 60 * 1, // 1 minute for search
    gcTime: 1000 * 60 * 5,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!searchTerm,
  });
}
