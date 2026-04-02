import { Product } from "../types";

export const liverSupportElectrolytesCapsules: Product = {
  slug: "liver-support-electrolytes-capsules",
  name: "22-in-1 Liver Support with Electrolytes",
  brand: "primemd",
  tagline: "Dual-action formula combining liver support botanicals with essential electrolytes for daily wellness and hydration.",
  heroImage: "/products/liver-support-electrolytes-capsules.jpg",
  amazonUrl: "https://www.amazon.com/dp/B0DZY4X4QN",
  asin: "B0DZY4X4QN",
  colors: {
    primary: "#5f6360",
    accent: "#116dff",
    background: "#e2e2e2",
  },
  trustBadges: [
    "Made in USA",
    "3rd Party Lab Tested",
    "Vegan Capsules",
    "90 Capsules",
  ],
  usageSteps: [
    { icon: "💊", title: "Take 2 Capsules Daily", detail: "Take one capsule twice daily with meals and 12 fl oz of water" },
    { icon: "🥗", title: "With Food", detail: "Best absorbed when taken with a meal for optimal nutrient uptake" },
    { icon: "⏰", title: "Consistent Timing", detail: "Take at the same times each day for 60 days for best results" },
  ],
  proTips: [
    "Start with one capsule daily for the first few days to assess tolerance",
    "Stay well hydrated throughout the day to support the electrolyte blend",
    "Take consistently for at least 60 days to experience full benefits",
  ],
  benefits: [
    { icon: "🫀", title: "Liver Health Support", description: "Milk thistle with 80% silymarin plays a role in supporting the liver's natural detoxification processes and cellular health" },
    { icon: "💧", title: "Hydration Balance", description: "Essential electrolytes including potassium, sodium, and magnesium help maintain proper fluid balance and cellular function" },
    { icon: "🌿", title: "Antioxidant Activity", description: "Turmeric, dandelion root, and artichoke extract provide compounds that support the body's natural antioxidant defenses" },
    { icon: "⚡", title: "Enhanced Absorption", description: "BioPerine black pepper extract supports the bioavailability and absorption of key nutrients like curcumin" },
  ],
  ingredients: [
    { name: "Milk Thistle Extract (80% Silymarin)", amount: "350mg", description: "Supports liver health and natural detoxification processes" },
    { name: "Dandelion Root", amount: "100 mg", description: "Traditional herb that supports liver and kidney function" },
    { name: "Artichoke Extract", amount: "100 mg", description: "Contains compounds that support healthy digestion and liver function" },
    { name: "Turmeric", amount: "100 mg", description: "Provides curcumin for antioxidant and anti-inflammatory support" },
    { name: "Potassium", amount: "70 mg", description: "Essential electrolyte for fluid balance and cellular function" },
    { name: "Sodium", amount: "50 mg", description: "Key electrolyte for hydration and nerve function" },
    { name: "Magnesium", amount: "25 mg", description: "Supports muscle function and electrolyte balance" },
    { name: "BioPerine Black Pepper Extract", amount: "5 mg", description: "Enhances absorption and bioavailability of other nutrients" },
  ],
  faq: [
    { question: "How should I take this liver support supplement?", answer: "Take one capsule twice daily with meals and 12 fl oz of water. For best results, maintain consistent usage for 60 days." },
    { question: "What makes this different from other liver supplements?", answer: "This 22-in-1 formula combines traditional liver support herbs with 5 essential electrolytes for dual-action liver and hydration support in one convenient capsule." },
    { question: "How long before I notice results?", answer: "Results may vary, but we recommend consistent 60-day usage. Some people notice improved energy and wellness within the first few weeks." },
    { question: "Can I take this with other supplements?", answer: "As with any supplement addition to your routine, consult your healthcare provider to ensure it aligns with your current regimen." },
    { question: "Is this suitable for vegans?", answer: "Yes, these are 100% vegan capsules with no animal-derived ingredients." },
    { question: "What is the optimal milk thistle dosage in this formula?", answer: "Each serving provides 350mg of milk thistle extract standardized to 80% silymarin, which is considered an optimal therapeutic dose." },
  ],
  chatbotContext: `This is a 22-in-1 liver support supplement with electrolytes containing milk thistle, dandelion root, artichoke extract, and essential minerals. It provides 1411mg per 2-capsule serving in vegan capsules. COMPLIANCE: Never make disease claims. Always recommend consulting healthcare providers. Focus on general wellness support, not treatment. Do not diagnose or prescribe. Emphasize this is a dietary supplement, not medicine.`,
  suggestedPrompts: [
    "What's the difference between this and regular liver supplements?",
    "How do the electrolytes work with the liver support herbs?",
    "What's the best time of day to take liver support supplements?",
    "Can I take this if I'm already taking other vitamins?",
  ],
  formulaSynergy: {
    summary: "The combination of liver-supporting botanicals with essential electrolytes creates a dual-action formula for comprehensive wellness support.",
    interactions: [
      {
        ingredients: ["Milk Thistle", "BioPerine"],
        relationship: "BioPerine enhances the absorption of silymarin compounds from milk thistle",
        bottomLine: "Black pepper extract helps your body absorb more of the beneficial compounds from milk thistle",
        explanation: "Piperine in black pepper extract inhibits certain enzymes that break down active compounds, allowing for better absorption of silymarin and other phytonutrients in the digestive tract.",
      },
      {
        ingredients: ["Turmeric", "BioPerine"],
        relationship: "BioPerine significantly increases curcumin bioavailability from turmeric",
        bottomLine: "The black pepper extract makes turmeric much more effective by helping your body absorb its active compounds",
        explanation: "Studies show that piperine can increase curcumin absorption by up to 2000% by inhibiting hepatic and intestinal glucuronidation, allowing more curcumin to remain active in the bloodstream.",
      },
      {
        ingredients: ["Electrolytes", "Liver Support Herbs"],
        relationship: "Proper electrolyte balance supports optimal liver function and nutrient transport",
        bottomLine: "The electrolytes help your liver work better while supporting hydration throughout your body",
        explanation: "Electrolytes maintain cellular membrane potential and facilitate nutrient transport, which supports the liver's metabolic processes and helps optimize the delivery and utilization of botanical compounds.",
      }
    ],
  },
  resultsTimeline: {
    summary: "Most people notice gradual improvements in energy and wellness over 4-8 weeks of consistent use.",
    stages: [
      { period: "Week 1", title: "Initial Adjustment", physiological: "Body begins utilizing the botanical compounds and electrolytes, with initial liver enzyme support starting", noticeable: "Some people may notice improved hydration and slightly better energy levels", advice: "Don't worry if you don't feel dramatic changes yet - your body is just getting started with these nutrients" },
      { period: "Month 1-2", title: "Building Benefits", physiological: "Liver detoxification pathways become more supported, electrolyte balance improves, antioxidant activity increases", noticeable: "Many people report feeling more energized, better hydration, and improved overall wellness", advice: "This is when most people start noticing the benefits - stay consistent even if results seem gradual" },
      { period: "Month 3+", title: "Optimal Support", physiological: "Full therapeutic levels of botanical compounds maintained, liver function optimally supported, sustained antioxidant protection", noticeable: "Peak benefits including sustained energy, better recovery, and overall sense of wellness", advice: "Continue consistent use to maintain these benefits - your body has adapted to utilizing these nutrients effectively" }
    ],
  },
  featuredReviews: [
    { reviewerName: "[NEEDS REVIEW]", starRating: 5, reviewText: "[NEEDS REVIEW - no specific reviews provided in source material]", isVerifiedPurchase: true }
  ],
  negativeReviewFaq: [
    { question: "What should I do if I don't notice results after a few weeks?", answer: "Supplement benefits can take 4-8 weeks to become noticeable. Make sure you're taking it consistently with food and staying well-hydrated. If you have concerns, consult your healthcare provider.", sourceTheme: "slow results" },
    { question: "The capsules seem large - any tips for taking them?", answer: "Try taking one capsule at a time with plenty of water (12 fl oz recommended). Taking them with food can also make swallowing easier. You can also space them out throughout the day.", sourceTheme: "pill size" },
    { question: "Can this supplement cause stomach upset?", answer: "Some people may experience mild digestive effects when starting any new supplement. Try taking with food and starting with one capsule daily for the first few days to assess tolerance.", sourceTheme: "digestive discomfort" },
    { question: "Is this worth the cost compared to basic milk thistle supplements?", answer: "This provides 22 ingredients including liver herbs plus electrolytes for dual support, whereas basic milk thistle only addresses one aspect. The BioPerine also enhances absorption for better value per dose.", sourceTheme: "price concerns" }
  ],
  supportContacts: {
    website: { phone: "+1 424-256-1649", email: "hi@getprimemd.com" },
  },
};
