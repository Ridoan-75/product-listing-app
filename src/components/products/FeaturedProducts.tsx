'use client';

import Link from 'next/link';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { PAGINATION, ROUTES } from '@/constants';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Show first N products as featured
  const featuredProducts = products.slice(0, PAGINATION.FEATURED_PRODUCTS_COUNT);

  return (
    <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-8 xs:py-10 sm:py-14 lg:py-20">
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mb-6 xs:mb-8 sm:mb-10 gap-3 xs:gap-4">
        <div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Featured Products
          </h2>
          <p className="text-slate-500 text-sm xs:text-base mt-1 xs:mt-2">
            Handpicked items just for you
          </p>
        </div>
      </div>

      {/* Featured Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 mb-8 xs:mb-10 sm:mb-12">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* All Products Button */}
      <div className="text-center">
        <Link href="/products">
          <Button size="lg" className="inline-flex items-center gap-2">
            View All Products
            <ArrowRight size={18} />
          </Button>
        </Link>
        <p className="text-slate-500 text-xs xs:text-sm mt-3 xs:mt-4">
          Explore our complete collection of {products.length} products
        </p>
      </div>
    </div>
  );
}
