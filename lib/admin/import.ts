import * as cheerio from "cheerio";
import Anthropic from "@anthropic-ai/sdk";
import { Product } from "../types";

// --- Types ---

export interface BrandInfo {
  name: string;
  url: string;
  colors: string[];
  description: string;
  logoUrl: string | null;
}

export interface ImportProgress {
  progress?: string;
  product?: Partial<Product>;
  error?: string;
}

// --- Fetch helpers ---

async function fetchPageServer(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
    redirect: "follow",
  });

  if (!res.ok) {
    throw new Error(`Fetch failed with status ${res.status}`);
  }

  return res.text();
}

async function downloadImageAsBase64(
  url: string
): Promise<{ base64: string; mediaType: string } | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      redirect: "follow",
    });

    if (!res.ok) return null;

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const mediaType = contentType.split(";")[0].trim();
    const base64 = Buffer.from(buffer).toString("base64");

    return { base64, mediaType };
  } catch {
    return null;
  }
}

// --- Brand extraction ---

export async function extractBrandInfo(brandUrl: string): Promise<BrandInfo> {
  let html: string;
  try {
    html = await fetchPageServer(brandUrl);
  } catch {
    return {
      name: new URL(brandUrl).hostname.replace("www.", "").split(".")[0],
      url: brandUrl,
      colors: [],
      description: "",
      logoUrl: null,
    };
  }

  const $ = cheerio.load(html);

  const ogSiteName = $('meta[property="og:site_name"]').attr("content")?.trim();
  const titleText = $("title").text().trim().split(/[|–—-]/)[0].trim();
  const domainName = new URL(brandUrl).hostname.replace("www.", "").split(".")[0];
  const name = ogSiteName || titleText || domainName;

  const description =
    $('meta[property="og:description"]').attr("content")?.trim() ||
    $('meta[name="description"]').attr("content")?.trim() ||
    "";

  const colors: string[] = [];
  const seen = new Set<string>();

  const addColor = (hex: string) => {
    const normalized = hex.toLowerCase();
    if (/^#(f{3,6}|0{3,6}|(?:([0-9a-f])\2){3})$/i.test(normalized)) return;
    if (!seen.has(normalized)) {
      seen.add(normalized);
      colors.push(normalized);
    }
  };

  const themeColor = $('meta[name="theme-color"]').attr("content")?.trim();
  if (themeColor && themeColor.startsWith("#")) addColor(themeColor);

  const allStyles =
    $("style").text() +
    " " +
    $("[style]")
      .map((_, el) => $(el).attr("style"))
      .get()
      .join(" ");
  const hexMatches = allStyles.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
  for (const hex of hexMatches) {
    if (/^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/.test(hex)) {
      addColor(hex);
    }
  }

  const cssVarMatches =
    allStyles.match(
      /--(?:primary|brand|accent|main|theme)[^:]*:\s*(#[0-9a-fA-F]{3,6})/gi
    ) || [];
  for (const match of cssVarMatches) {
    const hex = match.match(/#[0-9a-fA-F]{3,6}/)?.[0];
    if (hex) addColor(hex);
  }

  const ogImage =
    $('meta[property="og:image"]').attr("content")?.trim() || null;
  let logoUrl: string | null = null;
  const logoEl = $(
    'img[alt*="logo" i], img[class*="logo" i], .logo img, #logo img, a[class*="logo" i] img'
  ).first();
  const logoSrc = logoEl.attr("src");
  if (logoSrc) {
    logoUrl = logoSrc.startsWith("http")
      ? logoSrc
      : new URL(logoSrc, brandUrl).href;
  } else if (ogImage) {
    logoUrl = ogImage.startsWith("http")
      ? ogImage
      : new URL(ogImage, brandUrl).href;
  }

  return {
    name,
    url: brandUrl,
    colors: colors.slice(0, 10),
    description,
    logoUrl,
  };
}

// --- Amazon content extraction ---

export function extractPageContent(html: string): string {
  const $ = cheerio.load(html);

  $(
    "script, style, nav, footer, header, #navbar, #navFooter, #reviewsMedley, #cr-dp-summarization-attributes, .cr-widget-FocalReviews"
  ).remove();

  const sections: string[] = [];

  const title = $("#productTitle").text().trim();
  if (title) sections.push(`PRODUCT TITLE: ${title}`);

  const price = $(".a-price .a-offscreen").first().text().trim();
  if (price) sections.push(`PRICE: ${price}`);

  const overview: string[] = [];
  $(
    "#productOverview_feature_div tr, #productOverview_feature_div .a-row"
  ).each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, " ");
    if (text && text.length > 3) overview.push(text);
  });
  if (overview.length)
    sections.push(`PRODUCT OVERVIEW:\n${overview.join("\n")}`);

  const bullets: string[] = [];
  $("#feature-bullets li, #featurebullets_feature_div li").each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 5) bullets.push(text);
  });
  if (bullets.length)
    sections.push(`FEATURE BULLETS:\n${bullets.join("\n")}`);

  const desc = $("#productDescription").text().trim();
  if (desc) sections.push(`PRODUCT DESCRIPTION:\n${desc}`);

  const aplusSections: string[] = [];
  $("#aplus, #aplusProductDescription, #aplus_feature_div")
    .find("h2, h3, h4, p, .aplus-module-wrapper")
    .each((_, el) => {
      const text = $(el).text().trim().replace(/\s+/g, " ");
      if (text && text.length > 5) aplusSections.push(text);
    });
  const aplusText = Array.from(new Set(aplusSections)).join("\n");
  if (aplusText)
    sections.push(`A+ CONTENT:\n${aplusText.slice(0, 5000)}`);

  const brandStory = $(
    "#brandSnapshot_feature_div, .brand-story-card"
  )
    .text()
    .trim()
    .replace(/\s+/g, " ");
  if (brandStory && brandStory.length > 10)
    sections.push(`BRAND STORY:\n${brandStory.slice(0, 2000)}`);

  const supplementFacts: string[] = [];
  $("#important-information")
    .find("table")
    .each((_, table) => {
      $(table)
        .find("tr")
        .each((_, tr) => {
          const cells = $(tr)
            .find("td, th")
            .map((__, td) => $(td).text().trim())
            .get();
          if (cells.length) supplementFacts.push(cells.join(" | "));
        });
    });
  $("#productDetails_db_sections table, #prodDetails table").each(
    (_, table) => {
      $(table)
        .find("tr")
        .each((_, tr) => {
          const cells = $(tr)
            .find("td, th")
            .map((__, td) => $(td).text().trim())
            .get();
          if (cells.length) supplementFacts.push(cells.join(" | "));
        });
    }
  );
  $("img").each((_, el) => {
    const alt = $(el).attr("alt") || "";
    if (/supplement.?facts|nutrition.?facts/i.test(alt)) {
      supplementFacts.push(`[Image alt: ${alt}]`);
    }
  });
  const sfRegex =
    /supplement\s*facts[\s\S]*?(?:\*.*?daily\s*value|(?:other\s*ingredients|directions))/i;
  const htmlText = $("body").text();
  const sfMatch = htmlText.match(sfRegex);
  if (sfMatch)
    supplementFacts.push(
      sfMatch[0].replace(/\s+/g, " ").slice(0, 3000)
    );
  if (supplementFacts.length)
    sections.push(
      `SUPPLEMENT FACTS:\n${Array.from(new Set(supplementFacts)).join("\n")}`
    );

  const importantSections: string[] = [];
  $("#important-information")
    .children("div, section, .a-section")
    .each((_, el) => {
      const heading = $(el).find("h3, h4, .a-text-bold").first().text().trim();
      const body = $(el).text().trim().replace(/\s+/g, " ");
      if (body && body.length > 10) {
        importantSections.push(heading ? `[${heading}] ${body}` : body);
      }
    });
  if (importantSections.length === 0) {
    const importantText = $("#important-information")
      .text()
      .trim()
      .replace(/\s+/g, " ");
    if (importantText) importantSections.push(importantText);
  }
  if (importantSections.length)
    sections.push(
      `IMPORTANT INFORMATION (Directions, Warnings, Ingredients):\n${importantSections.join("\n\n")}`
    );

  const details: string[] = [];
  $(
    "#productDetails_techSpec_section_1 tr, #detailBullets_feature_div li, #productDetails_detailBullets_sections1 tr, #prodDetails tr"
  ).each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, " ");
    if (text && text.length > 3) details.push(text);
  });
  if (details.length)
    sections.push(
      `PRODUCT DETAILS:\n${Array.from(new Set(details)).join("\n")}`
    );

  const sustainability = $(
    "#sustainabilitySection, #climatePledgeFriendly"
  )
    .text()
    .trim()
    .replace(/\s+/g, " ");
  if (sustainability && sustainability.length > 10)
    sections.push(`SUSTAINABILITY:\n${sustainability.slice(0, 1000)}`);

  const fbt: string[] = [];
  $("#sims-fbt .a-link-normal").each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 10) fbt.push(text);
  });
  if (fbt.length)
    sections.push(
      `FREQUENTLY BOUGHT TOGETHER:\n${fbt.slice(0, 5).join("\n")}`
    );

  const rating =
    $("#acrPopover").attr("title") ||
    $(".a-icon-alt").first().text().trim();
  const reviewCount = $("#acrCustomerReviewText").text().trim();
  if (rating || reviewCount)
    sections.push(`RATINGS: ${rating} ${reviewCount}`.trim());

  const variations: string[] = [];
  $(
    "#twister_feature_div .selection, #variation_size_name .selection, #variation_flavor_name .selection, #variation_style_name .selection"
  ).each((_, el) => {
    const text = $(el).text().trim();
    if (text) variations.push(text);
  });
  if (variations.length)
    sections.push(`VARIATIONS/OPTIONS: ${variations.join(", ")}`);

  if (sections.length === 0) {
    const bodyText = $("body").text().replace(/\s+/g, " ").trim();
    sections.push(bodyText.slice(0, 8000));
  }

  return sections.join("\n\n---\n\n");
}

// --- Image extraction ---

export function extractMainImageUrl(html: string): string | null {
  const $ = cheerio.load(html);

  const landingImg = $("#landingImage, #imgBlkFront, #ebooksImgBlkFront");
  const hiRes = landingImg.attr("data-old-hires");
  if (hiRes) return hiRes;

  const src = landingImg.attr("src");
  if (src && src.startsWith("http")) return src;

  const dynamicStr = landingImg.attr("data-a-dynamic-image");
  if (dynamicStr) {
    try {
      const dynamicData = JSON.parse(dynamicStr) as Record<string, unknown>;
      const urls = Object.keys(dynamicData);
      if (urls.length) return urls[urls.length - 1];
    } catch {
      // ignore
    }
  }

  const scriptMatch = html.match(
    /'colorImages':\s*\{[^}]*'initial':\s*(\[[\s\S]*?\])\s*\}/
  );
  if (scriptMatch) {
    try {
      const images = JSON.parse(scriptMatch[1]) as Array<{
        hiRes?: string;
        large?: string;
      }>;
      if (images[0]?.hiRes) return images[0].hiRes;
      if (images[0]?.large) return images[0].large;
    } catch {
      // ignore
    }
  }

  let bestUrl: string | null = null;
  $("img").each((_, el) => {
    const imgSrc = $(el).attr("src") || "";
    if (
      imgSrc.includes("images-na.ssl-images-amazon.com") ||
      imgSrc.includes("m.media-amazon.com")
    ) {
      if (imgSrc.includes("_SL") || imgSrc.includes("_AC_")) {
        bestUrl = imgSrc;
        return false;
      }
    }
  });

  return bestUrl;
}

export function extractAllImageUrls(html: string): string[] {
  const $ = cheerio.load(html);
  const urls: string[] = [];
  const seen = new Set<string>();

  const addUrl = (url: string) => {
    const base = url.split("?")[0].replace(/\._[^.]+\./, "._SL1500_.");
    if (!seen.has(base) && base.startsWith("http")) {
      seen.add(base);
      urls.push(base);
    }
  };

  const colorImagesMatch = html.match(
    /'colorImages':\s*\{[^}]*'initial':\s*(\[[\s\S]*?\])\s*\}/
  );
  if (colorImagesMatch) {
    try {
      const images = JSON.parse(colorImagesMatch[1]) as Array<{
        hiRes?: string;
        large?: string;
      }>;
      for (const img of images) {
        if (img.hiRes) addUrl(img.hiRes);
        else if (img.large) addUrl(img.large);
      }
    } catch {
      // ignore
    }
  }

  const dynamicStr = $("#landingImage, #imgBlkFront").attr(
    "data-a-dynamic-image"
  );
  if (dynamicStr) {
    try {
      const dynamicData = JSON.parse(dynamicStr) as Record<string, unknown>;
      for (const u of Object.keys(dynamicData)) addUrl(u);
    } catch {
      // ignore
    }
  }

  $("#altImages img, .imageThumbnail img").each((_, el) => {
    const imgSrc = $(el).attr("src");
    if (imgSrc && imgSrc.includes("images") && !imgSrc.includes("play-icon")) {
      addUrl(imgSrc.replace(/\._[^.]+\./, "._SL1500_."));
    }
  });

  return urls;
}

// --- ASIN extraction ---

export function extractAsin(input: string): string | null {
  // Direct ASIN
  if (/^[A-Z0-9]{10}$/.test(input.trim())) return input.trim();

  // From URL
  const urlMatch = input.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
  if (urlMatch) return urlMatch[1];

  return null;
}

// --- Claude product generation ---

export async function generateProductWithClaude(
  asin: string,
  pageContent: string,
  imageData: Array<{ base64: string; mediaType: string }>,
  brandInfo: BrandInfo
): Promise<Partial<Product>> {
  const anthropic = new Anthropic();

  const content: Array<Anthropic.ImageBlockParam | Anthropic.TextBlockParam> =
    [];

  for (const img of imageData) {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: img.mediaType as
          | "image/jpeg"
          | "image/png"
          | "image/gif"
          | "image/webp",
        data: img.base64,
      },
    });
  }

  content.push({
    type: "text",
    text: `You are a product data extraction assistant. Given an Amazon product listing page content AND product images (which may include the Supplement Facts label), generate a JSON product configuration.

IMPORTANT: Carefully examine ALL attached images. One or more images likely shows the Supplement Facts panel with exact ingredient amounts, serving size, and other nutritional info. Extract ALL data from those images.

ASIN: ${asin}

=== BRAND IDENTITY (from ${brandInfo.url}) ===
Brand Name: ${brandInfo.name}
${brandInfo.description ? `Brand Description: ${brandInfo.description}` : ""}
${brandInfo.colors.length > 0 ? `Brand Colors (extracted from website): ${brandInfo.colors.join(", ")}` : ""}

IMPORTANT: This product belongs to the "${brandInfo.name}" brand.

PAGE CONTENT:
${pageContent}

Return ONLY a valid JSON object (no markdown, no code fences) with this exact structure:
{
  "slug": "kebab-case-slug",
  "name": "Product Name",
  "tagline": "One-sentence tagline",
  "heroImage": "/products/SLUG.jpg",
  "amazonUrl": "https://www.amazon.com/dp/${asin}",
  "asin": "${asin}",
  "colors": {
    "primary": "#hex from brand website${brandInfo.colors.length > 0 ? ` (likely ${brandInfo.colors[0]})` : ""}",
    "accent": "#complementary hex",
    "background": "#very light tint"
  },
  "trustBadges": ["badge1", "badge2"],
  "usageSteps": [{"icon": "emoji", "title": "title", "detail": "detail"}],
  "proTips": ["tip1", "tip2"],
  "benefits": [{"icon": "emoji", "title": "title", "description": "educational description"}],
  "ingredients": [{"name": "ingredient", "amount": "exact amount", "description": "what it does"}],
  "faq": [{"question": "q", "answer": "a"}],
  "chatbotContext": "full context string with compliance rules",
  "suggestedPrompts": ["prompt1", "prompt2", "prompt3", "prompt4"]
}

CRITICAL RULES:
- Extract EVERY ingredient with EXACT amounts from Supplement Facts images
- Benefits must be educational ("plays a role in..."), never disease claims
- Usage steps from Directions on the label
- 6-8 FAQ items covering dosage, ingredients, dietary restrictions, form factor
- ChatbotContext must include compliance rules (no disease claims, consult healthcare provider)
- Use brand website colors for primary/accent
- Return ONLY the JSON object, nothing else`,
  });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8192,
    messages: [{ role: "user", content }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Try to parse JSON directly, or extract from code fences
  let jsonStr = text.trim();
  const fenceMatch = jsonStr.match(/```(?:json)?\n?([\s\S]*?)```/);
  if (fenceMatch) jsonStr = fenceMatch[1].trim();

  const product = JSON.parse(jsonStr) as Partial<Product>;
  return product;
}

// --- Full import flow ---

export async function* runImport(
  amazonInput: string,
  brandUrl: string
): AsyncGenerator<ImportProgress> {
  const asin = extractAsin(amazonInput);
  if (!asin) {
    yield { error: "Could not extract ASIN from the provided URL or input" };
    return;
  }

  yield { progress: `Extracting brand identity from ${brandUrl}...` };
  const brandInfo = await extractBrandInfo(brandUrl);
  yield {
    progress: `Brand identified: ${brandInfo.name}${brandInfo.colors.length > 0 ? ` (${brandInfo.colors.length} colors found)` : ""}`,
  };

  yield { progress: "Fetching Amazon listing..." };
  let html: string;
  try {
    html = await fetchPageServer(`https://www.amazon.com/dp/${asin}`);
  } catch {
    yield {
      error:
        "Failed to fetch Amazon listing. Amazon may be blocking the request.",
    };
    return;
  }

  yield { progress: "Extracting product content..." };
  const pageContent = extractPageContent(html);
  if (pageContent.length < 100) {
    yield { error: "Could not extract enough content from the listing." };
    return;
  }

  yield { progress: "Downloading product images for analysis..." };
  const imageUrls = extractAllImageUrls(html);
  const imageData: Array<{ base64: string; mediaType: string }> = [];
  const maxImages = Math.min(imageUrls.length, 7);
  for (let i = 0; i < maxImages; i++) {
    const result = await downloadImageAsBase64(imageUrls[i]);
    if (result) imageData.push(result);
  }

  if (brandInfo.logoUrl) {
    const logoData = await downloadImageAsBase64(brandInfo.logoUrl);
    if (logoData) imageData.push(logoData);
  }

  yield {
    progress: `Analyzing ${imageData.length} images with AI (this takes 30-60s)...`,
  };
  let product: Partial<Product>;
  try {
    product = await generateProductWithClaude(
      asin,
      pageContent,
      imageData,
      brandInfo
    );
  } catch (err) {
    yield {
      error: `AI analysis failed: ${err instanceof Error ? err.message : "Unknown error"}`,
    };
    return;
  }

  // Download hero image and return as base64
  const heroImageUrl = extractMainImageUrl(html);
  if (heroImageUrl) {
    const heroData = await downloadImageAsBase64(heroImageUrl);
    if (heroData) {
      yield { progress: "Hero image downloaded." };
      // Store hero image base64 in a non-Product field we'll handle in the API route
      (product as Record<string, unknown>)._heroImageBase64 = heroData.base64;
      (product as Record<string, unknown>)._heroImageMediaType =
        heroData.mediaType;
    }
  }

  yield { progress: "Import complete!" };
  yield { product };
}
