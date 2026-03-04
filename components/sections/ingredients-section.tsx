"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import SectionWrapper from "@/components/ui/section-wrapper";

interface IngredientsSectionProps {
  product: Product;
}

export default function IngredientsSection({
  product,
}: IngredientsSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const midpoint = Math.ceil(product.ingredients.length / 2);
  const leftIngredients = product.ingredients.slice(0, midpoint);
  const rightIngredients = product.ingredients.slice(midpoint);

  const renderHeader = () => (
    <div className="flex items-center justify-between px-5 py-3 bg-gray-50/80 border-b border-gray-100">
      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
        Ingredient
      </span>
      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
        Amount
      </span>
    </div>
  );

  const renderIngredient = (
    ingredient: (typeof product.ingredients)[number],
    globalIndex: number,
    isLast: boolean
  ) => {
    const isOpen = expandedIndex === globalIndex;
    return (
      <button
        key={globalIndex}
        onClick={() => setExpandedIndex(isOpen ? null : globalIndex)}
        className={`w-full text-left transition-colors hover:bg-brand-50/50 ${
          !isLast ? "border-b border-gray-50" : ""
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="font-medium text-gray-900 text-[14px] flex-1 mr-3">
            {ingredient.name}
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-sm text-gray-500">
              {ingredient.amount}
            </span>
            <svg
              viewBox="0 0 16 16"
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </div>
        </div>

        <div className={`accordion-content ${isOpen ? "is-open" : ""}`}>
          <div>
            <p className="px-5 pb-3.5 text-sm text-gray-600 leading-relaxed">
              {ingredient.description}
            </p>
          </div>
        </div>
      </button>
    );
  };

  return (
    <SectionWrapper
      id="ingredients"
      title="What's Inside"
      subtitle="Every ingredient, explained"
    >
      {/* Mobile: single table */}
      <div className="md:hidden bg-white border border-gray-100 shadow-sm overflow-hidden">
        {renderHeader()}
        {product.ingredients.map((ingredient, index) =>
          renderIngredient(
            ingredient,
            index,
            index === product.ingredients.length - 1
          )
        )}
      </div>

      {/* Tablet+: two-column grid */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-4">
        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          {renderHeader()}
          {leftIngredients.map((ingredient, i) =>
            renderIngredient(ingredient, i, i === leftIngredients.length - 1)
          )}
        </div>
        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          {renderHeader()}
          {rightIngredients.map((ingredient, i) =>
            renderIngredient(
              ingredient,
              midpoint + i,
              i === rightIngredients.length - 1
            )
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
