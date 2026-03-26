"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Product, Platform } from "@/lib/types";
import { getProduct } from "@/lib/products";
import { getBrandByDomain } from "@/lib/brands";
import { trackPageView, trackPlatformSelection } from "@/lib/analytics";
import PlatformModal from "@/components/platform-select/platform-modal";
import HeroSection from "@/components/sections/hero-section";
import UsageSection from "@/components/sections/usage-section";
import SynergySection from "@/components/sections/synergy-section";
import TimelineSection from "@/components/sections/timeline-section";
import BenefitsSection from "@/components/sections/benefits-section";
import IngredientsSection from "@/components/sections/ingredients-section";
import ReviewsSection from "@/components/sections/reviews-section";
import FaqSection from "@/components/sections/faq-section";
import SupportCalloutSection from "@/components/sections/support-callout-section";
import ReturnsSection from "@/components/sections/returns-section";
import ChatWidget from "@/components/chat/chat-widget";
import BottomNav from "@/components/ui/bottom-nav";

function ProductPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);

  useEffect(() => {
    const p = getProduct(slug);
    if (!p) {
      setNotFound(true);
      return;
    }

    // Brand isolation: only serve products matching this domain's brand
    const brand = getBrandByDomain(window.location.hostname);
    if (brand && p.brand !== brand.slug) {
      setNotFound(true);
      return;
    }

    setProduct(p);

    const sourceParam = searchParams.get("source") as Platform | null;
    if (sourceParam && ["amazon", "tiktok", "website"].includes(sourceParam)) {
      setPlatform(sourceParam);
      trackPageView(slug, sourceParam);
    }
  }, [slug, searchParams]);

  const handlePlatformSelect = useCallback(
    (p: Platform) => {
      setPlatform(p);
      setShowPlatformPicker(false);
      trackPlatformSelection(p, slug);
      trackPageView(slug, p);
      window.history.replaceState(null, "", `?source=${p}`);
    },
    [slug]
  );

  const toggleChat = useCallback(() => {
    setChatOpen((prev) => !prev);
  }, []);

  // Not found state
  if (notFound) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center animate-scale-in">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-50 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 text-brand-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="font-heading text-2xl text-gray-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-400 text-sm">
            This page doesn&apos;t exist. Please scan your product&apos;s QR
            code to get started.
          </p>
        </div>
      </main>
    );
  }

  // Loading state
  if (!product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
      </main>
    );
  }

  // Platform selection (initial gate or re-selection)
  if (!platform || showPlatformPicker) {
    return (
      <PlatformModal
        product={product}
        onSelect={handlePlatformSelect}
      />
    );
  }

  return (
    <main className="min-h-screen bg-white pb-16 lg:pt-14 lg:pb-6">
      <HeroSection
        product={product}
        platform={platform}
        onPlatformTap={() => setShowPlatformPicker(true)}
      />

      <UsageSection product={product} />
      <SynergySection product={product} />
      <TimelineSection product={product} />
      <BenefitsSection product={product} />
      <IngredientsSection product={product} />
      <ReviewsSection product={product} platform={platform} />
      <FaqSection product={product} />
      <SupportCalloutSection
        product={product}
        platform={platform}
        onOpenChat={toggleChat}
      />
      <ReturnsSection
        product={product}
        platform={platform}
        onOpenChat={toggleChat}
      />

      {/* Spacer for bottom nav */}
      <div className="h-4" />

      <BottomNav
        productSlug={product.slug}
        accentColor={product.colors.primary}
      />

      <ChatWidget
        product={product}
        platform={platform}
        isOpen={chatOpen}
        onToggle={toggleChat}
      />
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
        </main>
      }
    >
      <ProductPageContent />
    </Suspense>
  );
}
