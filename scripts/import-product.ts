#!/usr/bin/env ts-node

/**
 * Amazon Product Import Script
 *
 * Fetches an Amazon product listing and uses Claude to transform it into
 * a structured product config for the landing page system.
 *
 * Usage:
 *   npx ts-node scripts/import-product.ts --asin="B0XXXXXXXXX" --brand-url="https://nusava.com"
 *   npx ts-node scripts/import-product.ts --url="https://amazon.com/dp/B0XXXXXXXXX" --brand-url="https://nusava.com"
 *   npx ts-node scripts/import-product.ts --file="./saved-page.html" --brand-url="https://nusava.com"
 */

import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file (standalone script — Next.js doesn't load it for us)
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

// --- Argument parsing ---

function parseArgs(): { asin: string; html: string; brandUrl: string } {
  const args = process.argv.slice(2);
  const flags: Record<string, string> = {};

  for (const arg of args) {
    // Support both --key=value and --key-with-dashes=value
    const match = arg.match(/^--([a-zA-Z-]+)=(.+)$/);
    if (match) {
      flags[match[1]] = match[2];
    }
  }

  let asin = flags.asin || "";
  let html = "";
  const brandUrl = flags["brand-url"] || "";

  if (flags.url) {
    const urlMatch = flags.url.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
    if (urlMatch) asin = urlMatch[1];
    else {
      console.error("Could not extract ASIN from URL.");
      process.exit(1);
    }
  }

  if (flags.file) {
    const filePath = path.resolve(flags.file);
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }
    html = fs.readFileSync(filePath, "utf-8");
    if (!asin) {
      const asinMatch = html.match(/\/dp\/([A-Z0-9]{10})/);
      if (asinMatch) asin = asinMatch[1];
    }
  }

  if (!asin || !brandUrl) {
    console.error(
      "Usage:\n" +
        '  npx ts-node scripts/import-product.ts --asin="B0XXXXXXXXX" --brand-url="https://yourbrand.com"\n' +
        '  npx ts-node scripts/import-product.ts --url="https://amazon.com/dp/B0XXXXXXXXX" --brand-url="https://yourbrand.com"\n' +
        '  npx ts-node scripts/import-product.ts --file="./saved-page.html" --brand-url="https://yourbrand.com"\n\n' +
        "Required:\n" +
        "  --brand-url  Your brand's website URL (used to extract brand colors, name, and identity)\n" +
        "  --asin       Amazon ASIN (or use --url or --file instead)\n"
    );
    process.exit(1);
  }

  return { asin, html, brandUrl };
}

// --- Fetch Amazon page ---

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
      (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          fetchPage(res.headers.location).then(resolve).catch(reject);
          return;
        }
        let data = "";
        res.on("data", (chunk: Buffer) => (data += chunk.toString()));
        res.on("end", () => resolve(data));
        res.on("error", reject);
      }
    );
    req.on("error", reject);
    req.end();
  });
}

// --- Extract brand identity from brand website ---

interface BrandInfo {
  name: string;
  url: string;
  colors: string[];
  description: string;
  logoUrl: string | null;
}

async function extractBrandInfo(brandUrl: string): Promise<BrandInfo> {
  console.log(`Fetching brand website: ${brandUrl}`);

  let html: string;
  try {
    html = await fetchPage(brandUrl);
  } catch {
    console.warn("Could not fetch brand website. Using URL as brand reference only.");
    return {
      name: new URL(brandUrl).hostname.replace("www.", "").split(".")[0],
      url: brandUrl,
      colors: [],
      description: "",
      logoUrl: null,
    };
  }

  const $ = cheerio.load(html);

  // Brand name: og:site_name > title > domain
  const ogSiteName = $('meta[property="og:site_name"]').attr("content")?.trim();
  const titleText = $("title").text().trim().split(/[|–—-]/)[0].trim();
  const domainName = new URL(brandUrl).hostname.replace("www.", "").split(".")[0];
  const name = ogSiteName || titleText || domainName;

  // Description: og:description or meta description
  const description =
    $('meta[property="og:description"]').attr("content")?.trim() ||
    $('meta[name="description"]').attr("content")?.trim() ||
    "";

  // Colors: theme-color meta, CSS custom properties, inline styles
  const colors: string[] = [];
  const seen = new Set<string>();

  const addColor = (hex: string) => {
    const normalized = hex.toLowerCase();
    // Skip near-white, near-black, and gray colors
    if (/^#(f{3,6}|0{3,6}|(?:([0-9a-f])\2){3})$/i.test(normalized)) return;
    if (!seen.has(normalized)) {
      seen.add(normalized);
      colors.push(normalized);
    }
  };

  // Theme color meta tag (most reliable brand signal)
  const themeColor = $('meta[name="theme-color"]').attr("content")?.trim();
  if (themeColor && themeColor.startsWith("#")) addColor(themeColor);

  // Extract colors from inline styles and style tags
  const allStyles = $("style").text() + " " + $("[style]").map((_, el) => $(el).attr("style")).get().join(" ");
  const hexMatches = allStyles.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
  for (const hex of hexMatches) {
    // Only 3-digit or 6-digit hex
    if (/^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/.test(hex)) {
      addColor(hex);
    }
  }

  // CSS custom properties that likely hold brand colors
  const cssVarMatches = allStyles.match(/--(?:primary|brand|accent|main|theme)[^:]*:\s*(#[0-9a-fA-F]{3,6})/gi) || [];
  for (const match of cssVarMatches) {
    const hex = match.match(/#[0-9a-fA-F]{3,6}/)?.[0];
    if (hex) addColor(hex);
  }

  // Logo URL: og:image or common logo selectors
  const ogImage = $('meta[property="og:image"]').attr("content")?.trim() || null;
  let logoUrl: string | null = null;
  const logoEl = $('img[alt*="logo" i], img[class*="logo" i], .logo img, #logo img, a[class*="logo" i] img').first();
  const logoSrc = logoEl.attr("src");
  if (logoSrc) {
    logoUrl = logoSrc.startsWith("http") ? logoSrc : new URL(logoSrc, brandUrl).href;
  } else if (ogImage) {
    logoUrl = ogImage.startsWith("http") ? ogImage : new URL(ogImage, brandUrl).href;
  }

  return { name, url: brandUrl, colors: colors.slice(0, 10), description, logoUrl };
}

// --- Extract relevant text from HTML ---

function extractPageContent(html: string): string {
  const $ = cheerio.load(html);

  // Remove noise elements
  $("script, style, nav, footer, header, #navbar, #navFooter, #reviewsMedley, #cr-dp-summarization-attributes, .cr-widget-FocalReviews").remove();

  const sections: string[] = [];

  // Title
  const title = $("#productTitle").text().trim();
  if (title) sections.push(`PRODUCT TITLE: ${title}`);

  // Price
  const price = $(".a-price .a-offscreen").first().text().trim();
  if (price) sections.push(`PRICE: ${price}`);

  // Product overview (brand, flavor, form, diet type, etc.)
  const overview: string[] = [];
  $("#productOverview_feature_div tr, #productOverview_feature_div .a-row").each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, " ");
    if (text && text.length > 3) overview.push(text);
  });
  if (overview.length) sections.push(`PRODUCT OVERVIEW:\n${overview.join("\n")}`);

  // Feature bullets ("About this item")
  const bullets: string[] = [];
  $("#feature-bullets li, #featurebullets_feature_div li").each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 5) bullets.push(text);
  });
  if (bullets.length) sections.push(`FEATURE BULLETS:\n${bullets.join("\n")}`);

  // Product description
  const desc = $("#productDescription").text().trim();
  if (desc) sections.push(`PRODUCT DESCRIPTION:\n${desc}`);

  // A+ content / Enhanced brand content
  const aplusSections: string[] = [];
  $("#aplus, #aplusProductDescription, #aplus_feature_div").find("h2, h3, h4, p, .aplus-module-wrapper").each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, " ");
    if (text && text.length > 5) aplusSections.push(text);
  });
  // Deduplicate A+ text (often repeats)
  const aplusText = Array.from(new Set(aplusSections)).join("\n");
  if (aplusText) sections.push(`A+ CONTENT:\n${aplusText.slice(0, 5000)}`);

  // "From the brand" story section
  const brandStory = $("#brandSnapshot_feature_div, .brand-story-card").text().trim().replace(/\s+/g, " ");
  if (brandStory && brandStory.length > 10) sections.push(`BRAND STORY:\n${brandStory.slice(0, 2000)}`);

  // Supplement Facts / Nutrition Facts — multiple possible locations
  const supplementFacts: string[] = [];

  // Location 1: #important-information section (most common for supplements)
  $("#important-information").find("table").each((_, table) => {
    $(table).find("tr").each((_, tr) => {
      const cells = $(tr).find("td, th").map((__, td) => $(td).text().trim()).get();
      if (cells.length) supplementFacts.push(cells.join(" | "));
    });
  });

  // Location 2: Product details supplement facts table
  $("#productDetails_db_sections table, #prodDetails table").each((_, table) => {
    $(table).find("tr").each((_, tr) => {
      const cells = $(tr).find("td, th").map((__, td) => $(td).text().trim()).get();
      if (cells.length) supplementFacts.push(cells.join(" | "));
    });
  });

  // Location 3: Inline supplement/nutrition facts images with alt text
  $("img").each((_, el) => {
    const alt = $(el).attr("alt") || "";
    if (/supplement.?facts|nutrition.?facts/i.test(alt)) {
      supplementFacts.push(`[Image alt: ${alt}]`);
    }
  });

  // Location 4: Text-based supplement facts (often in A+ or description)
  const sfRegex = /supplement\s*facts[\s\S]*?(?:\*.*?daily\s*value|(?:other\s*ingredients|directions))/i;
  const htmlText = $("body").text();
  const sfMatch = htmlText.match(sfRegex);
  if (sfMatch) supplementFacts.push(sfMatch[0].replace(/\s+/g, " ").slice(0, 3000));

  if (supplementFacts.length) sections.push(`SUPPLEMENT FACTS:\n${Array.from(new Set(supplementFacts)).join("\n")}`);

  // Important information — full text (directions, warnings, ingredients list)
  const importantSections: string[] = [];
  $("#important-information").children("div, section, .a-section").each((_, el) => {
    const heading = $(el).find("h3, h4, .a-text-bold").first().text().trim();
    const body = $(el).text().trim().replace(/\s+/g, " ");
    if (body && body.length > 10) {
      importantSections.push(heading ? `[${heading}] ${body}` : body);
    }
  });
  // Fallback: grab the whole section if children approach didn't work
  if (importantSections.length === 0) {
    const importantText = $("#important-information").text().trim().replace(/\s+/g, " ");
    if (importantText) importantSections.push(importantText);
  }
  if (importantSections.length) sections.push(`IMPORTANT INFORMATION (Directions, Warnings, Ingredients):\n${importantSections.join("\n\n")}`);

  // Product details table (dimensions, weight, ASIN, etc.)
  const details: string[] = [];
  $(
    "#productDetails_techSpec_section_1 tr, " +
    "#detailBullets_feature_div li, " +
    "#productDetails_detailBullets_sections1 tr, " +
    "#prodDetails tr"
  ).each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, " ");
    if (text && text.length > 3) details.push(text);
  });
  if (details.length) sections.push(`PRODUCT DETAILS:\n${Array.from(new Set(details)).join("\n")}`);

  // Sustainability / certifications section
  const sustainability = $("#sustainabilitySection, #climatePledgeFriendly").text().trim().replace(/\s+/g, " ");
  if (sustainability && sustainability.length > 10) sections.push(`SUSTAINABILITY:\n${sustainability.slice(0, 1000)}`);

  // Frequently bought together (gives context on related products)
  const fbt: string[] = [];
  $("#sims-fbt .a-link-normal").each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 10) fbt.push(text);
  });
  if (fbt.length) sections.push(`FREQUENTLY BOUGHT TOGETHER:\n${fbt.slice(0, 5).join("\n")}`);

  // Star rating and review count
  const rating = $("#acrPopover").attr("title") || $(".a-icon-alt").first().text().trim();
  const reviewCount = $("#acrCustomerReviewText").text().trim();
  if (rating || reviewCount) sections.push(`RATINGS: ${rating} ${reviewCount}`.trim());

  // Variation info (size, flavor, count options)
  const variations: string[] = [];
  $("#twister_feature_div .selection, #variation_size_name .selection, #variation_flavor_name .selection, #variation_style_name .selection").each((_, el) => {
    const text = $(el).text().trim();
    if (text) variations.push(text);
  });
  if (variations.length) sections.push(`VARIATIONS/OPTIONS: ${variations.join(", ")}`);

  if (sections.length === 0) {
    // Fallback: get visible body text
    const bodyText = $("body").text().replace(/\s+/g, " ").trim();
    sections.push(bodyText.slice(0, 8000));
  }

  return sections.join("\n\n---\n\n");
}

// --- Extract and download product image ---

function extractMainImageUrl(html: string): string | null {
  const $ = cheerio.load(html);

  // Try high-res image from data attribute
  const landingImg = $("#landingImage, #imgBlkFront, #ebooksImgBlkFront");
  const hiRes = landingImg.attr("data-old-hires");
  if (hiRes) return hiRes;

  // Try src of landing image
  const src = landingImg.attr("src");
  if (src && src.startsWith("http")) return src;

  // Try dynamic image data (JSON embedded in the image tag)
  const dynamicStr = landingImg.attr("data-a-dynamic-image");
  if (dynamicStr) {
    try {
      const dynamicData = JSON.parse(dynamicStr) as Record<string, unknown>;
      const urls = Object.keys(dynamicData);
      // Pick the largest image (last in the sorted keys typically)
      if (urls.length) return urls[urls.length - 1];
    } catch {
      // ignore parse errors
    }
  }

  // Try colorImages JSON embedded in page scripts
  const scriptMatch = html.match(
    /'colorImages':\s*\{[^}]*'initial':\s*(\[[\s\S]*?\])\s*\}/
  );
  if (scriptMatch) {
    try {
      const images = JSON.parse(scriptMatch[1]) as Array<{ hiRes?: string; large?: string }>;
      if (images[0]?.hiRes) return images[0].hiRes;
      if (images[0]?.large) return images[0].large;
    } catch {
      // ignore parse errors
    }
  }

  // Fallback: any large product image
  let bestUrl: string | null = null;
  $("img").each((_, el) => {
    const imgSrc = $(el).attr("src") || "";
    if (
      imgSrc.includes("images-na.ssl-images-amazon.com") ||
      imgSrc.includes("m.media-amazon.com")
    ) {
      if (imgSrc.includes("_SL") || imgSrc.includes("_AC_")) {
        bestUrl = imgSrc;
        return false; // break
      }
    }
  });

  return bestUrl;
}

// --- Extract ALL product listing images (for vision analysis) ---

function extractAllImageUrls(html: string): string[] {
  const $ = cheerio.load(html);
  const urls: string[] = [];
  const seen = new Set<string>();

  const addUrl = (url: string) => {
    // Normalize: get base URL without size params, then request large version
    const base = url.split("?")[0].replace(/\._[^.]+\./, "._SL1500_.");
    if (!seen.has(base) && base.startsWith("http")) {
      seen.add(base);
      urls.push(base);
    }
  };

  // Method 1: colorImages JSON in page scripts (most reliable, has all images)
  const colorImagesMatch = html.match(
    /'colorImages':\s*\{[^}]*'initial':\s*(\[[\s\S]*?\])\s*\}/
  );
  if (colorImagesMatch) {
    try {
      const images = JSON.parse(colorImagesMatch[1]) as Array<{
        hiRes?: string;
        large?: string;
        main?: Record<string, unknown>;
      }>;
      for (const img of images) {
        if (img.hiRes) addUrl(img.hiRes);
        else if (img.large) addUrl(img.large);
      }
    } catch {
      // ignore
    }
  }

  // Method 2: data-a-dynamic-image on main image
  const dynamicStr = $("#landingImage, #imgBlkFront").attr("data-a-dynamic-image");
  if (dynamicStr) {
    try {
      const dynamicData = JSON.parse(dynamicStr) as Record<string, unknown>;
      for (const u of Object.keys(dynamicData)) addUrl(u);
    } catch {
      // ignore
    }
  }

  // Method 3: Thumbnail strip images (altImages section)
  $("#altImages img, .imageThumbnail img").each((_, el) => {
    const src = $(el).attr("src");
    if (src && src.includes("images") && !src.includes("play-icon")) {
      // Convert thumbnail to full-size
      addUrl(src.replace(/\._[^.]+\./, "._SL1500_."));
    }
  });

  return urls;
}

function downloadImageAsBase64(url: string): Promise<{ base64: string; mediaType: string } | null> {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (
        res.statusCode &&
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location
      ) {
        downloadImageAsBase64(res.headers.location).then(resolve);
        return;
      }
      if (res.statusCode !== 200) {
        resolve(null);
        return;
      }
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const contentType = res.headers["content-type"] || "image/jpeg";
        const mediaType = contentType.split(";")[0].trim();
        resolve({ base64: buffer.toString("base64"), mediaType });
      });
      res.on("error", () => resolve(null));
    });
    req.on("error", () => resolve(null));
    req.end();
  });
}

function downloadImage(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : https;
    const req = protocol.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (
        res.statusCode &&
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location
      ) {
        downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Image download failed with status ${res.statusCode}`));
        return;
      }
      const dir = path.dirname(destPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on("finish", () => {
        fileStream.close();
        resolve();
      });
      fileStream.on("error", reject);
    });
    req.on("error", reject);
    req.end();
  });
}

// --- Generate product config via Claude ---

async function generateProductConfig(
  asin: string,
  pageContent: string,
  imageData: Array<{ base64: string; mediaType: string }> = [],
  brandInfo: BrandInfo | null = null
): Promise<string> {
  console.log("Sending to Claude for analysis...");

  // Build message content: images first (so Claude can see supplement facts), then text
  const content: Array<Anthropic.ImageBlockParam | Anthropic.TextBlockParam> = [];

  for (const img of imageData) {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: img.mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
        data: img.base64,
      },
    });
  }

  content.push({
    type: "text" as const,
    text: `You are a product data extraction assistant. Given an Amazon product listing page content AND product images (which may include the Supplement Facts label), generate a TypeScript product configuration file.

IMPORTANT: Carefully examine ALL attached images. One or more images likely shows the Supplement Facts panel with exact ingredient amounts, serving size, and other nutritional info. Extract ALL data from those images.

ASIN: ${asin}
${brandInfo ? `
=== BRAND IDENTITY (from ${brandInfo.url}) ===
Brand Name: ${brandInfo.name}
${brandInfo.description ? `Brand Description: ${brandInfo.description}` : ""}
${brandInfo.colors.length > 0 ? `Brand Colors (extracted from website): ${brandInfo.colors.join(", ")}` : ""}
${brandInfo.logoUrl ? `Brand Logo: ${brandInfo.logoUrl}` : ""}

IMPORTANT: This product belongs to the "${brandInfo.name}" brand. The generated config MUST:
- Reference "${brandInfo.name}" (not "Nusava" or any other brand) in chatbotContext and tagline
- Use the brand's website colors for the colors.primary and colors.accent fields${brandInfo.colors.length > 0 ? `\n- The brand's primary color is likely ${brandInfo.colors[0]}. Use it or a close variant as colors.primary` : ""}
- Keep the landing page visually consistent with ${brandInfo.url}
` : ""}
PAGE CONTENT:
${pageContent}

Generate a TypeScript file that exports a Product config. Follow this exact structure:

\`\`\`typescript
import { Product } from "../types";

export const [camelCaseVariableName]: Product = {
  slug: "[kebab-case-slug]",
  name: "[Product Name — clean, no brand prefix repetition]",
  tagline: "[1-sentence consumer-friendly tagline]",
  heroImage: "/products/[slug].png",
  amazonUrl: "https://www.amazon.com/dp/${asin}",
  asin: "${asin}",
  colors: {
    primary: "[hex color matching product branding/packaging]",
    accent: "[complementary hex color]",
    background: "[very light tint of primary, for section backgrounds]",
  },
  trustBadges: [/* certifications from listing: e.g. "Vegan", "Non-GMO", "GMP Certified", "Third-Party Tested", "Made in USA" */],
  usageSteps: [/* 3-5 steps: { icon: "emoji", title: "short title", detail: "1-sentence instruction" } */],
  proTips: [/* 3-5 practical tips extracted from listing directions, bullet points, or Q&A */],
  benefits: [/* 4-6 benefits: { icon: "emoji", title: "short title", description: "1-2 sentence educational benefit" } */],
  ingredients: [/* ALL ingredients from supplement facts — see rules below */],
  faq: [/* 6-8 Q&A: { question: "...", answer: "..." } */],
  chatbotContext: \`[see rules below]\`,
  suggestedPrompts: [/* 4 quick-start chat prompts relevant to this product */],
};
\`\`\`

=== CRITICAL EXTRACTION RULES ===

IMAGES — READ THE SUPPLEMENT FACTS LABEL:
- One or more of the attached images should show the Supplement Facts panel
- Extract EVERY ingredient with its EXACT amount and unit from the label image
- Extract the Serving Size and Servings Per Container from the label
- Extract % Daily Value for each ingredient if shown
- Extract "Other Ingredients" list from the label
- Extract any Warnings or Directions text visible in images

INGREDIENTS — THIS IS THE HIGHEST PRIORITY:
- Extract EVERY ingredient from the Supplement Facts / Nutrition Facts with EXACT amounts and units (e.g. "5000 mcg", "2 mg", "400 mcg DFE")
- Include the form in parentheses if listed (e.g. "Methylcobalamin", "Pyridoxine HCl", "as Cholecalciferol")
- Include % Daily Value if shown (put in the description, e.g. "208,333% Daily Value")
- If the listing mentions "Other Ingredients", include them as a single entry with amount "—"
- NEVER use TODO or placeholder text for amounts. If an amount isn't in the extracted content, write "See label" — but this should be rare since images are provided
- Serving size and servings per container should be noted in chatbotContext, not in ingredients

BENEFITS:
- Extract from feature bullets, A+ content, and product description
- Frame as educational/nutritional support: "B12 plays a role in..." not "B12 will boost your..."
- Never claim to treat, cure, or prevent any disease
- Include an FDA-style disclaimer awareness in chatbotContext

USAGE STEPS:
- Extract from "Directions" in Important Information or from label images
- Be specific: include dosage amount, timing, method (e.g. "sublingual", "with food")

PRO TIPS:
- Extract from listing tips, directions, storage instructions, or best practices
- Include storage instructions if mentioned (e.g. "Refrigerate after opening")

TRUST BADGES:
- Extract from feature bullets and product overview: certifications, testing claims, dietary labels
- Common ones: "Vegan", "Non-GMO", "Gluten-Free", "GMP Certified", "Third-Party Tested", "Made in USA", "Organic"

FAQ:
- Generate based on product details — dosage, ingredients, dietary info, storage, how it works
- Include "How many servings per bottle?" if that data is available
- Include a question about dietary restrictions if certifications are mentioned
- Include a question about the specific delivery form (drops, capsules, gummies, etc.)

CHATBOT CONTEXT:
- Include: product name, all key ingredients with amounts, serving size, servings per container, flavor (if any), form factor
- Include: all certifications and dietary labels
- Include: directions for use
- Include the compliance rules block:
  * Never claim to treat, cure, or prevent any disease
  * Present benefits as nutritional support only
  * Recommend consulting healthcare providers for medical questions
  * Don't provide medical advice or dosing beyond what's on the label
  * Remind users results may vary

COLORS:
- USE THE BRAND'S WEBSITE COLORS if provided in the BRAND IDENTITY section above
- primary: the brand's main color from their website (NOT inferred from the product flavor)
- accent: a complementary color that works with the brand primary
- background: very light tint of the primary (near-white)
- Only fall back to product-based colors if no brand colors are provided

GENERAL:
- Extract REAL data — do not invent claims or amounts
- Prefer shorter, punchier copy for titles and taglines
- Output ONLY the TypeScript file content, no surrounding explanation

ANTI-HALLUCINATION RULES (HIGHEST PRIORITY):
- ONLY use information explicitly present in the provided page content or images
- NEVER fabricate, guess, or infer ingredient amounts — if not visible, use "// REVIEW: amount not found in source" as a comment and "[NEEDS REVIEW]" as the value
- NEVER invent product claims, certifications, or benefits not stated in the listing
- If the Supplement Facts label image is missing or unreadable, mark ALL ingredient amounts with // REVIEW:
- If directions/usage are not found, mark usageSteps with // REVIEW: and use placeholder text
- For trustBadges, ONLY include certifications explicitly stated in the listing — never assume
- For benefits, only describe what the listing actually claims — do not add from general knowledge
- Use // REVIEW: when genuinely uncertain about data accuracy — this is better than guessing
- Use // TODO: only when data is truly absent from both listing text AND images`,
  });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8192,
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Extract code from markdown code block if present
  const codeMatch = text.match(/```typescript\n([\s\S]*?)```/);
  return codeMatch ? codeMatch[1] : text;
}

// --- Update product index ---

function updateProductIndex(slug: string, varName: string) {
  const indexPath = path.join(
    __dirname,
    "..",
    "lib",
    "products",
    "index.ts"
  );
  let indexContent = fs.readFileSync(indexPath, "utf-8");

  // Add import
  const importLine = `import { ${varName} } from "./${slug}";`;
  if (!indexContent.includes(importLine)) {
    const lastImport = indexContent.lastIndexOf("import ");
    const endOfLastImport = indexContent.indexOf("\n", lastImport) + 1;
    indexContent =
      indexContent.slice(0, endOfLastImport) +
      importLine +
      "\n" +
      indexContent.slice(endOfLastImport);
  }

  // Add to products record
  if (!indexContent.includes(`"${slug}"`)) {
    const insertPoint = indexContent.indexOf("};", indexContent.indexOf("const products"));
    indexContent =
      indexContent.slice(0, insertPoint) +
      `  "${slug}": ${varName},\n` +
      indexContent.slice(insertPoint);
  }

  fs.writeFileSync(indexPath, indexContent);
  console.log(`Updated product index: lib/products/index.ts`);
}

// --- Main ---

async function main() {
  const { asin, html: providedHtml, brandUrl } = parseArgs();
  console.log(`Importing product: ${asin}`);
  console.log(`Brand: ${brandUrl}`);

  // Extract brand identity from their website
  const brandInfo = await extractBrandInfo(brandUrl);
  console.log(`Brand identified: ${brandInfo.name}${brandInfo.colors.length > 0 ? ` (${brandInfo.colors.length} colors found)` : ""}`);

  let html = providedHtml;

  if (!html) {
    console.log("Fetching Amazon listing...");
    try {
      html = await fetchPage(`https://www.amazon.com/dp/${asin}`);
    } catch (error) {
      console.error(
        "Failed to fetch Amazon page. Amazon may be blocking the request."
      );
      console.error(
        "Try saving the page source as HTML and using --file flag instead."
      );
      process.exit(1);
    }
  }

  const pageContent = extractPageContent(html);
  if (pageContent.length < 100) {
    console.error(
      "Could not extract enough content from the page.\n" +
        "Try saving the Amazon page source as HTML and using --file flag."
    );
    process.exit(1);
  }

  console.log(`Extracted ${pageContent.length} chars of product content.`);

  // Extract and download product images for vision analysis (supplement facts labels)
  const imageUrls = extractAllImageUrls(html);
  console.log(`Found ${imageUrls.length} product images. Downloading for analysis...`);

  const imageData: Array<{ base64: string; mediaType: string }> = [];
  // Download up to 7 images (covers hero + supplement facts + other angles)
  const maxImages = Math.min(imageUrls.length, 7);
  for (let i = 0; i < maxImages; i++) {
    const result = await downloadImageAsBase64(imageUrls[i]);
    if (result) {
      imageData.push(result);
    }
  }
  // Also include brand logo/og-image so Claude can see the visual identity
  if (brandInfo.logoUrl) {
    console.log("Downloading brand logo for visual analysis...");
    const logoData = await downloadImageAsBase64(brandInfo.logoUrl);
    if (logoData) {
      imageData.push(logoData);
      console.log("Brand logo included in vision analysis.");
    }
  }

  console.log(`Sending ${imageData.length} total images for Claude vision analysis.`);

  const config = await generateProductConfig(asin, pageContent, imageData, brandInfo);

  // Derive slug from the config
  const slugMatch = config.match(/slug:\s*"([^"]+)"/);
  const varMatch = config.match(/export const (\w+)/);
  const slug = slugMatch?.[1] || asin.toLowerCase();
  const varName = varMatch?.[1] || "importedProduct";

  // Write config file
  const outputPath = path.join(
    __dirname,
    "..",
    "lib",
    "products",
    `${slug}.ts`
  );
  fs.writeFileSync(outputPath, config);
  console.log(`\nProduct config written: lib/products/${slug}.ts`);

  // Download product image
  const imageUrl = extractMainImageUrl(html);
  let imageDownloaded = false;
  if (imageUrl) {
    const ext = imageUrl.match(/\.(png|jpe?g|webp)/i)?.[1] || "jpg";
    const imageDest = path.join(
      __dirname,
      "..",
      "public",
      "products",
      `${slug}.${ext}`
    );
    console.log(`Downloading product image...`);
    try {
      await downloadImage(imageUrl, imageDest);
      console.log(`Product image saved: public/products/${slug}.${ext}`);
      imageDownloaded = true;

      // Update heroImage path in config if extension differs from .png
      if (ext !== "png") {
        const updatedConfig = config.replace(
          `"/products/${slug}.png"`,
          `"/products/${slug}.${ext}"`
        );
        fs.writeFileSync(outputPath, updatedConfig);
      }
    } catch (err) {
      console.warn(`Could not download image: ${err}`);
    }
  } else {
    console.warn("Could not find product image URL in listing.");
  }

  // Update index
  updateProductIndex(slug, varName);

  // --- Print terminal summary ---
  const finalConfig = fs.readFileSync(outputPath, "utf-8");
  const nameMatch = finalConfig.match(/name:\s*"([^"]+)"/);
  const productName = nameMatch?.[1] || slug;

  // Count generated items (match within array sections by counting objects)
  const benefitsMatch = finalConfig.match(/benefits:\s*\[([\s\S]*?)\],\s*\n\s*ingredients:/);
  const benefitCount = benefitsMatch ? (benefitsMatch[1].match(/icon:/g) || []).length : 0;
  const usageMatch = finalConfig.match(/usageSteps:\s*\[([\s\S]*?)\],\s*\n\s*proTips:/);
  const usageStepCount = usageMatch ? (usageMatch[1].match(/icon:/g) || []).length : 0;
  const ingredientCount = (finalConfig.match(/amount:\s*"/g) || []).length;
  const faqCount = (finalConfig.match(/question:\s*"/g) || []).length;
  const reviewCount = (finalConfig.match(/REVIEW:/g) || []).length;
  const todoCount = (finalConfig.match(/TODO:/g) || []).length;

  console.log(`
✅ Product imported: ${productName}
   Brand: ${brandInfo.name} (${brandInfo.url})
   Slug: ${slug}
   Config: /lib/products/${slug}.ts

   Auto-populated:
   ✓ Name, tagline
   ✓ ${usageStepCount} usage steps
   ✓ ${benefitCount} benefits
   ✓ ${ingredientCount} ingredients
   ✓ ${faqCount} FAQ items
   ✓ Chatbot context
   ✓ Suggested prompts

   Needs manual review:
   ⚠ heroImage — ${imageDownloaded ? "auto-downloaded, verify it looks correct" : "update with your own product photo"}
   ⚠ colors — defaults applied, customize to match product label
   ⚠ amazonUrl — verify this is correct
${reviewCount > 0 ? `   ⚠ ${reviewCount} item${reviewCount > 1 ? "s" : ""} flagged with REVIEW: in the config` : ""}${todoCount > 0 ? `\n   ⚠ ${todoCount} item${todoCount > 1 ? "s" : ""} flagged with TODO: in the config` : ""}

   Next: Open /lib/products/${slug}.ts and search for "REVIEW:" and "TODO:"
`);
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
