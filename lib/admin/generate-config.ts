import { Product } from "../types";

function toVarName(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function escapeStr(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function escapeTemplate(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function generateInteractions(product: Product): string {
  return product.formulaSynergy.interactions
    .map((i) => {
      const ingredients = i.ingredients.map((n) => `"${escapeStr(n)}"`).join(", ");
      const citation = i.citation ? `,\n        citation: "${escapeStr(i.citation)}"` : "";
      return `      {\n        ingredients: [${ingredients}],\n        relationship: "${escapeStr(i.relationship)}",\n        bottomLine: "${escapeStr(i.bottomLine)}",\n        explanation: "${escapeStr(i.explanation)}"${citation},\n      }`;
    })
    .join(",\n");
}

function generateStages(product: Product): string {
  return product.resultsTimeline.stages
    .map(
      (s) =>
        `      { period: "${escapeStr(s.period)}", title: "${escapeStr(s.title)}", physiological: "${escapeStr(s.physiological)}", noticeable: "${escapeStr(s.noticeable)}", advice: "${escapeStr(s.advice)}" }`
    )
    .join(",\n");
}

function generateFeaturedReviews(product: Product): string {
  return product.featuredReviews
    .map((r) => {
      const date = r.reviewDate ? `, reviewDate: "${escapeStr(r.reviewDate)}"` : "";
      return `    { reviewerName: "${escapeStr(r.reviewerName)}", starRating: ${r.starRating}, reviewText: "${escapeStr(r.reviewText)}", isVerifiedPurchase: ${r.isVerifiedPurchase}${date} }`;
    })
    .join(",\n");
}

function generateNegativeReviewFaq(product: Product): string {
  return product.negativeReviewFaq
    .map(
      (f) =>
        `    { question: "${escapeStr(f.question)}", answer: "${escapeStr(f.answer)}", sourceTheme: "${escapeStr(f.sourceTheme)}" }`
    )
    .join(",\n");
}

function generateSupportContactObj(contact: { phone?: string; email?: string; url?: string; urlLabel?: string }): string {
  const fields: string[] = [];
  if (contact.phone) fields.push(`phone: "${escapeStr(contact.phone)}"`);
  if (contact.email) fields.push(`email: "${escapeStr(contact.email)}"`);
  if (contact.url) fields.push(`url: "${escapeStr(contact.url)}"`);
  if (contact.urlLabel) fields.push(`urlLabel: "${escapeStr(contact.urlLabel)}"`);
  return `{ ${fields.join(", ")} }`;
}

function generateSupportContacts(product: Product): string {
  const sc = product.supportContacts;
  if (!sc) return "";

  const platforms: string[] = [];
  if (sc.amazon && (sc.amazon.phone || sc.amazon.email || sc.amazon.url)) {
    platforms.push(`    amazon: ${generateSupportContactObj(sc.amazon)}`);
  }
  if (sc.tiktok && (sc.tiktok.phone || sc.tiktok.email || sc.tiktok.url)) {
    platforms.push(`    tiktok: ${generateSupportContactObj(sc.tiktok)}`);
  }
  if (sc.website && (sc.website.phone || sc.website.email || sc.website.url)) {
    platforms.push(`    website: ${generateSupportContactObj(sc.website)}`);
  }

  if (platforms.length === 0) return "";

  return `\n  supportContacts: {\n${platforms.join(",\n")},\n  },`;
}

export function generateProductTs(product: Product): string {
  const varName = toVarName(product.slug);

  const trustBadges = product.trustBadges
    .map((b) => `    "${escapeStr(b)}"`)
    .join(",\n");

  const usageSteps = product.usageSteps
    .map(
      (s) =>
        `    { icon: "${escapeStr(s.icon)}", title: "${escapeStr(s.title)}", detail: "${escapeStr(s.detail)}" }`
    )
    .join(",\n");

  const proTips = product.proTips
    .map((t) => `    "${escapeStr(t)}"`)
    .join(",\n");

  const benefits = product.benefits
    .map(
      (b) =>
        `    { icon: "${escapeStr(b.icon)}", title: "${escapeStr(b.title)}", description: "${escapeStr(b.description)}" }`
    )
    .join(",\n");

  const ingredients = product.ingredients
    .map(
      (i) =>
        `    { name: "${escapeStr(i.name)}", amount: "${escapeStr(i.amount)}", description: "${escapeStr(i.description)}" }`
    )
    .join(",\n");

  const faq = product.faq
    .map(
      (f) =>
        `    { question: "${escapeStr(f.question)}", answer: "${escapeStr(f.answer)}" }`
    )
    .join(",\n");

  const prompts = product.suggestedPrompts
    .map((p) => `    "${escapeStr(p)}"`)
    .join(",\n");

  return `import { Product } from "../types";

export const ${varName}: Product = {
  slug: "${escapeStr(product.slug)}",
  name: "${escapeStr(product.name)}",
  brand: "${escapeStr(product.brand)}",
  tagline: "${escapeStr(product.tagline)}",
  heroImage: "${escapeStr(product.heroImage)}",
  amazonUrl: "${escapeStr(product.amazonUrl)}",
  asin: "${escapeStr(product.asin)}",
  colors: {
    primary: "${escapeStr(product.colors.primary)}",
    accent: "${escapeStr(product.colors.accent)}",
    background: "${escapeStr(product.colors.background)}",
  },
  trustBadges: [
${trustBadges},
  ],
  usageSteps: [
${usageSteps},
  ],
  proTips: [
${proTips},
  ],
  benefits: [
${benefits},
  ],
  ingredients: [
${ingredients},
  ],
  faq: [
${faq},
  ],
  chatbotContext: \`${escapeTemplate(product.chatbotContext)}\`,
  suggestedPrompts: [
${prompts},
  ],
  formulaSynergy: {
    summary: "${escapeStr(product.formulaSynergy.summary)}",
    interactions: [
${generateInteractions(product)}
    ],
  },
  resultsTimeline: {
    summary: "${escapeStr(product.resultsTimeline.summary)}",
    stages: [
${generateStages(product)}
    ],
  },
  featuredReviews: [
${generateFeaturedReviews(product)}
  ],
  negativeReviewFaq: [
${generateNegativeReviewFaq(product)}
  ],${generateSupportContacts(product)}
};
`;
}

export function generateUpdatedIndex(
  currentIndex: string,
  slug: string,
  varName?: string
): string {
  const vName = varName || toVarName(slug);
  let content = currentIndex;

  const importLine = `import { ${vName} } from "./${slug}";`;

  // Don't add duplicate import
  if (!content.includes(importLine)) {
    const lastImportIdx = content.lastIndexOf("import ");
    const endOfLastImport = content.indexOf("\n", lastImportIdx) + 1;
    content =
      content.slice(0, endOfLastImport) +
      importLine +
      "\n" +
      content.slice(endOfLastImport);
  }

  // Don't add duplicate entry
  if (!content.includes(`"${slug}"`)) {
    const insertPoint = content.indexOf(
      "};",
      content.indexOf("const products")
    );
    content =
      content.slice(0, insertPoint) +
      `  "${slug}": ${vName},\n` +
      content.slice(insertPoint);
  }

  return content;
}

export function removeFromIndex(
  currentIndex: string,
  slug: string
): string {
  const vName = toVarName(slug);
  let content = currentIndex;

  // Remove the import line
  const importRegex = new RegExp(
    `import\\s*\\{\\s*${vName}\\s*\\}\\s*from\\s*"\\.\\/${slug}";?\\n?`,
    "g"
  );
  content = content.replace(importRegex, "");

  // Remove the product entry from the record
  const entryRegex = new RegExp(
    `\\s*"${slug}":\\s*${vName},?\\n?`,
    "g"
  );
  content = content.replace(entryRegex, "\n");

  return content;
}

export function slugToVarName(slug: string): string {
  return toVarName(slug);
}
