import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
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

      {/* Product Detail Skeleton */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <Skeleton className="h-96 w-full rounded-lg mb-4" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-md" />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-6 w-1/3" />
            </div>

            {/* Rating */}
            <Skeleton className="h-6 w-48" />

            {/* Price */}
            <Skeleton className="h-10 w-32" />

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-12 w-12 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
