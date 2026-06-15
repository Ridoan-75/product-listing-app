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
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Featured Products
          </h2>
          <p className="text-slate-500 mt-1">
            Handpicked items just for you
          </p>
        </div>
      </div>

      {/* Featured Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* All Products Button */}
      <div className="text-center">
        <Link href="/products">
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105">
            View All Products
            <ArrowRight size={20} />
          </button>
        </Link>
        <p className="text-slate-500 text-sm mt-3">
          Explore our complete collection of {products.length} products
        </p>
      </div>
    </div>
  );
}
