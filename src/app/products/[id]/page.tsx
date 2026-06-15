"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
import { useCart } from "@/store/cartStore";
import RatingStars from "@/components/shared/RatingStars";
import PriceTag from "@/components/shared/PriceTag";
import type { Product } from "@/types/product";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";
        const url = `${apiUrl}/products/${resolvedParams.id}`;
        
        console.log("Fetching from:", url);
        
        const response = await fetch(url, {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data || Object.keys(data).length === 0) {
          throw new Error("Received empty product data");
        }
        
        console.log("Product loaded:", data);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : "Failed to load product");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.id) {
      fetchProduct();
    }
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">{error || "Product not found"}</p>
          <Link href="/products" className="text-violet-600 hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const originalPrice = product.price * 1.5; // Estimate original price

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-600">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Products</span>
          <span className="mx-2">/</span>
          <span className="text-violet-600">{product.title}</span>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedImage(0)}
                className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                  selectedImage === 0 ? "border-violet-600" : "border-gray-200"
                }`}
              >
                <Image
                  src={product.image}
                  alt="Thumbnail 1"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <RatingStars rating={product.rating.rate} size="lg" />
                <span className="text-gray-600">
                  {product.rating.count} reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <PriceTag price={product.price} size="lg" />
                <span className="text-lg text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              </div>
              <div className="text-green-600 font-semibold">
                Save ${(originalPrice - product.price).toFixed(2)} (33%)
              </div>
            </div>

            {/* Stock Status */}
            <div>
              <div className="text-green-600 font-semibold">✓ In Stock</div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-semibold">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-l border-r border-gray-300 py-2 outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-500 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-violet-600 shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">Free Delivery</div>
                  <div className="text-sm text-gray-600">On orders over $50</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-violet-600 shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">2-Year Warranty</div>
                  <div className="text-sm text-gray-600">Comprehensive coverage</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-violet-600 shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">30-Day Returns</div>
                  <div className="text-sm text-gray-600">Easy return process</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {(["description", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-semibold capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-violet-600 text-violet-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "description" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Category</h3>
              <div className="text-gray-600 capitalize text-lg">{product.category}</div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
              <div className="text-center py-12 text-gray-500">
                <p>No reviews yet. Be the first to review this product!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
