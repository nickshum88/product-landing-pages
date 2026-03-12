export interface Product {
  // Identity
  slug: string;
  name: string;
  brand: string; // brand slug — must match a key in lib/brands.ts
  tagline: string;
  heroImage: string;

  // Amazon linkback
  amazonUrl: string;
  asin: string;

  // Theming
  colors: {
    primary: string;
    accent: string;
    background: string;
  };

  // Content sections
  trustBadges: string[];

  usageSteps: Array<{
    icon: string;
    title: string;
    detail: string;
  }>;
  proTips: string[];

  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  ingredients: Array<{
    name: string;
    amount: string;
    description: string;
  }>;

  faq: Array<{
    question: string;
    answer: string;
  }>;

  // Chatbot
  chatbotContext: string;
  suggestedPrompts: string[];

  // Section: Formula Synergy Science
  formulaSynergy: {
    summary: string;
    interactions: IngredientInteraction[];
  };

  // Section: Results Timeline
  resultsTimeline: {
    summary: string;
    stages: TimelineStage[];
  };

  // Section: Featured Reviews
  featuredReviews: FeaturedReview[];

  // Section: Negative Review FAQ (complaint interception)
  negativeReviewFaq: NegativeReviewFaq[];

  // Support contacts per platform (optional — falls back to brand/global defaults)
  supportContacts?: {
    amazon?: SupportContact;
    tiktok?: SupportContact;
    website?: SupportContact;
  };
}

export interface IngredientInteraction {
  ingredients: string[];         // names of the 2-3 ingredients involved
  relationship: string;          // e.g., "enables absorption", "amplifies effect"
  bottomLine: string;            // one-sentence plain-English summary (8th grade reading level)
  explanation: string;           // detailed scientific explanation of the interaction
  citation?: string;             // study reference if available
}

export interface TimelineStage {
  period: string;                // e.g., "Week 1", "Month 1-2", "Month 3+"
  title: string;                 // e.g., "Building the Foundation"
  physiological: string;         // what's happening in the body
  noticeable: string;            // what the customer might notice or feel
  advice: string;                // what to do if they're not noticing anything
}

export interface FeaturedReview {
  reviewerName: string;
  starRating: number;
  reviewText: string;
  isVerifiedPurchase: boolean;
  reviewDate?: string;
}

export interface NegativeReviewFaq {
  question: string;              // complaint reframed as a compassionate question
  answer: string;                // genuinely helpful answer specific to this product
  sourceTheme: string;           // the underlying complaint theme (internal reference)
}

export interface SupportContact {
  phone?: string;
  email?: string;
  url?: string;
  urlLabel?: string;
}

export type Platform = "amazon" | "tiktok" | "website";

export interface ReturnPolicy {
  heading: string;
  message: string;
  steps: string[];
  secondary: string;
  important?: string;
  link?: {
    label: string;
    url: string;
  };
}
