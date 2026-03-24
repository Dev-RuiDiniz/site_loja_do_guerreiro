"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineCog,
  HiOutlineCube,
  HiOutlineExternalLink,
  HiOutlineMenuAlt2,
  HiOutlinePhotograph,
  HiOutlineViewBoards,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { Brand } from "@/components/layout";

const menuItems = [
  {
    section: "Principal",
    items: [{ title: "Visão Geral", href: "/admin", icon: HiOutlineViewGrid }],
  },
  {
    section: "Loja",
    items: [
      { title: "Banners", href: "/admin/banners", icon: HiOutlinePhotograph },
      { title: "Produtos", href: "/admin/produtos", icon: HiOutlineCube },
      { title: "Cabeçalho", href: "/admin/cabecalho", icon: HiOutlineMenuAlt2 },
      { title: "Rodapé", href: "/admin/rodape", icon: HiOutlineViewBoards },
    ],
  },
  {
    section: "Sistema",
    items: [{ title: "Configurações", href: "/admin/configuracoes", icon: HiOutlineCog }],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-[var(--admin-border)] bg-[color:rgba(12,25,76,0.94)] text-[var(--color-sidebar-foreground)] lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-24 items-center border-b border-white/10 px-8">
          <Link href="/admin" className="flex items-center gap-3">
            <Brand invert compact subtitle="Painel administrativo" />
          </Link>
        </div>

        <div className="px-6 pt-6">
          <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">Ritmo operacional</p>
            <p className="mt-3 text-sm leading-6 text-white/76">
              Catalogo, vitrine e canais reunidos como um mesmo caderno de operacao.
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 [&::-webkit-scrollbar]:w-0 [scrollbar-width:none]">
          {menuItems.map((section) => (
            <div key={section.section} className="mb-6">
              <h3 className="mb-3 px-4 text-[10px] font-medium uppercase tracking-[0.28em] text-white/38">
                {section.section}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 rounded-[1.05rem] px-4 py-3 text-sm transition-all duration-200 ${
                          isActive
                            ? "border border-[color:rgba(198,161,91,0.3)] bg-[linear-gradient(135deg,rgba(198,161,91,0.22),rgba(198,161,91,0.08))] font-medium text-white shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
                            : "border border-transparent text-white/68 hover:border-white/10 hover:bg-white/6 hover:text-white"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                            isActive
                              ? "border-white/12 bg-white/10 text-[var(--admin-accent)]"
                              : "border-white/10 bg-white/5 text-white/55"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-6">
          <Link
            href="/"
            target="_blank"
            className="group flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white"
          >
            <span>Ver site</span>
            <HiOutlineExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
