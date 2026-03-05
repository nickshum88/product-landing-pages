import { Product } from "../types";

export const turmericBioperineGarlicGingerCapsules: Product = {
  slug: "turmeric-bioperine-garlic-ginger-capsules",
  name: "Turmeric Curcumin with BioPerine, Garlic & Ginger - 2360mg",
  brand: "medchoice",
  tagline: "High-potency 4-in-1 herbal blend with BioPerine for enhanced absorption and daily wellness support.",
  heroImage: "/products/turmeric-bioperine-garlic-ginger-capsules.jpg",
  amazonUrl: "https://www.amazon.com/dp/B08BWN8M3Y",
  asin: "B08BWN8M3Y",
  colors: {
    primary: "#f29941",
    accent: "#49a594",
    background: "#faecd7",
  },
  trustBadges: [
    "Made in USA",
    "Non-GMO",
    "No Fillers",
    "Professional Grade",
    "cGMP Certified",
  ],
  usageSteps: [
    { icon: "💊", title: "Take Daily", detail: "Take capsules with water as part of your daily routine" },
    { icon: "🥛", title: "With Food", detail: "Best absorbed when taken with meals" },
    { icon: "⏰", title: "Consistent Timing", detail: "Take at the same time each day for optimal results" },
  ],
  proTips: [
    "Take with a meal containing healthy fats to enhance curcumin absorption",
    "Consistency is key - take daily for at least 60 days to experience full benefits",
    "Store in a cool, dry place away from direct sunlight",
  ],
  benefits: [
    { icon: "🦴", title: "Joint Health Support", description: "Turmeric and ginger have been traditionally used to support joint comfort and mobility" },
    { icon: "🛡️", title: "Antioxidant Properties", description: "Curcumin provides antioxidant support to help protect cells from oxidative stress" },
    { icon: "💪", title: "Enhanced Absorption", description: "BioPerine black pepper extract helps increase nutrient bioavailability" },
    { icon: "❤️", title: "Cardiovascular Support", description: "Garlic has been traditionally used to support cardiovascular health" },
    { icon: "🌿", title: "Daily Wellness", description: "Ginger root supports digestive comfort and overall wellness" },
  ],
  ingredients: [
    { name: "Turmeric Root", amount: "1400mg", description: "Traditional herb that supports joint health and provides natural curcumin" },
    { name: "Garlic Bulb", amount: "500mg", description: "Supports cardiovascular health and provides daily wellness benefits" },
    { name: "Ginger Root", amount: "300mg", description: "Supports digestive comfort and complements turmeric's benefits" },
    { name: "Turmeric Root Extract (95% Curcuminoids)", amount: "150mg", description: "Standardized extract providing concentrated curcumin compounds" },
    { name: "BioPerine Black Pepper Extract", amount: "10mg", description: "Patented ingredient that enhances nutrient absorption" },
  ],
  faq: [
    { question: "How many capsules should I take daily?", answer: "Follow the serving size indicated on the supplement facts label. Each serving provides 2360mg of the herbal blend." },
    { question: "When is the best time to take this supplement?", answer: "Take with meals to enhance absorption. Consistency is important, so choose a time you can maintain daily." },
    { question: "Is this supplement suitable for vegetarians?", answer: "Yes, the capsules are made with hypromellose (vegetarian capsule) and contain no animal-derived ingredients." },
    { question: "What makes this formula different from regular turmeric?", answer: "This formula combines four complementary herbs and includes BioPerine for enhanced absorption, plus standardized curcumin extract for consistency." },
    { question: "Are there any allergens in this product?", answer: "This product is made in a facility that may process other allergens. Check the full ingredient list and consult your healthcare provider if you have specific allergies." },
    { question: "How long before I notice results?", answer: "Individual results vary. Some may notice subtle changes within weeks, but turmeric is best used as part of a long-term daily routine for at least 60 days." },
    { question: "Can I take this with other supplements?", answer: "Consult your healthcare provider before combining with other supplements or medications, especially blood thinners." },
    { question: "Is this product third-party tested?", answer: "This product is manufactured in a cGMP certified facility following strict quality standards to ensure purity and potency." },
  ],
  chatbotContext: `This is a turmeric curcumin supplement with BioPerine, garlic, and ginger containing 2360mg per serving in 120 capsules. Made by MedChoice, it's non-GMO with no fillers and manufactured in a cGMP facility. COMPLIANCE RULES: Never make disease claims. Always recommend consulting healthcare providers. Focus on traditional uses and general wellness support. Cannot claim to diagnose, treat, cure, or prevent any disease. Statements have not been evaluated by the FDA.`,
  suggestedPrompts: [
    "What are the benefits of BioPerine in turmeric supplements?",
    "How does this 4-in-1 formula compare to single-ingredient turmeric?",
    "What's the best way to take turmeric for absorption?",
    "Can you explain the difference between turmeric root and curcumin extract?",
  ],
};
