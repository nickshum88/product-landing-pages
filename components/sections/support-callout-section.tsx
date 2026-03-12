"use client";

import { Product, Platform } from "@/lib/types";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { trackExternalLink } from "@/lib/analytics";

interface SupportCalloutSectionProps {
  product: Product;
  platform: Platform;
  onOpenChat: () => void;
}

function getPrimaryCta(
  product: Product,
  platform: Platform
): { label: string; href: string; trackDest: string } {
  const contact = product.supportContacts?.[platform];
  switch (platform) {
    case "amazon":
      return {
        label: "Contact Us Through Amazon",
        href: product.amazonUrl,
        trackDest: "amazon_support",
      };
    case "tiktok":
      return {
        label: "Reach Us on TikTok",
        href: contact?.url || "#",
        trackDest: "tiktok_support",
      };
    case "website": {
      const email =
        contact?.email ||
        process.env.NEXT_PUBLIC_SUPPORT_EMAIL ||
        "support@yourdomain.com";
      return {
        label: "Email Our Support Team",
        href: `mailto:${email}`,
        trackDest: "email_support",
      };
    }
  }
}

export default function SupportCalloutSection({
  product,
  platform,
  onOpenChat,
}: SupportCalloutSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.15 });
  const cta = getPrimaryCta(product, platform);

  return (
    <section
      id="help"
      ref={ref}
      className="py-14 px-5 lg:px-8 lg:py-20 scroll-mt-16"
      style={{ backgroundColor: `${product.colors.accent}10` }}
    >
      <div
        className={`max-w-lg md:max-w-2xl lg:max-w-[700px] mx-auto text-center transition-all duration-700 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="font-heading font-bold text-xl lg:text-2xl text-gray-900 mb-3">
          Still Have Questions? We&apos;re Here to Help.
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          Our team is ready to help you get the most out of your{" "}
          {product.name}.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Primary CTA */}
          <a
            href={cta.href}
            target={platform !== "website" ? "_blank" : undefined}
            rel={platform !== "website" ? "noopener noreferrer" : undefined}
            onClick={() =>
              trackExternalLink(product.slug, cta.trackDest, cta.href)
            }
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 text-white font-medium text-sm hover:bg-accent active:scale-[0.98] transition-all"
          >
            {cta.label}
            <svg
              viewBox="0 0 16 16"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Secondary: open chatbot */}
          <button
            onClick={onOpenChat}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-gray-700 font-medium text-sm border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            <svg
              viewBox="0 0 20 20"
              className="w-4.5 h-4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 12.5a1.5 1.5 0 01-1.5 1.5H6l-3 3V4.5A1.5 1.5 0 014.5 3h11A1.5 1.5 0 0117 4.5v8z" />
            </svg>
            Chat With Our AI Assistant
          </button>
        </div>
      </div>
    </section>
  );
}
