'use client';

import Link from 'next/link';
import { useCategories } from '@/hooks/useProducts';
import { Zap, ShoppingBag, Shirt, Home } from 'lucide-react';

const CATEGORY_CONFIG: Record<string, {
  icon: React.ReactNode;
  bg: string;
  iconColor: string;
  hoverBg: string;
  hoverBorder: string;
  hoverIconBg: string;
  hoverIconColor: string;
  hoverText: string;
  iconBg: string;
  label: string;
}> = {
  electronics: {
    icon: <Zap className="w-6 h-6" />,
    bg: 'from-violet-100 to-indigo-100',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    hoverBg: 'hover:bg-violet-50',
    hoverBorder: 'hover:border-violet-400',
    hoverIconBg: 'group-hover:from-violet-200 group-hover:to-indigo-200',
    hoverIconColor: 'group-hover:text-violet-700',
    hoverText: 'group-hover:text-violet-700',
    label: 'Electronics',
  },
  jewelery: {
    icon: <ShoppingBag className="w-6 h-6" />,
    bg: 'from-pink-100 to-rose-100',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    hoverBg: 'hover:bg-pink-50',
    hoverBorder: 'hover:border-pink-400',
    hoverIconBg: 'group-hover:from-pink-200 group-hover:to-rose-200',
    hoverIconColor: 'group-hover:text-pink-700',
    hoverText: 'group-hover:text-pink-700',
    label: 'Jewellery',
  },
  "men's clothing": {
    icon: <Shirt className="w-6 h-6" />,
    bg: 'from-blue-100 to-sky-100',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-50',
    hoverBorder: 'hover:border-blue-400',
    hoverIconBg: 'group-hover:from-blue-200 group-hover:to-sky-200',
    hoverIconColor: 'group-hover:text-blue-700',
    hoverText: 'group-hover:text-blue-700',
    label: "Men's Clothing",
  },
  "women's clothing": {
    icon: <Shirt className="w-6 h-6" />,
    bg: 'from-fuchsia-100 to-purple-100',
    iconBg: 'bg-fuchsia-100',
    iconColor: 'text-fuchsia-600',
    hoverBg: 'hover:bg-fuchsia-50',
    hoverBorder: 'hover:border-fuchsia-400',
    hoverIconBg: 'group-hover:from-fuchsia-200 group-hover:to-purple-200',
    hoverIconColor: 'group-hover:text-fuchsia-700',
    hoverText: 'group-hover:text-fuchsia-700',
    label: "Women's Clothing",
  },
  default: {
    icon: <Home className="w-6 h-6" />,
    bg: 'from-slate-100 to-gray-100',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    hoverBg: 'hover:bg-slate-50',
    hoverBorder: 'hover:border-slate-400',
    hoverIconBg: 'group-hover:from-slate-200 group-hover:to-gray-200',
    hoverIconColor: 'group-hover:text-slate-700',
    hoverText: 'group-hover:text-slate-700',
    label: 'Other',
  },
};

function SkeletonCard() {
  return (
    <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-slate-100 animate-pulse">
      <div className="w-14 h-14 rounded-xl bg-slate-200" />
      <div className="h-3.5 w-24 bg-slate-200 rounded-full" />
      <div className="h-3 w-16 bg-slate-100 rounded-full" />
    </div>
  );
}

export default function CategoriesSection() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <section className="w-screen relative left-1/2 -translate-x-1/2 bg-white border-t border-b border-slate-100">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 lg:px-20 py-12 sm:py-16 lg:py-20">

        {/* Header */}
        <div className="flex flex-col items-center mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
            Explore
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight text-center">
            Shop by Category
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {isLoading
            ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            : categories.map((category) => {
                const config =
                  CATEGORY_CONFIG[category.toLowerCase()] ?? CATEGORY_CONFIG.default;

                return (
                  <Link key={category} href={`/products?category=${category}`} className="group">
                    <div
                      className={`
                        relative flex flex-col items-center justify-center gap-3
                        p-5 sm:p-6 rounded-2xl h-full
                        bg-white border border-slate-200
                        ${config.hoverBorder} ${config.hoverBg}
                        transition-all duration-300
                        hover:shadow-lg hover:-translate-y-1
                      `}
                    >
                      {/* Icon circle */}
                      <div
                        className={`
                          w-14 h-14 sm:w-16 sm:h-16 rounded-xl
                          bg-gradient-to-br ${config.bg}
                          ${config.hoverIconBg}
                          flex items-center justify-center
                          ${config.iconColor} ${config.hoverIconColor}
                          transition-all duration-300
                          group-hover:scale-110 group-hover:shadow-sm
                        `}
                      >
                        {config.icon}
                      </div>

                      {/* Label */}
                      <span
                        className={`
                          font-bold text-slate-800 capitalize
                          text-sm sm:text-base text-center line-clamp-2
                          ${config.hoverText}
                          transition-colors duration-300
                        `}
                      >
                        {config.label || category}
                      </span>

                      {/* Subtle arrow hint on hover */}
                      <span
                        className={`
                          text-[10px] font-semibold uppercase tracking-widest
                          opacity-0 group-hover:opacity-100
                          ${config.iconColor}
                          transition-opacity duration-300
                        `}
                      >
                        Shop now →
                      </span>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
}