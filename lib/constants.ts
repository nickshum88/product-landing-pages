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
      "Since you purchased through TikTok Shop, your return is handled through TikTok's system.",
    steps: [
      "Open the TikTok app",
      "Tap Profile → Settings → Orders",
      'Find your order and tap "Request Return"',
      "Follow TikTok's return process",
    ],
    secondary:
      "TikTok Shop has its own buyer protection program that covers your purchase.",
  },
  website: {
    heading: "We're Here to Help",
    message:
      "Since you purchased directly from our website, we can handle your return directly.",
    steps: [
      `Email ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@yourdomain.com"} with your order number`,
      `Or use our return portal: ${process.env.NEXT_PUBLIC_RETURN_PORTAL_URL || "https://yourdomain.com/returns"}`,
    ],
    secondary: "Most returns are processed within 3-5 business days.",
    link: {
      label: "Go to Return Portal",
      url: process.env.NEXT_PUBLIC_RETURN_PORTAL_URL || "https://yourdomain.com/returns",
    },
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
