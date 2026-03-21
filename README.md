# Loja do Guerreiro

Loja virtual desenvolvida em `Next.js 16` para a marca **Loja do Guerreiro**, com foco em moda afro-religiosa, vitrine editorial forte e fechamento de atendimento via WhatsApp na primeira versao.

## Objetivo do projeto

Este repositorio deixou de ser uma base generica multi-site e passou a representar um produto unico:

- marca unica: `Loja do Guerreiro`
- proposta: loja virtual de roupas e acessorios texteis para religioes afro-brasileiras
- foco inicial: vitrine, catalogo, pagina de produto, carrinho local e CTA de WhatsApp
- painel administrativo enxuto para operacao da loja

## Direcao da marca

### Posicionamento

A Loja do Guerreiro combina:

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

Principios de interface:

- contraste alto
- composicao editorial
- cards solidos e bordas finas
- atmosfera quente e mineral
- responsividade priorizada para mobile e desktop

## Experiencia da loja

### Frontend publico

O fluxo publico atual inclui:

- home editorial
- catalogo em `/loja`
- detalhe de produto em `/produto/[slug]`
- navegacao por categorias em `/categorias`
- paginas institucionais em `/sobre` e `/contato`
- carrinho client-side persistido localmente
- fechamento de pedido via mensagem preformatada no WhatsApp

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
    admin/                   # painel administrativo enxuto
    api/
      admin/                 # APIs do admin mantidas no MVP
      auth/                  # login, logout, sessao e setup inicial
      categories/            # categorias publicas
      products/              # catalogo publico
      upload/                # upload usado pelo admin
    login/                   # acesso ao painel
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
  lib/
    auth.ts                  # leitura de sessao admin
    prisma.ts                # fallback/local compat layer
    seo.ts                   # metadata da loja
    session.ts               # configuracao de sessao admin
    site.ts                  # configuracoes da marca
public/
  icon.svg                   # icone atual da loja
  images/hero/               # imagens mantidas para o site
```

## Painel administrativo

O admin foi reduzido ao necessario para o MVP.

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

O que foi removido do legado:

- blog administrativo
- marcas
- parceiros
- catalogos PDF
- home sections antigas
- visual editor legado
- scripts externos antigos
- integracao Kommo
- APIs publicas herdadas fora do MVP

## Stack tecnica

- `next@16`
- `react@19`
- `typescript`
- `tailwindcss@4`
- `framer-motion`
- `iron-session`
- `@vercel/blob`
- componentes UI baseados em Radix

## Setup local

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar ambiente

Copie `.env.example` para `.env` e preencha o que for necessario para autenticacao, uploads e servicos auxiliares.

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

- `pnpm lint` passa com warnings nao bloqueantes
- `pnpm build` passa

Avisos conhecidos:

- `middleware` usa convencao depreciada do Next 16 e pode virar `proxy` em uma rodada futura
- `baseline-browser-mapping` esta desatualizado e gera aviso no build

## Estado do legado

O legado principal ja foi removido:

- assets publicos antigos
- scripts de tracking antigos
- logos e favicons de marcas anteriores
- APIs publicas herdadas
- modulos administrativos fora do MVP

Ainda existe limpeza adicional possivel em rotas publicas herdadas que hoje estao fora do fluxo principal, como paginas antigas devolvendo `notFound()` ou equivalentes.

## Documentacao complementar

Os arquivos em `docs/` ainda refletem em parte a arquitetura antiga e devem ser tratados como historico tecnico ate serem reescritos:

- [ARQUITETURA.md](C:/Users/Rui%20Francisco/Documents/GitHub/site_loja_do_guerreiro/docs/ARQUITETURA.md)
- [CHECKLIST-NOVO-SITE.md](C:/Users/Rui%20Francisco/Documents/GitHub/site_loja_do_guerreiro/docs/CHECKLIST-NOVO-SITE.md)
- [ROTAS-E-APIS.md](C:/Users/Rui%20Francisco/Documents/GitHub/site_loja_do_guerreiro/docs/ROTAS-E-APIS.md)
- [TEMPLATES-E-BLOCOS.md](C:/Users/Rui%20Francisco/Documents/GitHub/site_loja_do_guerreiro/docs/TEMPLATES-E-BLOCOS.md)

## Resumo

Este repositorio agora representa uma storefront unica da **Loja do Guerreiro**, com identidade propria, escopo de e-commerce enxuto e painel administrativo focado em operacao real da loja.
