"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { getAllProducts } from "@/lib/api";
import { Product } from "@/types/product";
import { PAGINATION } from "@/constants";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGrid({ 
  initialProducts,
  search,
  selectedCategory,
  maxPrice
}: { 
  initialProducts: Product[]
  search: string
  selectedCategory: string
  maxPrice: number
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    initialData: initialProducts.length > 0 ? initialProducts : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  // Show skeleton only while loading, hide immediately when done
  useEffect(() => {
    setShowSkeleton(isLoading);
  }, [isLoading]);

  // Hide skeleton when products are available
  useEffect(() => {
    if (products.length > 0) {
      setShowSkeleton(false);
    }
  }, [products]);

  // Debug logging
  useEffect(() => {
    if (isError) {
      console.error("ProductGrid Error:", error);
    }
  }, [isError, error]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
      const matchPrice = p.price <= maxPrice;
      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, search, selectedCategory, maxPrice]);

  const totalPages = Math.ceil(filtered.length / PAGINATION.PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PAGINATION.PRODUCTS_PER_PAGE;
  const paginatedProducts = filtered.slice(startIdx, startIdx + PAGINATION.PRODUCTS_PER_PAGE);

  if (isError) {
    return (
      <div className="text-center py-20">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-slate-500 mb-4">
          We couldn't load the products. Please try refreshing the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div>
      {showSkeleton ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No products found matching your filters.
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 mb-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 xs:gap-3 py-6 xs:py-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1 xs:gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 xs:w-10 h-8 xs:h-10 rounded-lg font-semibold transition-all ${
                      currentPage === i + 1
                        ? 'bg-indigo-600 text-white'
                        : 'border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Results Info */}
          <div className="text-center text-xs xs:text-sm text-slate-500 py-4">
            Showing {startIdx + 1} to {Math.min(startIdx + PAGINATION.PRODUCTS_PER_PAGE, filtered.length)} of {filtered.length} products
          </div>
        </>
      )}
    </div>
  );
}