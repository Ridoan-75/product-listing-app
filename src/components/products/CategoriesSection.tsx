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
      <div className="w-full bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-t border-b border-slate-100">
        <div className="px-4 xs:px-6 sm:px-8 lg:px-20 py-8 xs:py-10 sm:py-14 lg:py-20">
          <div className="h-6 bg-slate-200 rounded w-48 mx-auto mb-8 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-t border-b border-slate-100">
      <div className="px-4 xs:px-6 sm:px-8 lg:px-20 py-8 xs:py-10 sm:py-14 lg:py-20">
        
        <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-8 xs:mb-10 sm:mb-12 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link key={category} href={`/?category=${category}`}>
              <div className="group cursor-pointer h-full">
                <div className="flex flex-col items-center justify-center gap-2 xs:gap-3 p-3 xs:p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 h-full">
                  <div className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 rounded-lg bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-orange-600 group-hover:text-orange-700 group-hover:from-orange-200 group-hover:to-amber-200 transition-all duration-300">
                    {categoryIcons[category.toLowerCase()] || categoryIcons.default}
                  </div>
                  <span className="font-semibold text-slate-900 capitalize text-xs xs:text-sm text-center line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                    {category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
