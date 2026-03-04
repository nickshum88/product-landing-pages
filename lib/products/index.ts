import { Product } from "../types";
import { b12SublingualDrops } from "./b12-sublingual-drops";
import { vitaminB12B6LiquidDrops } from "./vitamin-b12-b6-liquid-drops";

const products: Record<string, Product> = {
  "b12-sublingual-drops": b12SublingualDrops,
  "vitamin-b12-b6-liquid-drops": vitaminB12B6LiquidDrops,
};

export function getProduct(slug: string): Product | undefined {
  return products[slug];
}

export function getAllProducts(): Product[] {
  return Object.values(products);
}

export function getAllSlugs(): string[] {
  return Object.keys(products);
}

export default products;
