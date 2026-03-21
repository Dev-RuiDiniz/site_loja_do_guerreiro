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
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-12 lg:px-10 lg:pt-16">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8A7D71]">Loja virtual</p>
        <h1 className="mt-4 font-serif text-6xl leading-none text-[#111111] lg:text-7xl">
          Coleção viva para vestir presença.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#544B44]">
          Navegue por categorias, escolha cor e tamanho e monte um pedido assistido
          pela Loja do Guerreiro.
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
