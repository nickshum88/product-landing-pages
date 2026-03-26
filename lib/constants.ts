import { Platform, ReturnPolicy } from "./types";

export const RETURN_POLICIES: Record<Platform, ReturnPolicy> = {
  amazon: {
    heading: "Amazon Handles Your Return",
    message:
      "Since you purchased through Amazon, your return and refund are handled through Amazon's system. This protects your purchase under Amazon's A-to-Z Guarantee.",
    steps: [
      'Go to Your Orders at amazon.com/gp/your-account/order-history',
      'Find your order and select "Return or Replace Items"',
      "Follow the prompts to complete your return",
    ],
    secondary:
      "Have a product question? Use Amazon's Buyer-Seller Messaging to reach us directly through your order page.",
    important:
      "We want to help! But Amazon requires all communication to go through their platform so your purchase stays protected.",
    link: {
      label: "Go to Your Amazon Orders",
      url: "https://www.amazon.com/gp/your-account/order-history",
    },
  },
  tiktok: {
    heading: "Return Through TikTok",
    message:
      "Since you purchased through TikTok Shop, your refund or replacement is handled through TikTok's system.",
    steps: [
      "Open the TikTok app and go to Shop",
      "Tap Your Orders",
      "Go to All Orders and select the item you want to return",
      "Tap Request Refund",
      "Choose the reason for your request and tap Continue",
      "Upload any required photos or provide details about the issue",
      "Review your request and tap Submit",
    ],
    secondary:
      "TikTok Shop has its own buyer protection program that covers your purchase.",
  },
  website: {
    heading: "We're Here to Help",
    message:
      "Since you purchased directly from our website, we can help you directly. All of our products come with a 90-day satisfaction guarantee.",
    steps: [],
    secondary:
      "Our 90-day guarantee means you can try the product risk-free. If you're not satisfied for any reason, reach out and we'll make it right.",
  },
};

export const AMAZON_STOREFRONT_URL =
  process.env.NEXT_PUBLIC_AMAZON_STOREFRONT_URL ||
  "https://www.amazon.com/stores/YourBrand";

export const PLATFORM_LABELS: Record<Platform, string> = {
  amazon: "Amazon",
  tiktok: "TikTok Shop",
  website: "Our Website",
};

export const PLATFORM_ICONS: Record<Platform, string> = {
  amazon: "📦",
  tiktok: "🎵",
  website: "🌐",
};
