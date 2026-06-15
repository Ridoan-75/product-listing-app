import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cartStore";
import RatingStars from "@/components/shared/RatingStars";
import { ShoppingCart, Eye } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:border-purple-200">
        {/* Image Container with Overlay */}
        <div className="relative h-48 xs:h-52 sm:h-56 bg-linear-to-br from-slate-50 to-slate-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Eye size={24} className="text-purple-600" />
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
            {product.category.split(' ')[0]}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          {/* Rating */}
          <div className="mb-2 flex items-center gap-1">
            <RatingStars rating={product.rating?.rate || 4.5} />
            <span className="text-xs text-slate-500">({product.rating?.count || 0})</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-3 flex-1 leading-snug group-hover:text-purple-600 transition-colors">
            {product.title}
          </h3>

          {/* Price Section */}
          <div className="mb-4 pb-4 border-b border-slate-100">
            <p className="text-lg font-extrabold text-purple-600">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <Button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2"
              size="sm"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </Button>

            <Button variant="outline" className="w-full" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}