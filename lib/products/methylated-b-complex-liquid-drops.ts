import { Product } from "../types";

export const methylatedBComplexLiquidDrops: Product = {
  slug: "methylated-b-complex-liquid-drops",
  name: "Methylated B Complex Liquid Drops with Active L-Methylfolate",
  brand: "nusava",
  tagline: "High-potency methylated B-complex liquid for superior absorption and daily energy support.",
  heroImage: "/products/methylated-b-complex-liquid-drops.png",
  amazonUrl: "https://www.amazon.com/dp/B0FCH1W1PT",
  asin: "B0FCH1W1PT",
  colors: {
    primary: "#006341",
    accent: "#49a594",
    background: "#dff8ef",
  },
  trustBadges: [
    "100% Vegan",
    "Non-GMO",
    "Made in USA",
    "GMP Certified",
  ],
  usageSteps: [
    { icon: "🫗", title: "Shake Well", detail: "Shake bottle well before each use as natural ingredients may settle" },
    { icon: "💧", title: "Measure 1.5ml", detail: "Take 1.5ml of liquid B12 sublingual daily using the dropper" },
    { icon: "👅", title: "Hold Under Tongue", detail: "Hold under your tongue for 30 seconds before swallowing for optimal absorption" },
  ],
  proTips: [
    "Take on an empty stomach for best absorption",
    "Natural ingredients may settle - shake well before each dose",
    "Store in a cool, dry place away from direct sunlight",
  ],
  benefits: [
    { icon: "⚡", title: "Natural Energy Support", description: "Methylated B12 and B-complex vitamins play a role in converting food into energy at the cellular level" },
    { icon: "🧠", title: "Cognitive Function", description: "B vitamins are involved in neurotransmitter synthesis and brain function" },
    { icon: "🔄", title: "Methylation Support", description: "Active methylfolate and methylated B12 support the body's methylation processes" },
    { icon: "💪", title: "Cellular Health", description: "B vitamins participate in DNA synthesis and cellular repair processes" },
  ],
  ingredients: [
    { name: "Methylated B12 (Methylcobalamin)", amount: "5000 mcg", description: "Bioactive form of B12 that supports energy production and nervous system function" },
    { name: "B6 P5P (Pyridoxal-5-Phosphate)", amount: "1700 mcg", description: "Active form of vitamin B6 that supports amino acid metabolism and neurotransmitter synthesis" },
    { name: "5-MTHF (L-Methylfolate)", amount: "800 mcg", description: "Active form of folate that supports DNA synthesis and methylation processes" },
    { name: "Vitamin B1 (Benfotiamine)", amount: "1.2 mg", description: "Supports the body's natural ability to turn food into fuel" },
    { name: "Vitamin B3 (Niacinamide)", amount: "16 mg", description: "Plays a key role in energy and nutrient conversion" },
  ],
  faq: [
    { question: "How do I take these B complex drops?", answer: "Shake well and take 1.5ml daily. Hold under your tongue for 30 seconds before swallowing for optimal absorption." },
    { question: "Why are methylated forms better?", answer: "Methylated B12 and active L-methylfolate are already in their bioactive forms, so they don't require conversion by the body and may be better absorbed." },
    { question: "Is this suitable for vegans?", answer: "Yes, this product is 100% vegan, non-GMO, and alcohol-free." },
    { question: "What does the raspberry flavor taste like?", answer: "The natural raspberry flavor makes the drops pleasant to take without any added sugar." },
    { question: "How long does one bottle last?", answer: "Each 2 fl oz bottle provides approximately 40 servings when taking 1.5ml daily." },
    { question: "Can I take this with other supplements?", answer: "While generally safe, consult with your healthcare provider before combining with other supplements, especially those containing B vitamins." },
  ],
  chatbotContext: `This is a methylated B complex liquid supplement by Nusava containing B12, B6, and folate in bioactive forms. I can discuss ingredients, usage, and general nutritional information. I cannot make disease claims, diagnose conditions, or provide medical advice. Always consult healthcare providers for medical concerns. Pregnant/nursing women and those with medical conditions should consult doctors before use.`,
  suggestedPrompts: [
    "What makes methylated B vitamins different from regular ones?",
    "How should I take these liquid B complex drops?",
    "What ingredients are in this B complex formula?",
    "Is this suitable for people with dietary restrictions?",
  ],
  formulaSynergy: {
    summary: "The methylated B12, active folate, and P5P work together to support the body's methylation cycle and energy production pathways.",
    interactions: [
      {
        ingredients: ["Methylated B12", "L-Methylfolate"],
        relationship: "Both serve as methyl donors in the methylation cycle, working together to support DNA synthesis and cellular repair",
        bottomLine: "These two ingredients team up to help your cells make and repair DNA more effectively",
        explanation: "Methylcobalamin and 5-MTHF are both essential cofactors in the methylation cycle, particularly in the conversion of homocysteine to methionine, which is crucial for DNA methylation and cellular function.",
      },
      {
        ingredients: ["B6 P5P", "Methylated B12"],
        relationship: "P5P supports amino acid metabolism while B12 supports the conversion of amino acids, creating a complementary effect for protein utilization",
        bottomLine: "These B vitamins work as a team to help your body better use the protein you eat",
        explanation: "Pyridoxal-5-phosphate is essential for transamination reactions in amino acid metabolism, while methylcobalamin is required for the conversion of methylmalonyl-CoA to succinyl-CoA in amino acid catabolism.",
      }
    ],
  },
  resultsTimeline: {
    summary: "B vitamin levels may begin to improve within days, but noticeable energy and cognitive benefits typically develop over several weeks of consistent use.",
    stages: [
      { period: "Week 1", title: "Initial Absorption", physiological: "Methylated B vitamins begin replenishing cellular stores and supporting enzymatic reactions", noticeable: "Some people may notice subtle improvements in energy or mood, though effects vary", advice: "Be patient - B vitamins work at the cellular level and benefits build over time with consistent use" },
      { period: "Month 1-2", title: "Building Benefits", physiological: "B vitamin stores become more optimal, methylation processes improve, and energy metabolism becomes more efficient", noticeable: "More consistent energy levels and improved mental clarity may become apparent", advice: "Continue daily use as directed - cellular changes take time to translate into noticeable improvements" },
      { period: "Month 3+", title: "Sustained Support", physiological: "Optimal B vitamin status supports ongoing cellular energy production and methylation processes", noticeable: "Peak benefits for energy, focus, and overall wellness with maintained daily use", advice: "Consistency is key for maintaining optimal B vitamin levels and sustained benefits" }
    ],
  },
  featuredReviews: [
    { reviewerName: "Sarah M.", starRating: 5, reviewText: "Love the raspberry flavor and how easy these are to take. Much better absorption than pills!", isVerifiedPurchase: true },
    { reviewerName: "Mike R.", starRating: 5, reviewText: "Great energy support without any jitters. The methylated forms really make a difference.", isVerifiedPurchase: true }
  ],
  negativeReviewFaq: [
    { question: "What if I don't notice energy improvements right away?", answer: "B vitamin benefits build gradually as cellular stores replenish. Give it 4-6 weeks of consistent use, and make sure you're taking it on an empty stomach for best absorption.", sourceTheme: "Slow or no results" },
    { question: "Is the raspberry flavor too strong or artificial tasting?", answer: "We use natural raspberry flavoring without added sugars. If the taste is too strong, you can mix it with a small amount of water or juice after the 30-second sublingual hold.", sourceTheme: "Taste complaints" },
    { question: "Why do I need to shake the bottle every time?", answer: "Natural ingredients can settle, which is actually a good sign that we don't use artificial stabilizers. Shaking ensures you get the full potency in every dose.", sourceTheme: "Inconvenient usage" }
  ],
  supportContacts: {
    website: { phone: "+1 415-800-4758", email: "hello@getnusava.com" },
  },
};
