# Loja do Guerreiro

Storefront em `Next.js 16` para a **Loja do Guerreiro**, com vitrine editorial, catálogo enxuto e fechamento comercial via WhatsApp.

## Visão geral

Este repositório representa um produto único, não uma base multi-site.

- marca única: `Loja do Guerreiro`
- proposta: loja virtual de moda afro-brasileira com compra assistida
- foco atual: home editorial, catálogo público, página de produto, carrinho local e atendimento humano
- painel administrativo para operação de banners, produtos, layout e configurações

## Catálogo público atual

Estrutura pública ativa de categorias:

- `Saias`
- `Ojás`
- `Panos das Costas`
- `Lançamentos`

Observações:

- `Camisas e Batas` e `Conjuntos Rituais` saíram da vitrine pública
- categorias podem existir vazias enquanto novos itens são cadastrados
- o catálogo público atual prioriza coerência editorial sobre volume

## Direção da marca

Posicionamento:

- presença visual forte
- linguagem contemporânea
- acolhimento comercial
- referências afro-brasileiras tratadas com respeito e sem caricatura

Identidade visual:

- direção criativa: `ritual contemporâneo`
- display: `Cormorant Garamond`
- interface: `Manrope`
- padrões compartilhados documentados em `.interface-design/system.md`

## Estrutura do projeto

```text
src/
  app/
    (site)/                  # rotas públicas da loja
    admin/                   # painel administrativo
    api/
      admin/                 # APIs do admin
      auth/                  # login, logout, sessão e setup inicial
      categories/            # categorias públicas
      products/              # catálogo público
      upload/                # upload usado pelo admin
    login/                   # acesso ao painel
    proxy.ts                 # proteção de rotas admin
  components/
    admin/                   # UI do painel
    layout/                  # header, footer e CTA público
    storefront/              # componentes da vitrine e do produto
    ui/                      # primitives compartilhadas
  contexts/
    CartContext.tsx          # estado do carrinho
    ThemeContext.tsx         # tema do admin
  data/
    store.ts                 # dados públicos do catálogo
    visualAssets.ts          # acervo visual e configuração editorial
  lib/
    auth.ts                  # leitura de sessão admin
    prisma.ts                # singleton do Prisma Client
    seo.ts                   # metadata da loja
    session.ts               # configuração de sessão admin
    site.ts                  # dados centrais da marca
public/
  brand-badge*.svg           # identidade principal
  images/                    # imagens editoriais e grafismos
docs/
  visual-assets.md           # documento válido do acervo visual
```

## Rotas principais

Storefront:

- `/`
- `/loja`
- `/produto/[slug]`
- `/categorias`
- `/sobre`
- `/contato`
- `/faq`
- `/garantia`

Admin:

- `/login`
- `/login/setup`
- `/admin`
- `/admin/banners`
- `/admin/produtos`
- `/admin/cabecalho`
- `/admin/rodape`
- `/admin/configuracoes`

## Stack

Dependências principais em uso:

- `next@16.2.1`
- `react@19.2.4`
- `react-dom@19.2.4`
- `typescript@5.9`
- `tailwindcss@4.2.2`
- `framer-motion@12.38`
- `iron-session`
- `@vercel/blob@2.3.1`
- `zod@4.3`

## Setup local

1. Instalar dependências:

```bash
pnpm install
```

2. Configurar ambiente:

- copie `.env.example` para `.env`
- preencha autenticação, upload e serviços auxiliares

3. Rodar em desenvolvimento:

```bash
pnpm dev
```

Servidor local padrão:

- [http://localhost:3003](http://localhost:3003)

## Scripts

- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`

## Validação

Estado esperado desta base:

- `pnpm lint` passa
- `pnpm build` passa

## Documentação complementar

Arquivos principais:

- [ARQUITETURA.md](C:\Users\RUI FRANCISCO\Documents\GitHub\site_loja_do_guerreiro\docs\ARQUITETURA.md)
- [ROTAS-E-APIS.md](C:\Users\RUI FRANCISCO\Documents\GitHub\site_loja_do_guerreiro\docs\ROTAS-E-APIS.md)
- [visual-assets.md](C:\Users\RUI FRANCISCO\Documents\GitHub\site_loja_do_guerreiro\docs\visual-assets.md)

Arquivos históricos:

- [CHECKLIST-NOVO-SITE.md](C:\Users\RUI FRANCISCO\Documents\GitHub\site_loja_do_guerreiro\docs\CHECKLIST-NOVO-SITE.md)
- [TEMPLATES-E-BLOCOS.md](C:\Users\RUI FRANCISCO\Documents\GitHub\site_loja_do_guerreiro\docs\TEMPLATES-E-BLOCOS.md)
