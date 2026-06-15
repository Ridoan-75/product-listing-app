import { Skeleton } from "@/components/ui/skeleton";

export default function FilterSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 sticky top-4">
      {/* Title */}
      <Skeleton className="h-6 w-24 mb-4 pb-4 border-b border-slate-200" />

      {/* Search Bar */}
      <div className="mb-5 rounded-xl border border-slate-200 overflow-hidden">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <Skeleton className="h-5 w-20 mb-3" />
        <div className="space-y-2.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 pb-6 border-b border-slate-200">
        <Skeleton className="h-5 w-24 mb-4" />
        <Skeleton className="h-2 w-full mb-4" />
        <div className="flex justify-between gap-2">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      {/* Reset Button */}
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}
