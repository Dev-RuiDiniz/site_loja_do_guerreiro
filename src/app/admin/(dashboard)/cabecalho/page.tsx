"use client";

import { useEffect, useState } from "react";
import {
  HiOutlineCheck,
  HiOutlineMenuAlt2,
  HiOutlinePlus,
  HiOutlineSave,
  HiOutlineTrash,
} from "react-icons/hi";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

interface HeaderConfig {
  logoUrl?: string;
  logoWhiteUrl?: string;
  subtitle?: string;
  subtitleLine2?: string;
  navLinks: NavLink[];
  ctaButtons: Array<{ label: string; href: string; variant: "outline" | "solid" }>;
  contactEmail?: string;
  contactPhone?: string;
  contactCity?: string;
}

const STORE_VARIANT = "store";

const defaultHeaderConfig: HeaderConfig = {
  logoUrl: "",
  logoWhiteUrl: "",
  subtitle: "Loja virtual",
  subtitleLine2: "Moda afro-religiosa",
  navLinks: [
    { label: "Início", href: "/" },
    { label: "Loja", href: "/loja" },
    { label: "Categorias", href: "/categorias" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
  ],
  ctaButtons: [
    { label: "Ver coleção", href: "/loja", variant: "outline" },
    {
      label: "Falar no WhatsApp",
      href: "https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20atendimento%20da%20Loja%20do%20Guerreiro.",
      variant: "solid",
    },
  ],
  contactEmail: "contato@lojadoguerreiro.com.br",
  contactPhone: "(11) 99999-9999",
  contactCity: "São Paulo, SP",
};

export default function CabecalhoPage() {
  const [config, setConfig] = useState<HeaderConfig>(defaultHeaderConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch(`/api/admin/layout?type=header&variant=${STORE_VARIANT}`);
        const data = await response.json();
        setConfig(data.config?.content || defaultHeaderConfig);
      } catch (error) {
        console.error("Error loading header config:", error);
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    try {
      await fetch("/api/admin/layout", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "header",
          variant: STORE_VARIANT,
          content: config,
        }),
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving header config:", error);
      alert("Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const updateNavLink = (index: number, field: keyof NavLink, value: string) => {
    const nextLinks = [...config.navLinks];
    nextLinks[index] = { ...nextLinks[index], [field]: value };
    setConfig((current) => ({ ...current, navLinks: nextLinks }));
  };

  const addNavLink = () => {
    setConfig((current) => ({
      ...current,
      navLinks: [...current.navLinks, { label: "", href: "" }],
    }));
  };

  const removeNavLink = (index: number) => {
    setConfig((current) => ({
      ...current,
      navLinks: current.navLinks.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const updateCtaButton = (index: number, field: string, value: string) => {
    const nextButtons = [...config.ctaButtons];
    nextButtons[index] = { ...nextButtons[index], [field]: value };
    setConfig((current) => ({ ...current, ctaButtons: nextButtons }));
  };

  const addCtaButton = () => {
    setConfig((current) => ({
      ...current,
      ctaButtons: [...current.ctaButtons, { label: "", href: "", variant: "solid" }],
    }));
  };

  const removeCtaButton = (index: number) => {
    setConfig((current) => ({
      ...current,
      ctaButtons: current.ctaButtons.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-black" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Cabeçalho</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configure a navegação principal da Loja do Guerreiro
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saved ? (
            <>
              <HiOutlineCheck className="mr-2 h-4 w-4" />
              Salvo!
            </>
          ) : (
            <>
              <HiOutlineSave className="mr-2 h-4 w-4" />
              {saving ? "Salvando..." : "Salvar"}
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
            <HiOutlineMenuAlt2 className="h-5 w-5" />
            Identidade
          </h3>

          <ImageUpload
            value={config.logoUrl || ""}
            onChange={(url) => setConfig((current) => ({ ...current, logoUrl: url }))}
            label="Logo principal"
            folder="layout"
          />

          <ImageUpload
            value={config.logoWhiteUrl || ""}
            onChange={(url) => setConfig((current) => ({ ...current, logoWhiteUrl: url }))}
            label="Logo para fundo escuro"
            folder="layout"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Linha de apoio
              </label>
              <input
                type="text"
                value={config.subtitle || ""}
                onChange={(event) =>
                  setConfig((current) => ({ ...current, subtitle: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Linha complementar
              </label>
              <input
                type="text"
                value={config.subtitleLine2 || ""}
                onChange={(event) =>
                  setConfig((current) => ({ ...current, subtitleLine2: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                E-mail
              </label>
              <input
                type="text"
                value={config.contactEmail || ""}
                onChange={(event) =>
                  setConfig((current) => ({ ...current, contactEmail: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Telefone
              </label>
              <input
                type="text"
                value={config.contactPhone || ""}
                onChange={(event) =>
                  setConfig((current) => ({ ...current, contactPhone: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cidade
              </label>
              <input
                type="text"
                value={config.contactCity || ""}
                onChange={(event) =>
                  setConfig((current) => ({ ...current, contactCity: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white">Links de navegação</h3>
            <button
              onClick={addNavLink}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <HiOutlinePlus className="h-4 w-4" />
              Adicionar
            </button>
          </div>

          <div className="space-y-3">
            {config.navLinks.map((link, index) => (
              <div key={`${link.href}-${index}`} className="flex items-center gap-2">
                <input
                  type="text"
                  value={link.label}
                  onChange={(event) => updateNavLink(index, "label", event.target.value)}
                  placeholder="Texto do menu"
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(event) => updateNavLink(index, "href", event.target.value)}
                  placeholder="/caminho"
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => removeNavLink(index)}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <HiOutlineTrash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white">Botões de ação</h3>
            <button
              onClick={addCtaButton}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <HiOutlinePlus className="h-4 w-4" />
              Adicionar
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {config.ctaButtons.map((button, index) => (
              <div
                key={`${button.href}-${index}`}
                className="space-y-3 rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">Botão {index + 1}</span>
                  <button
                    onClick={() => removeCtaButton(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>

                <input
                  type="text"
                  value={button.label}
                  onChange={(event) => updateCtaButton(index, "label", event.target.value)}
                  placeholder="Texto do botão"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />

                <input
                  type="text"
                  value={button.href}
                  onChange={(event) => updateCtaButton(index, "href", event.target.value)}
                  placeholder="Destino do botão"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />

                <select
                  value={button.variant}
                  onChange={(event) => updateCtaButton(index, "variant", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  <option value="outline">Outline</option>
                  <option value="solid">Solid</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
