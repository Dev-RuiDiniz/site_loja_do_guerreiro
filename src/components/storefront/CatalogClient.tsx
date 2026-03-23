"use client";

import { useMemo, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { ProductCard } from "@/components/storefront/ProductCard";
import { StoreCategory, StoreProduct } from "@/data/store";

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
      <section className="border-y border-[color:rgba(16,37,107,0.1)] bg-[color:rgba(252,250,244,0.78)]">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
                Filtre sua presença
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                    selectedCategory === "all"
                      ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                      : "border border-[color:rgba(16,37,107,0.1)] bg-[var(--color-card)] text-[var(--color-primary)] hover:border-[var(--color-accent)]"
                  }`}
                >
                  Tudo
                </button>
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                      selectedCategory === category.slug
                        ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                        : "border border-[color:rgba(16,37,107,0.1)] bg-[var(--color-card)] text-[var(--color-primary)] hover:border-[var(--color-accent)]"
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
                className="h-12 w-full border border-[color:rgba(16,37,107,0.1)] bg-[var(--color-card)] pl-11 pr-4 text-sm text-[var(--color-primary)] outline-none transition-colors placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-accent)]"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">
            {filteredProducts.length} peça{filteredProducts.length !== 1 ? "s" : ""} encontrada
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              category={categories.find((category) => category.slug === product.categorySlug)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
