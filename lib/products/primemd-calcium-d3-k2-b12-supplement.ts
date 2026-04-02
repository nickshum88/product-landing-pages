import { Product } from "../types";

export const primemdCalciumD3K2B12Supplement: Product = {
  slug: "primemd-calcium-d3-k2-b12-supplement",
  name: "PrimeMD Extra Strength Calcium with D3, K2 & B12",
  brand: "primemd",
  tagline: "4-in-1 bone and heart support formula with enhanced calcium absorption",
  heroImage: "/products/primemd-calcium-d3-k2-b12-supplement.jpg",
  amazonUrl: "https://www.amazon.com/dp/B0CZ3P97BH",
  asin: "B0CZ3P97BH",
  colors: {
    primary: "#5f6360",
    accent: "#116dff",
    background: "#f8f9fa",
  },
  trustBadges: [
    "Vegan",
    "Gluten-Free",
    "Non-GMO",
    "GMP Certified",
    "3rd Party Lab Tested",
  ],
  usageSteps: [
    { icon: "🕐", title: "Take with meal", detail: "Take 2 tablets daily with a meal and a glass of water" },
    { icon: "⏰", title: "Consistent timing", detail: "Take at the same time each day for best results" },
    { icon: "📅", title: "Stay consistent", detail: "For optimal results, take for at least 60 days" },
  ],
  proTips: [
    "Take with vitamin C-rich foods to enhance calcium absorption",
    "Avoid taking with caffeine or high-fiber meals which can reduce absorption",
    "Split doses throughout the day if you take other calcium supplements",
  ],
  benefits: [
    { icon: "🦴", title: "Bone Health Support", description: "Calcium plays a vital role in building and maintaining strong bones and teeth throughout life" },
    { icon: "❤️", title: "Cardiovascular Support", description: "Vitamin K2 helps support proper calcium distribution and arterial flexibility" },
    { icon: "⚡", title: "Enhanced Absorption", description: "Vitamin D3 supports the body's ability to absorb and utilize calcium effectively" },
    { icon: "🧠", title: "Nerve Function", description: "Vitamin B12 plays a role in supporting healthy nerve function and overall well-being" },
  ],
  ingredients: [
    { name: "Calcium (Citrate & Carbonate)", amount: "1200mg", description: "Essential mineral for bone and muscle health, provided in two highly bioavailable forms" },
    { name: "Vitamin D3 (Cholecalciferol)", amount: "125mcg (5000 IU)", description: "Supports calcium absorption and immune system function" },
    { name: "Vitamin K2 (Menaquinone MK-7)", amount: "100mcg", description: "Helps direct calcium to bones and supports cardiovascular health" },
    { name: "Vitamin B12 (Methylcobalamin)", amount: "1000mcg", description: "Supports nerve function, energy metabolism, and overall well-being" },
  ],
  faq: [
    { question: "How many tablets should I take daily?", answer: "Take 2 tablets daily with a meal and a glass of water. Each serving provides 1200mg of calcium." },
    { question: "Is this supplement suitable for vegans?", answer: "Yes, this formula is vegan-friendly and contains no animal-derived ingredients." },
    { question: "Can I take this if I'm gluten sensitive?", answer: "Yes, this supplement is gluten-free and contains no fillers." },
    { question: "Why does this formula include both calcium citrate and carbonate?", answer: "This blend combines the superior absorption of citrate with the higher elemental calcium content of carbonate for optimal effectiveness." },
    { question: "How long should I take this supplement?", answer: "For optimal results, take consistently for at least 60 days. Consult your healthcare provider for long-term use recommendations." },
    { question: "What makes this different from regular calcium supplements?", answer: "This 4-in-1 formula includes D3 for absorption, K2 for proper calcium distribution, and B12 for nerve support - not just calcium alone." },
  ],
  chatbotContext: `This is PrimeMD's Extra Strength Calcium supplement with D3, K2, and B12. It's a 4-in-1 formula designed for bone and heart support. Key compliance rules: Never make disease claims. Always recommend consulting healthcare providers. Focus on nutritional support roles. The product contains 1200mg calcium per 2-tablet serving, 125mcg D3, 100mcg K2, and 1000mcg B12. It's vegan, gluten-free, and third-party tested. Take 2 tablets daily with meals.`,
  suggestedPrompts: [
    "What makes the 4-in-1 formula more effective than calcium alone?",
    "How do D3 and K2 work together with calcium?",
    "What's the difference between calcium citrate and carbonate?",
    "When is the best time to take calcium supplements?",
  ],
  formulaSynergy: {
    summary: "This 4-in-1 formula combines calcium with cofactors that optimize absorption, distribution, and utilization in the body.",
    interactions: [
      {
        ingredients: ["Calcium", "Vitamin D3"],
        relationship: "Vitamin D3 enhances intestinal calcium absorption by upregulating calcium-binding proteins",
        bottomLine: "D3 helps your body actually absorb the calcium instead of passing it through unused",
        explanation: "Vitamin D3 stimulates the production of calbindin, a calcium-binding protein in the intestines that facilitates calcium transport across the intestinal wall into the bloodstream.",
      },
      {
        ingredients: ["Calcium", "Vitamin K2"],
        relationship: "Vitamin K2 activates osteocalcin and matrix GLA protein to direct calcium to bones and away from soft tissues",
        bottomLine: "K2 acts like a traffic director, sending calcium to your bones where you want it, not your arteries where you don't",
        explanation: "K2 carboxylates osteocalcin, enabling it to bind calcium and incorporate it into bone matrix, while also activating matrix GLA protein which prevents calcium deposits in arterial walls.",
      },
      {
        ingredients: ["Vitamin D3", "Vitamin K2"],
        relationship: "D3 and K2 work synergistically - D3 increases calcium absorption while K2 ensures proper calcium utilization",
        bottomLine: "D3 and K2 are the perfect team - one gets calcium into your body, the other puts it in the right place",
        explanation: "This combination addresses both ends of calcium metabolism: D3 maximizes uptake while K2 optimizes distribution, preventing the calcium paradox where high intake leads to both deficiency and excess in wrong tissues.",
      }
    ],
  },
  resultsTimeline: {
    summary: "Calcium supplementation benefits build gradually as your body establishes better mineral balance and bone metabolism.",
    stages: [
      { period: "Week 1-2", title: "Initial Absorption", physiological: "Vitamin D3 begins upregulating calcium absorption proteins in the intestines, while K2 starts activating calcium-binding proteins", noticeable: "You likely won't notice dramatic changes yet, but your body is beginning to utilize calcium more effectively", advice: "Stay consistent with daily dosing - the foundation is being built even if you don't feel different yet" },
      { period: "Month 1-2", title: "Metabolic Optimization", physiological: "Improved calcium utilization supports bone remodeling processes, while K2 helps optimize calcium distribution away from soft tissues", noticeable: "Some people may notice improved energy levels from better B12 status and optimized mineral balance", advice: "Continue consistent use - bone and cardiovascular benefits develop gradually over months, not weeks" },
      { period: "Month 3+", title: "Long-term Support", physiological: "Sustained calcium availability supports ongoing bone maintenance and remodeling, while K2 provides continued cardiovascular protection", noticeable: "Benefits are primarily protective and long-term rather than immediately noticeable - this is normal for bone health supplements", advice: "The most important benefits are happening at the cellular level - trust the process and maintain consistency" }
    ],
  },
  featuredReviews: [
    { reviewerName: "Sarah M.", starRating: 5, reviewText: "Love that this has everything in one tablet - D3, K2, and B12 along with the calcium. Much easier than taking multiple supplements.", isVerifiedPurchase: true },
    { reviewerName: "Robert K.", starRating: 5, reviewText: "Been taking this for 3 months. Easy to swallow tablets and no stomach upset when taken with food. Good value for a 4-in-1 formula.", isVerifiedPurchase: true },
    { reviewerName: "Jennifer L.", starRating: 4, reviewText: "Appreciate that it's vegan and has both types of calcium. The tablets are a bit large but manageable with water.", isVerifiedPurchase: true }
  ],
  negativeReviewFaq: [
    { question: "I've been taking this for a few weeks but don't feel any different - is it working?", answer: "This is completely normal! Calcium and bone health supplements work at the cellular level to support long-term health. Unlike energy supplements, the benefits build gradually over months. The important work is happening even if you don't feel immediate changes. Stay consistent for at least 2-3 months to allow your body time to optimize calcium utilization.", sourceTheme: "No immediate noticeable effects" },
    { question: "The tablets seem quite large - are there any tips for taking them easier?", answer: "The tablets are larger because they contain 1200mg of calcium plus three other nutrients - that's a lot of active ingredients! Try taking them one at a time with plenty of water, or with a meal that includes some liquid like soup. Some customers find breaking them in half works well too (check with your healthcare provider first).", sourceTheme: "Large pill size complaints" },
    { question: "I sometimes forget to take both tablets - can I take them at different times?", answer: "Yes, you can split the dose if needed! Some people actually prefer taking one tablet in the morning and one in the evening to optimize absorption throughout the day. The key is getting your full daily dose of 2 tablets total, whether together or apart.", sourceTheme: "Dosing schedule difficulties" }
  ],
  supportContacts: {
    website: { phone: "+1 424-256-1649", email: "hi@getprimemd.com" },
  },
};
