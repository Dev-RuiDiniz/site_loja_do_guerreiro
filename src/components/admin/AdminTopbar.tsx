"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineUser,
  HiX,
} from "react-icons/hi";

const menuItems = [
  { title: "Visão Geral", href: "/admin" },
  { title: "Páginas", href: "/admin/paginas" },
  { title: "Banners", href: "/admin/banners" },
  { title: "Produtos", href: "/admin/produtos" },
  { title: "Cabeçalho", href: "/admin/cabecalho" },
  { title: "Rodapé", href: "/admin/rodape" },
  { title: "Configurações", href: "/admin/configuracoes" },
];

interface AdminTopbarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("admin-theme");
    setIsDark(stored === "dark");
  }, []);

  const toggle = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    localStorage.setItem("admin-theme", nextTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextTheme);
  };

  return (
    <button
      onClick={toggle}
      className="p-2 text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
      title={isDark ? "Modo claro" : "Modo escuro"}
    >
      {isDark ? <HiOutlineSun className="h-5 w-5" /> : <HiOutlineMoon className="h-5 w-5" />}
    </button>
  );
}

function ProfileDropdown({
  user,
  onLogout,
}: {
  user: AdminTopbarProps["user"];
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-2 py-1.5 transition-colors hover:bg-gray-100"
      >
        <div className="flex h-8 w-8 items-center justify-center bg-black text-sm font-medium text-white">
          {user.name?.charAt(0).toUpperCase() || "A"}
        </div>
        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium text-black">{user.name || "Admin"}</p>
          <p className="truncate text-[11px] text-gray-400">{user.email}</p>
        </div>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-56 border border-gray-200 bg-white shadow-xl">
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="text-sm font-medium text-black">{user.name || "Admin"}</p>
              <p className="truncate text-xs text-gray-400">{user.email}</p>
            </div>
            <div className="py-1">
              <Link
                href="/admin/configuracoes"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                <HiOutlineCog className="h-4 w-4" />
                Configurações
              </Link>
            </div>
            <div className="border-t border-gray-100 py-1">
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <HiOutlineLogout className="h-4 w-4" />
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function AdminTopbar({ user }: AdminTopbarProps) {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-20 border-b border-gray-100 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-full items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMobileMenu(true)}
              className="p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white lg:hidden"
            >
              <HiOutlineMenu className="h-5 w-5" />
            </button>
            <div className="hidden sm:block">
              <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">
                Loja do Guerreiro
              </p>
              <p className="text-sm text-black dark:text-white">Operação da vitrine e catálogo</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <div className="mx-2 h-6 w-px bg-gray-200 dark:bg-zinc-700" />
            <ProfileDropdown user={user} onLogout={handleLogout} />
          </div>
        </div>
      </header>

      {showMobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="fixed left-0 top-0 h-full w-72 bg-black text-white">
            <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C6A15B]/60 bg-white/5">
                  <span className="font-serif text-lg text-[#E8DCCB]">LG</span>
                </div>
                <div>
                  <p className="font-serif text-lg text-white">Loja do Guerreiro</p>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Admin
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 text-white/60 hover:text-white"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-6">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-white/10 p-6">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                onClick={() => setShowMobileMenu(false)}
              >
                <HiOutlineUser className="h-4 w-4" />
                Ver loja
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
