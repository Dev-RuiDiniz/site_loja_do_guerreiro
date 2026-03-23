"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { ProductArtwork } from "@/components/storefront/ProductArtwork";
import { StoreColor, StoreProduct, storeCategories, storeProducts } from "@/data/store";
import { useCart } from "@/contexts/CartContext";
import { buildWhatsAppUrl, formatCurrency } from "@/lib/site";

export function ProductDetailClient({ product }: { product: StoreProduct }) {
  const [selectedArtwork, setSelectedArtwork] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<StoreColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();

  const category = storeCategories.find((item) => item.slug === product.categorySlug);
  const relatedProducts = storeProducts
    .filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-10 lg:pb-24">
        <div className="mb-8 text-sm text-[var(--color-muted-foreground)]">
          <Link href="/" className="hover:text-[var(--color-primary)]">
            Início
          </Link>{" "}
          /{" "}
          <Link href="/loja" className="hover:text-[var(--color-primary)]">
            Loja
          </Link>{" "}
          / <span className="text-[var(--color-primary)]">{product.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="space-y-5">
            <ProductArtwork
              artwork={product.artworks[selectedArtwork]}
              className="aspect-[4/5] rounded-[2rem] border border-[color:rgba(16,37,107,0.1)]"
            />
            <div className="grid grid-cols-2 gap-4">
              {product.artworks.map((artwork, index) => (
                <button
                  key={artwork.label}
                  type="button"
                  onClick={() => setSelectedArtwork(index)}
                  className={`overflow-hidden rounded-[1.25rem] border transition-colors ${
                    selectedArtwork === index
                      ? "border-[var(--color-accent)]"
                      : "border-[color:rgba(16,37,107,0.1)] hover:border-[var(--color-chart-4)]"
                  }`}
                >
                  <ProductArtwork
                    artwork={artwork}
                    className="aspect-[4/3] border-0 shadow-none"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4 lens-glow">
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow">
                  {category?.name || "Coleção"}
                </span>
                {product.badge ? (
                  <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary-foreground)]">
                    {product.badge}
                  </span>
                ) : null}
              </div>
              <h1 className="section-title text-5xl lg:text-6xl">
                {product.name}
              </h1>
              <p className="lede max-w-2xl">
                {product.shortDescription}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-semibold text-[var(--color-primary)]">
                  {formatCurrency(product.price)}
                </span>
                {product.compareAtPrice ? (
                  <span className="text-lg text-[var(--color-muted-foreground)] line-through">
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="grid gap-6 border-y border-[var(--olive-line)] py-8">
              <div>
                <p className="caption-label mb-3">
                  Cor
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                        selectedColor.name === color.name
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                          : "border-[var(--olive-line)] bg-[var(--offwhite-raised)] text-[var(--color-primary)]"
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-[color:rgba(16,37,107,0.1)]"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="caption-label mb-3">
                  Tamanho
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        selectedSize === size
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                          : "border-[var(--olive-line)] bg-[var(--offwhite-raised)] text-[var(--color-primary)]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="caption-label mb-3">
                  Quantidade
                </p>
                <div className="editorial-shadow inline-flex items-center rounded-full border border-[var(--olive-line)] bg-[var(--offwhite-raised)]">
                  <button
                    type="button"
                    className="px-4 py-2 text-[var(--color-primary)]"
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  >
                    -
                  </button>
                  <span className="min-w-10 text-center">{quantity}</span>
                  <button
                    type="button"
                    className="px-4 py-2 text-[var(--color-primary)]"
                    onClick={() => setQuantity((current) => current + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                size="lg"
                className="h-12 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[color:#17358f]"
                onClick={() =>
                  addItem({
                    product,
                    size: selectedSize,
                    color: selectedColor,
                    quantity,
                  })
                }
              >
                <HiOutlineShoppingBag className="mr-2 h-5 w-5" />
                Adicionar ao carrinho
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-[var(--olive-line)] bg-[var(--offwhite-raised)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)]"
                asChild
              >
                <a
                  href={buildWhatsAppUrl(
                    `Olá! Quero atendimento para o produto ${product.name}, tamanho ${selectedSize}, cor ${selectedColor.name}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar com atendimento
                </a>
              </Button>
            </div>

            <div className="surface-grain editorial-shadow rounded-[1.7rem] border border-[var(--olive-line)] bg-[var(--offwhite-raised)] p-6">
              <p className="caption-label">
                Sobre a peça
              </p>
              <p className="lede mt-4 text-base">
                {product.description}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="caption-label">
                    Materiais
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--color-primary)]">
                    {product.materials.map((material) => (
                      <li key={material}>{material}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="caption-label">
                    Destaques
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--color-primary)]">
                    {product.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              className="px-0 text-[var(--color-primary)] hover:bg-transparent hover:text-[var(--color-accent)]"
              onClick={openCart}
            >
              Abrir carrinho ritual
            </Button>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="surface-fiber border-t border-[var(--olive-line)] bg-[var(--olive-soft)]">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">
                  Continue explorando
                </p>
                <h2 className="section-title mt-2">
                  Peças da mesma linha
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedProducts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/produto/${related.slug}`}
                  className="ritual-shell editorial-shadow rounded-[1.7rem] border border-[var(--olive-line)] bg-[var(--offwhite-raised)] p-5 transition-transform hover:-translate-y-1"
                >
                  <ProductArtwork
                    artwork={related.artworks[0]}
                    className="aspect-[4/5] rounded-[1.25rem] border-0 shadow-none"
                  />
                  <h3 className="mt-4 font-serif text-2xl text-[var(--color-primary)]">
                    {related.name}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted-foreground)]">
                    {related.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
