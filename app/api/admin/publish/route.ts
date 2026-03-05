import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/lib/types";
import {
  generateProductTs,
  generateUpdatedIndex,
  slugToVarName,
} from "@/lib/admin/generate-config";
import {
  getFileContent,
  createCommit,
  commitBinaryFile,
} from "@/lib/admin/github";

export async function POST(request: NextRequest) {
  try {
    const { product, heroImageBase64, heroImageExt, isEdit } =
      (await request.json()) as {
        product: Product;
        heroImageBase64: string | null;
        heroImageExt: string | null;
        isEdit: boolean;
      };

    if (!product.slug || !product.name) {
      return NextResponse.json(
        { error: "Product name and slug are required" },
        { status: 400 }
      );
    }

    const varName = slugToVarName(product.slug);

    // Generate the TypeScript config file
    const configContent = generateProductTs(product);
    const configPath = `lib/products/${product.slug}.ts`;

    // Get current index and generate updated version
    const currentIndex = await getFileContent("lib/products/index.ts");
    if (!currentIndex) {
      return NextResponse.json(
        { error: "Could not read product index from repository" },
        { status: 500 }
      );
    }

    const updatedIndex = generateUpdatedIndex(
      currentIndex,
      product.slug,
      varName
    );

    // Commit config + index in a single commit
    const files = [
      { path: configPath, content: configContent },
      { path: "lib/products/index.ts", content: updatedIndex },
    ];

    const action = isEdit ? "Update" : "Add";
    await createCommit(files, `${action} product: ${product.name}`);

    // Upload hero image as a separate commit if provided
    if (heroImageBase64 && heroImageExt) {
      const imagePath = `public/products/${product.slug}.${heroImageExt}`;
      await commitBinaryFile(
        imagePath,
        heroImageBase64,
        `${action} hero image: ${product.name}`
      );
    }

    return NextResponse.json({
      ok: true,
      slug: product.slug,
      url: `/product/${product.slug}`,
    });
  } catch (error) {
    console.error("Publish error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to publish product",
      },
      { status: 500 }
    );
  }
}
