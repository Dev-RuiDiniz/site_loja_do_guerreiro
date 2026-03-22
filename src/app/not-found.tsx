import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="ritual-shell w-full max-w-2xl border border-[color:rgba(16,37,107,0.1)] bg-[color:rgba(252,250,244,0.86)] p-10 text-center shadow-[0_24px_70px_rgba(16,37,107,0.1)]">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted-foreground)]">
          Rota não encontrada
        </p>
        <h1 className="mt-4 font-serif text-5xl text-[var(--color-primary)]">
          Essa trilha não está aberta.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--color-muted-foreground)]">
          A página que você tentou acessar não faz parte da nova Loja do Guerreiro.
          Volte para a vitrine principal ou fale com o atendimento.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[color:#17358f]" asChild>
            <Link href="/">Ir para a home</Link>
          </Button>
          <Button
            variant="outline"
            className="border-[color:rgba(16,37,107,0.16)] bg-[var(--color-card)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)]"
            asChild
          >
            <Link href="/loja">Ver coleção</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
