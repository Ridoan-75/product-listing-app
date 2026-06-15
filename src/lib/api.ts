import { Product } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "https://fakestoreapi.com";

// Custom error class for API errors
export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public endpoint: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

// Helper function for API calls with error handling
async function fetchAPI<T>(
  endpoint: string,
  context: string
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = `${context}: HTTP ${response.status}`;
      console.error(errorMessage, url);
      throw new APIError(response.status, errorMessage, endpoint);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    // Network or parsing error
    if (error instanceof APIError) {
      throw error;
    }

    if (error instanceof SyntaxError) {
      const errorMessage = `${context}: Invalid JSON response`;
      console.error(errorMessage, url);
      throw new Error(errorMessage);
    }

    if (error instanceof TypeError) {
      const errorMessage = `${context}: Network error (${error.message})`;
      console.error(errorMessage, url);
      throw new Error(errorMessage);
    }

    // Unknown error
    console.error(`${context}: Unknown error`, error);
    throw error;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const data = await fetchAPI<Product[]>("/products", "Fetch all products");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error instanceof APIError) {
      console.error(
        `API Error [${error.statusCode}] at ${error.endpoint}: ${error.message}`
      );
    } else {
      console.error("Error fetching products:", error);
    }
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!id) {
    console.warn("getProductById called with empty id");
    return null;
  }

  try {
    const data = await fetchAPI<Product>(
      `/products/${encodeURIComponent(id)}`,
      `Fetch product ${id}`
    );
    return data || null;
  } catch (error) {
    if (error instanceof APIError) {
      if (error.statusCode === 404) {
        console.warn(`Product not found: ${id}`);
      } else {
        console.error(
          `API Error [${error.statusCode}] at ${error.endpoint}: ${error.message}`
        );
      }
    } else {
      console.error(`Error fetching product ${id}:`, error);
    }
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const data = await fetchAPI<string[]>(
      "/products/categories",
      "Fetch categories"
    );
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error instanceof APIError) {
      console.error(
        `API Error [${error.statusCode}] at ${error.endpoint}: ${error.message}`
      );
    } else {
      console.error("Error fetching categories:", error);
    }
    return [];
  }
}