'use client';

import { getAllProducts } from "@/lib/api";
import ProductGrid from "@/components/products/ProductGrid";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          All Products
        </h1>
        <p className="text-slate-500">
          Browse our complete collection of {products.length} quality products
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-slate-500">Loading products...</p>
        </div>
      ) : (
        <ProductGrid initialProducts={products} />
      )}
    </main>
  );
}
