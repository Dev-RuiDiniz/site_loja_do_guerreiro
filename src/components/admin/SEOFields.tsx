"use client";

import { useState, useRef } from "react";
import { FiSearch, FiGlobe, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { HiOutlinePhotograph, HiOutlineX } from "react-icons/hi";
import { upload } from "@vercel/blob/client";
import Image from "next/image";

interface SEOFieldsProps {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  slug: string;
  baseUrl?: string;
  onChange: (field: string, value: string) => void;
}

export default function SEOFields({
  metaTitle,
  metaDescription,
  metaKeywords,
  ogImage,
  slug,
  baseUrl = "https://lojadoguerreiro.com.br",
  onChange,
}: SEOFieldsProps) {
  const [activeTab, setActiveTab] = useState<"fields" | "preview">("fields");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadOgImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);
    
    try {
      const timestamp = Date.now();
      const ext = file.name.split(".").pop();
      const filename = `og-images/${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;

      const blob = await upload(filename, file, {
        access: "public",
        handleUploadUrl: "/api/upload/client",
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
        },
      });

      onChange("ogImage", blob.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload. Tente novamente.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  // SEO Score calculation
  const calculateSEOScore = () => {
    let score = 0;
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Title checks
    if (metaTitle) {
      score += 20;
      if (metaTitle.length >= 30 && metaTitle.length <= 60) {
        score += 10;
      } else if (metaTitle.length < 30) {
        suggestions.push("Título muito curto (ideal: 30-60 caracteres)");
      } else {
        issues.push("Título muito longo (máx: 60 caracteres)");
      }
    } else {
      issues.push("Adicione um título SEO");
    }

    // Description checks
    if (metaDescription) {
      score += 20;
      if (metaDescription.length >= 120 && metaDescription.length <= 160) {
        score += 10;
      } else if (metaDescription.length < 120) {
        suggestions.push("Descrição muito curta (ideal: 120-160 caracteres)");
      } else {
        issues.push("Descrição muito longa (máx: 160 caracteres)");
      }
    } else {
      issues.push("Adicione uma descrição SEO");
    }

    // Keywords check
    if (metaKeywords) {
      score += 15;
      const keywordCount = metaKeywords.split(",").filter(k => k.trim()).length;
      if (keywordCount >= 3 && keywordCount <= 10) {
        score += 5;
      } else if (keywordCount < 3) {
        suggestions.push("Adicione mais palavras-chave (ideal: 3-10)");
      } else {
        suggestions.push("Muitas palavras-chave (ideal: 3-10)");
      }
    } else {
      suggestions.push("Adicione palavras-chave para melhorar o SEO");
    }

    // OG Image check
    if (ogImage) {
      score += 20;
    } else {
      suggestions.push("Adicione uma imagem de compartilhamento (OG Image)");
    }

    return { score, issues, suggestions };
  };

  const { score, issues, suggestions } = calculateSEOScore();

  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-[var(--admin-border)]">
      {/* Header */}
      <div className="bg-[color:rgba(198,161,91,0.08)] px-4 py-4 border-b border-[var(--admin-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiSearch className="w-5 h-5 text-[var(--admin-accent)]" />
            <h3 className="font-medium text-[var(--admin-ink)]">SEO</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getScoreBg()}`}>
                {score}
              </div>
              <span className={`text-sm font-medium ${getScoreColor()}`}>
                {score >= 80 ? "Ótimo" : score >= 50 ? "Regular" : "Precisa melhorar"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-3 flex gap-4">
          <button
            onClick={() => setActiveTab("fields")}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeTab === "fields"
                ? "border-[var(--admin-accent)] text-[var(--admin-ink)]"
                : "border-transparent text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"
            }`}
          >
            Campos
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeTab === "preview"
                ? "border-[var(--admin-accent)] text-[var(--admin-ink)]"
                : "border-transparent text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"
            }`}
          >
            Preview Google
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "fields" ? (
          <div className="space-y-4">
            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-[var(--admin-ink)]">
                  Título SEO
                </label>
                <span className={`text-xs ${metaTitle.length > 60 ? "text-[var(--admin-danger)]" : "text-[var(--admin-muted)]"}`}>
                  {metaTitle.length}/60
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => onChange("metaTitle", e.target.value)}
                placeholder="Título que aparece nos resultados de busca"
                className="admin-input w-full px-4 py-2.5 text-sm"
              />
              <p className="mt-1 text-xs text-[var(--admin-muted)]">
                Ideal: 30-60 caracteres. Use palavras-chave importantes no início.
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-[var(--admin-ink)]">
                  Descrição SEO
                </label>
                <span className={`text-xs ${metaDescription.length > 160 ? "text-[var(--admin-danger)]" : "text-[var(--admin-muted)]"}`}>
                  {metaDescription.length}/160
                </span>
              </div>
              <textarea
                value={metaDescription}
                onChange={(e) => onChange("metaDescription", e.target.value)}
                placeholder="Descrição que aparece nos resultados de busca"
                rows={3}
                className="admin-input w-full resize-none px-4 py-2.5 text-sm"
              />
              <p className="mt-1 text-xs text-[var(--admin-muted)]">
                Ideal: 120-160 caracteres. Inclua uma chamada para ação.
              </p>
            </div>

            {/* Meta Keywords */}
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--admin-ink)]">
                Palavras-chave
              </label>
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => onChange("metaKeywords", e.target.value)}
                placeholder="palavra1, palavra2, palavra3"
                className="admin-input w-full px-4 py-2.5 text-sm"
              />
              <p className="mt-1 text-xs text-[var(--admin-muted)]">
                Separe por vírgulas. Ideal: 3-10 palavras-chave relevantes.
              </p>
            </div>

            {/* OG Image */}
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--admin-ink)]">
                Imagem de Compartilhamento (OG Image)
              </label>
              <p className="mb-2 text-xs text-[var(--admin-muted)]">
                Tamanho recomendado: 1200x630 pixels.
              </p>
              <div className="relative">
                {ogImage ? (
                  <div className="group relative w-full max-w-md aspect-[1200/630] overflow-hidden rounded-[1.2rem] border border-[var(--admin-border)]">
                    <Image 
                      src={ogImage} 
                      alt="OG Preview" 
                      fill 
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => onChange("ogImage", "")}
                      className="absolute right-2 top-2 rounded-full bg-[var(--admin-overlay)] p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <HiOutlineX className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="flex w-full max-w-md aspect-[1200/630] flex-col items-center justify-center gap-2 rounded-[1.2rem] border-2 border-dashed border-[var(--admin-border)] bg-[color:rgba(255,255,255,0.18)] transition-colors hover:border-[var(--admin-accent)]"
                  >
                    {uploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--admin-ink)] border-t-transparent" />
                        {progress > 0 && <span className="text-sm text-[var(--admin-muted)]">{progress}%</span>}
                      </div>
                    ) : (
                      <>
                        <HiOutlinePhotograph className="h-8 w-8 text-[var(--admin-muted)]" />
                        <span className="text-sm text-[var(--admin-muted)]">Clique para enviar imagem</span>
                        <span className="text-xs text-[var(--admin-muted)]">1200x630 pixels</span>
                      </>
                    )}
                  </button>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUploadOgImage}
                  className="hidden"
                />
              </div>
            </div>

            {/* Issues & Suggestions */}
            {(issues.length > 0 || suggestions.length > 0) && (
              <div className="space-y-3 border-t border-[var(--admin-border)] pt-4">
                {issues.length > 0 && (
                  <div>
                    <h4 className="mb-2 flex items-center gap-1 text-sm font-medium text-[var(--admin-danger)]">
                      <FiAlertCircle className="w-4 h-4" />
                      Problemas
                    </h4>
                    <ul className="space-y-1">
                      {issues.map((issue, i) => (
                        <li key={i} className="flex items-start gap-1 text-xs text-[var(--admin-danger)]">
                          <span className="mt-0.5">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {suggestions.length > 0 && (
                  <div>
                    <h4 className="mb-2 flex items-center gap-1 text-sm font-medium text-[var(--admin-warning)]">
                      <FiCheckCircle className="w-4 h-4" />
                      Sugestões
                    </h4>
                    <ul className="space-y-1">
                      {suggestions.map((suggestion, i) => (
                        <li key={i} className="flex items-start gap-1 text-xs text-[var(--admin-warning)]">
                          <span className="mt-0.5">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Google Search Preview */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--admin-ink)]">
                <FiGlobe className="w-4 h-4" />
                Como aparecerá no Google
              </h4>
              <div className="max-w-2xl rounded-[1.4rem] border border-[var(--admin-border)] bg-[color:rgba(255,255,255,0.32)] p-4">
                <div className="mb-1 flex items-center gap-2 text-xs text-[var(--admin-muted)]">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[color:rgba(198,161,91,0.16)]">
                    <span className="text-[8px]">S</span>
                  </div>
                  <span>lojadoguerreiro.com.br</span>
                </div>
                <div className="mb-1 text-sm text-[var(--admin-muted)]">
                  {baseUrl}/{slug}
                </div>
                <h3 className="mb-1 line-clamp-1 cursor-pointer text-lg font-medium text-[var(--color-primary)] hover:underline">
                  {metaTitle || "Adicione um título SEO"}
                </h3>
                <p className="line-clamp-2 text-sm text-[var(--admin-muted)]">
                  {metaDescription || "Adicione uma descrição SEO para ver como ela aparecerá nos resultados de busca do Google."}
                </p>
              </div>
            </div>

            {/* Social Media Preview */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--admin-ink)]">
                <FiGlobe className="w-4 h-4" />
                Preview em Redes Sociais
              </h4>
              <div className="max-w-md overflow-hidden rounded-[1.4rem] border border-[var(--admin-border)] bg-[color:rgba(255,255,255,0.32)]">
                <div className="flex aspect-[1200/630] items-center justify-center bg-[color:rgba(198,161,91,0.08)]">
                  {ogImage ? (
                    <img
                      src={ogImage}
                      alt="OG Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).parentElement!.innerHTML = 
                          '<div class="flex items-center justify-center w-full h-full text-gray-400 text-sm">Imagem não encontrada</div>';
                      }}
                    />
                  ) : (
                    <span className="text-sm text-[var(--admin-muted)]">Sem imagem OG</span>
                  )}
                </div>
                <div className="p-3">
                  <p className="mb-1 text-xs uppercase text-[var(--admin-muted)]">lojadoguerreiro.com.br</p>
                  <h4 className="line-clamp-2 text-sm font-medium text-[var(--admin-ink)]">
                    {metaTitle || "Título SEO"}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs text-[var(--admin-muted)]">
                    {metaDescription || "Descrição SEO"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
