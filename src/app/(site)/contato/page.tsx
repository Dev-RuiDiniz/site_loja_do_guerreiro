import { buildWhatsAppUrl, siteConfig } from "@/lib/site";

export default function ContatoPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] bg-[#111111] p-8 text-white">
          <p className="text-xs uppercase tracking-[0.28em] text-white/55">Contato</p>
          <h1 className="mt-4 font-serif text-6xl leading-none">Atendimento direto e humano.</h1>
          <p className="mt-5 text-lg leading-8 text-white/72">
            A Loja do Guerreiro trabalha com carrinho para orçamento e fechamento via
            WhatsApp na v1. Se quiser ajuda para montar o pedido, fale com o atendimento.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="border border-black/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8A7D71]">WhatsApp</p>
            <h2 className="mt-3 font-serif text-3xl text-[#111111]">Fechamento do pedido</h2>
            <p className="mt-4 text-base leading-8 text-[#544B44]">
              Tire dúvidas sobre tamanho, cor, composição e disponibilidade.
            </p>
            <a
              href={buildWhatsAppUrl("Olá! Quero atendimento da Loja do Guerreiro.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-[#A14F2A] px-5 py-3 text-xs uppercase tracking-[0.22em] text-white"
            >
              Abrir conversa
            </a>
          </article>

          <article className="border border-black/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8A7D71]">E-mail</p>
            <h2 className="mt-3 font-serif text-3xl text-[#111111]">Contato institucional</h2>
            <p className="mt-4 text-base leading-8 text-[#544B44]">{siteConfig.email}</p>
          </article>

          <article className="border border-black/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8A7D71]">Atendimento</p>
            <h2 className="mt-3 font-serif text-3xl text-[#111111]">Horário base</h2>
            <p className="mt-4 text-base leading-8 text-[#544B44]">
              Segunda a sexta, das 9h às 18h.
            </p>
          </article>

          <article className="border border-black/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8A7D71]">Cobertura</p>
            <h2 className="mt-3 font-serif text-3xl text-[#111111]">Envio nacional</h2>
            <p className="mt-4 text-base leading-8 text-[#544B44]">
              Atendimento online para todo o Brasil, com suporte para montar o pedido.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
