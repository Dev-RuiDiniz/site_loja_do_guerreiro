import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/storefront/ProductDetailClient";
import { getStoreProductBySlug } from "@/data/store";

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getStoreProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
