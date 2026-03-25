import { NextRequest, NextResponse } from "next/server";
import { storeCategories, storeProducts } from "@/data/store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase() || "";
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "9");

  let filteredProducts = [...storeProducts];

  if (featured === "true") {
    filteredProducts = filteredProducts.filter((product) => product.featured);
  }

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.categorySlug === category
    );
  }

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      `${product.name} ${product.shortDescription} ${product.description}`
        .toLowerCase()
        .includes(search)
    );
  }

  const total = filteredProducts.length;
  const paginated = filteredProducts.slice((page - 1) * limit, page * limit);
  const products = paginated.map((product) => ({
    ...product,
    image: product.image || product.artworks[0],
    category:
      storeCategories.find((categoryItem) => categoryItem.slug === product.categorySlug) || null,
  }));

  return NextResponse.json({
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  });
}
