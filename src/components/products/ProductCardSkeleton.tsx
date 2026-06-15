import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden flex flex-col h-full">
      {/* Image Container - Responsive heights */}
      <div className="relative h-48 xs:h-52 sm:h-56 overflow-hidden">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 space-y-3 sm:space-y-4">
        {/* Category Badge Skeleton */}
        <Skeleton className="h-5 w-16 rounded-full" />

        {/* Rating skeleton */}
        <Skeleton className="h-3 xs:h-4 w-20 xs:w-28" />

        {/* Title skeleton - 2 lines */}
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 xs:h-4 w-full" />
          <Skeleton className="h-3 xs:h-4 w-5/6" />
        </div>

        {/* Price divider */}
        <div className="border-b border-slate-200" />

        {/* Price skeleton */}
        <Skeleton className="h-5 xs:h-6 w-16 xs:w-20" />

        {/* Buttons skeleton */}
        <div className="space-y-2 mt-auto">
          <Skeleton className="h-8 xs:h-9 w-full rounded-lg" />
          <Skeleton className="h-8 xs:h-9 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}