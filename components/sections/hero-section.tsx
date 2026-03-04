"use client";

import { useState } from "react";
import { Product, Platform } from "@/lib/types";
import { PLATFORM_LABELS } from "@/lib/constants";

interface HeroSectionProps {
  product: Product;
  platform: Platform;
  onPlatformTap: () => void;
}

export default function HeroSection({
  product,
  platform,
  onPlatformTap,
}: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      className="relative px-5 pt-14 pb-10 lg:pt-20 lg:pb-16 overflow-hidden"
      style={{ backgroundColor: product.colors.background }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${product.colors.primary}10 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-lg md:max-w-2xl lg:max-w-[1100px] mx-auto relative">
        {/* Platform badge — above the 2-col layout on desktop */}
        <div className="text-center lg:text-left mb-8 lg:mb-0 lg:absolute lg:top-0 lg:left-0 lg:z-10">
          <button
            onClick={onPlatformTap}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm text-xs text-gray-600 hover:bg-white/90 transition-colors border border-white/50"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Purchased on {PLATFORM_LABELS[platform]}
            <svg
              viewBox="0 0 12 12"
              className="w-3 h-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 3l3 3-3 3" />
            </svg>
          </button>
        </div>

        {/* Two-column on desktop */}
        <div className="lg:flex lg:items-center lg:gap-16 lg:pt-10">
          {/* Product image */}
          <div className="w-56 h-56 md:w-64 md:h-64 lg:w-[340px] lg:h-[340px] mx-auto lg:mx-0 lg:flex-shrink-0 mb-8 lg:mb-0 relative animate-fade-up">
            <div
              className="absolute inset-4 rounded-full blur-3xl opacity-15"
              style={{ backgroundColor: product.colors.primary }}
            />
            <img
              src={imgError ? "/products/placeholder.svg" : product.heroImage}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-xl relative"
              onError={() => setImgError(true)}
            />
          </div>

          {/* Text content */}
          <div className="text-center lg:text-left lg:flex-1">
            <h1 className="font-heading font-bold text-[28px] lg:text-[36px] text-gray-900 mb-3 animate-fade-up [animation-delay:100ms]">
              {product.name}
            </h1>
            <p className="text-gray-600 text-[15px] lg:text-base leading-relaxed mb-8 max-w-xs mx-auto lg:mx-0 lg:max-w-md animate-fade-up [animation-delay:200ms]">
              {product.tagline}
            </p>

            {/* Trust badges */}
            {product.trustBadges.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 animate-fade-up [animation-delay:300ms]">
                {product.trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white/70 backdrop-blur-sm text-gray-600 border border-white/50"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="w-3 h-3 text-brand-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M2.5 6l2.5 2.5 4.5-4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
