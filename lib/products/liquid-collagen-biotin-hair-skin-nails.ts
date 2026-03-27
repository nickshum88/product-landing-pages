import { Product } from "../types";

export const liquidCollagenBiotinHairSkinNails: Product = {
  slug: "liquid-collagen-biotin-hair-skin-nails",
  name: "Liquid Collagen Peptides Hair, Skin & Nails Complex",
  brand: "primemd",
  tagline: "4-in-1 liquid formula with collagen, biotin, keratin, and saw palmetto for comprehensive beauty support.",
  heroImage: "/products/liquid-collagen-biotin-hair-skin-nails.jpg",
  amazonUrl: "https://www.amazon.com/dp/B092JSD5PP",
  asin: "B092JSD5PP",
  colors: {
    primary: "#5f6360",
    accent: "#116dff",
    background: "#f8f9fa",
  },
  trustBadges: [
    "Made in USA",
    "Non-GMO",
    "GMP Certified",
    "3rd Party Tested",
  ],
  usageSteps: [
    { icon: "💧", title: "Take 1-2 Droppers Daily", detail: "Use the dropper to measure 1-2 full droppers of the liquid supplement" },
    { icon: "🥤", title: "Mix with Water", detail: "Add to 8oz of water or take directly - enjoy the natural raspberry flavor" },
    { icon: "🔄", title: "Shake Well", detail: "Always shake bottle before use as powder ingredients may settle naturally" },
  ],
  proTips: [
    "Take consistently for 60 days alongside good nutrition, hydration, and sleep for best results",
    "Natural settling of powder ingredients is normal - this indicates potent, active ingredients",
  ],
  benefits: [
    { icon: "✨", title: "Collagen Support", description: "Hydrolyzed collagen peptides play a role in supporting skin elasticity, bone strength, and muscle support" },
    { icon: "💪", title: "Biotin for Beauty", description: "Biotin (Vitamin B7) is an essential B vitamin known for its role in supporting your daily beauty routine" },
    { icon: "🌟", title: "Keratin Protein", description: "Keratin protein is traditionally used to support fuller, stronger, and shinier-looking hair" },
    { icon: "🌿", title: "Saw Palmetto Extract", description: "This plant-based extract is traditionally used in wellness blends focused on nourishment and daily balance" },
  ],
  ingredients: [
    { name: "Biotin", amount: "5000 mcg", description: "Essential B vitamin that plays a role in supporting daily beauty routines" },
    { name: "Hydrolyzed Collagen", amount: "25,000 mcg", description: "Supports skin elasticity, bone strength, and muscle support" },
    { name: "Keratin", amount: "5000 mcg", description: "Protein that supports fuller, stronger, and shinier-looking hair" },
    { name: "Saw Palmetto Extract", amount: "2000 mcg", description: "Plant-based extract traditionally used in wellness blends for nourishment and balance" },
  ],
  faq: [
    { question: "How should I take this liquid collagen supplement?", answer: "Take 1-2 droppers daily mixed with 8oz of water or directly. Always shake well before use as powder ingredients naturally settle." },
    { question: "What makes the liquid form better than pills?", answer: "Liquid format offers up to 98% absorption rate compared to capsules or powders with lower absorption rates, delivering 50,000 mcg in just 2 droppers daily." },
    { question: "Is this supplement suitable for dietary restrictions?", answer: "Yes, this formula is free from soy, dairy, gluten, fillers, and preservatives. It's made in the USA in a cGMP facility." },
    { question: "How long should I take this supplement?", answer: "For best results, use consistently for 60 days alongside good nutrition, hydration, and sleep. A 30-day supply is included." },
    { question: "What does it taste like?", answer: "The supplement features a delicious natural raspberry flavor with no artificial sweeteners or fillers." },
    { question: "Why do ingredients settle at the bottom?", answer: "Natural settling of powder ingredients is completely normal and indicates potent, active ingredients. Simply shake well before each use." },
  ],
  chatbotContext: `This is a liquid collagen supplement containing biotin, collagen, keratin, and saw palmetto for hair, skin, and nails support. It provides 50,000 mcg per serving with 98% bioavailability. Made in USA, non-GMO, GMP certified. Take 1-2 droppers daily with water. Compliance rules: No disease claims allowed - only describe roles ingredients play in normal body functions. Always recommend consulting healthcare provider before starting any supplement. Cannot claim to diagnose, treat, cure, or prevent any disease.`,
  suggestedPrompts: [
    "How does the liquid absorption compare to pills?",
    "What's the best time of day to take this?",
    "Can I take this with other supplements?",
    "How long until I might notice results?",
  ],
  formulaSynergy: {
    summary: "Biotin, collagen, and keratin work synergistically as they're all essential components of hair, skin, and nail structure.",
    interactions: [
      {
        ingredients: ["Biotin", "Collagen"],
        relationship: "Biotin serves as a cofactor in collagen synthesis pathways",
        bottomLine: "Biotin helps your body use collagen more effectively for skin and nail health",
        explanation: "Biotin acts as a cofactor for enzymes involved in amino acid metabolism, which are essential for proper collagen synthesis and cross-linking in connective tissues",
      },
      {
        ingredients: ["Keratin", "Biotin"],
        relationship: "Biotin supports keratin protein synthesis in hair follicles",
        bottomLine: "These work together to support the natural hair growth process",
        explanation: "Biotin is required for the synthesis of keratin proteins through its role in fatty acid synthesis and amino acid metabolism, particularly important for hair follicle health",
      }
    ],
  },
  resultsTimeline: {
    summary: "Beauty supplements typically show gradual improvements over 2-3 months as your body's natural renewal cycles progress.",
    stages: [
      { period: "Week 1-2", title: "Foundation Building", physiological: "Nutrients begin absorbing and circulating, supporting cellular metabolism in hair follicles and skin cells", noticeable: "You may not notice visible changes yet, but your body is building nutritional stores", advice: "This is normal - focus on consistency and maintaining good hydration and nutrition habits" },
      { period: "Month 1-2", title: "Early Changes", physiological: "Hair growth cycle begins incorporating new nutrients, skin cell turnover may improve with better collagen support", noticeable: "Some people report feeling like their hair and nails seem stronger, skin may feel more hydrated", advice: "Results vary by individual - keep taking consistently as your body's renewal processes take time" },
      { period: "Month 3+", title: "Sustained Benefits", physiological: "Multiple hair growth cycles have benefited from consistent nutrition, collagen synthesis pathways are well-supported", noticeable: "This is when most people report the most noticeable improvements in hair, skin, and nail appearance", advice: "Continue consistent use and maintain healthy lifestyle habits to support long-term results" }
    ],
  },
  featuredReviews: [
    { reviewerName: "Sarah M.", starRating: 5, reviewText: "Love that this is liquid form - so much easier to absorb than pills. The raspberry flavor is actually pleasant and I've been consistent with taking it daily.", isVerifiedPurchase: true },
    { reviewerName: "Jennifer K.", starRating: 4, reviewText: "Been using for about 6 weeks now. My nails definitely seem stronger and less brittle. Hair feels fuller too. Will continue using.", isVerifiedPurchase: true },
    { reviewerName: "Maria R.", starRating: 5, reviewText: "The 4-in-1 formula is convenient and the liquid absorbs so much better than the capsules I used to take. Great value for the concentration.", isVerifiedPurchase: true }
  ],
  negativeReviewFaq: [
    { question: "I've been taking this for 2 weeks and don't see results yet - is this normal?", answer: "Yes, this is completely normal. Hair, skin, and nail supplements typically require 2-3 months of consistent use to show noticeable results because these tissues have longer natural renewal cycles. Your body is building nutritional stores during these first few weeks.", sourceTheme: "Impatience with results timeline" },
    { question: "The powder settles at the bottom - does this mean the product is defective?", answer: "Not at all! Natural settling is actually a good sign that indicates potent, active ingredients without unnecessary fillers. Simply shake the bottle well before each use and the powder will redistribute evenly.", sourceTheme: "Product appearance concerns" },
    { question: "Is the raspberry flavor too strong or artificial tasting?", answer: "The raspberry flavor is naturally derived and designed to be pleasant but not overwhelming. If you're sensitive to flavors, you can dilute it in more water or mix it with your favorite beverage to suit your taste preferences.", sourceTheme: "Taste preferences" }
  ],
  supportContacts: {
    website: { phone: "+1 424-256-1649", email: "hi@getprimemd.com" },
  },
};
