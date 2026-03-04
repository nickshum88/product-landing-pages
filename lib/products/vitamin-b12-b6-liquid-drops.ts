import { Product } from "../types";

export const vitaminB12B6LiquidDrops: Product = {
  slug: "vitamin-b12-b6-liquid-drops",
  name: "Vitamin B12 and B6 Liquid Drops - B Complex Sublingual",
  tagline: "High-potency liquid B-complex drops with 5000mcg B12 for fast sublingual absorption and daily energy support.",
  heroImage: "/products/vitamin-b12-b6-liquid-drops.jpg",
  amazonUrl: "https://www.amazon.com/dp/B0C9JX95NV",
  asin: "B0C9JX95NV",
  colors: {
    primary: "#E91E63",
    accent: "#FF5722",
    background: "#FCE4EC",
  },
  trustBadges: ["Vegan", "Non-GMO", "Gluten-Free", "Made in USA", "GMP Certified"],
  usageSteps: [
    { icon: "💧", title: "Measure dose", detail: "Take 1.5 droppers (1.5mL) of liquid drops" },
    { icon: "👅", title: "Hold sublingually", detail: "Place drops under your tongue for 30 seconds" },
    { icon: "💦", title: "Swallow remaining", detail: "Swallow any remaining liquid for complete absorption" },
    { icon: "🌅", title: "Take in morning", detail: "Best taken in the morning with or without food" },
  ],
  proTips: [
    "Liquid drops provide 98% absorption compared to 20% for capsules",
    "Take consistently at the same time each day for best results",
    "Raspberry flavor makes daily supplementation enjoyable",
    "Each bottle provides 40 servings (80 servings total in 2-pack)",
    "Store in a cool, dry place away from direct sunlight",
  ],
  benefits: [
    { icon: "⚡", title: "Energy Metabolism", description: "B-vitamins support the conversion of food into cellular energy for sustained vitality throughout the day." },
    { icon: "🧠", title: "Cognitive Function", description: "B12 and B6 play essential roles in neurotransmitter production and mental clarity support." },
    { icon: "❤️", title: "Heart Wellness", description: "B-vitamins help maintain healthy homocysteine levels, supporting cardiovascular function." },
    { icon: "🔄", title: "Fast Absorption", description: "Sublingual liquid delivery bypasses digestion for rapid absorption into the bloodstream." },
    { icon: "🛡️", title: "Immune Support", description: "B-complex vitamins support immune system function and overall body wellness." },
    { icon: "🌱", title: "Cell Function", description: "Folate and B12 are essential for healthy DNA synthesis and cellular regeneration processes." },
  ],
  ingredients: [
    { name: "Vitamin B12 (as Methylcobalamin)", amount: "5000 mcg", description: "208,333% Daily Value - supports energy production and neurological function" },
    { name: "Vitamin B6 (as Pyridoxine HCl)", amount: "3400 mcg", description: "200% Daily Value - aids in protein metabolism and neurotransmitter synthesis" },
    { name: "Vitamin B1 (as Thiamine)", amount: "2400 mcg", description: "200% Daily Value - essential for energy metabolism and nerve function" },
    { name: "Niacin (Vitamin B3)", amount: "See label", description: "Supports energy production and cardiovascular health" },
    { name: "Folate (Folic Acid)", amount: "See label", description: "Essential for DNA synthesis and cellular division" },
    { name: "Other Ingredients", amount: "—", description: "Natural raspberry flavor, purified water, vegetable glycerin" },
  ],
  faq: [
    { question: "How many servings are in each bottle?", answer: "Each 2 fl oz bottle contains 40 servings, with the 2-pack providing 80 total servings." },
    { question: "What makes liquid drops better than capsules?", answer: "Liquid drops provide superior 98% absorption through sublingual delivery, compared to only 20% absorption from capsules." },
    { question: "Is this suitable for vegans and vegetarians?", answer: "Yes, this B-complex is 100% vegan, non-GMO, and gluten-free with no animal-derived ingredients." },
    { question: "How should I take these drops?", answer: "Take 1.5 droppers (1.5mL) under your tongue, hold for 30 seconds, then swallow. Best taken in the morning." },
    { question: "What does the raspberry flavor taste like?", answer: "The natural raspberry flavoring provides a pleasant, fruity taste that makes daily supplementation enjoyable without artificial aftertastes." },
    { question: "Can I take this with other supplements?", answer: "Generally yes, but consult your healthcare provider about interactions with medications or other high-dose B-vitamin supplements." },
    { question: "How long will it take to see benefits?", answer: "Many users report increased energy within 0-30 days, with B-vitamins working synergistically over 30-90 days for sustained benefits." },
    { question: "Is this safe for daily use?", answer: "Yes, when taken as directed. However, consult your healthcare provider before use, especially if pregnant, nursing, or taking medications." },
  ],
  chatbotContext: `This is a 2-pack of liquid B-complex vitamin drops containing B12 5000mcg (as Methylcobalamin), B6 3400mcg (as Pyridoxine HCl), B1 2400mcg (as Thiamine), plus Niacin and Folate in raspberry flavor. Each bottle is 2 fl oz (60mL) providing 40 servings, for 80 total servings. The serving size is 1.5 droppers (1.5mL) taken sublingually. It's vegan, non-GMO, gluten-free, GMP certified, and made in USA. The liquid form provides 98% absorption compared to 20% for capsules. Take by holding under tongue for 30 seconds, then swallowing, preferably in the morning.

COMPLIANCE RULES:
- Never claim to treat, cure, or prevent any disease
- Present benefits as nutritional support only ("supports energy" not "boosts energy")
- Recommend consulting healthcare providers for medical questions
- Don't provide medical advice or dosing beyond what's on the label
- Remind users that individual results may vary
- Include FDA disclaimer that statements haven't been evaluated by the FDA`,
  suggestedPrompts: [
    "How do I take these B12 drops for best absorption?",
    "What's the difference between liquid drops and capsules?",
    "What benefits can I expect from this B-complex formula?",
    "Is this suitable for my dietary restrictions?",
  ],
};
