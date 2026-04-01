import { Product } from "../types";

export const womensInositolComplexSupplement: Product = {
  slug: "womens-inositol-complex-supplement",
  name: "14-in-1 Women's Inositol Complex Supplement",
  brand: "medchoice",
  tagline: "40:1 Myo & D-Chiro Inositol with folate and botanicals for hormone and feminine wellness support.",
  heroImage: "/products/womens-inositol-complex-supplement.jpg",
  amazonUrl: "https://www.amazon.com/dp/B0DQNVXN2D",
  asin: "B0DQNVXN2D",
  colors: {
    primary: "#f5f5f5",
    accent: "#f3afb4",
    background: "#fbeaea",
  },
  trustBadges: [
    "Non-GMO",
    "Gluten-Free",
    "Made with Natural Ingredients",
    "GMP",
    "Lab Tested",
    "Vegan",
    "Caffeine-Free",
  ],
  usageSteps: [
    { icon: "🥄", title: "Take 2 capsules", detail: "Take 2 capsules twice daily with a meal and 8 oz of water" },
    { icon: "🍽️", title: "With meals", detail: "Take with food for better absorption and to avoid stomach upset" },
    { icon: "⏰", title: "Start gradually", detail: "If you have sensitivities, start with 2 capsules once daily for 30 days before increasing" },
  ],
  proTips: [
    "Start with one dose daily if new to inositol supplements",
    "Take consistently at the same times each day for best results",
    "Stay hydrated throughout the day when taking supplements",
  ],
  benefits: [
    { icon: "⚖️", title: "Hormone Balance Support", description: "Myo-Inositol and D-Chiro-Inositol play roles in supporting healthy hormone function and maintaining inner balance" },
    { icon: "💫", title: "Energy Production Support", description: "B vitamins and minerals support cellular energy metabolism and everyday wellness" },
    { icon: "🧠", title: "Clear Focus", description: "Botanical ingredients like Ashwagandha and Green Tea may support mental clarity and calm" },
    { icon: "💪", title: "Gentle Daily Support", description: "Well-tolerated mineral forms like magnesium glycinate provide gentle, everyday nutritional support" },
  ],
  ingredients: [
    { name: "Myo-Inositol", amount: "2000 mg", description: "Foundation inositol form used for day-to-day balance support" },
    { name: "D-Chiro-Inositol", amount: "50 mg", description: "Complements Myo-Inositol in the scientifically studied 40:1 ratio" },
    { name: "Folate (5-MTHF)", amount: "400 mcg DFE", description: "Bioactive folate form that the body can readily utilize" },
    { name: "Vitamin D3", amount: "50 mcg", description: "Supports calcium metabolism and everyday wellness" },
    { name: "Vitamin B12", amount: "400 mcg", description: "Supports cellular energy production" },
    { name: "Vitamin B6", amount: "1.5 mg", description: "Supports nutrient metabolism" },
    { name: "Magnesium Biglycinate Chelate", amount: "15 mg", description: "Gentle, well-tolerated magnesium form" },
    { name: "Zinc", amount: "30 mg", description: "Essential mineral for everyday wellness" },
    { name: "Ashwagandha 25:1 Extract", amount: "120 mg", description: "Adaptogenic botanical for calm, focused days" },
  ],
  faq: [
    { question: "How do I take this supplement?", answer: "Take 2 capsules twice daily with meals and water. If you're sensitive to supplements, start with 2 capsules once daily for 30 days before increasing to the full dose." },
    { question: "What makes this different from basic inositol supplements?", answer: "This formula uses the researched 40:1 ratio of Myo-Inositol to D-Chiro-Inositol, plus bioactive folate, gentle minerals, and adaptogenic botanicals for comprehensive support." },
    { question: "Is this supplement vegan and allergen-friendly?", answer: "Yes, the capsules are vegan, non-GMO, gluten-free, caffeine-free, and made without artificial colors or preservatives." },
    { question: "Can I take this every day?", answer: "Yes, this formula is designed for daily use as part of your wellness routine." },
    { question: "Who should take this supplement?", answer: "It's designed for women who want consistent, everyday support for their overall well-being, especially those who value balance and clarity." },
    { question: "How much inositol is in each serving?", answer: "Each 4-capsule daily serving provides 2600mg total, with 2000mg Myo-Inositol and 50mg D-Chiro-Inositol in the optimal 40:1 ratio." },
  ],
  chatbotContext: `This is a women's inositol complex supplement containing Myo-Inositol, D-Chiro-Inositol, folate, vitamins, minerals and botanicals. I can only discuss general wellness support and ingredient information. I cannot make disease claims, diagnose conditions, or provide medical advice. Always consult your healthcare provider before starting any supplement, especially if pregnant, nursing, or have medical conditions. This product has not been evaluated by the FDA and is not intended to diagnose, treat, cure or prevent any disease.`,
  suggestedPrompts: [
    "What's the difference between Myo-Inositol and D-Chiro-Inositol?",
    "How should I start taking this supplement if I'm sensitive?",
    "What botanicals are included in this formula?",
    "Can you explain the 40:1 ratio?",
  ],
  formulaSynergy: {
    summary: "The 40:1 Myo-Inositol to D-Chiro-Inositol ratio mimics the body's natural proportions, while folate and B vitamins support the metabolic pathways where inositol functions.",
    interactions: [
      {
        ingredients: ["Myo-Inositol", "D-Chiro-Inositol"],
        relationship: "These two forms of inositol work together in cellular signaling pathways, with the 40:1 ratio reflecting natural tissue concentrations",
        bottomLine: "The two main ingredients work as a team, just like they do naturally in your body",
        explanation: "Myo-inositol and D-chiro-inositol are both involved in insulin signaling and cellular communication. The 40:1 ratio reflects the natural proportion found in healthy tissues and has been studied in clinical research.",
      },
      {
        ingredients: ["Folate", "Vitamin B12", "Vitamin B6"],
        relationship: "These B vitamins work together in one-carbon metabolism and methylation pathways that support cellular function",
        bottomLine: "These B vitamins team up to help your cells work properly and use nutrients effectively",
        explanation: "Folate, B12, and B6 are cofactors in methylation reactions and amino acid metabolism. They support the biochemical pathways where inositol compounds function as signaling molecules.",
      },
      {
        ingredients: ["Magnesium Glycinate", "Zinc"],
        relationship: "Both minerals serve as cofactors for enzymes involved in energy metabolism and cellular signaling",
        bottomLine: "These minerals help activate the enzymes your body needs for energy and cellular communication",
        explanation: "Magnesium and zinc are essential cofactors for hundreds of enzymatic reactions, including those involved in energy production and the metabolic pathways where inositol functions.",
      }
    ],
  },
  resultsTimeline: {
    summary: "Nutritional supplements typically require consistent use over weeks to months to support the body's natural processes.",
    stages: [
      { period: "Week 1", title: "Initial Adaptation", physiological: "The body begins absorbing and utilizing the inositol compounds and supporting nutrients", noticeable: "You may notice the capsules are easy to swallow and gentle on the stomach", advice: "Focus on taking consistently with meals - it's normal not to feel dramatic changes immediately" },
      { period: "Month 1-2", title: "Building Foundation", physiological: "Cellular levels of inositol and supporting nutrients begin to optimize with consistent daily intake", noticeable: "Some women report feeling more balanced in their daily rhythm and energy levels", advice: "Continue consistent daily use - nutritional support builds gradually as your body maintains optimal levels" },
      { period: "Month 3+", title: "Sustained Support", physiological: "Long-term consistent intake supports maintained cellular function and metabolic processes", noticeable: "Many users report feeling more in tune with their natural wellness and daily balance", advice: "Individual responses vary - track how you feel overall rather than looking for specific changes" }
    ],
  },
  featuredReviews: [
    { reviewerName: "Sarah M.", starRating: 5, reviewText: "Love this comprehensive formula! The 40:1 ratio plus all the extra vitamins and botanicals make it so much more complete than basic inositol supplements.", isVerifiedPurchase: true },
    { reviewerName: "Jennifer L.", starRating: 5, reviewText: "Easy to swallow capsules and no aftertaste. I appreciate that it's made with natural ingredients and includes folate in the active form.", isVerifiedPurchase: true },
    { reviewerName: "Amanda K.", starRating: 4, reviewText: "Great value for a 14-in-1 formula. I started slowly as recommended and had no stomach issues. The quality seems excellent.", isVerifiedPurchase: true }
  ],
  negativeReviewFaq: [
    { question: "What if I don't notice results right away?", answer: "Nutritional supplements work gradually to support your body's natural processes. Most women find it helpful to track overall wellness rather than looking for dramatic daily changes. Consistency is key - give your body 6-8 weeks of regular use.", sourceTheme: "slow or no noticeable results" },
    { question: "Are the capsules difficult to swallow?", answer: "The capsules are standard size, but if you have trouble swallowing pills, try taking them one at a time with plenty of water, or consider opening them and mixing with food if needed. Starting with just 2 capsules daily can also help you adjust.", sourceTheme: "pill size or swallowing difficulty" },
    { question: "What if the supplement upsets my stomach?", answer: "Always take with food and plenty of water. If you're sensitive, start with just 2 capsules once daily for the first month. The magnesium glycinate form is chosen specifically for being gentle on the stomach.", sourceTheme: "digestive upset or stomach sensitivity" }
  ],
  supportContacts: {
    website: { phone: "+1 510-470-6744", email: "support@medchoice.co" },
  },
};
