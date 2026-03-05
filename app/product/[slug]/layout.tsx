import type { Metadata } from "next";
import { getProduct } from "@/lib/products";
import { getBrandBySlug } from "@/lib/brands";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

interface Props {
  params: { slug: string };
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProduct(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const brand = getBrandBySlug(product.brand);
  const brandName = brand?.name || "Product Support";
  const url = `${SITE_URL}/product/${product.slug}`;
  const imageUrl = product.heroImage.startsWith("http")
    ? product.heroImage
    : `${SITE_URL}${product.heroImage}`;

  return {
    title: `${product.name} | ${brandName}`,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
      url,
      siteName: brandName,
      images: [
        {
          url: imageUrl,
          width: 600,
          height: 600,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: product.name,
      description: product.tagline,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ProductLayout({ params, children }: Props) {
  const product = getProduct(params.slug);
  const brand = product ? getBrandBySlug(product.brand) : null;

  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.tagline,
        image: product.heroImage.startsWith("http")
          ? product.heroImage
          : `${SITE_URL}${product.heroImage}`,
        brand: {
          "@type": "Brand",
          name: brand?.name || "Product Support",
        },
        offers: {
          "@type": "Offer",
          url: product.amazonUrl,
          availability: "https://schema.org/InStock",
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
