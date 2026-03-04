import { Product } from "../types";

export const b12SublingualDrops: Product = {
  // Identity
  slug: "b12-sublingual-drops",
  name: "Vitamin B12 Sublingual Drops",
  tagline:
    "Highly absorbable methylcobalamin B12 in convenient liquid drops for daily energy and focus support.",
  heroImage: "/products/b12-sublingual-drops.png",

  // Amazon linkback
  amazonUrl: "https://www.amazon.com/dp/B0EXAMPLE12",
  asin: "B0EXAMPLE12",

  // Theming — matches nusava.com brand
  colors: {
    primary: "#4c9c2e",
    accent: "#ff6b00",
    background: "#f0f7ec",
  },

  // Content sections
  trustBadges: [
    "Third-Party Tested",
    "Non-GMO",
    "Vegan",
    "Made in USA",
    "GMP Certified",
  ],

  usageSteps: [
    {
      icon: "💧",
      title: "Shake Well",
      detail:
        "Shake the bottle gently before each use to ensure even distribution.",
    },
    {
      icon: "👅",
      title: "Place Under Tongue",
      detail:
        "Using the dropper, place 1 mL (one full dropper) under your tongue.",
    },
    {
      icon: "⏱️",
      title: "Hold for 30 Seconds",
      detail:
        "Hold the liquid under your tongue for 30 seconds before swallowing for best absorption.",
    },
    {
      icon: "🔄",
      title: "Take Daily",
      detail:
        "Use once daily, preferably in the morning with or without food. Consistency is key.",
    },
  ],

  proTips: [
    "Take in the morning for best energy support throughout the day.",
    "Sublingual absorption bypasses the digestive system — hold under your tongue, don't just swallow immediately.",
    "Store in a cool, dry place away from direct sunlight.",
    "Pair with a folate supplement for enhanced methylation support.",
  ],

  benefits: [
    {
      icon: "⚡",
      title: "Energy Production",
      description:
        "B12 plays a central role in converting food into cellular energy, helping reduce feelings of fatigue and tiredness.",
    },
    {
      icon: "🧠",
      title: "Cognitive Function",
      description:
        "Supports healthy brain function and mental clarity by aiding in the production of neurotransmitters.",
    },
    {
      icon: "❤️",
      title: "Heart Health",
      description:
        "Helps maintain healthy homocysteine levels, which is associated with cardiovascular health.",
    },
    {
      icon: "🩸",
      title: "Red Blood Cell Formation",
      description:
        "Essential for the production of healthy red blood cells, supporting oxygen transport throughout the body.",
    },
    {
      icon: "😴",
      title: "Sleep & Mood",
      description:
        "B12 supports melatonin production and nervous system function, contributing to healthy sleep patterns and balanced mood.",
    },
    {
      icon: "🧬",
      title: "Methylation Support",
      description:
        "Methylcobalamin is the active, methylated form of B12 — readily used by your body without conversion.",
    },
  ],

  ingredients: [
    {
      name: "Methylcobalamin (Vitamin B12)",
      amount: "2,500 mcg per serving",
      description:
        "The active, bioavailable form of vitamin B12. Unlike cyanocobalamin, methylcobalamin does not require conversion by the body and supports methylation directly.",
    },
    {
      name: "Purified Water",
      amount: "Base",
      description: "USP-grade purified water used as the liquid base.",
    },
    {
      name: "Vegetable Glycerin",
      amount: "Base",
      description:
        "Plant-derived glycerin that provides a slightly sweet taste and helps preserve the formula.",
    },
    {
      name: "Natural Berry Flavor",
      amount: "Trace",
      description:
        "Natural flavoring derived from berry extracts for a pleasant taste.",
    },
    {
      name: "Citric Acid",
      amount: "Trace",
      description: "Acts as a natural preservative and pH adjuster.",
    },
    {
      name: "Potassium Sorbate",
      amount: "Trace",
      description:
        "A widely-used food-grade preservative to maintain freshness and shelf stability.",
    },
  ],

  faq: [
    {
      question: "What makes sublingual B12 drops different from B12 pills?",
      answer:
        "Sublingual drops are absorbed directly through the blood vessels under your tongue, bypassing the digestive system. This can result in faster, more efficient absorption — especially beneficial for people with digestive issues or absorption concerns.",
    },
    {
      question: "Why methylcobalamin instead of cyanocobalamin?",
      answer:
        "Methylcobalamin is the naturally occurring, bioactive form of B12. Your body can use it directly without needing to convert it first (unlike cyanocobalamin). It's generally considered the preferred form for supplementation.",
    },
    {
      question: "When is the best time to take B12 drops?",
      answer:
        "We recommend taking them in the morning, as B12 supports energy production. Taking it too late in the day might affect sleep for some people. You can take it with or without food.",
    },
    {
      question: "Can I take this if I'm already taking a multivitamin?",
      answer:
        "Many people supplement with additional B12 alongside a multivitamin, but we recommend checking your total B12 intake and consulting with your healthcare provider to determine the right amount for your individual needs.",
    },
    {
      question: "Is 2,500 mcg too much B12?",
      answer:
        "B12 is a water-soluble vitamin, meaning your body excretes what it doesn't need. 2,500 mcg is a common supplemental dose designed to ensure adequate absorption. However, consult your healthcare provider if you have specific health concerns.",
    },
    {
      question: "How should I store the drops?",
      answer:
        "Store in a cool, dry place away from direct sunlight. Refrigeration is not required but can extend shelf life after opening. Always keep the cap tightly closed.",
    },
    {
      question: "Is this product vegan?",
      answer:
        "Yes. Our B12 drops use methylcobalamin produced through bacterial fermentation — no animal products are used in the formulation or manufacturing process.",
    },
    {
      question: "How long does one bottle last?",
      answer:
        "Each bottle contains 60 servings (60 mL). At the recommended dose of 1 mL per day, one bottle lasts approximately 2 months.",
    },
  ],

  // Chatbot
  chatbotContext: `You are a helpful product support assistant for our Vitamin B12 Sublingual Drops.

Product details:
- Methylcobalamin (active form of B12), 2,500 mcg per serving
- Sublingual liquid drops — absorbed under the tongue for fast bioavailability
- Natural berry flavor, vegan, non-GMO, made in USA, GMP certified
- 60 servings per bottle (2-month supply at 1 mL/day)
- Third-party tested for purity and potency

Key benefits: energy production, cognitive function, heart health, red blood cell formation, sleep & mood support, methylation support.

Usage: Shake well, place 1 full dropper (1 mL) under tongue, hold 30 seconds, take once daily (morning preferred).

Storage: Cool, dry place away from sunlight. Refrigeration optional after opening.

IMPORTANT RULES:
- Never make claims about treating, curing, or preventing any disease
- If asked about medical conditions or drug interactions, recommend consulting a healthcare provider
- Be helpful and knowledgeable about the product, but stay within supplement education boundaries
- Present benefits as educational and evidence-informed, not as guaranteed outcomes`,

  suggestedPrompts: [
    "How do I take the B12 drops?",
    "What are the benefits of B12?",
    "Is this product right for me?",
    "I need help with a return",
  ],
};
