import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedProductsSkeleton() {
  return (
    <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-8 xs:py-10 sm:py-14 lg:py-20">
      {/* Header */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mb-6 xs:mb-8 sm:mb-10 gap-3 xs:gap-4">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 mb-8 xs:mb-10 sm:mb-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {/* Image */}
            <Skeleton className="h-48 xs:h-52 sm:h-56 w-full" />
            
            {/* Content */}
            <div className="p-4 sm:p-5 space-y-3">
              {/* Rating */}
              <Skeleton className="h-4 w-24" />
              
              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              
              {/* Price */}
              <Skeleton className="h-6 w-20" />
              
              {/* Divider */}
              <Skeleton className="h-0.5 w-full" />
              
              {/* Buttons */}
              <div className="space-y-2 pt-2">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center space-y-2">
        <Skeleton className="h-10 w-40 mx-auto" />
        <Skeleton className="h-4 w-64 mx-auto" />
      </div>
    </div>
  );
}
