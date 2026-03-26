# Product Landing Pages

Post-purchase CX landing pages for supplement brands. Customers scan a QR code on their product packaging and land on a page with usage instructions, ingredient details, health benefits, return help, and an AI chatbot.

## Getting Started

### Prerequisites

- Node.js 18+
- An Anthropic API key (for the AI chatbot and product import)

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key for chatbot and import script |
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL (used for QR codes and OG meta) |
| `NEXT_PUBLIC_AMAZON_STOREFRONT_URL` | Yes | Amazon storefront link (shown in return instructions) |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Yes | Support email (shown in website return instructions) |
| `NEXT_PUBLIC_RETURN_PORTAL_URL` | Yes | Return portal URL (for website customers) |
| `ADMIN_PASSWORD` | For admin | Password for the `/products/manage` admin UI |
| `GITHUB_TOKEN` | For admin | GitHub PAT for the admin UI to commit product configs |
| `GITHUB_REPO_OWNER` | For admin | GitHub username or org that owns the repo |
| `GITHUB_REPO_NAME` | For admin | Repository name |
| `GITHUB_BRANCH` | For admin | Branch to commit to (e.g., `main`) |

### Running Locally

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

## Accessing Product Pages

Each product has a landing page at:

```
/product/[slug]
```

For example: `/product/turmeric-bioperine-garlic-ginger-capsules`

### Platform Selection

When a customer visits a product page, they're prompted to select where they purchased (Amazon, TikTok Shop, or Website). This controls which return policy and support info they see. You can skip the prompt by adding a `?source=` query param:

- `/product/[slug]?source=amazon`
- `/product/[slug]?source=tiktok`
- `/product/[slug]?source=website`

QR codes on packaging can be pre-configured with the source param.

### QR Code Admin Page

Visit `/products` to see all products with generated QR codes (4 variants per product: generic, Amazon, TikTok, Website). Each QR code has copy-URL and download-PNG buttons.

### Product Management Admin

Visit `/products/manage` to access the admin UI (requires `ADMIN_PASSWORD`). From here you can:

- View all products
- Create new products
- Edit existing products
- Delete products

## Creating a New Product

There are two ways to create a product:

### Option 1: Admin UI

1. Go to `/products/manage` and log in
2. Click "New Product"
3. Fill in the product details using the form editor
4. Save — the admin UI commits the config file to GitHub via the API

### Option 2: Amazon Auto-Import (CLI)

The import script pulls data directly from an Amazon listing and generates a complete product config using Claude.

```bash
# By ASIN
npx ts-node scripts/import-product.ts --asin="B0XXXXXXXXX" --brand-url="https://yourbrand.com"

# By Amazon URL
npx ts-node scripts/import-product.ts --url="https://amazon.com/dp/B0XXXXXXXXX" --brand-url="https://yourbrand.com"

# From saved HTML (if Amazon blocks the fetch)
npx ts-node scripts/import-product.ts --file="./saved-page.html" --brand-url="https://yourbrand.com"
```

The `--brand-url` flag is required — the script fetches the brand's website to extract brand name, colors, and logo.

The script:
1. Parses the Amazon listing (title, bullets, description, A+ content, supplement facts)
2. Downloads product images and uses Claude Vision to read the Supplement Facts label
3. Generates a full product config via Claude
4. Writes the config to `lib/products/[slug].ts` and registers it in `lib/products/index.ts`
5. Downloads the hero image to `public/products/[slug].jpg`

Generated configs are drafts — review any `REVIEW:` or `TODO:` flags before going live.

### Option 3: Manual

1. Create a new file in `lib/products/` (use an existing product file as a template)
2. Export your product config object (must satisfy the `Product` type from `lib/types.ts`)
3. Register it in `lib/products/index.ts` — add the import and add an entry to the `products` record
4. Add a hero image to `public/products/[slug].jpg`

## Editing a Product Page

### Via Admin UI

1. Go to `/products/manage` and log in
2. Click on the product you want to edit
3. Make changes in the form editor (all sections are editable: hero, usage steps, benefits, ingredients, FAQ, synergy, timeline, reviews, support contacts, etc.)
4. Save to commit changes

### Via Code

Product configs live in `lib/products/`. Each file exports a single `Product` object. Edit the fields directly:

- **Hero/branding:** `name`, `tagline`, `heroImage`, `colors`, `trustBadges`
- **Usage:** `usageSteps` (icon, title, detail), `proTips`
- **Benefits:** `benefits` (icon, title, description)
- **Ingredients:** `ingredients` (name, amount, description)
- **Synergy science:** `formulaSynergy.interactions` (ingredient pairs, relationship, explanation, citation)
- **Results timeline:** `resultsTimeline.stages` (period, title, physiological, noticeable, advice)
- **Reviews:** `featuredReviews` (name, rating, text, verified)
- **Negative review FAQ:** `negativeReviewFaq` (reframed complaints with helpful answers)
- **FAQ:** `faq` (question, answer)
- **Chatbot:** `chatbotContext`, `suggestedPrompts`
- **Support contacts:** `supportContacts` (per-platform phone, email, url)

### Page Sections

The landing page renders these sections in order:

1. **Hero** — product image, name, tagline, trust badges
2. **Usage** — step-by-step instructions with pro tips
3. **Synergy** — how ingredients work together (with citations)
4. **Timeline** — what to expect over time (Week 1, Month 1-2, Month 3+)
5. **Benefits** — key health benefits grid
6. **Ingredients** — supplement facts table
7. **Reviews** — featured customer reviews
8. **FAQ** — common questions + negative review interception
9. **Returns** — platform-specific return policy (auto-generated from platform selection)
10. **Support Callout** — CTA to open the AI chat

## Brands

Products are grouped by brand. Brand configs are in `lib/brands.ts`. Each brand has:

- A slug (must match the product's `brand` field)
- A display name
- Production domains (for domain-based isolation)
- Default support contacts

Current brands: Nusava, MedChoice, PrimeMD.

## Deployment

The app deploys to Vercel on `git push`. Each brand has its own domain pointed at the same Vercel deployment — brand isolation is handled via domain matching at runtime.

## Tech Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Anthropic API (claude-sonnet-4-20250514) for chatbot + product import
- Cheerio for Amazon HTML parsing
- qrcode.react for QR code generation
