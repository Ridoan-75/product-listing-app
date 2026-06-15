import { getAllProducts } from "@/lib/api";
import Banner from "@/components/products/Banner";
import CategoriesSection from "@/components/products/CategoriesSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main className="w-full">
      {/* Banner Section*/}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <Banner products={products} />
      </section>

      {/* Categories Section */}
      <section>
        <CategoriesSection />
      </section>

      {/* Featured Products Section */}
      <section className="bg-slate-50">
        <FeaturedProducts products={products} />
      </section>
    </main>
  );
}