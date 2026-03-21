export const siteConfig = {
  name: "Loja do Guerreiro",
  shortName: "Loja do Guerreiro",
  description:
    "Loja virtual de roupas e peças têxteis para expressões afro-brasileiras, com presença visual forte, acabamento ritual contemporâneo e atendimento humano no WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003",
  whatsappNumber: "5511999999999",
  whatsappMessage:
    "Olá! Gostaria de montar meu pedido na Loja do Guerreiro.",
  email: "contato@lojadoguerreiro.com.br",
  instagram: "https://instagram.com/lojadoguerreiro",
  address: "Atendimento online para todo o Brasil",
};

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
