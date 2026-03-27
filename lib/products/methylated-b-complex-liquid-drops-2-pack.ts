import { Product } from "../types";

export const methylatedBComplexLiquidDrops2Pack: Product = {
  slug: "methylated-b-complex-liquid-drops-2-pack",
  name: "Methylated B Complex Liquid Drops (2-Pack)",
  brand: "nusava",
  tagline: "High-potency methylated B vitamins in fast-absorbing raspberry-flavored sublingual drops.",
  heroImage: "/products/methylated-b-complex-liquid-drops-2-pack.png",
  amazonUrl: "https://www.amazon.com/dp/B0FCH1W1PT",
  asin: "B0FCH1W1PT",
  colors: {
    primary: "#006341",
    accent: "#49a594",
    background: "#dff8ef",
  },
  trustBadges: [
    "Vegan",
    "Non-GMO",
    "GMP Certified",
    "Made in USA",
    "100% Vegan",
  ],
  usageSteps: [
    { icon: "🍶", title: "Shake Well", detail: "Always shake the bottle well before each use to ensure proper mixing" },
    { icon: "💧", title: "Measure 1.5ml", detail: "Take 1.5 ml daily using the dropper" },
    { icon: "👅", title: "Hold Under Tongue", detail: "Place drops under tongue and hold for 30 seconds for sublingual absorption" },
    { icon: "✨", title: "Swallow", detail: "After 30 seconds, swallow and enjoy the raspberry flavor" },
  ],
  proTips: [
    "Take on an empty stomach for maximum absorption",
    "Natural ingredients may settle - shaking ensures full potency in every drop",
    "Store in a cool, dry place away from direct sunlight",
  ],
  benefits: [
    { icon: "⚡", title: "Energy Support", description: "Methylated B12 plays a role in cellular energy production and may help support natural energy levels" },
    { icon: "🧠", title: "Cognitive Function", description: "B vitamins are involved in neurotransmitter synthesis and may support mental clarity and focus" },
    { icon: "🔄", title: "Methylation Support", description: "Active methylfolate and methylated B12 support the body's natural methylation processes" },
    { icon: "❤️", title: "Cellular Health", description: "B vitamins play essential roles in DNA synthesis and cellular repair processes" },
  ],
  ingredients: [
    { name: "Methylated B12 (Methylcobalamin)", amount: "5000 mcg", description: "Bioactive form of B12 that supports energy production and nervous system function" },
    { name: "B6 P5P (Pyridoxal-5-Phosphate)", amount: "1700 mcg", description: "Active form of vitamin B6 that supports amino acid metabolism and neurotransmitter synthesis" },
    { name: "5-MTHF (L-Methylfolate)", amount: "800 mcg", description: "Active form of folate that supports DNA synthesis and methylation processes" },
  ],
  faq: [
    { question: "What makes these B vitamins different from regular B vitamins?", answer: "Our formula uses methylated forms like methylcobalamin (B12) and L-methylfolate, which are the active forms your body can use directly without needing to convert them first." },
    { question: "How should I take these sublingual drops?", answer: "Take 1.5ml daily by placing drops under your tongue and holding for 30 seconds before swallowing. This allows for direct absorption into your bloodstream." },
    { question: "Is this product suitable for vegans and vegetarians?", answer: "Yes, this product is 100% vegan, non-GMO, and contains no animal-derived ingredients." },
    { question: "Why is the liquid form better than pills?", answer: "Liquid drops offer superior absorption compared to capsules or tablets. Our sublingual format allows nutrients to enter your bloodstream directly through the tissues under your tongue." },
    { question: "Can I take this with other supplements?", answer: "While generally safe, we recommend consulting with your healthcare provider before combining with other supplements, especially if you're taking medications." },
    { question: "How long will one bottle last?", answer: "Each 2 fl oz bottle provides approximately 40 servings when taking the recommended 1.5ml daily dose. This 2-pack provides about 80 total servings." },
    { question: "Does this need to be refrigerated?", answer: "No refrigeration required. Store in a cool, dry place away from direct sunlight. Always shake well before use as natural ingredients may settle." },
    { question: "What does the raspberry flavor taste like?", answer: "Our natural raspberry flavoring provides a pleasant, mild berry taste that makes taking your daily B vitamins enjoyable without any artificial aftertaste." },
  ],
  chatbotContext: `This is a methylated B complex supplement in liquid drop form. Key compliance rules: Never make disease claims or suggest this product can diagnose, treat, cure, or prevent any disease. Always recommend consulting healthcare providers for medical advice. Focus on nutritional support and general wellness. The product contains methylated B12 (5000mcg), B6 P5P (1700mcg), and 5-MTHF (800mcg) in raspberry-flavored sublingual drops. Dosage is 1.5ml daily held under tongue for 30 seconds. Product is vegan, non-GMO, and made in USA.`,
  suggestedPrompts: [
    "What's the difference between methylated and regular B vitamins?",
    "How do I properly take sublingual B12 drops?",
    "What are the benefits of liquid vitamins vs pills?",
    "Is this safe to take with my other medications?",
  ],
  formulaSynergy: {
    summary: "Methylated B12, active B6, and L-methylfolate work together to support optimal methylation and energy production pathways.",
    interactions: [
      {
        ingredients: ["Methylated B12", "L-Methylfolate"],
        relationship: "Both nutrients are essential cofactors in the methylation cycle, working synergistically to support homocysteine metabolism and DNA methylation processes",
        bottomLine: "These two nutrients help your body's natural detox and repair processes work more efficiently",
        explanation: "Methylcobalamin and L-methylfolate are both methyl donors that participate in the conversion of homocysteine to methionine, supporting proper methylation reactions throughout the body",
      },
      {
        ingredients: ["B6 P5P", "Methylated B12"],
        relationship: "P5P serves as a cofactor for enzymes involved in amino acid metabolism, while B12 supports the methionine cycle, creating complementary pathways for protein metabolism",
        bottomLine: "Together they help your body better use proteins and support healthy brain chemical production",
        explanation: "Pyridoxal-5-phosphate is essential for transamination reactions and neurotransmitter synthesis, while methylcobalamin supports methionine synthase activity",
      }
    ],
  },
  resultsTimeline: {
    summary: "Most people begin noticing energy improvements within the first few weeks, with optimal benefits developing over 2-3 months of consistent use.",
    stages: [
      { period: "Week 1", title: "Initial Absorption", physiological: "Methylated B vitamins begin replenishing cellular stores and supporting basic metabolic functions", noticeable: "Some people may notice slight improvements in energy or mental clarity, though effects are often subtle initially", advice: "Be patient - your body is adjusting to the bioactive forms. Continue consistent daily use even if you don't feel dramatic changes yet" },
      { period: "Month 1-2", title: "Building Momentum", physiological: "B vitamin stores become more optimal, methylation pathways function more efficiently, and cellular energy production improves", noticeable: "More consistent energy levels throughout the day, improved mental clarity, and better overall vitality", advice: "This is when most people start feeling the real benefits. If you're not noticing changes yet, ensure you're taking it consistently and consider your overall lifestyle factors" },
      { period: "Month 3+", title: "Sustained Benefits", physiological: "Optimal B vitamin status supports long-term cellular health, efficient energy metabolism, and proper neurological function", noticeable: "Sustained energy without crashes, improved mood stability, and better overall sense of wellbeing", advice: "Continue consistent use to maintain benefits. If you stop taking the supplement, benefits will gradually diminish as B vitamin stores deplete" }
    ],
  },
  featuredReviews: [
    { reviewerName: "[NEEDS REVIEW]", starRating: 5, reviewText: "[NEEDS REVIEW]", isVerifiedPurchase: true }
  ],
  negativeReviewFaq: [
    { question: "What if I don't notice any energy boost right away?", answer: "B vitamin benefits often build gradually over 2-4 weeks as your body replenishes its stores. Factors like diet, stress, and individual metabolism can affect timing. Continue consistent daily use and ensure you're following the sublingual instructions for best absorption.", sourceTheme: "slow or no noticeable results" },
    { question: "The raspberry flavor seems too strong/artificial - is this normal?", answer: "Our natural raspberry flavoring is designed to mask the inherent taste of B vitamins, which can be quite strong. If the flavor is too intense, try diluting the drops in a small amount of water or taking them with a meal.", sourceTheme: "taste complaints" },
    { question: "Why do the drops sometimes look different or separated?", answer: "Natural ingredients can settle or separate over time, which is completely normal. This is why we recommend shaking well before each use. The separation doesn't affect potency - just ensures you get consistent dosing in every drop.", sourceTheme: "product appearance concerns" }
  ],
  supportContacts: {
    website: { phone: "+1 415-800-4758", email: "hello@getnusava.com" },
  },
};
