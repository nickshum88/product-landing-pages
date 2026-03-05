"use client";

import { useState } from "react";
import Link from "next/link";
import ProductEditor from "@/components/admin/product-editor";
import { Product } from "@/lib/types";
import { getAllBrands } from "@/lib/brands";

type Mode = "choose" | "import" | "scratch" | "editor";

const brands = getAllBrands();

export default function NewProduct() {
  const [mode, setMode] = useState<Mode>("choose");
  const [importedData, setImportedData] = useState<Partial<Product> | null>(
    null
  );
  const [selectedBrand, setSelectedBrand] = useState("");

  // Import form state
  const [amazonUrl, setAmazonUrl] = useState("");
  const [brandUrl, setBrandUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState<string[]>([]);
  const [importError, setImportError] = useState("");

  const handleImport = async () => {
    if (!amazonUrl || !brandUrl) return;

    setImporting(true);
    setImportProgress([]);
    setImportError("");

    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amazonUrl, brandUrl }),
      });

      if (!res.ok) {
        const data = await res.json();
        setImportError(data.error || "Import failed");
        setImporting(false);
        return;
      }

      // Read SSE stream
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        setImportError("Failed to read response stream");
        setImporting(false);
        return;
      }

      let buffer = "";
      let productData: Partial<Product> | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6);

          if (payload === "[DONE]") continue;

          try {
            const data = JSON.parse(payload);
            if (data.progress) {
              setImportProgress((prev) => [...prev, data.progress]);
            }
            if (data.product) {
              productData = data.product;
            }
            if (data.error) {
              setImportError(data.error);
            }
          } catch {
            // Skip malformed JSON
          }
        }
      }

      if (productData) {
        setImportedData({ ...productData, brand: selectedBrand });
        setMode("editor");
      } else if (!importError) {
        setImportError("Import completed but no product data was returned");
      }
    } catch (err) {
      setImportError(
        err instanceof Error ? err.message : "Import failed unexpectedly"
      );
    } finally {
      setImporting(false);
    }
  };

  // Mode: Choose how to create
  if (mode === "choose") {
    return (
      <main className="min-h-screen bg-gray-50 p-6 lg:p-10">
        <div className="max-w-lg mx-auto">
          <div className="mb-6">
            <Link
              href="/products/manage"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              &larr; Back to products
            </Link>
          </div>

          <h1 className="text-xl font-heading font-semibold text-gray-900 mb-6">
            Add New Product
          </h1>

          <div className="space-y-3">
            <div className="bg-white border border-gray-200 p-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-gray-900 transition-colors bg-white"
              >
                <option value="">Select a brand...</option>
                {brands.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setMode("import")}
              disabled={!selectedBrand}
              className="w-full bg-white border border-gray-200 p-5 text-left hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <div className="font-medium text-gray-900">
                Import from Amazon
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Paste an Amazon product URL and we&apos;ll auto-generate
                everything — ingredients, benefits, FAQ, usage steps, and more.
              </p>
            </button>

            <button
              onClick={() => {
                setMode("scratch");
                setImportedData({ brand: selectedBrand });
              }}
              disabled={!selectedBrand}
              className="w-full bg-white border border-gray-200 p-5 text-left hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <div className="font-medium text-gray-900">
                Create from Scratch
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Start with a blank form and fill in all product details
                manually.
              </p>
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Mode: Import form
  if (mode === "import") {
    return (
      <main className="min-h-screen bg-gray-50 p-6 lg:p-10">
        <div className="max-w-lg mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setMode("choose")}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              &larr; Back
            </button>
          </div>

          <h1 className="text-xl font-heading font-semibold text-gray-900 mb-6">
            Import from Amazon
          </h1>

          <div className="bg-white border border-gray-200 p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Brand:</span>
              <span className="font-medium text-gray-900">
                {brands.find((b) => b.slug === selectedBrand)?.name}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amazon Product URL or ASIN
              </label>
              <input
                type="text"
                value={amazonUrl}
                onChange={(e) => setAmazonUrl(e.target.value)}
                placeholder="https://amazon.com/dp/B0XXXXXXXXX or B0XXXXXXXXX"
                className="w-full px-3 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                disabled={importing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand Website URL
              </label>
              <input
                type="text"
                value={brandUrl}
                onChange={(e) => setBrandUrl(e.target.value)}
                placeholder="https://yourbrand.com"
                className="w-full px-3 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                disabled={importing}
              />
              <p className="text-xs text-gray-400 mt-1">
                Used to extract brand colors, name, and logo.
              </p>
            </div>

            {importError && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 text-sm text-red-800">
                {importError}
              </div>
            )}

            {importProgress.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 space-y-1">
                {importProgress.map((msg, i) => (
                  <p key={i} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="text-green-500">
                      {i < importProgress.length - 1 || !importing ? "✓" : "..."}
                    </span>
                    {msg}
                  </p>
                ))}
                {importing && (
                  <p className="text-sm text-gray-400 animate-pulse">
                    Processing...
                  </p>
                )}
              </div>
            )}

            <button
              onClick={handleImport}
              disabled={importing || !amazonUrl || !brandUrl || !selectedBrand}
              className="w-full px-4 py-2.5 text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
            >
              {importing ? "Importing..." : "Import Product"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Mode: Editor (either from import or scratch)
  return (
    <main className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Link
            href="/products/manage"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            &larr; Back to products
          </Link>
        </div>
        <ProductEditor
          initialData={importedData ? importedData : undefined}
        />
      </div>
    </main>
  );
}
