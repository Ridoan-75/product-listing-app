import { Product } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "https://fakestoreapi.com";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch product");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/products/categories`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}