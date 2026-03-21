"use client";

import { useEffect, useState } from "react";
import {
  HiOutlineGlobe,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineSave,
} from "react-icons/hi";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface SeoSiteConfig {
  title: string;
  description: string;
  favicon: string;
  keywords: string;
}

interface SeoConfig {
  storefront: SeoSiteConfig;
}

interface Settings {
  siteName: string;
  siteDescription: string;
  logo: string;
  logoDark: string;
  favicon: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  cnpj: string;
  workingHours: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  seoConfig: SeoConfig;
}

const defaultSeoConfig: SeoConfig = {
  storefront: {
    title: "Loja do Guerreiro | Moda afro-religiosa com presença",
    description:
      "Loja virtual de roupas e acessórios para religiões afro-brasileiras, com estética forte, moderna e acolhedora.",
    favicon: "/icon.svg",
    keywords:
      "loja do guerreiro, roupas afro religiosas, moda afro brasileira, umbanda, candomble, roupas rituais",
  },
};

const defaultSettings: Settings = {
  siteName: "Loja do Guerreiro",
  siteDescription:
    "Loja virtual de roupas para religiões afro-brasileiras com vitrine contemporânea e atendimento por WhatsApp.",
  logo: "",
  logoDark: "",
  favicon: "/icon.svg",
  phone: "(11) 99999-9999",
  whatsapp: "5511999999999",
  email: "contato@lojadoguerreiro.com.br",
  address: "São Paulo, SP - Brasil",
  cnpj: "00.000.000/0001-00",
  workingHours: "Segunda a sábado, das 9h às 18h",
  instagram: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  seoConfig: defaultSeoConfig,
};

function normalizeSeoConfig(rawSeoConfig: Record<string, unknown> | null | undefined): SeoConfig {
  if (!rawSeoConfig || typeof rawSeoConfig !== "object") {
    return defaultSeoConfig;
  }

  if ("storefront" in rawSeoConfig && rawSeoConfig.storefront) {
    return {
      storefront: {
        ...defaultSeoConfig.storefront,
        ...(rawSeoConfig.storefront as SeoSiteConfig),
      },
    };
  }

  const legacySeoConfig = Object.values(rawSeoConfig).find(
    (value) => value && typeof value === "object"
  ) as SeoSiteConfig | undefined;

  if (legacySeoConfig) {
    return {
      storefront: {
        ...defaultSeoConfig.storefront,
        ...legacySeoConfig,
      },
    };
  }

  return defaultSeoConfig;
}

export default function ConfiguracoesPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);

      try {
        const response = await fetch("/api/admin/settings");
        const data = await response.json();

        if (data.settings) {
          const normalizedSeoConfig = normalizeSeoConfig(data.settings.seoConfig);
          setSettings({
            ...defaultSettings,
            ...data.settings,
            workingHours:
              data.settings.openingHours || data.settings.workingHours || defaultSettings.workingHours,
            seoConfig: normalizedSeoConfig,
          });
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-400">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-black dark:text-white">
            Configurações
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Defina os dados institucionais e o SEO da Loja do Guerreiro
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-100"
        >
          <HiOutlineSave className="h-4 w-4" />
          {saving ? "Salvando..." : saved ? "Salvo!" : "Salvar"}
        </button>
      </div>

      <section className="space-y-6 border border-gray-200 p-6 dark:border-zinc-800">
        <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-gray-400">
          <HiOutlineGlobe className="h-4 w-4" />
          Informações da marca
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nome da loja
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(event) =>
                setSettings((current) => ({ ...current, siteName: event.target.value }))
              }
              className="w-full border border-gray-200 bg-white px-4 py-2.5 text-black outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              CNPJ
            </label>
            <input
              type="text"
              value={settings.cnpj}
              onChange={(event) =>
                setSettings((current) => ({ ...current, cnpj: event.target.value }))
              }
              className="w-full border border-gray-200 bg-white px-4 py-2.5 text-black outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descrição institucional
          </label>
          <textarea
            value={settings.siteDescription}
            onChange={(event) =>
              setSettings((current) => ({ ...current, siteDescription: event.target.value }))
            }
            rows={3}
            className="w-full resize-none border border-gray-200 bg-white px-4 py-2.5 text-black outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ImageUpload
            label="Logo principal"
            value={settings.logo}
            onChange={(url) => setSettings((current) => ({ ...current, logo: url }))}
            folder="site"
          />
          <ImageUpload
            label="Logo em fundo escuro"
            value={settings.logoDark}
            onChange={(url) => setSettings((current) => ({ ...current, logoDark: url }))}
            folder="site"
          />
          <ImageUpload
            label="Favicon"
            value={settings.favicon}
            onChange={(url) => setSettings((current) => ({ ...current, favicon: url }))}
            folder="site"
          />
        </div>
      </section>

      <section className="space-y-6 border border-gray-200 p-6 dark:border-zinc-800">
        <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-gray-400">
          <HiOutlinePhone className="h-4 w-4" />
          Contato e atendimento
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Telefone
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(event) =>
                setSettings((current) => ({ ...current, phone: event.target.value }))
              }
              className="w-full border border-gray-200 bg-white px-4 py-2.5 text-black outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              WhatsApp (somente números)
            </label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(event) =>
                setSettings((current) => ({ ...current, whatsapp: event.target.value }))
              }
              className="w-full border border-gray-200 bg-white px-4 py-2.5 text-black outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              E-mail
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(event) =>
                setSettings((current) => ({ ...current, email: event.target.value }))
              }
              className="w-full border border-gray-200 bg-white px-4 py-2.5 text-black outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Horário de atendimento
            </label>
            <input
              type="text"
              value={settings.workingHours}
              onChange={(event) =>
                setSettings((current) => ({ ...current, workingHours: event.target.value }))
              }
              className="w-full border border-gray-200 bg-white px-4 py-2.5 text-black outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Endereço
          </label>
          <input
            type="text"
            value={settings.address}
            onChange={(event) =>
              setSettings((current) => ({ ...current, address: event.target.value }))
            }
            className="w-full border border-gray-200 bg-white px-4 py-2.5 text-black outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>
      </section>

      <section className="space-y-6 border border-gray-200 p-6 dark:border-zinc-800">
        <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-gray-400">
          <HiOutlineMail className="h-4 w-4" />
          SEO da storefront
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={settings.seoConfig.storefront.title}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  seoConfig: {
                    storefront: {
                      ...current.seoConfig.storefront,
                      title: event.target.value,
                    },
                  },
                }))
              }
              className="w-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-black outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Palavras-chave
            </label>
            <input
              type="text"
              value={settings.seoConfig.storefront.keywords}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  seoConfig: {
                    storefront: {
                      ...current.seoConfig.storefront,
                      keywords: event.target.value,
                    },
                  },
                }))
              }
              className="w-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-black outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Meta description
          </label>
          <textarea
            value={settings.seoConfig.storefront.description}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                seoConfig: {
                  storefront: {
                    ...current.seoConfig.storefront,
                    description: event.target.value,
                  },
                },
              }))
            }
            rows={3}
            className="w-full resize-none border border-gray-200 bg-white px-4 py-2.5 text-sm text-black outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div className="max-w-xs">
          <ImageUpload
            label="Favicon SEO"
            value={settings.seoConfig.storefront.favicon}
            onChange={(url) =>
              setSettings((current) => ({
                ...current,
                seoConfig: {
                  storefront: {
                    ...current.seoConfig.storefront,
                    favicon: url,
                  },
                },
              }))
            }
            folder="favicons"
          />
        </div>
      </section>

      <section className="space-y-6 border border-gray-200 p-6 dark:border-zinc-800">
        <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-gray-400">
          Redes sociais
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {(
            [
              ["instagram", "Instagram"],
              ["facebook", "Facebook"],
              ["linkedin", "LinkedIn"],
              ["youtube", "YouTube"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </label>
              <input
                type="url"
                value={settings[key]}
                onChange={(event) =>
                  setSettings((current) => ({ ...current, [key]: event.target.value }))
                }
                className="w-full border border-gray-200 bg-white px-4 py-2.5 text-black outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
