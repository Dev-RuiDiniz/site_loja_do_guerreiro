import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineCog,
  HiOutlineCube,
  HiOutlineMenuAlt2,
  HiOutlinePhotograph,
  HiOutlinePlus,
  HiOutlineTemplate,
  HiOutlineViewBoards,
} from "react-icons/hi";

export default async function AdminDashboardPage() {
  const statCards = [
    {
      title: "Catálogo",
      value: "Produtos e variações",
      icon: HiOutlineCube,
      href: "/admin/produtos",
    },
    {
      title: "Estrutura",
      value: "Páginas e blocos",
      icon: HiOutlineTemplate,
      href: "/admin/paginas",
    },
    {
      title: "Destaques",
      value: "Banners e home",
      icon: HiOutlinePhotograph,
      href: "/admin/banners",
    },
    {
      title: "Cabeçalho",
      value: "Menu e CTAs",
      icon: HiOutlineMenuAlt2,
      href: "/admin/cabecalho",
    },
    {
      title: "Rodapé",
      value: "Contato e links",
      icon: HiOutlineViewBoards,
      href: "/admin/rodape",
    },
    {
      title: "Marca",
      value: "SEO e canais",
      icon: HiOutlineCog,
      href: "/admin/configuracoes",
    },
  ];

  const quickActions = [
    { title: "Abrir produtos", href: "/admin/produtos", icon: HiOutlineCube },
    { title: "Editar banners", href: "/admin/banners", icon: HiOutlinePhotograph },
    { title: "Ajustar cabeçalho", href: "/admin/cabecalho", icon: HiOutlineMenuAlt2 },
    { title: "Revisar configurações", href: "/admin/configuracoes", icon: HiOutlineCog },
  ];

  const operationCards = [
    {
      title: "Fluxo recomendado",
      description:
        "Atualize o catálogo, revise a home e confirme os canais de contato antes de publicar campanhas.",
    },
    {
      title: "Foco do painel",
      description:
        "A operação deve sustentar a vitrine, o conteúdo institucional e a identidade da Loja do Guerreiro.",
    },
    {
      title: "Checklist rápido",
      description:
        "Verificar preços, tamanhos, links do menu, dados do rodapé e metadata sempre que houver nova coleção.",
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-serif font-semibold text-black">Visão Geral</h1>
        <p className="mt-2 text-sm text-gray-400">Central de operação da Loja do Guerreiro</p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href} className="group">
            <div className="border border-gray-200 p-6 transition-colors duration-300 hover:border-black">
              <div className="mb-4 flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-black" />
                <HiOutlineArrowRight className="h-4 w-4 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-black" />
              </div>
              <p className="text-sm font-medium text-black">{stat.value}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.1em] text-gray-400">
                {stat.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-gray-400">
              Direção operacional
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {operationCards.map((card) => (
              <div key={card.title} className="border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-black">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-sm font-medium uppercase tracking-[0.15em] text-gray-400">
            Ações Rápidas
          </h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center gap-4 border border-gray-200 p-4 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
              >
                <div className="flex h-10 w-10 items-center justify-center border border-gray-200 transition-colors group-hover:border-white/20">
                  <HiOutlinePlus className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{action.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
