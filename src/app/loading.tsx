import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Skeleton */}
      <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="hidden md:block h-10 w-48" />
          <div className="flex gap-7 items-center">
            <Skeleton className="h-7 w-7" />
            <Skeleton className="hidden md:block h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Hero/Content Skeleton */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Products Grid */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
