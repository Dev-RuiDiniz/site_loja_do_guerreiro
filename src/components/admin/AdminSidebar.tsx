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
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 bg-black text-white lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-20 items-center border-b border-white/10 px-8">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C6A15B]/60 bg-white/5">
              <span className="font-serif text-lg text-[#E8DCCB]">LG</span>
            </div>
            <div>
              <p className="font-serif text-2xl text-white">Loja do Guerreiro</p>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                Admin
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 [&::-webkit-scrollbar]:w-0 [scrollbar-width:none]">
          {menuItems.map((section) => (
            <div key={section.section} className="mb-6">
              <h3 className="mb-3 px-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
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
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-white text-black font-medium"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
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
            className="group flex items-center justify-between text-xs text-white/40 transition-colors hover:text-white"
          >
            <span>Ver site</span>
            <HiOutlineExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
