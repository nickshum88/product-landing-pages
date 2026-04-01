import { Product } from "../types";

export const fishOilOmega3D3K2Coq10: Product = {
  slug: "fish-oil-omega-3-d3-k2-coq10",
  name: "4-in-1 Fish Oil Omega 3 Fatty Supplements (2100mg)",
  brand: "primemd",
  tagline: "Complete omega-3 formula with D3, K2, and CoQ10 for heart, brain, and bone support.",
  heroImage: "/products/fish-oil-omega-3-d3-k2-coq10.jpg",
  amazonUrl: "https://www.amazon.com/dp/B0CS6W58MV",
  asin: "B0CS6W58MV",
  colors: {
    primary: "#5f6360",
    accent: "#116dff",
    background: "#f8f9fa",
  },
  trustBadges: [
    "GMO Free",
    "3rd Party Tested",
    "Heavy Metal Tested",
    "Globally Sourced Ingredients",
  ],
  usageSteps: [
    { icon: "💊", title: "Take 2 Softgels Daily", detail: "Take 2 softgels per day with a meal and 8 oz of water" },
    { icon: "🍽️", title: "With Food", detail: "Best absorbed when taken with a meal containing healthy fats" },
    { icon: "⏰", title: "Stay Consistent", detail: "Take daily for 60 days with good diet, exercise, and regular sleep for optimal results" },
  ],
  proTips: [
    "Lemon-finished softgels eliminate fishy aftertaste and burps",
    "Take with your largest meal of the day for maximum absorption",
    "Store in a cool, dry place to maintain freshness and potency",
  ],
  benefits: [
    { icon: "🧠", title: "Brain Function Support", description: "EPA and DHA omega-3 fatty acids play important roles in cognitive function and mental clarity" },
    { icon: "❤️", title: "Heart Health", description: "Omega-3s and CoQ10 work together to support cardiovascular health and cellular energy production" },
    { icon: "🦴", title: "Bone & Joint Health", description: "Vitamins D3 and K2 support calcium absorption and utilization for healthy bones and mobility" },
    { icon: "🛡️", title: "Immune System Support", description: "Omega-3 fatty acids and vitamin D3 contribute to normal immune system function" },
  ],
  ingredients: [
    { name: "Fish Oil Concentrate", amount: "2000 mg", description: "Rich source of EPA and DHA omega-3 fatty acids for heart and brain health" },
    { name: "Omega-3 Fatty Acids", amount: "1100 mg", description: "Essential fatty acids that support cardiovascular and cognitive function" },
    { name: "EPA", amount: "600 mg", description: "Eicosapentaenoic acid supports heart health and inflammatory response" },
    { name: "DHA", amount: "400 mg", description: "Docosahexaenoic acid crucial for brain function and development" },
    { name: "Vitamin D", amount: "140 mg", description: "Supports calcium absorption and immune system function" },
    { name: "Vitamin K2 (as menaquinone)", amount: "140 mcg", description: "Works with D3 to direct calcium to bones and away from arteries" },
    { name: "Coenzyme Q10 (CoQ10)", amount: "100 mg", description: "Supports cellular energy production and heart health" },
  ],
  faq: [
    { question: "How many softgels should I take daily?", answer: "Take 2 softgels per day with a meal and 8 oz of water. Each 2-softgel serving provides 2100mg of total active ingredients." },
    { question: "Will these softgels have a fishy taste or cause burps?", answer: "No, our softgels are lemon-finished to eliminate fishy taste and prevent fishy burps or aftertaste." },
    { question: "Is this product free from common allergens?", answer: "Yes, this supplement is free from dairy and gluten. It's also made without fillers." },
    { question: "How long will one bottle last?", answer: "Each bottle contains 120 softgels, providing a 60-day supply when taking the recommended 2 softgels daily." },
    { question: "What makes this different from regular fish oil?", answer: "This is a 4-in-1 formula that combines omega-3 fish oil with vitamins D3, K2, and CoQ10 for comprehensive support of heart, brain, bones, and cellular energy." },
    { question: "Are these tested for purity?", answer: "Yes, all softgels are third-party tested for heavy metals to ensure purity and quality." },
  ],
  chatbotContext: `This is a 4-in-1 fish oil supplement containing omega-3 fatty acids, vitamins D3 and K2, and CoQ10. It supports heart, brain, bone, and immune health. Take 2 softgels daily with food. COMPLIANCE RULES: Never make disease claims. Always recommend consulting healthcare providers. Focus on nutritional support, not treatment. Do not diagnose or prescribe.`,
  suggestedPrompts: [
    "What makes this 4-in-1 formula different from regular fish oil?",
    "How do vitamins D3 and K2 work together in this supplement?",
    "When is the best time to take these softgels for maximum absorption?",
    "Why is CoQ10 included with the omega-3s in this formula?",
  ],
  formulaSynergy: {
    summary: "This 4-in-1 formula combines complementary nutrients that work together to support cardiovascular health, bone metabolism, and cellular energy production.",
    interactions: [
      {
        ingredients: ["Vitamin D3", "Vitamin K2"],
        relationship: "Vitamin D3 enhances calcium absorption while K2 directs calcium to bones and away from soft tissues",
        bottomLine: "D3 and K2 work as a team to make sure calcium goes where it should - to your bones, not your arteries",
        explanation: "Vitamin D3 increases intestinal calcium absorption by upregulating calcium-binding proteins. Vitamin K2 activates matrix Gla protein and osteocalcin, which direct calcium to bone tissue while preventing arterial calcification.",
      },
      {
        ingredients: ["Omega-3 Fatty Acids", "CoQ10"],
        relationship: "Omega-3s support heart health while CoQ10 provides cellular energy for optimal cardiovascular function",
        bottomLine: "Omega-3s keep your heart healthy while CoQ10 gives your heart cells the energy they need to pump strong",
        explanation: "EPA and DHA omega-3s support endothelial function and healthy inflammatory responses in cardiovascular tissue. CoQ10 is essential for mitochondrial ATP production in cardiac muscle cells, supporting optimal heart muscle function.",
      }
    ],
  },
  resultsTimeline: {
    summary: "Benefits may be noticed within weeks for some, but optimal results typically develop over 2-3 months of consistent daily use.",
    stages: [
      { period: "Week 1-2", title: "Initial Adaptation", physiological: "Omega-3 levels begin to increase in cell membranes, vitamin D3 starts improving calcium absorption", noticeable: "Some people may notice improved digestion and no fishy aftertaste thanks to lemon flavoring", advice: "Results take time - focus on taking consistently with meals as your body adapts to the nutrients" },
      { period: "Month 1-2", title: "Building Benefits", physiological: "Cell membrane composition improves, vitamin K2 begins optimizing calcium utilization, CoQ10 supports cellular energy", noticeable: "May notice improved energy levels and overall sense of well-being", advice: "Continue daily use - nutrient levels are building but haven't reached optimal tissue saturation yet" },
      { period: "Month 3+", title: "Optimal Support", physiological: "Tissue levels of nutrients reach steady state, supporting optimal heart, brain, and bone function", noticeable: "Full benefits for cardiovascular health, cognitive function, and bone support", advice: "Maintain consistent use for continued benefits - these nutrients work best with long-term supplementation" }
    ],
  },
  featuredReviews: [
    // TODO: Add real customer reviews from Amazon listing
  ],
  negativeReviewFaq: [
    { question: "What if I don't notice results right away?", answer: "Omega-3 and fat-soluble vitamin benefits develop gradually over 2-3 months as tissue levels build up. Take consistently with meals and give your body time to reach optimal nutrient levels.", sourceTheme: "slow or no noticeable results" },
    { question: "Are the softgels too large or difficult to swallow?", answer: "Our softgels are designed to be easy-to-swallow and can be taken with 8 oz of water with a meal to make swallowing easier. The smooth gel coating helps them go down smoothly.", sourceTheme: "pill size concerns" },
    { question: "What if I'm sensitive to fish products?", answer: "Our fish oil is molecularly distilled and third-party tested for purity. Start with one softgel to assess tolerance, and consult your healthcare provider if you have known fish allergies.", sourceTheme: "fish sensitivity or allergies" }
  ],
  supportContacts: {
    website: { phone: "+1 424-256-1649", email: "hi@getprimemd.com" },
  },
};
