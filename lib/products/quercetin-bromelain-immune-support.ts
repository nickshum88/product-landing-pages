import { Product } from "../types";

export const quercetinBromelainImmuneSupport: Product = {
  slug: "quercetin-bromelain-immune-support",
  name: "28-in-1 Quercetin with Bromelain Supplement",
  brand: "primemd",
  tagline: "Comprehensive immune defense support with 28 powerful ingredients in one convenient formula.",
  heroImage: "/products/quercetin-bromelain-immune-support.jpg",
  amazonUrl: "https://www.amazon.com/dp/B0CS6LC3JW",
  asin: "B0CS6LC3JW",
  colors: {
    primary: "#5f6360",
    accent: "#116dff",
    background: "#f8f9fa",
  },
  trustBadges: [
    "GMO Free",
    "Clinically Tested",
    "3rd Party Lab Tested",
    "GMP Certified",
    "Made in USA",
    "100% Natural",
  ],
  usageSteps: [
    { icon: "🥄", title: "Take 3 Capsules Daily", detail: "Adults should take three (3) quercetin bromelain capsules daily with a meal" },
    { icon: "💧", title: "With Water", detail: "Take with 8 oz of water for optimal absorption" },
    { icon: "⏰", title: "Stay Consistent", detail: "For optimal results, consistently take them for 60 days with good diet, exercise, and regular sleep" },
  ],
  proTips: [
    "Take with a meal to enhance absorption and reduce any potential stomach upset",
    "Maintain consistency for 60 days to experience the full benefits of this comprehensive formula",
    "Store in a cool, dry place away from direct sunlight to preserve potency",
  ],
  benefits: [
    { icon: "🛡️", title: "Immune System Support", description: "Quercetin plays a role in supporting the body's natural defense mechanisms and maintaining immune function" },
    { icon: "🌿", title: "Antioxidant Properties", description: "Contains compounds that may help protect cells from oxidative stress caused by free radicals" },
    { icon: "💪", title: "Overall Wellness", description: "Comprehensive formula designed to support general well-being and daily vitality" },
    { icon: "🔬", title: "Bioavailability Enhancement", description: "Enriched with BioPerine black pepper extract to help improve nutrient absorption" },
  ],
  ingredients: [
    { name: "Quercetin Extract", amount: "500 mg", description: "A flavonoid that supports immune function and provides antioxidant properties" },
    { name: "Bromelain", amount: "150 mg", description: "An enzyme that may support digestive health and overall wellness" },
    { name: "Zinc", amount: "30 mg", description: "An essential mineral that plays a role in immune system function" },
    { name: "Vitamin C", amount: "500 mg", description: "A water-soluble vitamin important for immune support and antioxidant activity" },
    { name: "Vitamin D3", amount: "125 mcg", description: "Supports immune system function and overall health" },
    { name: "Elderberry Extract", amount: "100 mg", description: "Traditional botanical that has been used to support wellness" },
    { name: "Echinacea Extract", amount: "300 mg", description: "Herbal extract traditionally used to support immune health" },
    { name: "Black Pepper Extract (BioPerine)", amount: "5 mg", description: "Enhances the bioavailability and absorption of other nutrients" },
  ],
  faq: [
    { question: "How many capsules should I take daily?", answer: "Take three (3) capsules daily with a meal and 8 oz of water. Each serving provides 15,635 mg equivalent of active ingredients." },
    { question: "Who is this supplement designed for?", answer: "This supplement is crafted for individuals seeking to support their well-being, including seniors, frequent travelers, and those with busy lifestyles who want comprehensive immune support." },
    { question: "How long should I take this supplement?", answer: "For optimal results, consistently take the supplement for 60 days along with maintaining a good diet, exercise, and regular sleep schedule." },
    { question: "Are these capsules suitable for vegans?", answer: "Yes, these are vegan capsules made without animal-derived ingredients." },
    { question: "What makes this a 28-in-1 formula?", answer: "This comprehensive formula contains 28 different ingredients including key compounds like Quercetin, Bromelain, vitamins, minerals, and a proprietary blend of herbal extracts." },
    { question: "Can I take this with other supplements?", answer: "While this is a natural supplement, it's always best to consult with your healthcare provider before combining with other supplements or medications." },
  ],
  chatbotContext: `You are a helpful assistant for PrimeMD's 28-in-1 Quercetin with Bromelain supplement. This is a dietary supplement designed to support immune function and overall wellness. IMPORTANT COMPLIANCE RULES: 1) Never make disease claims - do not say this product treats, cures, prevents, or diagnoses any disease. 2) Always recommend consulting a healthcare provider for medical concerns. 3) Focus on general wellness and immune support benefits only. 4) Do not provide medical advice. 5) Emphasize this product supports normal immune function as part of a healthy lifestyle. The product contains 28 ingredients including Quercetin, Bromelain, Zinc, Vitamin C, Vitamin D3, and Elderberry in a vegan capsule formula.`,
  suggestedPrompts: [
    "What ingredients are in this 28-in-1 formula?",
    "How should I take this quercetin supplement?",
    "What makes quercetin and bromelain work well together?",
    "Is this suitable for people with dietary restrictions?",
  ],
  formulaSynergy: {
    summary: "This formula combines immune-supporting nutrients with bioavailability enhancers for comprehensive wellness support.",
    interactions: [
      {
        ingredients: ["Quercetin", "Bromelain"],
        relationship: "Bromelain may enhance the absorption and bioavailability of quercetin",
        bottomLine: "Bromelain helps your body better absorb and use the quercetin",
        explanation: "Bromelain, a proteolytic enzyme, can help break down proteins and may improve the absorption of flavonoids like quercetin across the intestinal barrier, potentially increasing bioavailability and effectiveness.",
      },
      {
        ingredients: ["Vitamin C", "Zinc"],
        relationship: "Both nutrients work synergistically to support immune cell function",
        bottomLine: "Vitamin C and zinc work as a team to support your immune system",
        explanation: "Vitamin C enhances the absorption of zinc and both nutrients are essential cofactors for immune cell development, function, and communication within the immune system.",
      },
      {
        ingredients: ["Black Pepper Extract", "All Active Ingredients"],
        relationship: "BioPerine enhances the bioavailability of multiple nutrients simultaneously",
        bottomLine: "Black pepper extract helps your body absorb more of all the beneficial ingredients",
        explanation: "Piperine in black pepper extract inhibits certain enzymes that break down nutrients, allowing for increased absorption of vitamins, minerals, and plant compounds across the digestive tract.",
      }
    ],
  },
  resultsTimeline: {
    summary: "Immune support supplements work gradually as nutrients build up in your system over consistent use.",
    stages: [
      { period: "Week 1", title: "Initial Adaptation", physiological: "Body begins absorbing and utilizing the nutrients, with antioxidant compounds starting to circulate", noticeable: "You may not notice dramatic changes yet as the body is building nutrient levels", advice: "This is normal - stay consistent with daily dosing and focus on maintaining healthy lifestyle habits" },
      { period: "Month 1-2", title: "Building Foundation", physiological: "Nutrient levels stabilize and immune system components receive consistent support from vitamins and minerals", noticeable: "You may start feeling more balanced and energetic as part of overall wellness", advice: "Continue consistent use - immune support works best with long-term consistency rather than short-term use" },
      { period: "Month 3+", title: "Sustained Support", physiological: "Optimal nutrient levels maintained, supporting ongoing immune function and antioxidant activity", noticeable: "Overall sense of wellness and vitality as part of a healthy lifestyle", advice: "This represents the full potential of consistent supplementation combined with good nutrition and lifestyle habits" }
    ],
  },
  featuredReviews: [
    { reviewerName: "[NEEDS REVIEW]", starRating: 5, reviewText: "[NEEDS REVIEW - no specific reviews provided in source material]", isVerifiedPurchase: true }
  ],
  negativeReviewFaq: [
    { question: "What should I do if I don't notice results right away?", answer: "Immune support supplements work gradually over time. For best results, take consistently for 60 days along with maintaining a healthy diet, regular exercise, and adequate sleep. Individual results may vary based on overall health and lifestyle factors.", sourceTheme: "Slow or no noticeable results" },
    { question: "Are the capsules difficult to swallow?", answer: "These are standard-sized vegan capsules. If you have difficulty swallowing pills, try taking them one at a time with plenty of water (8 oz recommended) and with food. You can also consult your healthcare provider about alternative methods.", sourceTheme: "Pill size or swallowing difficulty" },
    { question: "Can this supplement cause stomach upset?", answer: "This formula is designed to be gentle, but taking any supplement on an empty stomach may cause discomfort for some people. Always take with food as directed and start with the recommended dosage. If you experience persistent discomfort, consult your healthcare provider.", sourceTheme: "Digestive discomfort" }
  ],
  supportContacts: {
    website: { phone: "+1 424-256-1649", email: "hi@getprimemd.com" },
  },
};
