"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { ProductCard } from "@/components/storefront/ProductCard";
import { StoreCategory, StoreProduct } from "@/data/store";
import { ancestryArtLayers, themePanels } from "@/data/visualAssets";

interface CatalogClientProps {
  categories: StoreCategory[];
  products: StoreProduct[];
  initialCategory?: string;
}

export function CatalogClient({
  categories,
  products,
  initialCategory = "all",
}: CatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        selectedCategory === "all" || product.categorySlug === selectedCategory;
      const matchQuery =
        query.trim().length === 0 ||
        `${product.name} ${product.shortDescription} ${product.description}`
          .toLowerCase()
          .includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [products, query, selectedCategory]);

  return (
    <>
      <section className="mx-auto max-w-[var(--section-max)] px-6 pt-10 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="brand-panel relative overflow-hidden rounded-[2rem] px-6 py-8 text-[var(--color-primary-foreground)] lg:px-8 lg:py-10">
            <Image
              src={ancestryArtLayers[0].src}
              alt=""
              fill
              className="pointer-events-none object-cover opacity-18 mix-blend-screen"
              sizes="(max-width: 1024px) 100vw, 48vw"
              aria-hidden
            />
            <div className="relative max-w-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">Coleção completa</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">
                Escolha por silhueta, textura e intensidade de presença.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/74">
                O catálogo organiza a coleção para leitura rápida, mas sem perder o campo
                editorial da marca. O atendimento humano continua disponível para fechar a compra.
              </p>
            </div>
          </div>

          <div className="commerce-panel grid gap-4 overflow-hidden rounded-[2rem] p-5 lg:grid-cols-[0.76fr_1.24fr] lg:p-6">
            <div className="relative min-h-[15rem] overflow-hidden rounded-[1.5rem]">
              <Image
                src={themePanels[1].src}
                alt={themePanels[1].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 22vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,37,107,0.08),rgba(16,37,107,0.44))]" />
            </div>
            <div className="relative flex flex-col justify-center">
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
                  Merchandising vivo
                </p>
                <h2 className="mt-3 font-serif text-4xl leading-tight text-[var(--color-primary)]">
                  Navegue como quem monta uma composição, não apenas uma lista.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted-foreground)]">
                  Filtros, busca e cards trabalham juntos para acelerar a comparação, reforçar a
                  assinatura da marca e manter a compra assistida sempre por perto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--section-max)] px-6 py-8 lg:px-10">
        <div className="commerce-panel rounded-[2rem] px-5 py-6 lg:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
                Filtre sua presença
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:rgba(127,150,66,0.18)] ${
                    selectedCategory === "all"
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-foreground)] shadow-[0_12px_30px_rgba(127,150,66,0.2)]"
                      : "border border-[var(--commerce-border)] bg-[var(--surface-strong)] text-[var(--color-primary)] hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
                  }`}
                >
                  Tudo
                </button>
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:rgba(127,150,66,0.18)] ${
                      selectedCategory === category.slug
                        ? "bg-[var(--color-accent)] text-[var(--color-accent-foreground)] shadow-[0_12px_30px_rgba(127,150,66,0.2)]"
                        : "border border-[var(--commerce-border)] bg-[var(--surface-strong)] text-[var(--color-primary)] hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <label className="relative block w-full max-w-md">
              <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nome, coleção ou descrição"
                className="h-12 w-full rounded-full border border-[var(--commerce-border)] bg-[var(--surface-strong)] pl-11 pr-4 text-sm text-[var(--color-primary)] outline-none transition-colors placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[color:rgba(127,150,66,0.16)]"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--section-max)] px-6 pb-16 pt-4 lg:px-10 lg:pb-20">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
              Resultado da curadoria
            </p>
            <p className="mt-2 text-base text-[var(--commerce-muted)]">
              {filteredProducts.length} peça{filteredProducts.length !== 1 ? "s" : ""} encontrada
              {filteredProducts.length !== 1 ? "s" : ""} para a combinação atual.
            </p>
          </div>
          <div className="rounded-full border border-[var(--commerce-border)] bg-[var(--surface-soft)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--color-primary)] shadow-[0_10px_24px_rgba(16,37,107,0.06)]">
            Compra assistida sempre disponivel
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="commerce-panel rounded-[2rem] p-8 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
              Nenhuma peça localizada
            </p>
            <h3 className="mt-3 font-serif text-4xl text-[var(--color-primary)]">
              Ajuste os filtros ou fale com o atendimento.
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--commerce-muted)]">
              Se você procura uma combinação específica, o atendimento humano pode orientar por
              categoria, cor, tamanho ou contexto de uso.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                category={categories.find((category) => category.slug === product.categorySlug)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
