"use client";

import { FiSearch, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

interface SEOIndicatorProps {
  metaTitle?: string | null;
  metaDescription?: string | null;
  size?: "sm" | "md";
}

export default function SEOIndicator({ metaTitle, metaDescription, size = "sm" }: SEOIndicatorProps) {
  const hasTitle = metaTitle && metaTitle.length > 0;
  const hasDescription = metaDescription && metaDescription.length > 0;
  
  const score = (hasTitle ? 50 : 0) + (hasDescription ? 50 : 0);
  
  const getColor = () => {
    if (score >= 80) return "text-[var(--admin-success)]";
    if (score >= 50) return "text-[var(--admin-warning)]";
    return "text-[var(--admin-muted)]";
  };

  const getBgColor = () => {
    if (score >= 80) return "admin-badge admin-badge-success";
    if (score >= 50) return "admin-badge admin-badge-warning";
    return "admin-badge admin-badge-muted";
  };

  const getIcon = () => {
    if (score >= 80) return <FiCheckCircle className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />;
    if (score >= 50) return <FiSearch className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />;
    return <FiAlertCircle className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />;
  };

  const getLabel = () => {
    if (score >= 80) return "SEO OK";
    if (score >= 50) return "SEO Parcial";
    return "Sem SEO";
  };

  return (
    <span
      className={`inline-flex items-center gap-1 ${size === "sm" ? "px-2 py-1 text-[10px]" : "px-2.5 py-1 text-xs"} font-medium ${getBgColor()} ${getColor()}`}
      title={`Título: ${hasTitle ? "OK" : "Faltando"} | Descrição: ${hasDescription ? "OK" : "Faltando"}`}
    >
      {getIcon()}
      {getLabel()}
    </span>
  );
}
