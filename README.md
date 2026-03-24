# Loja do Guerreiro

Loja virtual em `Next.js 16` para a marca **Loja do Guerreiro**, com vitrine editorial, catalogo de moda afro-brasileira e fechamento comercial via WhatsApp.

## Objetivo do projeto

Este repositorio representa um produto unico, nao uma base multi-site.

- marca unica: `Loja do Guerreiro`
- proposta: loja virtual de roupas e acessorios texteis para religioes afro-brasileiras
- foco atual: vitrine, catalogo, pagina de produto, carrinho local e atendimento via WhatsApp
- painel administrativo enxuto para operacao de banners, produtos, layout e configuracoes

## Direcao da marca

### Posicionamento

- presenca visual forte
- linguagem contemporanea
- acolhimento ao publico
- referencias afro-brasileiras tratadas com respeito e sem caricatura

### Identidade visual

Direcao criativa: **ritual contemporaneo**

Paleta principal:

- `Obsidiana` `#111111`
- `Argila Queimada` `#A14F2A`
- `Dourado Fosco` `#C6A15B`
- `Areia Ritual` `#E8DCCB`
- `Verde Folha Profunda` `#2F5D50`
- `Vinho de Palma` `#6E2230`

Tipografia:

- display: `Cormorant Garamond`
- interface: `Manrope`

Sistema de interface:

- storefront editorial com superficies quentes e minerais
- admin operacional alinhado a mesma linguagem visual
- padroes salvos em `.interface-design/system.md`

## Experiencia da loja

### Frontend publico

- home editorial
- catalogo em `/loja`
- detalhe de produto em `/produto/[slug]`
- navegacao por categorias em `/categorias`
- paginas institucionais em `/sobre`, `/contato`, `/faq` e `/garantia`
- carrinho client-side persistido localmente
- CTA de fechamento e atendimento via WhatsApp

### Modelo comercial atual

- sem pagamento online nesta versao
- sem area de pedidos persistidos
- sem checkout tradicional
- atendimento e fechamento comercial via WhatsApp

## Estrutura atual do projeto

```text
src/
  app/
    (site)/                  # rotas publicas da loja
    admin/                   # painel administrativo
    api/
      admin/                 # APIs do admin
      auth/                  # login, logout, sessao e setup inicial
      categories/            # categorias publicas
      products/              # catalogo publico
      upload/                # upload usado pelo admin
    login/                   # acesso ao painel
    proxy.ts                 # protecao de rotas admin
  components/
    admin/                   # UI do painel
    layout/                  # header, footer e CTA publico
    storefront/              # componentes da vitrine e produto
    ui/                      # primitives compartilhadas
  contexts/
    CartContext.tsx          # estado do carrinho
    ThemeContext.tsx         # tema do admin
  data/
    store.ts                 # dados da loja usados na storefront atual
    visualAssets.ts          # acervo visual e configuracao editorial
  lib/
    auth.ts                  # leitura de sessao admin
    prisma.ts                # singleton do Prisma Client
    seo.ts                   # metadata da loja
    session.ts               # configuracao de sessao admin
    site.ts                  # configuracoes da marca
public/
  brand-badge*.svg           # identidade principal
  images/                    # imagens editoriais e grafismos
docs/
  visual-assets.md           # documento valido do acervo visual
  *.md                       # docs tecnicas revisadas ou historicas
```

## Painel administrativo

Rotas mantidas:

- `/admin`
- `/admin/banners`
- `/admin/produtos`
- `/admin/cabecalho`
- `/admin/rodape`
- `/admin/configuracoes`

APIs administrativas mantidas:

- `/api/admin/banners`
- `/api/admin/categories`
- `/api/admin/layout`
- `/api/admin/products`
- `/api/admin/settings`

## Stack tecnica

Dependencias principais em uso:

- `next@16.2.1`
- `react@19.2.4`
- `react-dom@19.2.4`
- `typescript@5.9`
- `tailwindcss@4.2.2`
- `framer-motion@12.38`
- `iron-session`
- `@vercel/blob@2.3.1`
- `zod@4.3`
- componentes UI baseados em Radix

Atualizacoes maiores deliberadamente adiadas para rodada separada:

- `prisma 5 -> 7`
- `typescript 5 -> 6`
- `eslint 9 -> 10`
- `lucide-react 0.x -> 1.x`
- `@types/node 20 -> 25`

## Setup local

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar ambiente

Copie `.env.example` para `.env` e preencha o necessario para autenticacao, uploads e servicos auxiliares.

### 3. Rodar em desenvolvimento

```bash
pnpm dev
```

Servidor local padrao:

- [http://localhost:3003](http://localhost:3003)

### 4. Acesso ao admin

- `http://localhost:3003/login/setup` cria o primeiro administrador
- `http://localhost:3003/login` faz login no painel

## Scripts disponiveis

- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`

## Validacao atual

Ultimo estado validado nesta base:

- `pnpm lint` passa
- `pnpm build` passa

Observacao conhecida:

- pode haver aviso de tooling relacionado a `baseline-browser-mapping` dependendo da arvore de build do ecossistema Next/Turbopack

## Documentacao complementar

Arquivos atualmente validos e uteis:

- [visual-assets.md](C:\Users\RUI FRANCISCO\Documents\GitHub\site_loja_do_guerreiro\docs\visual-assets.md)
- [ARQUITETURA.md](C:\Users\RUI FRANCISCO\Documents\GitHub\site_loja_do_guerreiro\docs\ARQUITETURA.md)
- [ROTAS-E-APIS.md](C:\Users\RUI FRANCISCO\Documents\GitHub\site_loja_do_guerreiro\docs\ROTAS-E-APIS.md)

Arquivos mantidos como referencia historica do legado:

- [CHECKLIST-NOVO-SITE.md](C:\Users\RUI FRANCISCO\Documents\GitHub\site_loja_do_guerreiro\docs\CHECKLIST-NOVO-SITE.md)
- [TEMPLATES-E-BLOCOS.md](C:\Users\RUI FRANCISCO\Documents\GitHub\site_loja_do_guerreiro\docs\TEMPLATES-E-BLOCOS.md)

## Resumo

Este repositorio representa uma storefront unica da **Loja do Guerreiro**, com identidade propria, operacao comercial enxuta e painel administrativo focado em operacao real da loja.
