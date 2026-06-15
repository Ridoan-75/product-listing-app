'use client';

import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Show first 4 products as featured
  const featuredProducts = products.slice(0, 4);

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
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 xs:px-8 sm:px-10 py-3 xs:py-4 rounded-full font-semibold text-sm xs:text-base transition-all duration-300 hover:shadow-lg hover:scale-105">
            View All Products
            <ArrowRight size={18} className="xs:size-5" />
          </button>
        </Link>
        <p className="text-slate-500 text-xs xs:text-sm mt-3 xs:mt-4">
          Explore our complete collection of {products.length} products
        </p>
      </div>
    </div>
  );
}
