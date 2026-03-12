"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

interface SynergySectionProps {
  product: Product;
}

function InteractionCard({
  interaction,
  isVisible,
}: {
  interaction: Product["formulaSynergy"]["interactions"][0];
  isVisible: boolean;
}) {
  const [showScience, setShowScience] = useState(false);

  return (
    <div
      className={`bg-white border border-gray-100 shadow-sm p-5 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Ingredient pills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {interaction.ingredients.map((name) => (
          <span
            key={name}
            className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full"
          >
            {name}
          </span>
        ))}
      </div>

      {/* Relationship label */}
      <p className="text-sm font-heading font-bold text-gray-900 uppercase tracking-wide mb-2">
        {interaction.relationship}
      </p>

      {/* Bottom line — always visible, plain language */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {interaction.bottomLine}
      </p>

      {/* Science details toggle */}
      <div className="mt-3">
        <button
          onClick={() => setShowScience(!showScience)}
          className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1 transition-colors"
        >
          <svg
            viewBox="0 0 16 16"
            className={`w-3.5 h-3.5 transition-transform duration-200 ${showScience ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {showScience ? "Hide the details" : "How it works"}
        </button>
        {showScience && (
          <div className="mt-3 pl-4 border-l-2 border-brand-100 space-y-2">
            <p className="text-xs text-gray-500 leading-relaxed">
              {interaction.explanation}
            </p>
            {interaction.citation && (
              <p className="text-[11px] text-gray-400 italic leading-relaxed">
                Source: {interaction.citation}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Connection line between cards (mobile)
function ConnectionLine() {
  return (
    <div className="flex justify-center py-1">
      <div className="w-px h-6 bg-brand-200" />
    </div>
  );
}

export default function SynergySection({ product }: SynergySectionProps) {
  const { ref: sectionRef, isVisible: sectionVisible } =
    useScrollAnimation<HTMLElement>({ threshold: 0.08 });
  const { containerRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(
    product.formulaSynergy.interactions.length,
    { staggerDelay: 150 }
  );

  return (
    <>
      <div className="section-divider" />
      <section
        id="science"
        ref={sectionRef}
        className="py-12 px-5 lg:px-8 lg:py-16 scroll-mt-16 bg-gray-50/70 border-t border-gray-100"
      >
        <div className="max-w-lg md:max-w-2xl lg:max-w-[1100px] mx-auto">
          {/* Header */}
          <div
            className={`mb-8 transition-all duration-[600ms] ${
              sectionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="font-heading font-bold text-[22px] text-gray-900 mb-1 uppercase tracking-wide">
              Why This Formula Works
            </h2>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              The science behind the ingredients
            </p>
          </div>

          {/* Summary */}
          <div
            className={`mb-8 transition-all duration-700 delay-100 ${
              sectionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-sm text-gray-700 leading-relaxed lg:max-w-2xl">
              {product.formulaSynergy.summary}
            </p>
          </div>

          {/* Interaction cards */}
          <div ref={containerRef}>
            {/* Mobile: connected vertical cards */}
            <div className="lg:hidden space-y-0">
              {product.formulaSynergy.interactions.map((interaction, i) => (
                <div key={i}>
                  {i > 0 && <ConnectionLine />}
                  <InteractionCard
                    interaction={interaction}
                    isVisible={visibleItems.has(i)}
                  />
                </div>
              ))}
            </div>

            {/* Desktop: 2-column grid */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-4">
              {product.formulaSynergy.interactions.map((interaction, i) => (
                <InteractionCard
                  key={i}
                  interaction={interaction}
                  isVisible={visibleItems.has(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
