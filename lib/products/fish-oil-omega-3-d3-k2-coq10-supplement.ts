import { Product } from "../types";

export const fishOilOmega3D3K2Coq10Supplement: Product = {
  slug: "fish-oil-omega-3-d3-k2-coq10-supplement",
  name: "4-in-1 Fish Oil Omega 3 with D3, K2 & CoQ10",
  brand: "primemd",
  tagline: "Complete omega-3 formula with heart, brain, and bone support in lemon-flavored softgels.",
  heroImage: "/products/fish-oil-omega-3-d3-k2-coq10-supplement.jpg",
  amazonUrl: "https://www.amazon.com/dp/B0CS6W58MV",
  asin: "B0CS6W58MV",
  colors: {
    primary: "#5f6360",
    accent: "#116dff",
    background: "#f8f9fa",
  },
  trustBadges: [
    "3rd Party Tested",
    "Heavy Metal Tested",
    "GMO Free",
    "Gluten Free",
    "Dairy Free",
  ],
  usageSteps: [
    { icon: "💊", title: "Take 2 Softgels Daily", detail: "Take 2 softgels per day with a meal for optimal absorption" },
    { icon: "💧", title: "Drink Water", detail: "Take with 8 oz of water to help with swallowing and digestion" },
    { icon: "🕐", title: "Stay Consistent", detail: "Take consistently for 60 days for optimal results" },
  ],
  proTips: [
    "Take with a meal containing healthy fats to maximize omega-3 absorption",
    "Store in a cool, dry place to maintain freshness and potency",
    "Consistent daily use is key - set a daily reminder to build the habit",
  ],
  benefits: [
    { icon: "🧠", title: "Brain Function Support", description: "Omega-3 fatty acids EPA and DHA play important roles in brain health and cognitive function, while CoQ10 supports cellular energy production in brain cells." },
    { icon: "❤️", title: "Heart Health Support", description: "EPA and DHA omega-3s are well-researched for their role in supporting cardiovascular health, while CoQ10 helps support heart muscle energy needs." },
    { icon: "🦴", title: "Bone & Joint Health", description: "Vitamin D3 aids calcium absorption while Vitamin K2 helps direct calcium to bones where it's needed, supporting bone and joint health." },
    { icon: "⚡", title: "Cellular Energy Support", description: "CoQ10 plays a crucial role in cellular energy production, supporting overall vitality and energy levels at the cellular level." },
    { icon: "🛡️", title: "Immune System Support", description: "Omega-3 fatty acids and Vitamin D3 both play important roles in supporting healthy immune system function." },
  ],
  ingredients: [
    { name: "Fish Oil Concentrate", amount: "2000 mg", description: "Provides EPA and DHA omega-3 fatty acids for heart, brain, and overall health support" },
    { name: "EPA (Eicosapentaenoic Acid)", amount: "600 mg", description: "Important omega-3 fatty acid that supports heart health and inflammatory response" },
    { name: "DHA (Docosahexaenoic Acid)", amount: "400 mg", description: "Essential omega-3 fatty acid crucial for brain health and cognitive function" },
    { name: "Vitamin K2 (as Menaquinone)", amount: "140 mcg", description: "Works with D3 to support proper calcium utilization and bone health" },
    { name: "Coenzyme Q10 (CoQ10)", amount: "100 mg", description: "Supports cellular energy production and heart health" },
  ],
  faq: [
    { question: "How many softgels should I take daily?", answer: "Take 2 softgels daily with a meal and 8 oz of water. This provides the full 2100mg serving of active ingredients." },
    { question: "Will these softgels have a fishy taste or smell?", answer: "No, these are lemon-flavored softgels designed to eliminate the fishy taste and aftertaste commonly associated with fish oil supplements." },
    { question: "Is this supplement safe for people with dietary restrictions?", answer: "Yes, this supplement is free from dairy and gluten. However, it does contain fish oil, so it's not suitable for those with fish allergies." },
    { question: "How long will one bottle last?", answer: "Each bottle contains 120 softgels, which provides a 60-day supply when taking the recommended 2 softgels daily." },
    { question: "What makes this different from regular fish oil supplements?", answer: "This is a 4-in-1 formula that combines omega-3 fish oil with Vitamin D3, K2, and CoQ10 in one convenient softgel, eliminating the need for multiple supplements." },
    { question: "Are these supplements third-party tested?", answer: "Yes, these supplements are third-party tested for purity and are specifically tested for heavy metals to ensure safety and quality." },
    { question: "Can I take this with other medications?", answer: "While this is a natural supplement, you should consult with your healthcare provider before starting any new supplement, especially if you take medications or have health conditions." },
  ],
  chatbotContext: `You are a helpful assistant for PrimeMD's 4-in-1 Fish Oil Omega 3 supplement. This product contains fish oil with EPA/DHA, Vitamin D3, Vitamin K2, and CoQ10. COMPLIANCE RULES: Never make disease claims or suggest this product can treat, cure, or prevent any medical condition. Always recommend consulting healthcare providers for medical advice. Focus on general wellness support and the roles these nutrients play in normal body functions. Emphasize this is a dietary supplement, not medicine.`,
  suggestedPrompts: [
    "What makes this 4-in-1 formula better than taking separate supplements?",
    "How do Vitamin D3 and K2 work together in this formula?",
    "What's the best time of day to take these omega-3 softgels?",
    "How long before I might notice benefits from this supplement?",
  ],
  formulaSynergy: {
    summary: "This 4-in-1 formula combines complementary nutrients that work together to support heart, brain, bone, and cellular health more effectively than individual supplements alone.",
    interactions: [
      {
        ingredients: ["Vitamin D3", "Vitamin K2"],
        relationship: "Vitamin D3 enhances calcium absorption while K2 directs calcium to bones rather than soft tissues",
        bottomLine: "D3 and K2 work as a team to make sure calcium goes where your body needs it most - your bones.",
        explanation: "Vitamin D3 increases calcium absorption in the intestines, but without adequate K2, this calcium may be deposited in soft tissues rather than bones. K2 activates proteins like osteocalcin and matrix Gla protein that direct calcium to bones and away from arteries.",
      },
      {
        ingredients: ["EPA/DHA", "CoQ10"],
        relationship: "Omega-3s support heart health while CoQ10 provides energy support for heart muscle function",
        bottomLine: "Omega-3s and CoQ10 support your heart from different angles - structure and energy production.",
        explanation: "EPA and DHA support cardiovascular health through multiple mechanisms including supporting healthy inflammatory responses and cell membrane fluidity. CoQ10 is essential for cellular energy production, particularly in energy-demanding tissues like the heart muscle.",
      },
      {
        ingredients: ["Fish Oil", "Vitamin D3"],
        relationship: "Both nutrients support immune system function through complementary pathways",
        bottomLine: "Fish oil and Vitamin D3 both play important roles in keeping your immune system balanced and healthy.",
        explanation: "Omega-3 fatty acids help regulate immune responses and support resolution of inflammatory processes, while Vitamin D3 supports adaptive and innate immune function through its effects on immune cell differentiation and function.",
      }
    ],
  },
  resultsTimeline: {
    summary: "Most people begin experiencing benefits within the first month, with continued improvements over 2-3 months of consistent daily use.",
    stages: [
      { period: "Week 1-2", title: "Initial Adaptation", physiological: "Body begins incorporating omega-3s into cell membranes and building up fat-soluble vitamin levels", noticeable: "You may notice easier digestion and no fishy aftertaste thanks to the lemon flavoring", advice: "Results take time - focus on taking consistently with meals as your body builds up nutrient levels" },
      { period: "Month 1-2", title: "Building Benefits", physiological: "Omega-3 levels in blood and tissues increase, vitamin D3 and K2 levels optimize, CoQ10 supports cellular energy production", noticeable: "You may begin to notice improved energy levels and overall sense of wellbeing", advice: "This is when many people start feeling the benefits - continue consistent daily use for best results" },
      { period: "Month 3+", title: "Sustained Support", physiological: "Optimal tissue levels of all nutrients achieved, supporting ongoing heart, brain, bone, and cellular health", noticeable: "Peak benefits typically achieved with continued energy support and overall wellness", advice: "Maintain consistent daily use to preserve optimal nutrient levels and continued health support" }
    ],
  },
  featuredReviews: [
    { reviewerName: "Sarah M.", starRating: 5, reviewText: "Love that this combines everything I was taking separately. The lemon flavor really works - no fishy taste at all!", isVerifiedPurchase: true },
    { reviewerName: "Mike R.", starRating: 5, reviewText: "Great value for a 4-in-1 supplement. Easy to swallow and no stomach upset when taken with food.", isVerifiedPurchase: true },
    { reviewerName: "Jennifer K.", starRating: 4, reviewText: "Quality supplement with good ingredient amounts. Noticed improved energy after about 3 weeks of consistent use.", isVerifiedPurchase: true }
  ],
  negativeReviewFaq: [
    { question: "What if I don't notice results right away?", answer: "It's completely normal for supplements to take 4-8 weeks to show noticeable benefits. Your body needs time to build up optimal nutrient levels. Make sure you're taking 2 softgels daily with food consistently, and give it at least a month before evaluating results.", sourceTheme: "slow or no results" },
    { question: "Are the softgels too large or hard to swallow?", answer: "While everyone's comfort level is different, these softgels are designed to be easy to swallow. Try taking them with plenty of water (8 oz) and with food. The smooth coating should help them go down easily. If you still have trouble, you can try taking them one at a time.", sourceTheme: "pill size concerns" },
    { question: "What if I experience stomach upset?", answer: "Fish oil supplements are best tolerated when taken with food, which helps with absorption and reduces any potential stomach discomfort. Try taking them with your largest meal of the day. If sensitivity continues, you might try taking one softgel with breakfast and one with dinner instead of both at once.", sourceTheme: "digestive issues" }
  ],
  supportContacts: {
    website: { phone: "+1 424-256-1649", email: "hi@getprimemd.com" },
  },
};
