# Product QR Code Landing Pages

Mobile-first landing pages linked from QR codes on physical supplement packaging. Customers scan the QR code on their bottle and land on a product-specific page with usage instructions, ingredients, benefits, platform-specific return help, and an AI chatbot.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- **Anthropic API** (Claude) for AI chatbot + product import with vision
- **Cheerio** for Amazon listing HTML parsing
- **qrcode.react** for inline QR code generation

## Quick Start

```bash
# 1. Clone and install
git clone <repo-url>
cd product-landing-pages
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000/product/vitamin-b12-b6-liquid-drops](http://localhost:3000/product/vitamin-b12-b6-liquid-drops) to see an imported product.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key for chatbot and import script |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Production URL for QR codes and OG meta tags |
| `NEXT_PUBLIC_AMAZON_STOREFRONT_URL` | No | Amazon storefront link |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | No | Support email for website return instructions |
| `NEXT_PUBLIC_RETURN_PORTAL_URL` | No | Return portal URL for website customers |

---

## Adding a New Product (Step by Step)

### Step 1: Run the Import Script

The import script fetches an Amazon product listing, downloads all listing images, and uses Claude's vision API to analyze the Supplement Facts label and generate a complete product config.

**You must provide `--brand-url`** — this tells the script which brand the product belongs to. It fetches the brand's website to extract brand name, colors, logo, and visual identity so the generated landing page matches the brand.

**Mode A: Direct Fetch (try this first)**

```bash
npx ts-node scripts/import-product.ts --asin="B0XXXXXXXXX" --brand-url="https://yourbrand.com"
```

**Mode B: From Amazon URL**

```bash
npx ts-node scripts/import-product.ts --url="https://www.amazon.com/dp/B0XXXXXXXXX" --brand-url="https://yourbrand.com"
```

**Mode C: From Saved HTML (when Amazon blocks the fetch)**

If you get an error about not enough content, Amazon is blocking the request. Save the page source instead:

1. Open the Amazon product page in your browser
2. Right-click anywhere → **View Page Source** (not Inspect Element)
3. Save the entire page source as an HTML file
4. Run with the `--file` flag:

```bash
npx ts-node scripts/import-product.ts --file="./saved-page.html" --brand-url="https://yourbrand.com" --asin="B0XXXXXXXXX"
```

> **Tip:** The `--asin` flag is optional with `--file` if the ASIN appears in the HTML.

**Examples for multiple brands:**

```bash
# Nusava product
npx ts-node scripts/import-product.ts --asin="B0C9JX95NV" --brand-url="https://nusava.com"

# A different brand
npx ts-node scripts/import-product.ts --asin="B0XXXXXXXXX" --brand-url="https://otherbrand.com"
```

Each brand's website is scraped for its colors, name, and logo — so landing pages for different brands will have distinct visual identities.

### Step 2: Review What Was Generated

The script creates and updates these files:

| File | What It Contains |
|------|-----------------|
| `/lib/products/[slug].ts` | Full product config (name, ingredients, benefits, FAQ, chatbot context, etc.) |
| `/lib/products/index.ts` | Auto-updated to register the new product |
| `/public/products/[slug].jpg` | Hero image downloaded from the Amazon listing |

Open the generated config file and search for:
- **`REVIEW:`** — data the script wasn't confident about
- **`TODO:`** — missing data that needs to be filled in manually

### Step 3: Customize the Config

Open `/lib/products/[slug].ts` and verify/edit these fields:

**Always check:**
- `heroImage` — verify the downloaded image looks good; replace with your own product photo if needed
- `colors.primary` — auto-extracted from brand website; verify it matches
- `colors.accent` — complementary color; verify it works with primary
- `colors.background` — very light tint for section backgrounds
- `amazonUrl` — confirm the link goes to the correct product page
- `chatbotContext` — confirm it references the correct brand name

**Verify for accuracy:**
- `ingredients` — confirm amounts match the actual Supplement Facts label on your product
- `usageSteps` — confirm dosage instructions match what's on the label
- `trustBadges` — confirm all certifications are accurate (Vegan, Non-GMO, etc.)
- `benefits` — ensure claims are educational, not medical (no "cures" or "treats" language)
- `chatbotContext` — confirm all product details are accurate (this drives the AI assistant)

### Step 4: Test Locally

```bash
npm run dev
```

Test all three platform flows:

| URL | What to Test |
|-----|-------------|
| `http://localhost:3000/product/[slug]` | Platform selection modal appears |
| `http://localhost:3000/product/[slug]?source=amazon` | Amazon-specific return instructions |
| `http://localhost:3000/product/[slug]?source=tiktok` | TikTok return instructions |
| `http://localhost:3000/product/[slug]?source=website` | Direct website return instructions |

**Checklist:**
- [ ] Hero image displays correctly
- [ ] All sections render (usage, benefits, ingredients, FAQ, returns)
- [ ] Brand colors look correct on buttons and accents
- [ ] AI chatbot opens and responds with product-specific knowledge
- [ ] Return instructions show the right content for each platform
- [ ] Bottom navigation highlights correctly as you scroll

### Step 5: Generate QR Codes

Visit `http://localhost:3000/products` (the internal admin page) to see:

- Inline QR codes for each URL variant (generic, Amazon, TikTok, website)
- Copy URL buttons for each variant
- Download QR code as PNG for print
- Direct link to the live landing page

**Which QR code to use on packaging:**
- If the product is Amazon-only, use the `?source=amazon` QR code (skips the platform picker)
- If sold on multiple channels, use the generic QR code (shows the platform selection modal)
- For TikTok-only or website-only products, use the respective `?source=` QR code

### Step 6: Deploy

```bash
git add lib/products/[slug].ts public/products/[slug].jpg
git commit -m "Add [product name] landing page"
git push
```

Vercel auto-deploys on push. Once live, update `NEXT_PUBLIC_SITE_URL` in your Vercel environment variables if not already set.

### Step 7: Print QR Codes

After deployment, regenerate QR codes from the production `/products` admin page (using the live URL) and send to your packaging designer.

---

## How the Import Script Works

1. **Fetches brand website** — scrapes the `--brand-url` to extract brand name, colors (from CSS/meta tags), logo, and description
2. **Fetches Amazon listing** — downloads the Amazon product page HTML (or reads from a saved file)
3. **Extracts text** — parses 12+ page sections via Cheerio (title, bullets, A+ content, product details, supplement facts, important information, ratings, variations, etc.)
4. **Downloads images** — extracts all product listing image URLs (up to 7) + brand logo as base64
5. **Sends to Claude (vision)** — sends the extracted text, product images, brand logo, and brand identity to Claude's API. Claude reads the Supplement Facts label for exact ingredient amounts and uses the brand identity for colors and naming
6. **Generates config** — Claude outputs a complete TypeScript `Product` config file with brand-correct colors and references
7. **Saves hero image** — downloads the main product image to `/public/products/`
8. **Updates index** — adds the import and registration to `/lib/products/index.ts`
9. **Prints summary** — shows brand, product name, generated items, and what needs manual review

---

## Manually Adding/Editing a Product

If you prefer not to use the import script, or need to add a non-Amazon product:

1. Create `/lib/products/your-product-slug.ts` using an existing product as a template
2. Export a `Product` object matching the interface in `/lib/types.ts`
3. Register it in `/lib/products/index.ts`:

```typescript
import { yourProduct } from "./your-product-slug";

const products: Record<string, Product> = {
  "your-product-slug": yourProduct,
  // ...existing products
};
```

4. Add a product image to `/public/products/your-product-slug.png`
5. Test all 3 platform flows at `/product/your-product-slug`

## URL Patterns

| URL | Behavior |
|-----|----------|
| `/product/[slug]` | Shows platform selection modal |
| `/product/[slug]?source=amazon` | Skips modal, shows Amazon-specific content |
| `/product/[slug]?source=tiktok` | Skips modal, shows TikTok-specific content |
| `/product/[slug]?source=website` | Skips modal, shows website-specific content |

Pre-configured `?source=` QR codes skip the platform picker for a faster experience.

## Project Structure

```
app/
  product/[slug]/     → Dynamic product landing page
    layout.tsx        → SEO metadata (OpenGraph, Twitter, canonical) + JSON-LD
    page.tsx          → Client-side interactive page (Suspense-wrapped)
  products/           → Internal admin page with QR codes
  api/chat/           → AI chatbot API (streaming SSE)
  layout.tsx          → Root layout (Fira Sans + Nunito fonts, viewport)

components/
  chat/               → Chat widget + message components
  platform-select/    → Platform selection modal
  sections/           → Page sections (hero, usage, benefits, ingredients, FAQ, returns)
  ui/                 → Reusable UI (accordion, bottom-nav, section wrapper)

hooks/
  use-active-section  → IntersectionObserver for nav highlighting
  use-scroll-animation → Scroll-triggered entrance animations

lib/
  products/           → Product configs (one .ts per product) + barrel index
  types.ts            → TypeScript interfaces (Product, Platform, ReturnPolicy)
  constants.ts        → Platform-specific return policies, labels, icons
  analytics.ts        → Typed event tracking functions

scripts/
  import-product.ts   → Amazon listing importer (text + vision)

public/
  products/           → Product hero images
```

## Analytics Events

All analytics events log to console in development. To wire up a production provider (GA4, Amplitude, Mixpanel), edit the `trackEvent` function in `/lib/analytics.ts`.

| Event | Function | When |
|-------|----------|------|
| `page_view` | `trackPageView` | Page loads with platform selected |
| `platform_selected` | `trackPlatformSelection` | User picks a platform |
| `section_viewed` | `trackSectionView` | User taps a nav section link |
| `faq_opened` | `trackFaqExpand` | User expands an FAQ item |
| `chat_opened` | `trackChatOpen` | User opens the chat widget |
| `chat_message_sent` | `trackChatMessage` | User sends a chat message |
| `return_instructions_viewed` | `trackReturnInstructionsViewed` | Returns section renders |
| `external_link_clicked` | `trackExternalLink` | User clicks an external link |

## Platform-Specific Behavior

### Amazon (Highest Priority)
- Returns MUST go through Amazon — this is enforced in both the UI and chatbot
- Customers are directed to Amazon's order page and buyer-seller messaging
- The AI chatbot will never offer to process returns for Amazon customers

### TikTok Shop
- Returns go through TikTok's in-app return flow
- Covered by TikTok's buyer protection program

### Our Website
- Returns handled directly via support email or return portal

## Deployment to Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy — Vercel auto-detects Next.js

Subsequent deploys happen automatically on `git push`.

## Supplement Compliance

- Never claim to treat, cure, or prevent any disease
- Present benefits as educational, evidence-informed content
- Always recommend consulting a healthcare provider for medical questions
- FDA disclaimer is shown on the benefits section
