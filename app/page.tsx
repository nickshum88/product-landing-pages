import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export default function Home() {
  const products = getAllProducts();

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
                className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {product.tagline}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
