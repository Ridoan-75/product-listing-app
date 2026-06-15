import { getAllProducts } from "@/lib/api";
import ProductGrid from "@/components/products/ProductGrid";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Discover Amazing Products
        </h1>
        <p className="text-slate-500">
          Browse our curated collection of quality products
        </p>
      </div>
      <ProductGrid initialProducts={products} />
    </main>
  );
}