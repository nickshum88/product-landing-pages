"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProducts, getProductsByBrand } from "@/lib/products";
import { getBrandByDomain } from "@/lib/brands";
import { Product } from "@/lib/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const brand = getBrandByDomain(window.location.hostname);
    setProducts(brand ? getProductsByBrand(brand.slug) : getAllProducts());
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Product Landing Pages
        </h1>
        <p className="text-gray-500 mb-8">
          Scan a QR code on your product packaging to get started.
        </p>
        {products.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-400">Available products:</p>
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
