import { Product } from "../types";

function toVarName(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function escapeStr(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function escapeTemplate(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
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
