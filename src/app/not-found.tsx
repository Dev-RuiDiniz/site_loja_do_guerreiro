import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="ritual-shell w-full max-w-2xl border border-black/10 bg-white/70 p-10 text-center shadow-[0_24px_70px_rgba(17,17,17,0.08)]">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8A7D71]">
          Rota não encontrada
        </p>
        <h1 className="mt-4 font-serif text-5xl text-[#111111]">
          Essa trilha não está aberta.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#5C5148]">
          A página que você tentou acessar não faz parte da nova Loja do Guerreiro.
          Volte para a vitrine principal ou fale com o atendimento.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button className="bg-[#111111] text-white hover:bg-[#A14F2A]" asChild>
            <Link href="/">Ir para a home</Link>
          </Button>
          <Button
            variant="outline"
            className="border-black/15 bg-white text-[#111111] hover:bg-[#111111] hover:text-white"
            asChild
          >
            <Link href="/loja">Ver coleção</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
