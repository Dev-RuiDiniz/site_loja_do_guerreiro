import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { ProductArtwork } from "@/components/storefront/ProductArtwork";
import { StoreCategory, StoreProduct } from "@/data/store";
import { formatCurrency } from "@/lib/site";

interface ProductCardProps {
  product: StoreProduct;
  category?: StoreCategory;
}

export function ProductCard({ product, category }: ProductCardProps) {
  return (
    <Link
      href={`/produto/${product.slug}`}
      className="commerce-card group block overflow-hidden rounded-[1.8rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(16,37,107,0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:rgba(127,150,66,0.22)]"
    >
      <div className="relative">
        <ProductArtwork
          artwork={product.artworks[0]}
          className="aspect-[4/5] rounded-b-none border-0 shadow-none"
          labelClassName="bg-white/88 text-[var(--brand-ink)]"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {product.badge ? (
            <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary-foreground)]">
              {product.badge}
            </span>
          ) : null}
          {product.newArrival ? (
            <span className="rounded-full border border-[var(--commerce-border)] bg-[var(--color-secondary)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary)]">
              Lançamento
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
              {product.eyebrow || category?.eyebrow || category?.name || "Coleção"}
            </p>
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
              {category?.name || "Coleção"}
            </span>
          </div>
          <h3 className="font-serif text-[1.9rem] leading-tight text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent)]">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
            {product.shortDescription}
          </p>
          <p className="line-clamp-2 text-sm leading-6 text-[var(--commerce-muted)]">
            {product.featuredReason || category?.trustNote}
          </p>
        </div>

        <div className="rounded-[1.2rem] border border-[var(--commerce-border)] bg-[var(--surface-soft)] px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
            Compra assistida
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-primary)]">
            {product.trustNote ||
              "Atendimento humano para confirmar medidas, combinações e disponibilidade."}
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

          <span className="inline-flex items-center rounded-full border border-[var(--commerce-border)] bg-[var(--surface-soft)] px-3 py-2 text-sm font-medium text-[var(--color-primary)] transition-all group-hover:translate-x-1 group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
            Ver peça
            <HiArrowRight className="ml-2 h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
