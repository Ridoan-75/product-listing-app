"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { getAllProducts } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import SearchBar from "../search/SearchBar";
import CategoryFilter from "../search/CategoryFilter";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const debouncedSearch = useDebounce(search, 300);

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    initialData: initialProducts,
  });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchCategory = category === "all" || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [products, debouncedSearch, category]);

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No products found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}