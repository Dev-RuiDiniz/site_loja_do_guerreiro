export default function SobrePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] bg-[#111111] p-8 text-white">
          <p className="text-xs uppercase tracking-[0.28em] text-white/55">Manifesto</p>
          <h1 className="mt-4 font-serif text-6xl leading-none">
            Uma loja feita para vestir presença com respeito.
          </h1>
        </div>
        <div className="space-y-6 border border-black/10 bg-white/70 p-8 text-[#544B44]">
          <p className="text-lg leading-8">
            A Loja do Guerreiro nasce para criar uma experiência de moda afro-brasileira
            com linguagem atual, força visual e acolhimento real. Nosso foco está em
            peças têxteis que sustentam identidade sem cair na estética caricata.
          </p>
          <p className="text-lg leading-8">
            A direção criativa trabalha com tons terrosos, verdes profundos, dourado
            fosco e bases escuras. O resultado é uma vitrine forte e moderna, mas
            ainda próxima do público, com navegação simples e atendimento humano.
          </p>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Presença",
            text: "Modelagens com leitura forte, caimento honesto e espaço para movimento.",
          },
          {
            title: "Respeito",
            text: "Referências afro-brasileiras tratadas com sobriedade e intenção.",
          },
          {
            title: "Acolhimento",
            text: "Venda assistida por WhatsApp para montar o pedido com clareza.",
          },
        ].map((item) => (
          <article key={item.title} className="border border-black/10 bg-white p-6">
            <h2 className="font-serif text-3xl text-[#111111]">{item.title}</h2>
            <p className="mt-4 text-base leading-8 text-[#544B44]">{item.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
