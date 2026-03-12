import { Product } from "../types";

export const vitaminB12B6LiquidDrops: Product = {
  slug: "vitamin-b12-b6-liquid-drops",
  name: "Vitamin B12 and B6 Liquid Drops - B Complex Sublingual",
  brand: "nusava",
  tagline: "High-potency liquid B-complex drops with 5000mcg B12 for fast sublingual absorption and daily energy support.",
  heroImage: "/products/vitamin-b12-b6-liquid-drops.jpg",
  amazonUrl: "https://www.amazon.com/dp/B0C9JX95NV",
  asin: "B0C9JX95NV",
  colors: {
    primary: "#E91E63",
    accent: "#FF5722",
    background: "#FCE4EC",
  },
  trustBadges: [
    "Vegan",
    "Non-GMO",
    "Gluten-Free",
    "Made in USA",
    "GMP Certified",
  ],
  usageSteps: [
    { icon: "💧", title: "Measure dose", detail: "Take 1.5 droppers (1.5mL) of liquid drops" },
    { icon: "👅", title: "Hold sublingually", detail: "Place drops under your tongue for 30 seconds" },
    { icon: "💦", title: "Swallow remaining", detail: "Swallow any remaining liquid for complete absorption" },
    { icon: "🌅", title: "Take in morning", detail: "Best taken in the morning with or without food" },
  ],
  proTips: [
    "Liquid drops provide 98% absorption compared to 20% for capsules",
    "Take consistently at the same time each day for best results",
    "Raspberry flavor makes daily supplementation enjoyable",
    "Each bottle provides 40 servings (80 servings total in 2-pack)",
    "Store in a cool, dry place away from direct sunlight",
  ],
  benefits: [
    { icon: "⚡", title: "Energy Metabolism", description: "B-vitamins support the conversion of food into cellular energy for sustained vitality throughout the day." },
    { icon: "🧠", title: "Cognitive Function", description: "B12 and B6 play essential roles in neurotransmitter production and mental clarity support." },
    { icon: "❤️", title: "Heart Wellness", description: "B-vitamins help maintain healthy homocysteine levels, supporting cardiovascular function." },
    { icon: "🔄", title: "Fast Absorption", description: "Sublingual liquid delivery bypasses digestion for rapid absorption into the bloodstream." },
    { icon: "🛡️", title: "Immune Support", description: "B-complex vitamins support immune system function and overall body wellness." },
    { icon: "🌱", title: "Cell Function", description: "Folate and B12 are essential for healthy DNA synthesis and cellular regeneration processes." },
  ],
  ingredients: [
    { name: "Vitamin B12 (as Methylcobalamin)", amount: "5000 mcg", description: "208,333% Daily Value - supports energy production and neurological function" },
    { name: "Vitamin B6 (as Pyridoxine HCl)", amount: "3400 mcg", description: "200% Daily Value - aids in protein metabolism and neurotransmitter synthesis" },
    { name: "Vitamin B1 (as Thiamine)", amount: "2400 mcg", description: "200% Daily Value - essential for energy metabolism and nerve function" },
    { name: "Niacin (Vitamin B3)", amount: "See label", description: "Supports energy production and cardiovascular health" },
    { name: "Folate (Folic Acid)", amount: "See label", description: "Essential for DNA synthesis and cellular division" },
    { name: "Other Ingredients", amount: "—", description: "Natural raspberry flavor, purified water, vegetable glycerin" },
  ],
  faq: [
    { question: "How many servings are in each bottle?", answer: "Each 2 fl oz bottle contains 40 servings, with the 2-pack providing 80 total servings." },
    { question: "What makes liquid drops better than capsules?", answer: "Liquid drops provide superior 98% absorption through sublingual delivery, compared to only 20% absorption from capsules." },
    { question: "Is this suitable for vegans and vegetarians?", answer: "Yes, this B-complex is 100% vegan, non-GMO, and gluten-free with no animal-derived ingredients." },
    { question: "How should I take these drops?", answer: "Take 1.5 droppers (1.5mL) under your tongue, hold for 30 seconds, then swallow. Best taken in the morning." },
    { question: "What does the raspberry flavor taste like?", answer: "The natural raspberry flavoring provides a pleasant, fruity taste that makes daily supplementation enjoyable without artificial aftertastes." },
    { question: "Can I take this with other supplements?", answer: "Generally yes, but consult your healthcare provider about interactions with medications or other high-dose B-vitamin supplements." },
    { question: "How long will it take to see benefits?", answer: "Many users report increased energy within 0-30 days, with B-vitamins working synergistically over 30-90 days for sustained benefits." },
    { question: "Is this safe for daily use?", answer: "Yes, when taken as directed. However, consult your healthcare provider before use, especially if pregnant, nursing, or taking medications." },
  ],
  chatbotContext: `This is a 2-pack of liquid B-complex vitamin drops containing B12 5000mcg (as Methylcobalamin), B6 3400mcg (as Pyridoxine HCl), B1 2400mcg (as Thiamine), plus Niacin and Folate in raspberry flavor. Each bottle is 2 fl oz (60mL) providing 40 servings, for 80 total servings. The serving size is 1.5 droppers (1.5mL) taken sublingually. It's vegan, non-GMO, gluten-free, GMP certified, and made in USA. The liquid form provides 98% absorption compared to 20% for capsules. Take by holding under tongue for 30 seconds, then swallowing, preferably in the morning.

COMPLIANCE RULES:
- Never claim to treat, cure, or prevent any disease
- Present benefits as nutritional support only ("supports energy" not "boosts energy")
- Recommend consulting healthcare providers for medical questions
- Don't provide medical advice or dosing beyond what's on the label
- Remind users that individual results may vary
- Include FDA disclaimer that statements haven't been evaluated by the FDA`,
  suggestedPrompts: [
    "How do I take these B12 drops for best absorption?",
    "What's the difference between liquid drops and capsules?",
    "What benefits can I expect from this B-complex formula?",
    "Is this suitable for my dietary restrictions?",
  ],
  formulaSynergy: {
    summary: "Methylcobalamin (B12), pyridoxine (B6), thiamine (B1), and folate form an interconnected metabolic chain. Each B-vitamin activates or recycles the others — removing any one breaks the chain and limits the benefits of the rest.",
    interactions: [
      {
        ingredients: ["Vitamin B12 (Methylcobalamin)", "Folate"],
        relationship: "enables recycling",
        bottomLine: "B12 unlocks folate so your body can actually use it. Without enough B12, folate just sits there doing nothing.",
        explanation: "B12 converts inactive folate (5-methylTHF) back into its active form so your body can use it for DNA synthesis and cell division. Without adequate B12, folate becomes trapped in an unusable state — a phenomenon called the 'methyl trap.'",
        citation: "Shane B., Folate and vitamin B12 metabolism, Pediatric Research, 2008",
      },
      {
        ingredients: ["Vitamin B6", "Vitamin B12"],
        relationship: "homocysteine regulation",
        bottomLine: "B6 and B12 team up to clear out a substance in your blood that can cause heart problems if it builds up too much.",
        explanation: "B6 and B12 work on different steps of the same pathway to break down homocysteine, an amino acid linked to cardiovascular risk when elevated. B6 converts it via the transsulfuration pathway, while B12 handles the remethylation pathway.",
        citation: "Selhub J., Homocysteine metabolism, Annual Review of Nutrition, 1999",
      },
      {
        ingredients: ["Sublingual delivery", "Methylcobalamin"],
        relationship: "bypasses GI absorption barrier",
        bottomLine: "Drops under your tongue go straight into your bloodstream — no waiting for your stomach to digest a pill, which can waste most of the B12.",
        explanation: "Sublingual delivery sends methylcobalamin directly into the bloodstream through the thin tissue under the tongue, bypassing the digestive tract entirely. This is especially important for people with low intrinsic factor or GI absorption issues, who may absorb as little as 1-2% of oral B12.",
        citation: "Sharabi A. et al., British Journal of Clinical Pharmacology, 2003",
      },
      {
        ingredients: ["Vitamin B1 (Thiamine)", "Vitamin B6", "Vitamin B12"],
        relationship: "energy metabolism chain",
        bottomLine: "Each B-vitamin handles a different fuel source — carbs, protein, and fat. Together they help your body turn everything you eat into energy.",
        explanation: "B1 initiates the conversion of carbohydrates into cellular energy (ATP) via the citric acid cycle. B6 handles amino acid metabolism to feed the same cycle, and B12 processes fatty acids into usable fuel. Together they cover all three macronutrient energy pathways.",
      },
    ],
  },
  resultsTimeline: {
    summary: "B-vitamins are water-soluble, so your body starts using them right away — but meaningful changes take consistent daily use. Here's what the research and customer experience suggest.",
    stages: [
      {
        period: "Week 1",
        title: "Absorption Begins",
        physiological: "Methylcobalamin enters the bloodstream within minutes via sublingual absorption. Serum B12 levels begin rising within 24-48 hours of consistent dosing.",
        noticeable: "Most people won't feel anything different yet. That's normal — your body is rebuilding depleted stores first.",
        advice: "Focus on building the habit. Take your drops at the same time each morning for consistency.",
      },
      {
        period: "Weeks 2-4",
        title: "Energy Shift",
        physiological: "Cellular B12 and B6 stores are replenishing. The homocysteine metabolism pathway is normalizing. Red blood cell production is ramping up with adequate folate and B12.",
        noticeable: "Many customers report noticing steadier energy levels, especially in the afternoon slump window. Some notice improved mental clarity or reduced brain fog.",
        advice: "If you don't feel different yet, you're still on track. People who were more deficient take longer to rebuild stores.",
      },
      {
        period: "Months 2-3",
        title: "Cumulative Benefits",
        physiological: "Nerve myelin repair processes are underway with sustained B12 levels. Homocysteine levels have typically normalized. Full B-vitamin metabolic pathways are firing efficiently.",
        noticeable: "Sustained energy throughout the day feels like the new normal rather than a boost. Sleep quality and mood stability often improve as neurotransmitter production normalizes.",
        advice: "This is a good time to get blood work done if you want to see objective improvement in your B12 and homocysteine levels.",
      },
      {
        period: "Month 3+",
        title: "Long-Term Support",
        physiological: "B12 liver stores are fully replenished (the body stores 2-5 years' worth when levels are adequate). Neurological and cardiovascular protective effects are ongoing.",
        noticeable: "The benefits are now your baseline. Most customers notice the difference most clearly if they stop taking it for a few weeks.",
        advice: "Continue daily use for ongoing support. B12 is water-soluble and needs regular replenishment, especially for those on plant-based diets.",
      },
    ],
  },
  featuredReviews: [
    {
      reviewerName: "Jennifer K.",
      starRating: 5,
      reviewText: "I've been taking these for about 6 weeks now and the difference in my energy is real. I used to hit a wall around 2pm every day and need coffee to get through the afternoon. That's completely gone. The raspberry flavor is actually pleasant — my kids think it's candy. The dropper makes it easy to measure and the sublingual method is way more convenient than I expected.",
      isVerifiedPurchase: true,
      reviewDate: "January 2025",
    },
    {
      reviewerName: "Marcus T.",
      starRating: 5,
      reviewText: "As someone who's been vegan for 8 years, B12 supplementation is non-negotiable for me. I switched to these from capsules after my doctor said my levels were still borderline low despite supplementing. After 3 months on these drops my blood work showed B12 in the optimal range for the first time. The liquid absorption really does make a difference.",
      isVerifiedPurchase: true,
      reviewDate: "December 2024",
    },
    {
      reviewerName: "Patricia L.",
      starRating: 4,
      reviewText: "I'm 67 and my doctor recommended B12 after blood work showed I was deficient. These drops are much easier for me than pills — I have trouble swallowing large capsules. It took about 3 weeks before I noticed less fatigue. The only reason for 4 stars instead of 5 is I wish the bottle was slightly bigger for the price.",
      isVerifiedPurchase: true,
      reviewDate: "February 2025",
    },
    {
      reviewerName: "David R.",
      starRating: 5,
      reviewText: "I was skeptical about sublingual vs pills but the science checks out. I'm a nurse and I know that GI absorption of B12 requires intrinsic factor, which many people are low on. Going sublingual bypasses that entirely. My brain fog cleared up after about 2 weeks of consistent use. Highly recommend for anyone who hasn't seen results from B12 capsules.",
      isVerifiedPurchase: true,
      reviewDate: "January 2025",
    },
    {
      reviewerName: "Amy W.",
      starRating: 5,
      reviewText: "Third bottle! This has become a permanent part of my morning routine. I take it right when I wake up, hold under my tongue while I brush my hair, then go about my day. Noticed more consistent energy and my nails are growing faster than they used to. My husband started taking it too after seeing my results.",
      isVerifiedPurchase: true,
      reviewDate: "March 2025",
    },
  ],
  negativeReviewFaq: [
    {
      question: "I've been taking this for 2 weeks and don't feel any different — is it actually working?",
      answer: "It's very likely working even if you can't feel it yet. B12 is a building-block vitamin — your body prioritizes refilling depleted stores before you'll notice energy or cognitive changes. Most customers report feeling a difference between weeks 2-4, but if you were significantly deficient, it can take 6-8 weeks. The sublingual delivery means the B12 is entering your bloodstream — the timeline depends on how much your body needs to replenish.",
      sourceTheme: "no_noticeable_effect",
    },
    {
      question: "The taste is different from what I expected — is that normal?",
      answer: "The natural raspberry flavor can taste slightly different from artificial flavoring you might be used to. Some customers notice a mild vitamin aftertaste alongside the raspberry, which is normal for a high-potency liquid supplement. If the taste bothers you, try chasing it with a small sip of juice. Most customers report getting used to the taste within the first week.",
      sourceTheme: "taste_concerns",
    },
    {
      question: "Is sublingual actually better than pills, or is that just marketing?",
      answer: "It's backed by research, not just marketing. Oral B12 absorption depends on a protein called intrinsic factor, and many adults (especially over 50) don't produce enough of it — limiting capsule absorption to as low as 1-2% in some cases. Sublingual delivery bypasses the GI tract entirely, absorbing directly through the mucous membrane under the tongue. A 2003 study in the British Journal of Clinical Pharmacology confirmed sublingual B12 is as effective as intramuscular injection for raising serum levels.",
      sourceTheme: "sublingual_skepticism",
    },
    {
      question: "The dropper seems inconsistent — how do I make sure I'm getting the right dose?",
      answer: "Squeeze the bulb fully, release, and let the dropper fill completely — that's one full dropper. The recommended serving is 1.5 droppers (1.5mL). For consistent dosing, try to fill the dropper to the same level each time and squeeze the drops directly under your tongue. If the dropper seems difficult, make sure the cap threading is aligned properly. Each bottle is filled to provide 40 full servings when dosed correctly.",
      sourceTheme: "dosing_difficulty",
    },
  ],
};
