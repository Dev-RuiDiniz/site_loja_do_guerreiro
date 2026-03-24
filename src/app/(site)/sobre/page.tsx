export default function SobrePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] bg-[#111111] p-8 text-white">
          <p className="text-xs uppercase tracking-[0.28em] text-white/55">Identidade</p>
          <h1 className="mt-4 font-serif text-6xl leading-none">
            Uma presença visual firme, contemporânea e acolhedora.
          </h1>
        </div>
        <div className="space-y-6 border border-black/10 bg-white/70 p-8 text-[#544B44]">
          <p className="text-lg leading-8">
            A identidade da Loja do Guerreiro nasce do encontro entre moda afro-brasileira,
            linguagem atual e respeito à força simbólica de quem veste cada peça. O foco está
            em roupas e acessórios têxteis que afirmam presença sem recorrer à caricatura.
          </p>
          <p className="text-lg leading-8">
            A direção visual trabalha com profundidade, matéria e calor: tons terrosos,
            verdes densos, dourado fosco e bases escuras constroem uma vitrine forte e
            elegante, sempre próxima do público e apoiada por atendimento humano.
          </p>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Presença",
            text: "Modelagens com leitura forte, caimento honesto e espaço real para movimento.",
          },
          {
            title: "Linguagem",
            text: "Referências afro-brasileiras tratadas com sobriedade, intenção e contemporaneidade.",
          },
          {
            title: "Acolhimento",
            text: "Venda assistida por WhatsApp para orientar escolhas com clareza e proximidade.",
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
