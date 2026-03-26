"use client";

import { Product } from "@/lib/types";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

interface TimelineSectionProps {
  product: Product;
}

function StageCard({
  stage,
  index,
  isVisible,
  isLast,
  accentColor,
}: {
  stage: Product["resultsTimeline"]["stages"][0];
  index: number;
  isVisible: boolean;
  isLast: boolean;
  accentColor: string;
}) {
  return (
    <div className="relative pl-8 lg:pl-10">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] lg:left-[15px] top-6 bottom-0 w-px bg-gray-200" />
      )}

      {/* Timeline node */}
      <div
        className={`absolute left-0 lg:left-1 top-1 w-[23px] h-[23px] lg:w-[27px] lg:h-[27px] rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
          isVisible
            ? "scale-100 opacity-100"
            : "scale-50 opacity-0"
        }`}
        style={{
          borderColor: accentColor,
          backgroundColor: isVisible ? accentColor : "white",
        }}
      >
        <span className="text-[10px] lg:text-xs font-bold text-white">
          {index + 1}
        </span>
      </div>

      {/* Card content */}
      <div
        className={`pb-8 transition-all duration-500 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4"
        }`}
      >
        {/* Period badge */}
        <span
          className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2"
          style={{
            backgroundColor: `${accentColor}15`,
            color: accentColor,
          }}
        >
          {stage.period}
        </span>

        {/* Title */}
        <h3 className="font-heading font-bold text-base text-gray-900 mb-3">
          {stage.title}
        </h3>

        <div className="bg-white border border-gray-100 shadow-sm p-4 space-y-3">
          {/* Physiological */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              What&apos;s Happening
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {stage.physiological}
            </p>
          </div>

          {/* Noticeable */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              What You Might Notice
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {stage.noticeable}
            </p>
          </div>

          {/* Advice (only if non-empty) */}
          {stage.advice && (
            <div className="pt-2 border-t border-gray-50">
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
                If You&apos;re Not Feeling It Yet
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {stage.advice}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TimelineSection({ product }: TimelineSectionProps) {
  const { ref: sectionRef, isVisible: sectionVisible } =
    useScrollAnimation<HTMLElement>({ threshold: 0.08 });
  const { containerRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(
    product.resultsTimeline.stages.length,
    { staggerDelay: 200 }
  );

  if (product.resultsTimeline.stages.length === 0) return null;

  return (
    <>
      <div className="section-divider" />
      <section
        id="timeline"
        ref={sectionRef}
        className="py-12 px-5 lg:px-8 lg:py-16 scroll-mt-16 bg-gray-50/70 border-t border-b border-gray-100"
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
              What to Expect
            </h2>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              A realistic timeline for results
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
              {product.resultsTimeline.summary}
            </p>
          </div>

          {/* Timeline */}
          <div ref={containerRef} className="lg:max-w-2xl">
            {product.resultsTimeline.stages.map((stage, i) => (
              <StageCard
                key={i}
                stage={stage}
                index={i}
                isVisible={visibleItems.has(i)}
                isLast={i === product.resultsTimeline.stages.length - 1}
                accentColor={product.colors.accent}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
