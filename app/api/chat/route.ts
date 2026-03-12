import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getProduct } from "@/lib/products";
import { RETURN_POLICIES, PLATFORM_LABELS } from "@/lib/constants";
import { Platform } from "@/lib/types";

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { messages, productSlug, platform } = await request.json();

    if (!productSlug || !platform || !messages?.length) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const product = getProduct(productSlug);
    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const returnPolicy = RETURN_POLICIES[platform as Platform];
    const platformLabel = PLATFORM_LABELS[platform as Platform];

    // Build synergy context
    const synergyContext = product.formulaSynergy.interactions
      .map(
        (i) =>
          `- ${i.ingredients.join(" + ")}: ${i.relationship} — ${i.explanation}${i.citation ? ` (${i.citation})` : ""}`
      )
      .join("\n");

    // Build timeline context
    const timelineContext = product.resultsTimeline.stages
      .map(
        (s) =>
          `- ${s.period} (${s.title}): ${s.noticeable} Advice: ${s.advice}`
      )
      .join("\n");

    // Build negative review FAQ context
    const complaintContext = product.negativeReviewFaq
      .map((f) => `- Theme "${f.sourceTheme}": Q: ${f.question} A: ${f.answer}`)
      .join("\n");

    const systemPrompt = `${product.chatbotContext}

Customer purchased from: ${platformLabel}

FORMULA SYNERGY (why these ingredients work together):
${product.formulaSynergy.summary}
${synergyContext}

RESULTS TIMELINE (what to expect and when):
${product.resultsTimeline.summary}
${timelineContext}

COMMON CUSTOMER CONCERNS (pre-built answers for frequent complaints):
${complaintContext}

RETURN/REFUND POLICY FOR THIS CUSTOMER:
${returnPolicy.heading}
${returnPolicy.message}
Steps: ${returnPolicy.steps.join(" → ")}
${returnPolicy.important ? `Important: ${returnPolicy.important}` : ""}
${returnPolicy.link ? `Direct them to: ${returnPolicy.link.url}` : ""}

CRITICAL RULES:
- If the customer asks about returns, refunds, or exchanges, provide the platform-specific return instructions above.
${platform === "amazon" ? "- NEVER offer to process returns for Amazon customers. They MUST go through Amazon's system. All returns are handled by Amazon." : ""}
${platform === "tiktok" ? "- NEVER offer to process returns for TikTok customers. They MUST go through TikTok's system." : ""}
- Keep responses concise and helpful (2-4 sentences when possible).
- Be warm, knowledgeable, and transparent — never pushy or sales-oriented.
- Never make disease treatment, cure, or prevention claims.
- Recommend consulting a healthcare provider for medical questions or drug interaction concerns.
- Present benefits as educational and evidence-informed, not as guaranteed outcomes.
- When asked about whether the product works or why these ingredients, reference the formula synergy interactions and explain how the ingredients work together.
- When asked about timing or when they'll see results, reference the results timeline and set honest expectations based on the specific stage they're likely in.
- When a customer expresses a concern that matches a known complaint theme, use the pre-built answer but adapt the tone to the conversation.`;

    // Stream the response
    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const data = JSON.stringify({ text: event.delta.text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
