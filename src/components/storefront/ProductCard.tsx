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
      className="group ritual-shell surface-grain editorial-shadow block overflow-hidden rounded-[1.7rem] border border-[var(--olive-line)] bg-[var(--offwhite-raised)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative">
        <ProductArtwork
          artwork={product.artworks[0]}
          className="aspect-[4/5] border-0 shadow-none"
          labelClassName="bg-[color:rgba(255,253,248,0.9)] text-[var(--color-primary)]"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {product.badge ? (
            <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary-foreground)]">
              {product.badge}
            </span>
          ) : null}
          {product.newArrival ? (
            <span className="rounded-full border border-[var(--olive-line)] bg-[var(--olive-soft)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary)]">
              Lancamento
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <p className="caption-label">
            {category?.name || "Colecao"}
          </p>
          <h3 className="font-serif text-[1.9rem] leading-tight text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent)]">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-7 text-[var(--color-muted-foreground)]">
            {product.shortDescription}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-[color:rgba(16,37,107,0.08)] pt-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
              a partir de
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-[var(--color-primary)]">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice ? (
                <span className="text-sm text-[var(--color-muted-foreground)] line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              ) : null}
            </div>
          </div>

          <span className="inline-flex items-center text-sm font-medium text-[var(--color-primary)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-accent)]">
            Ver
            <HiArrowRight className="ml-2 h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
