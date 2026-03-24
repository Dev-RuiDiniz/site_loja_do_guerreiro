import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineCog,
  HiOutlineCube,
  HiOutlineMenuAlt2,
  HiOutlinePhotograph,
  HiOutlineSparkles,
  HiOutlineViewBoards,
} from "react-icons/hi";

export default async function AdminDashboardPage() {
  const statCards = [
    {
      title: "Catalogo",
      value: "Produtos e variacoes",
      detail: "Estruture pecas, descricoes, SEO e categorias.",
      icon: HiOutlineCube,
      href: "/admin/produtos",
    },
    {
      title: "Vitrine",
      value: "Banners e narrativa",
      detail: "Organize a entrada da home como campanha ativa.",
      icon: HiOutlinePhotograph,
      href: "/admin/banners",
    },
    {
      title: "Navegacao",
      value: "Menu e CTAs",
      detail: "Ajuste rotas, chamadas e fluxo ate o WhatsApp.",
      icon: HiOutlineMenuAlt2,
      href: "/admin/cabecalho",
    },
    {
      title: "Rodape",
      value: "Contato e contexto",
      detail: "Mantenha links, endereco e apoio institucional.",
      icon: HiOutlineViewBoards,
      href: "/admin/rodape",
    },
  ];

  const operationCards = [
    {
      title: "Sequencia recomendada",
      body: "Comece pelo catalogo, depois revise a vitrine e por fim confirme os canais de atendimento antes de publicar uma colecao.",
    },
    {
      title: "Sinal de qualidade",
      body: "Produtos com texto curto claro, imagem forte e SEO consistente deixam a operacao mais rapida e a leitura da loja mais precisa.",
    },
    {
      title: "Ritmo da equipe",
      body: "Este painel deve parecer uma extensao silenciosa da marca: tecnico no uso, mas ainda ligado a materia, presenca e direcao editorial.",
    },
  ];

  const quickActions = [
    { title: "Abrir produtos", href: "/admin/produtos", icon: HiOutlineCube },
    { title: "Editar banners", href: "/admin/banners", icon: HiOutlinePhotograph },
    { title: "Revisar cabecalho", href: "/admin/cabecalho", icon: HiOutlineMenuAlt2 },
    { title: "Ajustar configuracoes", href: "/admin/configuracoes", icon: HiOutlineCog },
  ];

  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="admin-panel admin-grid relative overflow-hidden rounded-[2rem] p-6 lg:p-8">
        <div className="absolute right-6 top-6 hidden h-28 w-28 rounded-full bg-[color:rgba(198,161,91,0.12)] blur-2xl lg:block" />
        <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="admin-kicker">Central de operacao</p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-[var(--admin-ink)] lg:text-5xl">
              Catalogo, vitrine e canais no mesmo campo de controle.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--admin-muted)] lg:text-base">
              O painel foi reorganizado para operar como um caderno vivo da Loja do Guerreiro:
              menos cara de dashboard generico, mais leitura de colecao, campanha e atendimento.
            </p>
          </div>

          <div className="admin-panel-strong rounded-[1.8rem] p-5 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--admin-border-strong)] bg-[color:rgba(198,161,91,0.12)] text-[var(--admin-accent)]">
                <HiOutlineSparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="admin-kicker">Foco do dia</p>
                <p className="mt-1 text-sm font-medium text-[var(--admin-ink)]">
                  Garanta coerencia entre destaque visual, produto e canal de fechamento.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.2rem] border border-[var(--admin-border)] bg-[color:rgba(255,255,255,0.2)] p-4">
                <p className="admin-kicker">Colecao</p>
                <p className="mt-2 text-sm leading-6 text-[var(--admin-ink)]">
                  Revise descricoes, imagens e categorias antes de qualquer campanha.
                </p>
              </div>
              <div className="rounded-[1.2rem] border border-[var(--admin-border)] bg-[color:rgba(255,255,255,0.2)] p-4">
                <p className="admin-kicker">Canal</p>
                <p className="mt-2 text-sm leading-6 text-[var(--admin-ink)]">
                  O WhatsApp e os CTAs precisam seguir claros em toda a jornada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="admin-panel group rounded-[1.7rem] p-5 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--admin-border)] bg-[color:rgba(198,161,91,0.1)] text-[var(--admin-accent)]">
                <stat.icon className="h-5 w-5" />
              </div>
              <HiOutlineArrowRight className="mt-1 h-4 w-4 text-[var(--admin-muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--admin-accent)]" />
            </div>
            <p className="mt-5 text-sm font-medium text-[var(--admin-ink)]">{stat.value}</p>
            <h2 className="mt-2 font-serif text-3xl text-[var(--color-primary)]">{stat.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--admin-muted)]">{stat.detail}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div>
            <p className="admin-kicker">Direcao operacional</p>
            <h2 className="mt-2 font-serif text-3xl text-[var(--admin-ink)]">
              Como manter a loja consistente sem perder ritmo.
            </h2>
          </div>
          <div className="grid gap-4">
            {operationCards.map((card) => (
              <div key={card.title} className="admin-panel rounded-[1.6rem] p-5">
                <p className="admin-kicker">{card.title}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--admin-ink)]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel-strong rounded-[1.8rem] p-5 lg:p-6">
          <p className="admin-kicker">Acoes rapidas</p>
          <h2 className="mt-2 font-serif text-3xl text-[var(--admin-ink)]">Entradas principais</h2>
          <div className="mt-5 space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center gap-4 rounded-[1.3rem] border border-[var(--admin-border)] bg-[color:rgba(255,255,255,0.18)] px-4 py-4 transition-all duration-200 hover:border-[var(--admin-accent)] hover:bg-[color:rgba(198,161,91,0.1)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--admin-border)] bg-[var(--admin-panel)] text-[var(--admin-accent)]">
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--admin-ink)]">{action.title}</p>
                </div>
                <HiOutlineArrowRight className="h-4 w-4 text-[var(--admin-muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--admin-accent)]" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
