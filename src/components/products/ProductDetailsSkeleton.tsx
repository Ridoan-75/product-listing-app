'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailsSkeleton() {
  return (
    <div className="bg-white">
      {/* Product Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Skeleton */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
              <Skeleton className="w-full h-full" />
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Category & Title */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-8 w-3/4" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Pricing */}
            <div className="space-y-3 pb-6 border-b border-slate-200">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Description */}
            <div className="space-y-3 pb-6 border-b border-slate-200">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Quantity Selector */}
            <div className="pb-6 border-b border-slate-200 space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-32" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Skeleton className="flex-1 h-12 rounded-lg" />
              <Skeleton className="w-12 h-12 rounded-lg" />
              <Skeleton className="w-12 h-12 rounded-lg" />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-20 rounded-lg" />
              <Skeleton className="h-20 rounded-lg" />
              <Skeleton className="h-20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation Skeleton */}
          <div className="flex gap-8 border-b border-slate-200">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24" />
            ))}
          </div>

          {/* Tab Content Skeleton */}
          <div className="py-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
