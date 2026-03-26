"use client";

import { useState } from "react";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { getBrandBaseUrl } from "@/lib/brands";
import ProductFilterBar, {
  useFilteredProducts,
} from "@/components/admin/product-filter-bar";

export default function ManageProducts() {
  const allProducts = getAllProducts();
  const [loggingOut, setLoggingOut] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    slug: string;
    name: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const products = useFilteredProducts(allProducts, search, brandFilter);

  const handleCopyUrl = (brandSlug: string, slug: string) => {
    const baseUrl = getBrandBaseUrl(brandSlug);
    navigator.clipboard.writeText(`${baseUrl}/product/${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/products/manage/login";
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError("");

    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteTarget),
      });

      if (res.ok) {
        setDeleteTarget(null);
        window.location.reload();
      } else {
        const data = await res.json();
        setDeleteError(data.error || "Delete failed");
      }
    } catch {
      setDeleteError("Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900">
              Product Manager
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Create, edit, and publish product landing pages.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="px-4 py-2 text-sm bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              QR Codes
            </Link>
            <Link
              href="/products/manage/new"
              className="px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors"
            >
              + Add Product
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filter bar */}
        {allProducts.length > 0 && (
          <div className="mb-6">
            <ProductFilterBar
              products={allProducts}
              search={search}
              onSearchChange={setSearch}
              brandFilter={brandFilter}
              onBrandFilterChange={setBrandFilter}
            />
          </div>
        )}

        {/* Product list */}
        {products.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center">
            {allProducts.length === 0 ? (
              <>
                <p className="text-gray-500 mb-2">No products yet.</p>
                <Link
                  href="/products/manage/new"
                  className="text-sm text-gray-900 underline hover:no-underline"
                >
                  Add your first product
                </Link>
              </>
            ) : (
              <p className="text-gray-500">
                No products match your search.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.slug}
                className="bg-white border border-gray-200 p-4 flex items-center gap-4 hover:border-gray-300 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {product.tagline}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">
                      /{product.slug}
                    </span>
                    <span className="text-xs text-gray-400">
                      {product.asin}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleCopyUrl(product.brand, product.slug)}
                    className="px-3 py-1.5 text-xs bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {copiedSlug === product.slug ? "Copied!" : "Copy URL"}
                  </button>
                  <a
                    href={`${getBrandBaseUrl(product.brand)}/product/${product.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    View
                  </a>
                  <Link
                    href={`/products/manage/${product.slug}`}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() =>
                      setDeleteTarget({
                        slug: product.slug,
                        name: product.name,
                      })
                    }
                    className="px-3 py-1.5 text-xs text-red-500 border border-red-200 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-sm w-full p-6">
            <h3 className="font-heading font-semibold text-gray-900 mb-2">
              Delete Product
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete{" "}
              <strong>{deleteTarget.name}</strong>? This will remove the
              landing page, config file, and hero image from the repository.
            </p>

            {deleteError && (
              <p className="text-sm text-red-600 mb-3">{deleteError}</p>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteTarget(null);
                  setDeleteError("");
                }}
                disabled={deleting}
                className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 transition-colors"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
