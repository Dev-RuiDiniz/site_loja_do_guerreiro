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
        <div className="mb-8 text-sm text-[#6C6258]">
          <Link href="/" className="hover:text-[#111111]">
            Início
          </Link>{" "}
          /{" "}
          <Link href="/loja" className="hover:text-[#111111]">
            Loja
          </Link>{" "}
          / <span className="text-[#111111]">{product.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="space-y-5">
            <ProductArtwork
              artwork={product.artworks[selectedArtwork]}
              className="aspect-[4/5] rounded-[2rem] border border-black/10"
            />
            <div className="grid grid-cols-2 gap-4">
              {product.artworks.map((artwork, index) => (
                <button
                  key={artwork.label}
                  type="button"
                  onClick={() => setSelectedArtwork(index)}
                  className={`overflow-hidden rounded-[1.25rem] border transition-colors ${
                    selectedArtwork === index
                      ? "border-[#A14F2A]"
                      : "border-black/10 hover:border-[#C6A15B]"
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
                <span className="text-xs uppercase tracking-[0.24em] text-[#8A7D71]">
                  {category?.name || "Coleção"}
                </span>
                {product.badge ? (
                  <span className="rounded-full bg-[#111111] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white">
                    {product.badge}
                  </span>
                ) : null}
              </div>
              <h1 className="font-serif text-5xl leading-tight text-[#111111] lg:text-6xl">
                {product.name}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#544B44]">
                {product.shortDescription}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-semibold text-[#111111]">
                  {formatCurrency(product.price)}
                </span>
                {product.compareAtPrice ? (
                  <span className="text-lg text-[#8A7D71] line-through">
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="grid gap-6 border-y border-black/10 py-8">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#8A7D71]">
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
                          ? "border-[#111111] bg-[#111111] text-white"
                          : "border-black/10 bg-white text-[#111111]"
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#8A7D71]">
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
                          ? "border-[#111111] bg-[#111111] text-white"
                          : "border-black/10 bg-white text-[#111111]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#8A7D71]">
                  Quantidade
                </p>
                <div className="inline-flex items-center rounded-full border border-black/10 bg-white">
                  <button
                    type="button"
                    className="px-4 py-2 text-[#111111]"
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  >
                    -
                  </button>
                  <span className="min-w-10 text-center">{quantity}</span>
                  <button
                    type="button"
                    className="px-4 py-2 text-[#111111]"
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
                className="h-12 bg-[#111111] text-white hover:bg-[#A14F2A]"
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
                className="h-12 border-black/15 bg-white text-[#111111] hover:bg-[#111111] hover:text-white"
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

            <div className="rounded-[1.5rem] border border-black/10 bg-white/60 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#8A7D71]">
                Sobre a peça
              </p>
              <p className="mt-4 text-base leading-8 text-[#544B44]">
                {product.description}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#8A7D71]">
                    Materiais
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[#111111]">
                    {product.materials.map((material) => (
                      <li key={material}>{material}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#8A7D71]">
                    Destaques
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[#111111]">
                    {product.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              className="px-0 text-[#111111] hover:bg-transparent hover:text-[#A14F2A]"
              onClick={openCart}
            >
              Abrir carrinho ritual
            </Button>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="border-t border-black/10 bg-white/50">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#8A7D71]">
                  Continue explorando
                </p>
                <h2 className="mt-2 font-serif text-4xl text-[#111111]">
                  Peças da mesma linha
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedProducts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/produto/${related.slug}`}
                  className="rounded-[1.5rem] border border-black/10 bg-white p-5 transition-transform hover:-translate-y-1"
                >
                  <ProductArtwork
                    artwork={related.artworks[0]}
                    className="aspect-[4/5] rounded-[1.25rem] border-0 shadow-none"
                  />
                  <h3 className="mt-4 font-serif text-2xl text-[#111111]">
                    {related.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#544B44]">
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
