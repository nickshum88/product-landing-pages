"use client";

import { useEffect, useRef } from "react";
import { Product, Platform, SupportContact } from "@/lib/types";
import { RETURN_POLICIES, PLATFORM_LABELS } from "@/lib/constants";
import { trackExternalLink, trackReturnInstructionsViewed } from "@/lib/analytics";
import SectionWrapper from "@/components/ui/section-wrapper";

interface ReturnsSectionProps {
  product: Product;
  platform: Platform;
  onOpenChat: () => void;
}

function getWebsiteSteps(contact: SupportContact | undefined): string[] {
  const steps: string[] = [];
  if (contact?.email) {
    steps.push(`Email us at ${contact.email} with your order number`);
  }
  if (contact?.phone) {
    steps.push(`Or call us at ${contact.phone}`);
  }
  if (contact?.url) {
    steps.push(`Or use our return portal: ${contact.url}`);
  }
  // If no contact info provided, fall back to env var defaults
  if (steps.length === 0) {
    const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@yourdomain.com";
    const portalUrl = process.env.NEXT_PUBLIC_RETURN_PORTAL_URL || "https://yourdomain.com/returns";
    steps.push(`Email ${email} with your order number`);
    steps.push(`Or use our return portal: ${portalUrl}`);
  }
  return steps;
}

function getWebsiteLink(contact: SupportContact | undefined) {
  if (contact?.url) {
    return {
      label: contact.urlLabel || "Go to Return Portal",
      url: contact.url,
    };
  }
  const portalUrl = process.env.NEXT_PUBLIC_RETURN_PORTAL_URL;
  if (portalUrl) {
    return { label: "Go to Return Portal", url: portalUrl };
  }
  return null;
}

export default function ReturnsSection({
  product,
  platform,
  onOpenChat,
}: ReturnsSectionProps) {
  const basePolicy = RETURN_POLICIES[platform];
  const contact = product.supportContacts?.[platform];
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      trackReturnInstructionsViewed(product.slug, platform);
      tracked.current = true;
    }
  }, [product.slug, platform]);

  // Build the effective policy by merging base with product-level contacts
  const steps = platform === "website" ? getWebsiteSteps(contact) : basePolicy.steps;
  const link = platform === "website" ? getWebsiteLink(contact) : basePolicy.link;

  // Show contact info for Amazon/TikTok if provided
  const hasExtraContact = platform !== "website" && contact && (contact.phone || contact.email);

  return (
    <SectionWrapper
      id="returns"
      title="Returns & Support"
      subtitle={`Purchased on ${PLATFORM_LABELS[platform]}`}
    >
      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden lg:max-w-2xl">
        {/* Policy header */}
        <div className="p-5 pb-0">
          <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">
            {basePolicy.heading}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {basePolicy.message}
          </p>
        </div>

        {/* Steps */}
        <div className="p-5">
          <ol className="space-y-3">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-50 text-brand-700 font-semibold text-xs flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-600 leading-relaxed pt-1">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Important callout */}
        {basePolicy.important && (
          <div className="mx-5 mb-5 p-4 bg-amber-50/80 border border-amber-100/50">
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-semibold">Important:</span>{" "}
              {basePolicy.important}
            </p>
          </div>
        )}

        {/* Direct contact info for Amazon/TikTok */}
        {hasExtraContact && (
          <div className="mx-5 mb-5 p-4 bg-gray-50 border border-gray-100">
            <p className="text-xs font-semibold text-gray-700 mb-1.5">
              Need to reach us directly?
            </p>
            {contact.phone && (
              <p className="text-sm text-gray-600">
                Phone:{" "}
                <a href={`tel:${contact.phone}`} className="text-brand-600 underline">
                  {contact.phone}
                </a>
              </p>
            )}
            {contact.email && (
              <p className="text-sm text-gray-600">
                Email:{" "}
                <a href={`mailto:${contact.email}`} className="text-brand-600 underline">
                  {contact.email}
                </a>
              </p>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="px-5 pb-5 space-y-2.5">
          {link && (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackExternalLink(product.slug, "return_portal", link.url)
              }
              className="block w-full text-center py-3.5 px-4 bg-brand-500 text-white font-medium text-sm hover:bg-accent active:scale-[0.98] transition-all"
            >
              {link.label}
              <svg
                viewBox="0 0 16 16"
                className="inline-block w-4 h-4 ml-1.5 -mt-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          )}

          {/* Amazon: buyer-seller messaging link */}
          {platform === "amazon" && (
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackExternalLink(product.slug, "amazon_contact", product.amazonUrl)
              }
              className="block w-full text-center py-3.5 px-4 bg-white text-gray-700 font-medium text-sm border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all"
            >
              Contact Us on Amazon
              <svg
                viewBox="0 0 16 16"
                className="inline-block w-4 h-4 ml-1.5 -mt-0.5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 3h7v7M13 3L6 10" />
              </svg>
            </a>
          )}

          {/* Website: contact info buttons */}
          {platform === "website" && contact?.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="block w-full text-center py-3.5 px-4 bg-white text-gray-700 font-medium text-sm border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all"
            >
              Call {contact.phone}
            </a>
          )}

          {platform === "website" && contact?.email && (
            <a
              href={`mailto:${contact.email}`}
              className="block w-full text-center py-3.5 px-4 bg-white text-gray-700 font-medium text-sm border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all"
            >
              Email {contact.email}
            </a>
          )}
        </div>

        {/* Secondary info */}
        <div className="px-5 pb-5">
          <p className="text-xs text-gray-500 leading-relaxed">
            {basePolicy.secondary}
          </p>
        </div>
      </div>

      {/* Still need help? CTA */}
      <button
        onClick={onOpenChat}
        className="mt-4 w-full lg:max-w-2xl flex items-center justify-center gap-2 py-3.5 px-4 bg-brand-50 hover:bg-brand-100 text-brand-700 text-sm font-medium transition-colors border border-brand-200/50"
      >
        <svg
          viewBox="0 0 20 20"
          className="w-4.5 h-4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M17 12.5a1.5 1.5 0 01-1.5 1.5H6l-3 3V4.5A1.5 1.5 0 014.5 3h11A1.5 1.5 0 0117 4.5v8z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Still need help? Chat with us
      </button>
    </SectionWrapper>
  );
}
