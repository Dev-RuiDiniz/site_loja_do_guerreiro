import { NextResponse } from "next/server";
import { storeCategories, storeProducts } from "@/data/store";

export async function GET() {
  const categories = storeCategories.map((category) => ({
    ...category,
    _count: {
      products: storeProducts.filter((product) => product.categorySlug === category.slug).length,
    },
  }));

  return NextResponse.json({ categories });
}
