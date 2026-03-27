import { Product } from "../types";
import { vitaminB12B6LiquidDrops } from "./vitamin-b12-b6-liquid-drops";
import { calciumD3K2B12Supplement } from "./calcium-d3-k2-b12-supplement";
import { turmericBioperineGarlicGingerCapsules } from "./turmeric-bioperine-garlic-ginger-capsules";
import { organicVitaminD3K2DropsMctOilOmega3 } from "./organic-vitamin-d3-k2-drops-mct-oil-omega-3";
import { medchoiceMelatoninSleepCapsules } from "./medchoice-melatonin-sleep-capsules";
import { liquidCollagenBiotinHairSkinNails } from "./liquid-collagen-biotin-hair-skin-nails";
import { fishOilOmega3D3K2Coq10 } from "./fish-oil-omega-3-d3-k2-coq10";
import { methylatedBComplexLiquidDrops2Pack } from "./methylated-b-complex-liquid-drops-2-pack";

const products: Record<string, Product> = {
  "vitamin-b12-b6-liquid-drops": vitaminB12B6LiquidDrops,
  "calcium-d3-k2-b12-supplement": calciumD3K2B12Supplement,
  "turmeric-bioperine-garlic-ginger-capsules": turmericBioperineGarlicGingerCapsules,
  "organic-vitamin-d3-k2-drops-mct-oil-omega-3": organicVitaminD3K2DropsMctOilOmega3,
  "medchoice-melatonin-sleep-capsules": medchoiceMelatoninSleepCapsules,
  "liquid-collagen-biotin-hair-skin-nails": liquidCollagenBiotinHairSkinNails,
  "fish-oil-omega-3-d3-k2-coq10": fishOilOmega3D3K2Coq10,
  "methylated-b-complex-liquid-drops-2-pack": methylatedBComplexLiquidDrops2Pack,
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
