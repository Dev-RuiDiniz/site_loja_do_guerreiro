"use client";

import { useEffect, useState } from "react";
import {
  HiOutlineCheck,
  HiOutlinePlus,
  HiOutlineSave,
  HiOutlineTrash,
  HiOutlineViewBoards,
} from "react-icons/hi";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  href: string;
}

interface FooterConfig {
  logoUrl?: string;
  subtitle?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  contactCity?: string;
  linkGroups: FooterLinkGroup[];
  socialLinks: SocialLink[];
  copyrightText?: string;
  copyrightSubtext?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  companyName?: string;
}

const STORE_VARIANT = "store";

const defaultFooterConfig: FooterConfig = {
  logoUrl: "",
  subtitle: "Loja do Guerreiro",
  description:
    "Loja virtual de roupas e acessórios para religiões afro-brasileiras, com estética forte, acolhedora e contemporânea.",
  contactEmail: "contato@lojadoguerreiro.com.br",
  contactPhone: "(11) 99999-9999",
  contactAddress: "São Paulo, SP - Brasil",
  contactCity: "São Paulo, SP",
  linkGroups: [
    {
      title: "Loja",
      links: [
        { label: "Catálogo", href: "/loja" },
        { label: "Categorias", href: "/categorias" },
        { label: "Sobre", href: "/sobre" },
        { label: "Contato", href: "/contato" },
      ],
    },
    {
      title: "Atendimento",
      links: [
        { label: "WhatsApp", href: "https://wa.me/5511999999999" },
        { label: "Instagram", href: "https://instagram.com" },
      ],
    },
  ],
  socialLinks: [
    { platform: "instagram", href: "https://instagram.com" },
    { platform: "whatsapp", href: "https://wa.me/5511999999999" },
  ],
  copyrightText: "© {year} Loja do Guerreiro. Todos os direitos reservados.",
  copyrightSubtext: "Moda afro-religiosa com identidade ritual contemporânea.",
  ctaTitle: "Atendimento direto pelo WhatsApp",
  ctaDescription: "Use o rodapé para reforçar coleções, contatos e a linguagem da marca.",
  ctaButtonText: "Falar com a loja",
  ctaButtonLink:
    "https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20atendimento%20da%20Loja%20do%20Guerreiro.",
  companyName: "Loja do Guerreiro",
};

export default function RodapePage() {
  const [config, setConfig] = useState<FooterConfig>(defaultFooterConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch(`/api/admin/layout?type=footer&variant=${STORE_VARIANT}`);
        const data = await response.json();
        setConfig(data.config?.content || defaultFooterConfig);
      } catch (error) {
        console.error("Error loading footer config:", error);
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
          type: "footer",
          variant: STORE_VARIANT,
          content: config,
        }),
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving footer config:", error);
      alert("Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const updateLinkGroup = (groupIndex: number, field: string, value: string) => {
    const nextGroups = [...config.linkGroups];
    nextGroups[groupIndex] = { ...nextGroups[groupIndex], [field]: value };
    setConfig((current) => ({ ...current, linkGroups: nextGroups }));
  };

  const addLinkGroup = () => {
    setConfig((current) => ({
      ...current,
      linkGroups: [...current.linkGroups, { title: "", links: [] }],
    }));
  };

  const removeLinkGroup = (groupIndex: number) => {
    setConfig((current) => ({
      ...current,
      linkGroups: current.linkGroups.filter((_, currentIndex) => currentIndex !== groupIndex),
    }));
  };

  const updateLink = (
    groupIndex: number,
    linkIndex: number,
    field: keyof FooterLink,
    value: string
  ) => {
    const nextGroups = [...config.linkGroups];
    const nextLinks = [...nextGroups[groupIndex].links];
    nextLinks[linkIndex] = { ...nextLinks[linkIndex], [field]: value };
    nextGroups[groupIndex] = { ...nextGroups[groupIndex], links: nextLinks };
    setConfig((current) => ({ ...current, linkGroups: nextGroups }));
  };

  const addLink = (groupIndex: number) => {
    const nextGroups = [...config.linkGroups];
    nextGroups[groupIndex] = {
      ...nextGroups[groupIndex],
      links: [...nextGroups[groupIndex].links, { label: "", href: "" }],
    };
    setConfig((current) => ({ ...current, linkGroups: nextGroups }));
  };

  const removeLink = (groupIndex: number, linkIndex: number) => {
    const nextGroups = [...config.linkGroups];
    nextGroups[groupIndex] = {
      ...nextGroups[groupIndex],
      links: nextGroups[groupIndex].links.filter((_, currentIndex) => currentIndex !== linkIndex),
    };
    setConfig((current) => ({ ...current, linkGroups: nextGroups }));
  };

  const updateSocial = (index: number, field: keyof SocialLink, value: string) => {
    const nextSocialLinks = [...config.socialLinks];
    nextSocialLinks[index] = { ...nextSocialLinks[index], [field]: value };
    setConfig((current) => ({ ...current, socialLinks: nextSocialLinks }));
  };

  const addSocial = () => {
    setConfig((current) => ({
      ...current,
      socialLinks: [...current.socialLinks, { platform: "instagram", href: "" }],
    }));
  };

  const removeSocial = (index: number) => {
    setConfig((current) => ({
      ...current,
      socialLinks: current.socialLinks.filter((_, currentIndex) => currentIndex !== index),
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
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Rodapé</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configure links, contatos e reforços institucionais da marca
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
            <HiOutlineViewBoards className="h-5 w-5" />
            Informações principais
          </h3>

          <ImageUpload
            value={config.logoUrl || ""}
            onChange={(url) => setConfig((current) => ({ ...current, logoUrl: url }))}
            label="Logo"
            folder="layout"
          />

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
              Descrição
            </label>
            <textarea
              value={config.description || ""}
              onChange={(event) =>
                setConfig((current) => ({ ...current, description: event.target.value }))
              }
              rows={3}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Endereço
            </label>
            <textarea
              value={config.contactAddress || ""}
              onChange={(event) =>
                setConfig((current) => ({ ...current, contactAddress: event.target.value }))
              }
              rows={2}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Texto legal
              </label>
              <input
                type="text"
                value={config.copyrightText || ""}
                onChange={(event) =>
                  setConfig((current) => ({ ...current, copyrightText: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Subtexto
              </label>
              <input
                type="text"
                value={config.copyrightSubtext || ""}
                onChange={(event) =>
                  setConfig((current) => ({ ...current, copyrightSubtext: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="font-medium text-gray-900 dark:text-white">CTA do rodapé</h3>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Título
              </label>
              <input
                type="text"
                value={config.ctaTitle || ""}
                onChange={(event) =>
                  setConfig((current) => ({ ...current, ctaTitle: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Descrição
              </label>
              <textarea
                value={config.ctaDescription || ""}
                onChange={(event) =>
                  setConfig((current) => ({ ...current, ctaDescription: event.target.value }))
                }
                rows={2}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Texto do botão
                </label>
                <input
                  type="text"
                  value={config.ctaButtonText || ""}
                  onChange={(event) =>
                    setConfig((current) => ({ ...current, ctaButtonText: event.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Link do botão
                </label>
                <input
                  type="text"
                  value={config.ctaButtonLink || ""}
                  onChange={(event) =>
                    setConfig((current) => ({ ...current, ctaButtonLink: event.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white">Redes sociais</h3>
              <button
                onClick={addSocial}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <HiOutlinePlus className="h-4 w-4" />
                Adicionar
              </button>
            </div>

            <div className="space-y-3">
              {config.socialLinks.map((social, index) => (
                <div key={`${social.platform}-${index}`} className="flex items-center gap-2">
                  <select
                    value={social.platform}
                    onChange={(event) => updateSocial(index, "platform", event.target.value)}
                    className="w-36 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                  <input
                    type="text"
                    value={social.href}
                    onChange={(event) => updateSocial(index, "href", event.target.value)}
                    placeholder="https://..."
                    className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={() => removeSocial(index)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white">Grupos de links</h3>
            <button
              onClick={addLinkGroup}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <HiOutlinePlus className="h-4 w-4" />
              Adicionar grupo
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {config.linkGroups.map((group, groupIndex) => (
              <div
                key={`${group.title}-${groupIndex}`}
                className="space-y-3 rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700"
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={group.title}
                    onChange={(event) =>
                      updateLinkGroup(groupIndex, "title", event.target.value)
                    }
                    placeholder="Título do grupo"
                    className="min-w-0 flex-1 bg-transparent text-sm font-medium text-gray-900 outline-none dark:text-white"
                  />
                  <button
                    onClick={() => removeLinkGroup(groupIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {group.links.map((link, linkIndex) => (
                    <div key={`${link.href}-${linkIndex}`} className="flex items-start gap-1">
                      <div className="min-w-0 flex-1 space-y-1">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(event) =>
                            updateLink(groupIndex, linkIndex, "label", event.target.value)
                          }
                          placeholder="Texto"
                          className="w-full rounded border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-900 dark:border-gray-500 dark:bg-gray-800 dark:text-white"
                        />
                        <input
                          type="text"
                          value={link.href}
                          onChange={(event) =>
                            updateLink(groupIndex, linkIndex, "href", event.target.value)
                          }
                          placeholder="/caminho"
                          className="w-full rounded border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-900 dark:border-gray-500 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <button
                        onClick={() => removeLink(groupIndex, linkIndex)}
                        className="mt-1 flex-shrink-0 p-1 text-red-500 hover:text-red-700"
                      >
                        <HiOutlineTrash className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addLink(groupIndex)}
                  className="w-full rounded border border-dashed border-gray-300 py-1.5 text-xs text-gray-500 hover:border-gray-400 hover:text-gray-700 dark:border-gray-500"
                >
                  + Adicionar link
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
