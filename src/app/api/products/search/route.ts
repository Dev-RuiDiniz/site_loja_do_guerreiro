import { NextRequest, NextResponse } from "next/server";
import { storeCategories, storeProducts } from "@/data/store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const products = storeProducts
    .filter((product) =>
      `${product.name} ${product.shortDescription} ${product.description}`
        .toLowerCase()
        .includes(query)
    )
    .slice(0, 8)
    .map((product) => ({
      ...product,
      category:
        storeCategories.find((category) => category.slug === product.categorySlug) || null,
    }));

  return NextResponse.json({ products });
}
