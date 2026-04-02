import { Product } from "../types";

export const methylatedBComplexVitaminC: Product = {
  slug: "methylated-b-complex-vitamin-c",
  name: "Methylated B Complex with Vitamin C",
  brand: "medchoice",
  tagline: "9-in-1 bioactive B complex with methylated forms for superior absorption and daily energy support.",
  heroImage: "/products/methylated-b-complex-vitamin-c.jpg",
  amazonUrl: "https://www.amazon.com/dp/B0FLKBTSL2",
  asin: "B0FLKBTSL2",
  colors: {
    primary: "#f5f5f5",
    accent: "#49a594",
    background: "#dff8ef",
  },
  trustBadges: [
    "Vegan",
    "Non-GMO",
    "Gluten-Free",
    "GMP-Certified",
  ],
  usageSteps: [
    { icon: "🕐", title: "Take Once Daily", detail: "Take 1 capsule early in the day with a meal and 8 fl. oz. of water" },
    { icon: "🍽️", title: "With Food", detail: "Take with a meal for better absorption and to be easier on your stomach" },
    { icon: "📅", title: "Stay Consistent", detail: "Maintain consistency for 60 days to make the routine stick and see optimal results" },
  ],
  proTips: [
    "Take in the morning as B vitamins may support energy levels throughout the day",
    "Stay consistent for at least 60 days to establish the habit and allow your body to build nutrient stores",
  ],
  benefits: [
    { icon: "⚡", title: "Energy Support", description: "B vitamins play essential roles in cellular energy production and metabolism" },
    { icon: "🧠", title: "Brain Function", description: "Methylated B vitamins support neurotransmitter synthesis and cognitive function" },
    { icon: "🛡️", title: "Daily Defenses", description: "Vitamin C supports immune system function and acts as an antioxidant" },
    { icon: "❤️", title: "Heart Health", description: "B vitamins, particularly folate and B12, support cardiovascular health and homocysteine metabolism" },
  ],
  ingredients: [
    { name: "Vitamin C (as ascorbic acid)", amount: "180 mg", description: "Supports immune function and acts as a powerful antioxidant" },
    { name: "Thiamine (as thiamin HCI)", amount: "25 mg", description: "Essential for energy metabolism and nervous system function" },
    { name: "Riboflavin (as riboflavin 5-phosphate)", amount: "12 mg", description: "Active form that supports cellular energy production" },
    { name: "Niacin (as niacinamide)", amount: "100 mg", description: "Supports heart health and daily wellness" },
    { name: "Vitamin B6 (as pyridoxal 5-phosphate)", amount: "10 mg", description: "Active form that supports year-round wellness" },
    { name: "Folate (as 5-MTHF)", amount: "470 mcg DFE", description: "Methylated form for energy, brain, and mood support" },
    { name: "Vitamin B12 (as methylcobalamin)", amount: "1000 mcg", description: "Active methylated form for efficient methylation support" },
    { name: "Biotin", amount: "1000 mcg", description: "Supports hair, skin, and connective tissues" },
    { name: "Pantothenic Acid (as D-calcium pantothenate)", amount: "100 mg", description: "Supports nutrient utilization and metabolism" },
  ],
  faq: [
    { question: "How is this different from regular B complex supplements?", answer: "This formula uses methylated, bioactive forms of B vitamins like methylcobalamin (B12) and L-5-MTHF (folate) that are ready for your body to use immediately, rather than requiring conversion from synthetic forms." },
    { question: "Can I take this if I'm vegan or have dietary restrictions?", answer: "Yes, this supplement is certified vegan, non-GMO, and gluten-free, making it suitable for most dietary restrictions." },
    { question: "Why is vitamin C included in a B complex?", answer: "Vitamin C is added for daily immune defenses and works synergistically with B vitamins to support overall wellness and nutrient absorption." },
    { question: "What's the best time of day to take this?", answer: "Take one capsule in the morning with a meal and water. B vitamins support energy metabolism, so morning dosing helps avoid potential sleep interference." },
    { question: "How long does one bottle last?", answer: "Each bottle contains 90 capsules, providing a 90-day supply when taking the recommended one capsule daily." },
    { question: "Are there any side effects I should know about?", answer: "B vitamins are generally well-tolerated. Some people may experience bright yellow urine (from riboflavin) which is normal and harmless. Always consult your healthcare provider before starting any new supplement." },
  ],
  chatbotContext: `This is a methylated B complex supplement with vitamin C containing 9 active B vitamins in bioactive forms. The product is vegan, non-GMO, gluten-free, and GMP-certified. Serving size is 1 capsule daily with 90 servings per bottle. COMPLIANCE RULES: Never make disease claims. Always recommend consulting healthcare providers. Only discuss general wellness support and nutritional roles. Cannot diagnose, treat, cure, or prevent any disease.`,
  suggestedPrompts: [
    "What makes methylated B vitamins different from regular B vitamins?",
    "How should I take this B complex for best results?",
    "Is this suitable for vegans and people with dietary restrictions?",
    "What can I expect when starting a methylated B complex?",
  ],
  formulaSynergy: {
    summary: "The methylated B vitamins work together in interconnected metabolic pathways, while vitamin C enhances absorption and provides antioxidant protection.",
    interactions: [
      {
        ingredients: ["Methylcobalamin (B12)", "L-5-MTHF (Folate)"],
        relationship: "Work together in the methylation cycle for DNA synthesis and homocysteine metabolism",
        bottomLine: "These two ingredients team up to support your body's methylation processes, which are important for energy and brain function",
        explanation: "Methylcobalamin and 5-methyltetrahydrofolate are both methyl donors that participate in the one-carbon metabolism cycle. B12 serves as a cofactor for methionine synthase, which requires 5-MTHF as a substrate to convert homocysteine back to methionine, supporting proper methylation throughout the body.",
      },
      {
        ingredients: ["Riboflavin 5-Phosphate", "Niacinamide"],
        relationship: "Both serve as precursors to NAD+ and FAD coenzymes essential for cellular energy production",
        bottomLine: "These B vitamins work as a team to help your cells make energy more efficiently",
        explanation: "Riboflavin 5-phosphate is the active form that directly converts to FAD and FMN coenzymes, while niacinamide converts to NAD+ and NADP+. These coenzymes are essential electron carriers in the electron transport chain and cellular respiration processes.",
      },
      {
        ingredients: ["Vitamin C", "B Vitamin Complex"],
        relationship: "Vitamin C enhances absorption of B vitamins and provides antioxidant protection during metabolic processes",
        bottomLine: "Vitamin C helps your body better absorb and use the B vitamins while protecting your cells",
        explanation: "Ascorbic acid can enhance the bioavailability of certain B vitamins and acts as an antioxidant to protect against oxidative stress that can occur during increased metabolic activity from B vitamin supplementation.",
      }
    ],
  },
  resultsTimeline: {
    summary: "Most people notice initial energy improvements within days to weeks, with optimal benefits developing over 2-3 months of consistent use.",
    stages: [
      { period: "Week 1", title: "Initial Absorption", physiological: "Methylated B vitamins begin replenishing cellular stores and supporting immediate metabolic processes", noticeable: "Some people may notice subtle improvements in energy levels or mental clarity, though effects vary by individual", advice: "Don't worry if you don't feel dramatic changes yet - your body is building nutrient stores and some people are slower to respond" },
      { period: "Month 1-2", title: "Building Momentum", physiological: "B vitamin stores reach optimal levels, methylation pathways function more efficiently, and cellular energy production improves", noticeable: "More consistent energy throughout the day, better mood stability, and improved mental focus become apparent", advice: "This is when most people start noticing the real benefits - stay consistent as your body continues optimizing nutrient utilization" },
      { period: "Month 3+", title: "Optimal Support", physiological: "Full methylation support established, homocysteine metabolism optimized, and all B vitamin-dependent processes functioning at peak efficiency", noticeable: "Sustained energy, stable mood, clear thinking, and overall sense of vitality become your new normal", advice: "Continue consistent daily use to maintain these benefits - stopping supplementation will gradually return vitamin levels to baseline" }
    ],
  },
  featuredReviews: [
    { reviewerName: "[NEEDS REVIEW]", starRating: 5, reviewText: "[NEEDS REVIEW] - individual reviews not provided in listing", isVerifiedPurchase: true }
  ],
  negativeReviewFaq: [
    { question: "I've been taking this for a week but don't feel more energetic yet - is something wrong?", answer: "This is completely normal! While some people notice changes within days, it often takes 2-4 weeks to build up B vitamin stores and see consistent energy improvements. The methylated forms work immediately, but your body needs time to replenish any deficiencies and optimize metabolic processes.", sourceTheme: "Slow or no initial results" },
    { question: "The capsules seem large - are there any tips for taking them easier?", answer: "Try taking the capsule with plenty of water (8 oz as recommended) and with food, which can make swallowing easier and improve absorption. You can also try taking it with a thicker liquid like a smoothie if plain water doesn't help.", sourceTheme: "Pill size concerns" },
    { question: "My urine turned bright yellow - should I be concerned?", answer: "Bright yellow urine is completely normal and harmless when taking B vitamins, especially riboflavin (B2). This just means your body is processing the vitamins properly and excreting excess amounts. It's actually a good sign that the supplement is being absorbed!", sourceTheme: "Unexpected physical effects" }
  ],
  supportContacts: {
    website: { phone: "+1 510-470-6744", email: "support@medchoice.co" },
  },
};
