"use client";

import { useState, useEffect } from "react";

const SECTIONS = ["usage", "science", "timeline", "reviews", "faq", "help"] as const;
export type SectionId = (typeof SECTIONS)[number];

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("usage");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }

          // Pick the section with highest visibility
          let best: SectionId = activeSection;
          let bestRatio = 0;
          visibleSections.forEach((ratio, sectionId) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = sectionId as SectionId;
            }
          });
          if (bestRatio > 0) {
            setActiveSection(best);
          }
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-80px 0px -40% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return activeSection;
}
