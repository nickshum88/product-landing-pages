import { NextRequest } from "next/server";
import { runImport } from "@/lib/admin/import";

export const maxDuration = 120; // seconds (Vercel Pro)

export async function POST(request: NextRequest) {
  try {
    const { amazonUrl, brandUrl } = await request.json();

    if (!amazonUrl || !brandUrl) {
      return new Response(
        JSON.stringify({ error: "Amazon URL and brand URL are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of runImport(amazonUrl, brandUrl)) {
            const data = JSON.stringify(event);
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          const msg =
            error instanceof Error ? error.message : "Import failed";
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`)
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Import API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to start import" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
