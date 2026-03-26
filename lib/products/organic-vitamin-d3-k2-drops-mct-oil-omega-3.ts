import { Product } from "../types";

export const organicVitaminD3K2DropsMctOilOmega3: Product = {
  slug: "organic-vitamin-d3-k2-drops-mct-oil-omega-3",
  name: "Organic Vitamin D3 K2 Drops with MCT Oil Omega 3",
  brand: "nusava",
  tagline: "Maximum strength liquid vitamin D3 and K2 formula with MCT oil and omega-3 for faster absorption and immune support.",
  heroImage: "/products/organic-vitamin-d3-k2-drops-mct-oil-omega-3.jpg",
  amazonUrl: "https://www.amazon.com/dp/B08CY92YHP",
  asin: "B08CY92YHP",
  colors: {
    primary: "#006341",
    accent: "#ff6b00",
    background: "#dff8ef",
  },
  trustBadges: [
    "USDA Organic",
    "Non-GMO",
    "Made in USA",
    "No Fillers",
    "GMP Certified",
  ],
  usageSteps: [
    { icon: "🫧", title: "Shake Well", detail: "Shake bottle well before each use to ensure proper mixing" },
    { icon: "💧", title: "Take One Full Dropper", detail: "Take 1 ml (one full dropper) daily by mouth or mix with 8 fl oz of water" },
    { icon: "⏰", title: "Take Consistently", detail: "Use daily for best results, preferably at the same time each day" },
  ],
  proTips: [
    "Mix with water if you find the natural taste too strong - chia seeds give it a slightly bitter, earthy flavor",
    "Store in a cool, dry place away from direct sunlight to maintain potency",
  ],
  benefits: [
    { icon: "🦴", title: "Bone Support", description: "Vitamin D3 helps with calcium absorption while K2 activates proteins that bind calcium to bones, supporting bone health and strength" },
    { icon: "❤️", title: "Heart Support", description: "Vitamin K2 plays a role in cardiovascular health by supporting proper calcium utilization in arteries" },
    { icon: "💪", title: "Muscle Function", description: "Vitamin D3 supports muscle strength and function as part of normal physiological processes" },
    { icon: "🛡️", title: "Immune Support", description: "Vitamin D3 plays an important role in immune system function and response" },
    { icon: "⚡", title: "Energy Support", description: "MCT oil provides readily available energy for daily wellness and vitality" },
  ],
  ingredients: [
    { name: "Vitamin D3", amount: "125 mcg (5000 IU)", description: "Supports calcium absorption and immune function" },
    { name: "Vitamin K2", amount: "120 mcg", description: "Helps activate proteins that bind calcium to bones" },
    { name: "Omega-3", amount: "250 mg", description: "Supports various bodily functions including cardiovascular health" },
    { name: "MCT Oil", amount: "", description: "Provides quick energy and supports absorption of fat-soluble vitamins" },
  ],
  faq: [
    { question: "How should I take these drops?", answer: "Take one full dropper (1 ml) daily. You can take it directly by mouth or mix it with your favorite beverage. Shake well before use." },
    { question: "How long before I see results?", answer: "We recommend maintaining consistent usage for 60 days. Results may vary depending on overall health, lifestyle, and genetic factors." },
    { question: "What does it taste like?", answer: "This unflavored version has a natural, slightly bitter taste from the chia seeds. You can mix it with 8 fl oz of water to reduce the intensity." },
    { question: "Can I take this with other supplements?", answer: "As with any addition to your wellness routine, it's best to consult your physician to ensure it aligns with your current supplement regimen." },
    { question: "Is this suitable for people with dietary restrictions?", answer: "This product is organic, non-GMO, and contains no fillers. However, consult your healthcare provider if you have specific dietary concerns or allergies." },
    { question: "Why is this better than capsules?", answer: "Liquid drops are absorbed faster than capsules and allow for more precise dosing. The oil-based formula supports better absorption of fat-soluble vitamins D3 and K2." },
  ],
  chatbotContext: `This is a USDA organic liquid vitamin D3 and K2 supplement with MCT oil and omega-3. Each serving provides 5000 IU vitamin D3 and 120 mcg vitamin K2. COMPLIANCE RULES: Never make disease claims. Always recommend consulting healthcare providers. Only discuss general wellness benefits. Statements have not been evaluated by FDA. Not intended to diagnose, treat, cure, or prevent any disease.`,
  suggestedPrompts: [
    "What's the difference between D3 and K2?",
    "How do I reduce the bitter taste?",
    "Can I take this if I'm already taking calcium?",
    "What time of day should I take vitamin D3?",
  ],
  formulaSynergy: {
    summary: "Vitamin D3 and K2 work synergistically to support proper calcium utilization, while MCT oil enhances absorption of these fat-soluble vitamins.",
    interactions: [
      {
        ingredients: ["Vitamin D3", "Vitamin K2"],
        relationship: "D3 increases calcium absorption while K2 activates proteins that direct calcium to bones rather than soft tissues",
        bottomLine: "They work as a team - D3 helps you absorb calcium, K2 makes sure it goes to the right places in your body",
        explanation: "Vitamin D3 enhances intestinal calcium absorption, but without adequate K2, this calcium may not be properly utilized. K2 activates matrix Gla protein (MGP) and osteocalcin, proteins that help direct calcium to bones and teeth while preventing arterial calcification.",
      },
      {
        ingredients: ["Fat-soluble vitamins", "MCT Oil"],
        relationship: "MCT oil provides the fat medium necessary for optimal absorption of vitamins D3 and K2",
        bottomLine: "The MCT oil acts like a delivery system, helping your body absorb the vitamins more effectively",
        explanation: "Vitamins D3 and K2 are fat-soluble vitamins that require dietary fat for absorption. MCT oil provides medium-chain triglycerides that are easily absorbed and create an optimal environment for fat-soluble vitamin uptake in the small intestine.",
      }
    ],
  },
  resultsTimeline: {
    summary: "Vitamin D3 and K2 work gradually in the body, with absorption beginning immediately but noticeable wellness effects typically developing over weeks to months of consistent use.",
    stages: [
      { period: "Week 1", title: "Initial Absorption", physiological: "Vitamin D3 begins converting to its active form, and K2 starts activating calcium-binding proteins", noticeable: "You may not notice dramatic changes yet - this is normal as these vitamins work gradually", advice: "Focus on taking it consistently at the same time each day to build the habit" },
      { period: "Month 1-2", title: "System Integration", physiological: "Vitamin D levels in blood begin to optimize, and calcium utilization pathways become more efficient", noticeable: "Some people report feeling more energetic or notice improved overall wellness", advice: "Continue consistent daily use - individual responses vary based on starting vitamin D levels and overall health" },
      { period: "Month 3+", title: "Long-term Benefits", physiological: "Sustained optimal vitamin D and K2 levels support ongoing bone metabolism and calcium homeostasis", noticeable: "Benefits are often subtle but support long-term bone and cardiovascular wellness", advice: "Consider periodic blood testing with your healthcare provider to monitor vitamin D levels" }
    ],
  },
  featuredReviews: [

  ],
  negativeReviewFaq: [
    { question: "What if I don't like the taste?", answer: "The unflavored version has a natural, slightly bitter taste from the chia seeds. Try mixing one full dropper with 8 fl oz of water to dilute the flavor. You can also explore our strawberry and vanilla flavored options.", sourceTheme: "Taste complaints" },
    { question: "What if I don't feel any different after a few weeks?", answer: "Vitamin D3 and K2 work gradually in your body, and benefits are often subtle. We recommend consistent use for 60 days. Many benefits like bone and immune support happen at the cellular level and may not be immediately noticeable.", sourceTheme: "Slow or unnoticeable results" },
    { question: "What if the dropper seems difficult to use?", answer: "Make sure to shake the bottle well before use, as the ingredients can settle. Fill the dropper completely for the full 1 ml dose. If you're having trouble, you can also measure 1 ml using a small measuring spoon.", sourceTheme: "Product delivery mechanism issues" }
  ],
  supportContacts: {
    website: { phone: "+1 415-800-4758", email: "hello@getnusava.com" },
  },
};
