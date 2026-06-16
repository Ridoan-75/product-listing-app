import { Skeleton } from "@/components/ui/skeleton";

export default function BannerSkeleton() {
  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 bg-gradient-to-r from-slate-100 to-slate-200 overflow-hidden">
      {/* Mobile Banner Skeleton */}
      <div className="md:hidden px-5 pt-6 pb-8 space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>

      {/* Tablet Banner Skeleton */}
      <div className="hidden md:flex lg:hidden items-center gap-4 px-10 py-10 min-h-[380px]">
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
        <Skeleton className="w-[240px] h-[240px] rounded-lg" />
      </div>

      {/* Desktop Banner Skeleton */}
      <div className="hidden lg:flex items-center min-h-[500px] max-w-screen-2xl mx-auto px-14 xl:px-20 2xl:px-28 gap-10">
        <div className="flex-1 space-y-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-16 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="pt-4 space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <Skeleton className="w-[520px] h-[400px] rounded-lg" />
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 pb-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className={`rounded-full ${i === 0 ? 'w-6 h-2.5' : 'w-2.5 h-2.5'}`} />
        ))}
      </div>
    </div>
  );
}
