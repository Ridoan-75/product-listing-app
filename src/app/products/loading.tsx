import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
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

      {/* Page Title */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Skeleton className="h-10 w-48 mb-8" />

        {/* Filters and Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="md:col-span-1 space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
      </div>
    </div>
  );
}
