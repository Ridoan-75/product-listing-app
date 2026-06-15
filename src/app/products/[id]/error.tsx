"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Product not found</h1>
        <p className="text-lg text-gray-600 mb-8">{error?.message || "Could not load the product"}</p>
        <button
          onClick={reset}
          className="bg-violet-600 text-white px-6 py-3 rounded-md hover:bg-violet-500 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
