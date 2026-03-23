import { CatalogClient } from "@/components/storefront/CatalogClient";
import { storeCategories, storeProducts } from "@/data/store";

export default async function LojaPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <section className="mx-auto max-w-[var(--section-max)] px-6 pb-10 pt-12 lg:px-10 lg:pt-16">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted-foreground)]">
          Loja virtual
        </p>
        <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none text-[var(--color-primary)] lg:text-7xl">
          Colecao viva para vestir presenca com compra guiada.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--commerce-muted)]">
          Navegue por categorias, compare silhuetas, escolha cor e tamanho e monte um pedido
          assistido pela Loja do Guerreiro.
        </p>
      </section>
      <CatalogClient
        categories={storeCategories}
        products={storeProducts}
        initialCategory={params.categoria || "all"}
      />
    </>
  );
}
