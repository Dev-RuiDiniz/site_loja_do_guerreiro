# Arquitetura da Loja do Guerreiro

## Visão geral

O projeto usa o App Router do Next.js com separação direta entre:

- storefront pública
- painel administrativo autenticado
- APIs para leitura pública e operação interna
- bibliotecas locais de catálogo, marca e interface

Não há mais arquitetura multi-site, editor visual por blocos nem experiências separadas por domínio.

## Camadas principais

### App (`src/app`)

- `(site)`
  - rotas públicas da loja
  - usa `Header`, `Footer` e CTA de WhatsApp no layout
- `admin`
  - painel de gestão com autenticação por sessão
  - dashboards e CRUDs operacionais
- `api`
  - endpoints públicos e administrativos
- `login`
  - setup inicial e login admin
- `proxy.ts`
  - proteção de `/admin` por cookie de sessão

### Componentes (`src/components`)

- `layout`
  - header, footer, marca e CTA público
- `storefront`
  - cards de produto, detalhe, catálogo e arte editorial
- `admin`
  - sidebar, topbar, modais, uploads, SEO e CRUDs do painel
- `ui`
  - primitives compartilhadas baseadas em Radix e Tailwind

### Dados e bibliotecas (`src/data` e `src/lib`)

- `data/store.ts`
  - fonte de verdade do catálogo público
  - categorias públicas ativas: `Saias`, `Ojás`, `Panos das Costas` e `Lançamentos`
- `data/visualAssets.ts`
  - acervo visual editorial da marca
- `lib/prisma.ts`
  - singleton do Prisma Client
- `lib/session.ts` e `lib/auth.ts`
  - sessão admin via `iron-session`
- `lib/seo.ts`
  - metadata da loja
- `lib/site.ts`
  - configurações centrais da marca e do fluxo de WhatsApp

## Fluxo público de compra

1. A pessoa navega pela home, pelas categorias e pelo catálogo.
2. Escolhe uma peça em `/loja` ou `/produto/[slug]`.
3. Adiciona ao carrinho client-side.
4. Fecha o pedido pelo WhatsApp com mensagem pré-formatada.

## Catálogo público atual

- categorias removidas da vitrine: `Camisas e Batas` e `Conjuntos Rituais`
- categorias novas ou mantidas: `Saias`, `Ojás`, `Panos das Costas` e `Lançamentos`
- categorias podem existir vazias até a entrada de novos produtos

## Fluxo de autenticação

1. A pessoa cria o primeiro admin em `/login/setup`.
2. O login acontece em `/login`.
3. A sessão é persistida por cookie.
4. `src/proxy.ts` protege o acesso a `/admin`.

## Fluxo de operação do admin

O painel cobre o necessário para o MVP:

- banners da vitrine
- catálogo de produtos
- cabeçalho e rodapé
- configurações de marca e SEO

## Upload de arquivos

- `ImageUpload` usa upload direto para Vercel Blob via `/api/upload/client`
- `/api/upload` permanece para cenários server-side

## Sistema de interface

A direção visual compartilhada entre storefront e admin está documentada em:

- `.interface-design/system.md`

## Notas sobre o legado

O repositório já teve uma base maior com:

- multi-site
- editor visual por blocos
- integração Kommo
- CRUDs adicionais e páginas dinâmicas antigas

Esse desenho não representa mais a arquitetura ativa do projeto.
