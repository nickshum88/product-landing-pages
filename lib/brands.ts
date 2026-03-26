import { SupportContact } from "./types";

export interface BrandConfig {
  slug: string;
  name: string;
  domains: string[]; // production domains (with and without www)
  defaultSupportContacts?: {
    amazon?: SupportContact;
    tiktok?: SupportContact;
    website?: SupportContact;
  };
}

/**
 * Add your brands here. Each brand maps to one or more production domains.
 * Products with a matching `brand` field will only be served on that brand's domain.
 *
 * Example:
 *   { slug: "nusava", name: "Nusava", domains: ["nusava.com", "www.nusava.com"] }
 */
export const brands: BrandConfig[] = [
  {
    slug: "nusava",
    name: "Nusava",
    domains: ["pages.nusava.com", "www.pages.nusava.com"],
    defaultSupportContacts: {
      website: {
        phone: "+1 415-800-4758",
        email: "hello@getnusava.com",
      },
    },
  },
  {
    slug: "medchoice",
    name: "MedChoice",
    domains: ["pages.medchoice.co", "www.pages.medchoice.co"],
    defaultSupportContacts: {
      website: {
        phone: "+1 510-470-6744",
        email: "support@medchoice.co",
      },
    },
  },
  {
    slug: "primemd",
    name: "PrimeMD",
    domains: ["pages.getprimemd.com", "www.pages.getprimemd.com"],
    defaultSupportContacts: {
      website: {
        phone: "+1 424-256-1649",
        email: "hi@getprimemd.com",
      },
    },
  },
];

export function getBrandByDomain(hostname: string): BrandConfig | null {
  // In development (localhost), no brand restriction
  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    return null;
  }
  return brands.find((b) => b.domains.includes(hostname)) || null;
}

export function getBrandBySlug(slug: string): BrandConfig | null {
  return brands.find((b) => b.slug === slug) || null;
}

export function getAllBrands(): BrandConfig[] {
  return brands;
}
