import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative h-48 bg-slate-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-violet-600 font-medium uppercase mb-1">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-2 flex-1">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <Link
          href={`/products/${product.id}`}
          className="mt-3 block text-center bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}