"use client";

import { Product } from "@/lib/types";
import { useStaggeredAnimation } from "@/hooks/use-scroll-animation";
import SectionWrapper from "@/components/ui/section-wrapper";

interface UsageSectionProps {
  product: Product;
}

export default function UsageSection({ product }: UsageSectionProps) {
  const { containerRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(
    product.usageSteps.length,
    { staggerDelay: 150 }
  );

  return (
    <SectionWrapper
      id="usage"
      title="How to Use"
      subtitle="Follow these steps for the best results"
    >
      <div className="lg:flex lg:gap-10 lg:items-start">
        {/* Stepper */}
        <div ref={containerRef} className="relative mb-10 lg:mb-0 lg:flex-1">
          {product.usageSteps.map((step, index) => {
            const isLast = index === product.usageSteps.length - 1;
            return (
              <div
                key={index}
                className={`relative flex gap-5 ${!isLast ? "pb-8" : ""}`}
                style={{
                  opacity: visibleItems.has(index) ? 1 : 0,
                  transform: visibleItems.has(index)
                    ? "translateY(0)"
                    : "translateY(16px)",
                  transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                }}
              >
                {/* Step number + connector line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-lg shadow-sm border-2 border-white bg-brand-50"
                  >
                    {step.icon}
                  </div>
                  {!isLast && (
                    <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-gray-200 to-transparent" />
                  )}
                </div>

                {/* Content card */}
                <div className="flex-1 min-w-0 pb-1">
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Step {index + 1}
                  </span>
                  <h3 className="font-semibold text-gray-900 mt-0.5 text-[15px]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro Tips */}
        {product.proTips.length > 0 && (
          <div className="bg-brand-50 p-5 border border-brand-100 lg:w-80 lg:flex-shrink-0 lg:sticky lg:top-20">
            <h3 className="font-heading font-semibold text-base text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-brand-100 flex items-center justify-center text-sm">
                &#x2728;
              </span>
              Pro Tips
            </h3>
            <ul className="space-y-2.5">
              {product.proTips.map((tip, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 leading-relaxed flex gap-2.5"
                >
                  <span className="flex-shrink-0 w-1 h-1 rounded-full bg-brand-400 mt-2" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
