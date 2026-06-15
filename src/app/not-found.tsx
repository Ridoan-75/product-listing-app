import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-red-100 p-4">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 text-lg mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="bg-violet-600 text-white px-8 py-3 rounded-md hover:bg-violet-500 transition-colors font-semibold">
              Go Home
            </button>
          </Link>
          <Link href="/products">
            <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors font-semibold">
              Browse Products
            </button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-500">
            Need help? <Link href="/contact" className="text-violet-600 hover:underline">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
