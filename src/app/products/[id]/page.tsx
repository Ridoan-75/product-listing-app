"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import ProductDetails from "@/components/products/ProductDetails";
import ProductDetailsSkeleton from "@/components/products/ProductDetailsSkeleton";
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";
        const url = `${apiUrl}/products/${resolvedParams.id}`;

        const response = await fetch(url, {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
          throw new Error("Received empty product data");
        }

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

  if (error || (!loading && !product)) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">
            {error || "Product not found"}
          </p>
          <Link href="/products" className="text-violet-600 hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {loading ? (
        <ProductDetailsSkeleton />
      ) : product ? (
        <ProductDetails product={product} />
      ) : null}
    </main>
  );
}
