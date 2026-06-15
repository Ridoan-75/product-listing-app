import { getAllProducts } from "@/lib/api";
import Banner from "@/components/products/Banner";
import CategoriesSection from "@/components/products/CategoriesSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main className="w-full">
      {/* Banner Section - Full Width */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <Banner products={products} />
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
    </main>
  );
}