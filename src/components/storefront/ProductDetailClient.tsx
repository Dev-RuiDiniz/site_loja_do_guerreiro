"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { ProductArtwork } from "@/components/storefront/ProductArtwork";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { StoreColor, StoreProduct, storeCategories, storeProducts } from "@/data/store";
import { ancestryArtLayers, heroImages, themePanels } from "@/data/visualAssets";
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

  const assuranceCards = [
    product.trustNote || "Atendimento humano para orientar medidas e combinacoes.",
    product.shippingNote || "Pedido finalizado no WhatsApp com apoio da equipe.",
    product.bundleText || "A colecao foi pensada para funcionar em camadas e coordenacoes.",
  ];

  return (
    <>
      <section className="mx-auto max-w-[var(--section-max)] px-6 pb-16 pt-10 lg:px-10 lg:pb-24">
        <div className="mb-8 text-sm text-[var(--color-muted-foreground)]">
          <Link href="/" className="hover:text-[var(--color-primary)]">
            Inicio
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
              className="aspect-[4/5] rounded-[2rem] border border-[var(--commerce-border)]"
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
                      : "border-[var(--commerce-border)] hover:border-[var(--color-chart-4)]"
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
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
                  {product.eyebrow || category?.name || "Colecao"}
                </span>
                {product.badge ? (
                  <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary-foreground)]">
                    {product.badge}
                  </span>
                ) : null}
              </div>
              <h1 className="font-serif text-5xl leading-tight text-[var(--color-primary)] lg:text-6xl">
                {product.name}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted-foreground)]">
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
              <div className="grid gap-3 md:grid-cols-3">
                {assuranceCards.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-[var(--commerce-border)] bg-[var(--surface-soft)] p-4 text-sm leading-6 text-[var(--color-primary)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="commerce-panel rounded-[2rem] p-6">
              <div className="grid gap-6 border-b border-[var(--commerce-border)] pb-6">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
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
                            ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
                            : "border-[var(--commerce-border)] bg-[var(--surface-strong)] text-[var(--color-primary)]"
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-[var(--commerce-border)]"
                          style={{ backgroundColor: color.hex }}
                        />
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
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
                            ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
                            : "border-[var(--commerce-border)] bg-[var(--surface-strong)] text-[var(--color-primary)]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
                      Quantidade
                    </p>
                    <div className="inline-flex items-center rounded-full border border-[var(--commerce-border)] bg-[var(--surface-strong)]">
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
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
                      Subtotal da selecao
                    </p>
                    <p className="mt-2 font-serif text-3xl text-[var(--color-primary)]">
                      {formatCurrency(product.price * quantity)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:bg-[color:#6f8634]"
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
                  className="h-12 rounded-full border-[var(--commerce-border)] bg-[var(--surface-strong)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)]"
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

              <div className="mt-5 rounded-[1.3rem] border border-[var(--commerce-border)] bg-[var(--surface-soft)] p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
                  Compra assistida
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-primary)]">
                  Confirmamos medidas, disponibilidade, combinacoes e detalhes de finalizacao pelo WhatsApp.
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              className="justify-start px-0 text-[var(--color-primary)] hover:bg-transparent hover:text-[var(--color-accent)]"
              onClick={openCart}
            >
              Abrir carrinho ritual
            </Button>

            <div className="commerce-panel rounded-[1.8rem] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
                Sobre a peca
              </p>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted-foreground)]">
                {product.description}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
                    Materiais
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--color-primary)]">
                    {product.materials.map((material) => (
                      <li key={material}>{material}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
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

            <div className="commerce-panel grid gap-5 overflow-hidden rounded-[1.7rem] p-4 md:grid-cols-[0.88fr_1.12fr]">
              <div className="relative min-h-[15rem] overflow-hidden rounded-[1.3rem]">
                <Image
                  src={themePanels[0].src}
                  alt={themePanels[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,37,107,0.16),rgba(16,37,107,0.44))]" />
              </div>
              <div className="relative flex flex-col justify-center">
                <Image
                  src={ancestryArtLayers[2].src}
                  alt=""
                  fill
                  className="pointer-events-none object-cover opacity-20"
                  sizes="(max-width: 768px) 100vw, 28vw"
                  aria-hidden
                />
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
                    Campo editorial
                  </p>
                  <p className="mt-3 font-serif text-3xl leading-tight text-[var(--color-primary)]">
                    {product.featuredReason ||
                      "A peca dialoga com luz, tecido e permanencia em uma estetica de ancestralidade elegante."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="relative overflow-hidden border-t border-[var(--commerce-border)] bg-[color:rgba(252,250,244,0.72)]">
          <Image
            src={heroImages[1].src}
            alt=""
            fill
            className="pointer-events-none object-cover opacity-12"
            sizes="100vw"
            aria-hidden
          />
          <div className="mx-auto max-w-[var(--section-max)] px-6 py-14 lg:px-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
                  Continue explorando
                </p>
                <h2 className="mt-2 font-serif text-4xl text-[var(--color-primary)]">
                  Pecas da mesma linha
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedProducts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/produto/${related.slug}`}
                  className="commerce-card rounded-[1.5rem] p-5 transition-transform hover:-translate-y-1"
                >
                  <ProductArtwork
                    artwork={related.artworks[0]}
                    className="aspect-[4/5] rounded-[1.25rem] border-0 shadow-none"
                  />
                  <h3 className="mt-4 font-serif text-2xl text-[var(--color-primary)]">
                    {related.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
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
