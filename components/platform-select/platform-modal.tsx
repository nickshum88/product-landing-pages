"use client";

import { useState } from "react";
import { Product, Platform } from "@/lib/types";
import { PLATFORM_LABELS } from "@/lib/constants";
import { getBrandBySlug } from "@/lib/brands";

interface PlatformModalProps {
  product: Product;
  onSelect: (platform: Platform) => void;
}

const platforms: {
  id: Platform;
  icon: React.ReactNode;
  desc: string;
  color: string;
}[] = [
  {
    id: "amazon",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.66.66 0 01-.753.077c-1.06-.878-1.248-1.284-1.828-2.119-1.746 1.78-2.983 2.312-5.246 2.312-2.68 0-4.764-1.653-4.764-4.96 0-2.582 1.399-4.339 3.393-5.2 1.727-.753 4.139-.889 5.984-1.096v-.41c0-.753.058-1.642-.384-2.294-.384-.565-1.117-.798-1.765-.798-1.2 0-2.266.616-2.527 1.89a.57.57 0 01-.481.488l-2.695-.29a.484.484 0 01-.407-.572C6.2 1.99 9.36.5 12.233.5c1.468 0 3.386.39 4.542 1.502 1.468 1.39 1.328 3.248 1.328 5.269v4.772c0 1.435.596 2.064 1.156 2.838.197.275.24.604-.011.808-.628.524-1.746 1.502-2.36 2.048l-.744.058z" />
        <path d="M21.394 19.527C18.844 21.478 15.04 22.5 11.77 22.5c-4.558 0-8.663-1.685-11.77-4.49-.244-.22-.026-.521.267-.35 3.353 1.95 7.498 3.127 11.782 3.127 2.89 0 6.065-.598 8.987-1.84.44-.187.81.29.358.58z" />
      </svg>
    ),
    desc: "Amazon.com or Amazon app",
    color: "#ff9900",
  },
  {
    id: "tiktok",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43V13.1a8.16 8.16 0 004.77 1.53h.81V11.2a4.85 4.85 0 01-.81.07 4.85 4.85 0 01-3.77-1.8V2.44h3.58z" />
      </svg>
    ),
    desc: "TikTok Shop in-app purchase",
    color: "#010101",
  },
  {
    id: "website",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    desc: "Purchased from our website",
    color: "#4c9c2e",
  },
];

export default function PlatformModal({
  product,
  onSelect,
}: PlatformModalProps) {
  const [imgError, setImgError] = useState(false);
  const brand = getBrandBySlug(product.brand);
  const brandName = brand?.name || "Us";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto"
      style={{ backgroundColor: product.colors.background }}
    >
      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${product.colors.accent}18 0%, transparent 60%)`,
        }}
      />

      <div className="relative max-w-sm w-full px-6 py-10 animate-scale-in">
        {/* Product image */}
        <div className="w-40 h-40 mx-auto mb-6 relative">
          <div
            className="absolute inset-4 rounded-full blur-2xl opacity-20"
            style={{ backgroundColor: product.colors.accent }}
          />
          <img
            src={imgError ? "/products/placeholder.svg" : product.heroImage}
            alt={product.name}
            className="w-full h-full object-contain drop-shadow-lg relative animate-fade-up mix-blend-multiply"
            onError={() => setImgError(true)}
          />
        </div>

        {/* Welcome copy */}
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-2xl text-gray-900 mb-2 animate-fade-up [animation-delay:100ms]">
            Thanks for Choosing {brandName}!
          </h1>
          <p className="text-gray-600 text-[15px] leading-relaxed animate-fade-up [animation-delay:200ms]">
            Let us know where you made your purchase so that we can give you the
            best experience.
          </p>
        </div>

        {/* Platform buttons */}
        <div className="space-y-3 animate-fade-up [animation-delay:300ms]">
          {platforms.map(({ id, icon, desc, color }) => (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="group w-full p-4 bg-white/80 backdrop-blur-sm hover:bg-white active:scale-[0.98] text-left transition-all flex items-center gap-4 border border-gray-200/60 hover:border-gray-300 shadow-sm hover:shadow-md"
            >
              <span
                className="w-11 h-11 flex items-center justify-center text-white flex-shrink-0 rounded-lg transition-transform group-hover:scale-105"
                style={{ backgroundColor: color }}
              >
                {icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-gray-900">
                  {PLATFORM_LABELS[id]}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
              </div>
              <svg
                viewBox="0 0 20 20"
                className="w-5 h-5 text-gray-300 group-hover:text-gray-500 flex-shrink-0 transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 5l5 5-5 5" />
              </svg>
            </button>
          ))}
        </div>

        {/* Trust signal */}
        <p
          className="text-xs text-center mt-8 font-medium animate-fade-up [animation-delay:400ms]"
          style={{ color: product.colors.accent }}
        >
          Your personalized product guide is ready
        </p>
      </div>
    </div>
  );
}
