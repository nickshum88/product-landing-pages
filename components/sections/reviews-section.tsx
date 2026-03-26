"use client";

import { useState, useRef, useEffect } from "react";
import { Product, Platform } from "@/lib/types";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const PLATFORM_REVIEW_LABELS: Record<Platform, string> = {
  amazon: "Reviews from verified Amazon purchasers",
  tiktok: "Reviews from TikTok Shop customers",
  website: "Reviews from verified customers",
};

const TRUNCATE_LENGTH = 150;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`w-4 h-4 ${
            star <= rating ? "text-amber-400" : "text-gray-200"
          }`}
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  isVisible,
}: {
  review: Product["featuredReviews"][0];
  isVisible: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = review.reviewText.length > TRUNCATE_LENGTH;
  const displayText =
    needsTruncation && !expanded
      ? review.reviewText.slice(0, TRUNCATE_LENGTH) + "..."
      : review.reviewText;

  return (
    <div
      className={`bg-white border border-gray-100 shadow-sm p-5 flex flex-col snap-start min-w-[280px] lg:min-w-0 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Star rating + verified badge */}
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={review.starRating} />
        {review.isVerifiedPurchase && (
          <span className="text-[11px] text-brand-600 font-medium flex items-center gap-1">
            <svg
              viewBox="0 0 16 16"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verified Purchase
          </span>
        )}
      </div>

      {/* Review text */}
      <p className="text-sm text-gray-600 leading-relaxed flex-1">
        {displayText}
        {needsTruncation && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-brand-600 hover:text-brand-700 font-medium text-sm"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>

      {/* Reviewer name + date */}
      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">
          {review.reviewerName}
        </span>
        {review.reviewDate && (
          <span className="text-xs text-gray-400">{review.reviewDate}</span>
        )}
      </div>
    </div>
  );
}

interface ReviewsSectionProps {
  product: Product;
  platform: Platform;
}

export default function ReviewsSection({
  product,
  platform,
}: ReviewsSectionProps) {
  const { ref: sectionRef, isVisible: sectionVisible } =
    useScrollAnimation<HTMLElement>({ threshold: 0.08 });
  const { containerRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(
    product.featuredReviews.length,
    { staggerDelay: 120 }
  );

  if (product.featuredReviews.length === 0) return null;

  // Horizontal scroll shadow indicators for mobile
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 8);
    };
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <>
      <div className="section-divider" />
      <section
        id="reviews"
        ref={sectionRef}
        className="py-12 px-5 lg:px-8 lg:py-16 scroll-mt-16"
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
              What Customers Are Saying
            </h2>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              {PLATFORM_REVIEW_LABELS[platform]}
            </p>
          </div>

          <div ref={containerRef}>
            {/* Mobile: horizontal scroll */}
            <div className="lg:hidden relative">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5 scrollbar-hide"
              >
                {product.featuredReviews.map((review, i) => (
                  <ReviewCard
                    key={i}
                    review={review}
                    isVisible={visibleItems.has(i)}
                  />
                ))}
              </div>
              {/* Scroll hint */}
              {canScrollRight && (
                <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
              )}
            </div>

            {/* Desktop: grid */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-4">
              {product.featuredReviews.map((review, i) => (
                <ReviewCard
                  key={i}
                  review={review}
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
