import { NextRequest, NextResponse } from "next/server";
import { getStoreProductBySlug, storeCategories, storeProducts } from "@/data/store";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getStoreProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
  }

  const relatedProducts = storeProducts.filter(
    (item) => item.categorySlug === product.categorySlug && item.slug !== product.slug
  );

  return NextResponse.json({
    product: {
      ...product,
      category:
        storeCategories.find((category) => category.slug === product.categorySlug) || null,
    },
    relatedProducts,
  });
}
