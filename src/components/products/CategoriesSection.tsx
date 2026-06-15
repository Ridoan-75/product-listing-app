'use client';

import Link from 'next/link';
import { useCategories } from '@/hooks/useProducts';
import { Zap, ShoppingBag, Shirt, Home } from 'lucide-react';

const categoryIcons: { [key: string]: React.ReactNode } = {
  electronics: <Zap className="w-6 h-6" />,
  jewelery: <ShoppingBag className="w-6 h-6" />,
  "men's clothing": <Shirt className="w-6 h-6" />,
  "women's clothing": <Shirt className="w-6 h-6" />,
  default: <Home className="w-6 h-6" />,
};

export default function CategoriesSection() {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-slate-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category} href={`/?category=${category}`}>
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 hover:from-blue-100 hover:to-slate-100 rounded-lg p-6 text-center transition-all hover:shadow-lg border border-slate-200">
                <div className="flex justify-center mb-3 text-blue-600 group-hover:text-blue-700 transition-colors">
                  {categoryIcons[category.toLowerCase()] || categoryIcons.default}
                </div>
                <h3 className="font-semibold text-slate-900 capitalize text-sm md:text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {category}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
