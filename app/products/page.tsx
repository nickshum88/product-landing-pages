"use client";

import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { getAllProducts } from "@/lib/products";
import { Platform, Product } from "@/lib/types";
import { getBrandBaseUrl } from "@/lib/brands";
import ProductFilterBar, {
  useFilteredProducts,
} from "@/components/admin/product-filter-bar";

const URL_VARIANTS: Array<{ label: string; source?: Platform }> = [
  { label: "Generic (shows picker)" },
  { label: "Amazon", source: "amazon" },
  { label: "TikTok Shop", source: "tiktok" },
  { label: "Website", source: "website" },
];

function buildUrl(brandSlug: string, slug: string, source?: Platform) {
  const base = `${getBrandBaseUrl(brandSlug)}/product/${slug}`;
  return source ? `${base}?source=${source}` : base;
}

function QRCard({
  url,
  label,
  slug,
}: {
  url: string;
  label: string;
  slug: string;
}) {
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);

  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPng = () => {
    const svgEl = svgRef.current?.querySelector("svg");
    if (!svgEl) return;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 512, 512);
      ctx.drawImage(img, 0, 0, 512, 512);
      const link = document.createElement("a");
      link.download = `qr-${slug}-${label.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="bg-gray-50 border border-gray-100 p-4 flex flex-col items-center gap-3">
      <p className="text-sm font-medium text-gray-700 text-center">{label}</p>
      <div ref={svgRef} className="bg-white p-3 border border-gray-100">
        <QRCodeSVG value={url} size={140} level="M" />
      </div>
      <p className="text-[11px] text-gray-400 break-all text-center max-w-[180px]">
        {url}
      </p>
      <div className="flex gap-2 w-full">
        <button
          onClick={copy}
          className="flex-1 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-center"
        >
          {copied ? "Copied!" : "Copy URL"}
        </button>
        <button
          onClick={downloadPng}
          className="flex-1 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-center"
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default function ProductsAdmin() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const products = useFilteredProducts(allProducts, search, brandFilter);

  useEffect(() => {
    setAllProducts(getAllProducts());
  }, []);

  return (
    <main className="min-h-screen bg-white p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Product Landing Pages
          </h1>
          <p className="text-gray-500 text-sm">
            Internal admin — QR code URLs for product packaging
          </p>
        </div>

        {/* Filter bar */}
        {allProducts.length > 0 && (
          <div className="mb-8">
            <ProductFilterBar
              products={allProducts}
              search={search}
              onSearchChange={setSearch}
              brandFilter={brandFilter}
              onBrandFilterChange={setBrandFilter}
            />
          </div>
        )}

        {products.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            {allProducts.length === 0 ? (
              <>
                <p className="text-lg mb-1">No products configured yet.</p>
                <p className="text-sm">
                  Run{" "}
                  <code className="bg-gray-100 px-2 py-0.5 text-gray-600">
                    npx ts-node scripts/import-product.ts --asin=&quot;B0XXXXXXXXX&quot;
                  </code>{" "}
                  to add your first product.
                </p>
              </>
            ) : (
              <p className="text-lg">No products match your search.</p>
            )}
          </div>
        )}

        <div className="space-y-12">
          {products.map((product) => (
            <div
              key={product.slug}
              className="border border-gray-200 overflow-hidden"
            >
              {/* Product header */}
              <div className="p-5 lg:p-6 border-b border-gray-100 flex items-center gap-5">
                <div className="w-16 h-16 bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
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
                  <h2 className="font-semibold text-gray-900 text-lg">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {product.tagline}
                  </p>
                  <div className="flex items-center gap-4 mt-1.5">
                    <span className="text-xs text-gray-400">
                      ASIN: {product.asin}
                    </span>
                    <span className="text-xs text-gray-400">
                      Slug: {product.slug}
                    </span>
                  </div>
                </div>
                <a
                  href={buildUrl(product.brand, product.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                >
                  View Live Page
                </a>
              </div>

              {/* QR codes grid */}
              <div className="p-5 lg:p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  QR Codes & URLs
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {URL_VARIANTS.map(({ label, source }) => (
                    <QRCard
                      key={label}
                      url={buildUrl(product.brand, product.slug, source)}
                      label={label}
                      slug={product.slug}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
