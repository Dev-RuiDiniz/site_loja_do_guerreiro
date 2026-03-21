import Link from "next/link";
import { storeCategories, storeProducts } from "@/data/store";

export default function CategoriasPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <p className="text-xs uppercase tracking-[0.28em] text-[#8A7D71]">Coleções</p>
      <h1 className="mt-4 font-serif text-6xl text-[#111111]">Arquitetura da coleção</h1>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {storeCategories.map((category) => {
          const count = storeProducts.filter(
            (product) => product.categorySlug === category.slug
          ).length;

          return (
            <Link
              key={category.slug}
              href={`/loja?categoria=${category.slug}`}
              className="ritual-shell block border border-black/10 bg-white/70 p-8 transition-transform hover:-translate-y-1"
            >
              <span
                className="inline-block h-3 w-20 rounded-full"
                style={{ backgroundColor: category.accent }}
              />
              <h2 className="mt-6 font-serif text-4xl text-[#111111]">{category.name}</h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-[#544B44]">
                {category.description}
              </p>
              <p className="mt-8 text-xs uppercase tracking-[0.22em] text-[#8A7D71]">
                {count} peça{count !== 1 ? "s" : ""} nesta linha
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
