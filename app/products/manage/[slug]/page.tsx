"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/products";
import ProductEditor from "@/components/admin/product-editor";

export default function EditProduct() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProduct(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-500 mb-2">
            Product &quot;{slug}&quot; not found.
          </p>
          <Link
            href="/products/manage"
            className="text-sm text-gray-900 underline hover:no-underline"
          >
            Back to products
          </Link>
        </div>
      </main>
    );
  }

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
        <ProductEditor initialData={product} isEdit />
      </div>
    </main>
  );
}
