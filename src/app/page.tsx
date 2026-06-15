import { getAllProducts } from "@/lib/api";
import ProductGrid from "@/components/products/ProductGrid";
import Banner from "@/components/products/Banner";
import CategoriesSection from "@/components/products/CategoriesSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main className="w-full">
      {/* Banner Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-10 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <Banner products={products} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <CategoriesSection />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FeaturedProducts products={products} />
        </div>
      </section>

      {/* All Products Section */}
      <section id="all-products" className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              All Products
            </h1>
            <p className="text-slate-500">
              Browse our complete collection of quality products
            </p>
          </div>
          <ProductGrid initialProducts={products} />
        </div>
      </section>
    </main>
  );
}