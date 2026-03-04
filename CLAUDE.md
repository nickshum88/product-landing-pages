# Project: Product QR Code Landing Pages

## What This Is
Customer-facing landing pages linked from QR codes on physical supplement packaging. Customers scan the QR code on their bottle and land on a product-specific page where they can learn usage instructions, understand ingredients and health benefits, get platform-specific return help, and chat with an AI assistant.

## Brand
- **Company:** Nusava
- **Fonts:** Fira Sans (headings), Nunito (body)
- **Brand color:** Green #4c9c2e (primary), Orange #ff6b00 (accent)
- **Design:** Premium wellness aesthetic, mobile-first
- **Responsive breakpoints:** Desktop 1024px+, Tablet 768–1023px, Mobile <768px

## Business Context
- Supplement ecommerce company (~$55M revenue target)
- Primary sales channels: Amazon (main profit channel), TikTok Shop, own website
- Each physical product has a QR code on the packaging linking to its landing page
- These pages are a post-purchase support and trust-building layer

## Critical Business Rules

### Amazon (HIGHEST PRIORITY)
- Amazon customers MUST be directed back to Amazon for ALL returns/refunds
- We CANNOT handle Amazon returns directly — this violates Amazon TOS and risks our seller account
- Route Amazon customers to buyer-seller messaging through their order page
- The AI chatbot MUST enforce this: if an Amazon customer asks about returns, direct them to Amazon
- Link to specific product's Amazon page (from config amazonUrl) and our storefront

### TikTok Shop
- Use TikTok's in-app return flow
- TikTok has its own buyer protection

### Our Website
- Handle directly via support email or return portal

### Platform Selection
- First interaction on every page load — nothing renders until they choose
- If ?source= param exists in URL, skip the modal (QR codes can be pre-configured)
- Selection persists via state + URL param

### Supplement Compliance
- Never make disease treatment or cure claims
- Always recommend consulting a healthcare provider for medical questions
- Present benefits as educational, evidence-informed content — not marketing
- FDA disclaimer shown on benefits section

## Amazon Auto-Import System
- `/scripts/import-product.ts` pulls product data from Amazon listings by ASIN or URL
- **Requires `--brand-url`** — fetches the brand's website to extract brand name, colors, logo, and visual identity
- Also accepts local HTML file when Amazon blocks direct fetch
- Extracts text content (title, bullets, description, A+ content, details, supplement facts) via Cheerio
- Downloads all product listing images + brand logo and sends them to Claude's vision API
- Claude reads the Supplement Facts label image to extract exact ingredient amounts, serving size, directions
- Claude uses the brand identity to set correct colors, brand name references, and visual consistency
- Uses Anthropic API (claude-sonnet-4-20250514) to transform raw data + images into structured product config
- Generated configs are DRAFTS — review any REVIEW: or TODO: flags before going live
- Output goes to `/lib/products/[slug].ts` and auto-registers in `/lib/products/index.ts`
- Hero image auto-downloaded to `/public/products/[slug].jpg`
- Supports multiple brands — each import specifies which brand the product belongs to

## Tech Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Anthropic API (claude-sonnet-4-20250514) for chatbot + product import (with vision for image analysis)
- Cheerio for Amazon listing HTML parsing
- qrcode.react for QR code generation on admin page
- Deployed on Vercel

## Project Structure
```
app/
  product/[slug]/
    layout.tsx          → SEO metadata (OpenGraph, Twitter, canonical) + JSON-LD structured data
    page.tsx            → Client-side interactive page (wrapped in Suspense)
  products/page.tsx     → Internal admin page with product list + QR codes
  api/chat/route.ts     → AI chatbot API endpoint (streaming SSE)
  layout.tsx            → Root layout (Fira Sans + Nunito fonts, viewport)

components/
  chat/                 → Chat widget + message components
  platform-select/      → Platform selection modal
  sections/             → Page sections (hero, usage, benefits, ingredients, FAQ, returns)
  ui/                   → Reusable UI (accordion, bottom-nav, section wrapper)

hooks/
  use-active-section.ts → IntersectionObserver for nav highlighting
  use-scroll-animation.ts → Scroll-triggered entrance animations

lib/
  products/             → One config file per product + barrel index (index.ts)
  types.ts              → TypeScript interfaces (Product, Platform, ReturnPolicy)
  constants.ts          → Platform-specific return policies, labels, icons
  analytics.ts          → Typed event tracking functions (8 events)

scripts/
  import-product.ts     → Amazon listing importer (text + vision)

public/
  products/             → Product hero images ([slug].jpg or .png)
```

## Key Architecture Decisions
- `page.tsx` is a client component ("use client") — uses `useSearchParams()` which requires a `<Suspense>` boundary in Next.js 14
- `layout.tsx` handles all server-side SEO via `generateMetadata()` — keeps page.tsx purely client-side
- Product configs are static TypeScript files (not a database) — simple, fast, versionable
- The import script runs standalone (not through Next.js) so it manually loads `.env`
- The import script uses ES modules (`import.meta.url` for `__dirname` equivalent)
- Analytics functions are typed helpers (not a generic `trackEvent`) for better DX

## Adding a New Product
1. Run: `npx ts-node scripts/import-product.ts --asin="BXXXXXXXXX" --brand-url="https://yourbrand.com"`
2. If fetch fails: save Amazon page source as HTML, run with `--file` flag
3. Review `/lib/products/[slug].ts` — fix any REVIEW: and TODO: items
4. Verify hero image in `/public/products/` looks correct
5. Verify brand colors match the brand website (auto-extracted but worth confirming)
6. Test all 3 platform flows at `/product/[slug]`
7. Get QR code URLs from `/products` admin page
8. Deploy via `git push` (Vercel auto-deploys)

## Analytics Events (lib/analytics.ts)
Eight typed helper functions, all log to console in dev:
- `trackPageView(slug, platform)` — page loads with platform
- `trackPlatformSelection(platform, slug)` — user picks a platform
- `trackSectionView(slug, sectionName)` — user taps a nav link
- `trackFaqExpand(slug, questionText)` — user expands an FAQ
- `trackChatOpen(slug, platform)` — user opens chat widget
- `trackChatMessage(slug, isFirstMessage)` — user sends a message
- `trackReturnInstructionsViewed(slug, platform)` — returns section renders
- `trackExternalLink(slug, destination, url)` — user clicks external link

To wire up production analytics (GA4, Amplitude, etc.), edit the `trackEvent` function in `/lib/analytics.ts`.

## Chatbot Rules
- Product-specific context loaded from config `chatbotContext` field
- Knows which platform the customer purchased from
- Includes platform-specific return policy in system prompt
- Helpful, knowledgeable, transparent — never pushy
- NEVER processes returns for Amazon/TikTok customers
- NEVER makes medical/disease claims
- Recommends consulting healthcare provider for health questions

## Environment Variables
- `ANTHROPIC_API_KEY` — required for chatbot and import script
- `NEXT_PUBLIC_SITE_URL` — production URL for QR codes and OG meta
- `NEXT_PUBLIC_AMAZON_STOREFRONT_URL` — Amazon storefront link
- `NEXT_PUBLIC_SUPPORT_EMAIL` — support email for website returns
- `NEXT_PUBLIC_RETURN_PORTAL_URL` — return portal URL for website customers
