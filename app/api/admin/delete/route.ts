import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { removeFromIndex } from "@/lib/admin/generate-config";
import {
  getFileContent,
  createCommit,
  deleteFile,
} from "@/lib/admin/github";

export async function POST(request: NextRequest) {
  try {
    const { slug, name } = await request.json();

    if (!slug) {
      return NextResponse.json(
        { error: "Product slug is required" },
        { status: 400 }
      );
    }

    // --- Delete local files (works in dev, silently fails in production) ---
    try {
      const projectRoot = process.cwd();

      // Delete config file
      const configPath = path.join(projectRoot, "lib", "products", `${slug}.ts`);
      if (fs.existsSync(configPath)) {
        fs.unlinkSync(configPath);
      }

      // Delete hero image (try common extensions)
      for (const ext of ["jpg", "jpeg", "png", "webp"]) {
        const imgPath = path.join(projectRoot, "public", "products", `${slug}.${ext}`);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
          break;
        }
      }

      // Update local index.ts
      const indexPath = path.join(projectRoot, "lib", "products", "index.ts");
      if (fs.existsSync(indexPath)) {
        const localIndex = fs.readFileSync(indexPath, "utf-8");
        const updatedLocalIndex = removeFromIndex(localIndex, slug);
        fs.writeFileSync(indexPath, updatedLocalIndex);
      }
    } catch {
      // Local file ops may fail in production (read-only fs), that's fine
    }

    // --- Delete from GitHub (triggers Vercel redeploy in production) ---
    try {
      // 1. Update index.ts to remove the product
      const currentIndex = await getFileContent("lib/products/index.ts");
      if (currentIndex) {
        const updatedIndex = removeFromIndex(currentIndex, slug);
        await createCommit(
          [{ path: "lib/products/index.ts", content: updatedIndex }],
          `Remove product: ${name || slug}`
        );
      }

      // 2. Delete the product config file
      try {
        await deleteFile(
          `lib/products/${slug}.ts`,
          `Delete config: ${name || slug}`
        );
      } catch {
        // File may not exist in repo yet
      }

      // 3. Try to delete the hero image
      for (const ext of ["jpg", "jpeg", "png", "webp"]) {
        try {
          await deleteFile(
            `public/products/${slug}.${ext}`,
            `Delete image: ${name || slug}`
          );
          break;
        } catch {
          // Try next extension
        }
      }
    } catch {
      // GitHub ops may fail if not configured, but local delete already succeeded
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete product",
      },
      { status: 500 }
    );
  }
}
