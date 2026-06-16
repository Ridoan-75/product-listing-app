'use client';

import { useEffect, useState } from 'react';
import { getAllProducts } from "@/lib/api";
import Banner from "@/components/products/Banner";
import BannerSkeleton from "@/components/products/BannerSkeleton";
import CategoriesSection from "@/components/products/CategoriesSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import FeaturedProductsSkeleton from "@/components/products/FeaturedProductsSkeleton";
import { Product } from '@/types/product';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* Banner Section */}
      {isLoading ? (
        <BannerSkeleton />
      ) : products.length > 0 ? (
        <Banner products={products} />
      ) : (
        <div className="h-64 bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center">
          <p className="text-slate-600">Loading featured products...</p>
        </div>
      )}

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4">
        <CategoriesSection />
      </section>

      {/* Featured Products Section */}
      {isLoading ? (
        <FeaturedProductsSkeleton />
      ) : products.length > 0 ? (
        <FeaturedProducts products={products} />
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600">Unable to load products. Please try again later.</p>
        </div>
      )}
    </>
  );
}