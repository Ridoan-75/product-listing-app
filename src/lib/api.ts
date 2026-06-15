import { Product } from "@/types/product";

const BASE_URL = process.env.API_URL;

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}