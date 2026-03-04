"use client";

import { Product } from "@/lib/types";
import { useStaggeredAnimation } from "@/hooks/use-scroll-animation";
import SectionWrapper from "@/components/ui/section-wrapper";

interface BenefitsSectionProps {
  product: Product;
}

export default function BenefitsSection({ product }: BenefitsSectionProps) {
  const { containerRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(
    product.benefits.length,
    { staggerDelay: 120 }
  );

  return (
    <SectionWrapper
      id="benefits"
      title="Why This Works"
      subtitle="Evidence-informed benefits for your health"
    >
      <div ref={containerRef} className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        {product.benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white p-4 lg:p-5 flex flex-col border border-gray-100 shadow-sm"
            style={{
              opacity: visibleItems.has(index) ? 1 : 0,
              transform: visibleItems.has(index)
                ? "translateY(0)"
                : "translateY(16px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            <span className="text-2xl mb-3">{benefit.icon}</span>
            <h3 className="font-semibold text-gray-900 text-sm mb-1.5">
              {benefit.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed flex-1">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-gray-500 mt-6 text-center leading-relaxed">
        These statements have not been evaluated by the FDA. This product is not
        intended to diagnose, treat, cure, or prevent any disease.
      </p>
    </SectionWrapper>
  );
}
