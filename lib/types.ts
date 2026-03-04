export interface Product {
  // Identity
  slug: string;
  name: string;
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
