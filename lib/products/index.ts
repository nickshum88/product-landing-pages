import { Product } from "../types";
import { vitaminB12B6LiquidDrops } from "./vitamin-b12-b6-liquid-drops";

const products: Record<string, Product> = {
  "vitamin-b12-b6-liquid-drops": vitaminB12B6LiquidDrops,
};

export function getProduct(slug: string): Product | undefined {
  return products[slug];
}

export function getAllProducts(): Product[] {
  return Object.values(products);
}

export function getProductsByBrand(brand: string): Product[] {
  return Object.values(products).filter((p) => p.brand === brand);
}

export function getAllSlugs(): string[] {
  return Object.keys(products);
}

export default products;
