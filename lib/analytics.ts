import { Platform } from "./types";

type EventName =
  | "page_view"
  | "platform_selected"
  | "section_viewed"
  | "faq_opened"
  | "chat_opened"
  | "chat_message_sent"
  | "return_instructions_viewed"
  | "external_link_clicked"
  | "return_link_clicked"
  | "amazon_link_clicked"
  | "qr_scan";

type EventProperties = Record<string, string | number | boolean>;

export function trackEvent(event: EventName, properties?: EventProperties) {
  const payload = { event, properties };

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", payload);
  }

  // TODO: Replace with your analytics provider (GA4, Amplitude, Mixpanel, etc.)
  // Example for GA4:
  // if (typeof window !== "undefined" && window.gtag) {
  //   window.gtag("event", event, properties);
  // }
}

// --- Typed helper functions ---

export function trackPageView(slug: string, platform?: Platform) {
  trackEvent("page_view", {
    product: slug,
    ...(platform && { platform }),
  });
}

export function trackPlatformSelection(platform: Platform, slug: string) {
  trackEvent("platform_selected", { platform, product: slug });
}

export function trackSectionView(slug: string, sectionName: string) {
  trackEvent("section_viewed", { product: slug, section: sectionName });
}

export function trackFaqExpand(slug: string, questionText: string) {
  trackEvent("faq_opened", { product: slug, question: questionText });
}

export function trackChatOpen(slug: string, platform: Platform) {
  trackEvent("chat_opened", { product: slug, platform });
}

export function trackChatMessage(slug: string, isFirstMessage: boolean) {
  trackEvent("chat_message_sent", {
    product: slug,
    is_first_message: isFirstMessage,
  });
}

export function trackReturnInstructionsViewed(slug: string, platform: Platform) {
  trackEvent("return_instructions_viewed", { product: slug, platform });
}

export function trackExternalLink(slug: string, destination: string, url: string) {
  trackEvent("external_link_clicked", { product: slug, destination, url });
}
