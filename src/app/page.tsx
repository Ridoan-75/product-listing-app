import { getAllProducts } from "@/lib/api";
import Banner from "@/components/products/Banner";
import CategoriesSection from "@/components/products/CategoriesSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <>
      {/* Banner Section */}
      <Banner products={products} />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4">
        <CategoriesSection />
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4">
        <FeaturedProducts products={products} />
      </section>
    </>
  );
}