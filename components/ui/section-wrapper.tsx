"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface SectionWrapperProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionWrapperProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.08 });

  return (
    <>
      <div className="section-divider" />
      <section
        id={id}
        ref={ref}
        className={`py-12 px-5 lg:px-8 lg:py-16 scroll-mt-16 ${className}`}
      >
        <div className="max-w-lg md:max-w-2xl lg:max-w-[1100px] mx-auto">
          <div
            className={`mb-8 transition-all duration-[600ms] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="font-heading font-bold text-[22px] text-gray-900 mb-1 uppercase tracking-wide">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[13px] text-gray-500 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
