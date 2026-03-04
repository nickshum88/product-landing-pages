"use client";

import { useActiveSection, SectionId } from "@/hooks/use-active-section";
import { trackSectionView } from "@/lib/analytics";

const NAV_ITEMS: Array<{ id: SectionId; label: string; fullLabel: string }> = [
  { id: "usage", label: "Use", fullLabel: "How to Use" },
  { id: "benefits", label: "Benefits", fullLabel: "Benefits" },
  { id: "ingredients", label: "Inside", fullLabel: "Ingredients" },
  { id: "faq", label: "FAQ", fullLabel: "FAQ" },
  { id: "returns", label: "Returns", fullLabel: "Returns" },
];

interface BottomNavProps {
  productSlug: string;
  accentColor: string;
}

export default function BottomNav({ productSlug, accentColor }: BottomNavProps) {
  const activeSection = useActiveSection();

  const handleClick = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      trackSectionView(productSlug, id);
    }
  };

  return (
    <>
      {/* Mobile: bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 lg:hidden">
        <div className="max-w-lg mx-auto flex items-center justify-around px-2 h-14">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className="relative flex flex-col items-center justify-center flex-1 h-full transition-colors"
              >
                <span
                  className={`text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
                    isActive ? "text-brand-600" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
                {isActive && (
                  <span
                    className="absolute bottom-1 w-6 h-0.5"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop: top sticky bar */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-8 h-14">
          <span className="font-heading font-semibold text-gray-900 text-sm">
            Product Guide
          </span>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(({ id, fullLabel }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  className={`relative px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {fullLabel}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-0.5"
                      style={{ backgroundColor: accentColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
