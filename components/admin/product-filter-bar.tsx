"use client";

import { useMemo } from "react";
import { Product } from "@/lib/types";
import { getAllBrands } from "@/lib/brands";

interface ProductFilterBarProps {
  products: Product[];
  search: string;
  onSearchChange: (value: string) => void;
  brandFilter: string;
  onBrandFilterChange: (value: string) => void;
}

export function useFilteredProducts(
  products: Product[],
  search: string,
  brandFilter: string
): Product[] {
  return useMemo(() => {
    let filtered = products;
    if (brandFilter) {
      filtered = filtered.filter((p) => p.brand === brandFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.asin.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [products, search, brandFilter]);
}

export default function ProductFilterBar({
  products,
  search,
  onSearchChange,
  brandFilter,
  onBrandFilterChange,
}: ProductFilterBarProps) {
  const brands = getAllBrands();

  // Count products per brand for the filter pills
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    }
    return counts;
  }, [products]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 w-full sm:max-w-xs">
        <svg
          viewBox="0 0 20 20"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M13 13l4 4" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
        />
      </div>

      {/* Brand filter pills */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => onBrandFilterChange("")}
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
            !brandFilter
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          All ({products.length})
        </button>
        {brands.map((brand) => {
          const count = brandCounts[brand.slug] || 0;
          if (count === 0) return null;
          return (
            <button
              key={brand.slug}
              onClick={() =>
                onBrandFilterChange(brandFilter === brand.slug ? "" : brand.slug)
              }
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                brandFilter === brand.slug
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {brand.name} ({count})
            </button>
          );
        })}
      </div>
    </div>
  );
}
