'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import RatingStars from '@/components/shared/RatingStars';
import PriceTag from '@/components/shared/PriceTag';
import { Product } from '@/types/product';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  const originalPrice = product.price * 1.5;
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  return (
    <div className="bg-white">
      {/* Product Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-square bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-4"
                priority
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{discount}%
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {/* Category & Title */}
            <div className="mb-4">
              <Link href={`/?category=${product.category}`}>
                <span className="text-sm font-semibold text-violet-600 hover:text-violet-700 uppercase tracking-wide">
                  {product.category}
                </span>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <RatingStars rating={product.rating?.rate || 4.5} />
              <span className="text-sm text-slate-600">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="mb-6 pb-6 border-b border-slate-200">
              <div className="flex items-baseline gap-3">
                <PriceTag price={product.price} />
                <span className="text-lg text-slate-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-green-600 font-semibold mt-2">
                You save ${(originalPrice - product.price).toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-slate-200">
              <p className="text-slate-600 text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 pb-6 border-b border-slate-200">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-10 h-10 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  className="w-12 h-10 text-center border border-slate-300 rounded-lg"
                  min="1"
                  max="10"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} /> Add to Cart
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <Truck className="text-violet-600" size={24} />
                <span className="text-xs font-semibold text-slate-900 text-center">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <RotateCcw className="text-violet-600" size={24} />
                <span className="text-xs font-semibold text-slate-900 text-center">Easy Return</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <Shield className="text-violet-600" size={24} />
                <span className="text-xs font-semibold text-slate-900 text-center">Secure Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-slate-200">
            {(['description', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-semibold capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'text-violet-600 border-violet-600'
                    : 'text-slate-600 border-transparent hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none">
                <p className="text-slate-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded">
                    <span className="text-sm font-semibold text-slate-600">Category</span>
                    <p className="text-slate-900 capitalize">{product.category}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded">
                    <span className="text-sm font-semibold text-slate-600">Price</span>
                    <p className="text-slate-900">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <p className="text-slate-600">No reviews yet. Be the first to review!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
