import { Product } from "../types";
import { vitaminB12B6LiquidDrops } from "./vitamin-b12-b6-liquid-drops";
import { calciumD3K2B12Supplement } from "./calcium-d3-k2-b12-supplement";
import { turmericBioperineGarlicGingerCapsules } from "./turmeric-bioperine-garlic-ginger-capsules";
import { organicVitaminD3K2DropsMctOilOmega3 } from "./organic-vitamin-d3-k2-drops-mct-oil-omega-3";
import { medchoiceMelatoninSleepCapsules } from "./medchoice-melatonin-sleep-capsules";
import { liquidCollagenBiotinHairSkinNails } from "./liquid-collagen-biotin-hair-skin-nails";
import { fishOilOmega3D3K2Coq10 } from "./fish-oil-omega-3-d3-k2-coq10";
import { alphaGpcGinkgoBilobaNootropicBrainSupplement } from "./alpha-gpc-ginkgo-biloba-nootropic-brain-supplement";
import { ceylonCinnamonAppleCiderVinegar5In1Supplement } from "./ceylon-cinnamon-apple-cider-vinegar-5-in-1-supplement";
import { methylatedBComplexLiquidDrops } from "./methylated-b-complex-liquid-drops";
import { extraStrengthTurmericBioperineGarlicGingerCapsules } from "./extra-strength-turmeric-bioperine-garlic-ginger-capsules";
import { melatoninFreeSleepSupportCapsules } from "./melatonin-free-sleep-support-capsules";
import { melatoninSleepExtraStrengthCapsules10mg } from "./melatonin-sleep-extra-strength-capsules-10mg";
import { milkThistleLiverSupportSupplementNacArtichokeDandelion } from "./milk-thistle-liver-support-supplement-nac-artichoke-dandelion";
import { myoDChiroInositol401FolateD3 } from "./myo-d-chiro-inositol-40-1-folate-d3";
import { myoInositolDChiroInositolWomensComplex } from "./myo-inositol-d-chiro-inositol-womens-complex";
import { methylatedMultivitaminWithOmega3 } from "./methylated-multivitamin-with-omega-3";
import { quercetinBromelainImmuneSupport } from "./quercetin-bromelain-immune-support";
import { primemdCalciumExtraStrengthD3K2B12Supplement } from "./primemd-calcium-extra-strength-d3-k2-b12-supplement";
import { methylatedBComplexVitaminC } from "./methylated-b-complex-vitamin-c";
import { liverSupportElectrolytesCapsules } from "./liver-support-electrolytes-capsules";

const products: Record<string, Product> = {
  "vitamin-b12-b6-liquid-drops": vitaminB12B6LiquidDrops,
  "calcium-d3-k2-b12-supplement": calciumD3K2B12Supplement,
  "turmeric-bioperine-garlic-ginger-capsules": turmericBioperineGarlicGingerCapsules,
  "organic-vitamin-d3-k2-drops-mct-oil-omega-3": organicVitaminD3K2DropsMctOilOmega3,
  "medchoice-melatonin-sleep-capsules": medchoiceMelatoninSleepCapsules,
  "liquid-collagen-biotin-hair-skin-nails": liquidCollagenBiotinHairSkinNails,
  "fish-oil-omega-3-d3-k2-coq10": fishOilOmega3D3K2Coq10,
  "alpha-gpc-ginkgo-biloba-nootropic-brain-supplement": alphaGpcGinkgoBilobaNootropicBrainSupplement,
  "ceylon-cinnamon-apple-cider-vinegar-5-in-1-supplement": ceylonCinnamonAppleCiderVinegar5In1Supplement,
  "methylated-b-complex-liquid-drops": methylatedBComplexLiquidDrops,
  "extra-strength-turmeric-bioperine-garlic-ginger-capsules": extraStrengthTurmericBioperineGarlicGingerCapsules,
  "melatonin-free-sleep-support-capsules": melatoninFreeSleepSupportCapsules,
  "melatonin-sleep-extra-strength-capsules-10mg": melatoninSleepExtraStrengthCapsules10mg,
  "milk-thistle-liver-support-supplement-nac-artichoke-dandelion": milkThistleLiverSupportSupplementNacArtichokeDandelion,
  "myo-d-chiro-inositol-40-1-folate-d3": myoDChiroInositol401FolateD3,
  "myo-inositol-d-chiro-inositol-womens-complex": myoInositolDChiroInositolWomensComplex,
  "methylated-multivitamin-with-omega-3": methylatedMultivitaminWithOmega3,
  "quercetin-bromelain-immune-support": quercetinBromelainImmuneSupport,
  "primemd-calcium-extra-strength-d3-k2-b12-supplement": primemdCalciumExtraStrengthD3K2B12Supplement,
  "methylated-b-complex-vitamin-c": methylatedBComplexVitaminC,
  "liver-support-electrolytes-capsules": liverSupportElectrolytesCapsules,
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
