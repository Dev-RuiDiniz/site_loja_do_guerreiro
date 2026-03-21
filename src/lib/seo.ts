import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const defaultMetadata = {
  title: "Loja do Guerreiro | Moda afro-brasileira com presença contemporânea",
  description:
    "Roupas, conjuntos e acessórios têxteis com estética forte, moderna e acolhedora para expressões afro-brasileiras.",
  keywords: [
    "loja do guerreiro",
    "moda afro-brasileira",
    "roupas afro-religiosas",
    "umbanda",
    "candomblé",
    "vestidos afro",
    "batas e conjuntos",
  ],
};

export async function buildMetadata(): Promise<Metadata> {
  return {
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    keywords: defaultMetadata.keywords,
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    openGraph: {
      title: defaultMetadata.title,
      description: defaultMetadata.description,
      type: "website",
      locale: "pt_BR",
      siteName: siteConfig.name,
      url: siteConfig.url,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultMetadata.title,
      description: defaultMetadata.description,
    },
    icons: {
      icon: "/icon.svg",
      shortcut: "/icon.svg",
      apple: "/icon.svg",
    },
  };
}
