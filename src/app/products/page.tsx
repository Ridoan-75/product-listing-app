"use client";

import { getAllProducts } from "@/lib/api";
import ProductGrid from "@/components/products/ProductGrid";
import SearchBar from "@/components/search/SearchBar";
import FilterSkeleton from "@/components/products/FilterSkeleton";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Initialize category from URL on first mount only
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      Promise.resolve().then(() => {
        setSelectedCategory(categoryParam);
      });
    }
  }, []);

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return ["all", ...Array.from(new Set(cats))];
  }, [products]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setMaxPrice(1000);
  };

  // radio name আলাদা রাখার জন্য id prop নিচ্ছি
  const CategoryList = ({ groupName }: { groupName: string }) => (
    <div className="space-y-2.5">
      {categories.map((cat) => (
        <label
          key={cat}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <input
            type="radio"
            name={groupName}
            checked={selectedCategory === cat}
            onChange={() => setSelectedCategory(cat)}
            className="w-4 h-4 cursor-pointer"
            style={{
              accentColor: selectedCategory === cat ? "#a855f7" : undefined,
            }}
          />
          <span
            className={`text-sm capitalize transition-colors ${
              selectedCategory === cat
                ? "text-purple-600 font-semibold"
                : "text-slate-600 group-hover:text-purple-600"
            }`}
          >
            {cat === "all" ? "All Categories" : cat}
          </span>
        </label>
      ))}
    </div>
  );

  const filterContent = (groupName: string) => (
    <>
      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">Category</h4>
        <CategoryList groupName={groupName} />
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 pb-6 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-900 mb-4">
          Price Range
        </h4>
        <input
          type="range"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-purple-600"
        />
        <div className="flex justify-between mt-3 text-sm font-semibold text-slate-900">
          <span>$0</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleResetFilters}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 text-sm cursor-pointer"
      >
        Reset All
      </button>
    </>
  );

  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-gray-100 py-8 xs:py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 xs:mb-8">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 xs:mb-4">
            All Products
          </h1>
          <p className="text-slate-500 text-sm xs:text-base">
            Browse our complete collection of {products.length} quality products
          </p>
        </div>

        {/* Mobile + Tablet */}
        <div className="lg:hidden mb-5 space-y-3">
          {/* Search bar — বড় ও visible */}
          <div className="w-full bg-white rounded-2xl border-2 border-slate-200 focus-within:border-purple-400 transition-colors overflow-hidden">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full flex items-center justify-between p-4 font-bold text-slate-900"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-purple-600" />
                <span>Filters</span>
                {selectedCategory !== "all" && (
                  <span className="text-xs bg-purple-100 text-purple-600 font-semibold px-2 py-0.5 rounded-full">
                    1
                  </span>
                )}
              </div>
              {filtersOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {filtersOpen && (
              <div className="px-4 pb-4 border-t border-slate-100 pt-4">
                {filterContent("category-mobile")}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 xs:gap-6 sm:gap-8">
          <div className="lg:col-span-1 hidden lg:block">
            {isLoading ? (
              <FilterSkeleton />
            ) : (
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 sticky top-4">
                <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-200">
                  Filters
                </h3>
                <div className="w-full mb-5 rounded-xl border-2 border-slate-200 focus-within:border-purple-400 transition-colors overflow-hidden">
                  <SearchBar value={search} onChange={setSearch} />
                </div>
                {filterContent("category-desktop")}
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <ProductGrid
              initialProducts={products}
              search={search}
              selectedCategory={selectedCategory}
              maxPrice={maxPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
