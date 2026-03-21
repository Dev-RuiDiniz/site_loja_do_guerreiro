import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { StoreCategory, StoreProduct } from "@/data/store";
import { formatCurrency } from "@/lib/site";
import { ProductArtwork } from "@/components/storefront/ProductArtwork";

interface ProductCardProps {
  product: StoreProduct;
  category?: StoreCategory;
}

export function ProductCard({ product, category }: ProductCardProps) {
  return (
    <Link
      href={`/produto/${product.slug}`}
      className="group block overflow-hidden border border-black/10 bg-white shadow-[0_18px_40px_rgba(17,17,17,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(17,17,17,0.12)]"
    >
      <div className="relative">
        <ProductArtwork
          artwork={product.artworks[0]}
          className="aspect-[4/5] border-0 shadow-none"
          labelClassName="bg-white/85 text-black"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {product.badge ? (
            <span className="rounded-full bg-[#111111] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white">
              {product.badge}
            </span>
          ) : null}
          {product.newArrival ? (
            <span className="rounded-full border border-black/15 bg-[#E8DCCB] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#111111]">
              Lancamento
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-[#6C6258]">
            {category?.name || "Colecao"}
          </p>
          <h3 className="font-serif text-2xl text-[#111111] transition-colors group-hover:text-[#A14F2A]">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-6 text-[#544B44]">
            {product.shortDescription}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-black/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#6C6258]">
              a partir de
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-[#111111]">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice ? (
                <span className="text-sm text-[#8A7D71] line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              ) : null}
            </div>
          </div>

          <span className="inline-flex items-center text-sm font-medium text-[#111111] transition-transform group-hover:translate-x-1">
            Ver
            <HiArrowRight className="ml-2 h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
