# Arquitetura da Loja do Guerreiro

## Visao geral

O projeto usa o App Router do Next.js com separacao direta entre:

- storefront publica
- painel administrativo autenticado
- APIs para leitura publica e operacao interna
- bibliotecas de UI e dados locais para o MVP

Nao ha mais arquitetura multi-site, editor visual por blocos ou experiencias dedicadas por dominio.

## Camadas principais

## 1) App (`src/app`)

- `(site)`
  - rotas publicas da loja
  - usa `Header`, `Footer` e `WhatsAppButton` no layout
- `admin`
  - painel de gestao com autenticacao por sessao
  - dashboards e CRUDs operacionais
- `api`
  - endpoints publicos e administrativos
- `login`
  - setup inicial e login admin
- `proxy.ts`
  - protecao de `/admin` por cookie de sessao

## 2) Componentes (`src/components`)

- `layout`
  - header, footer, marca e CTA publico
- `storefront`
  - cards de produto, detalhe, catalogo e arte editorial
- `admin`
  - sidebar, topbar, modais, uploads, SEO e CRUDs do painel
- `ui`
  - primitives compartilhadas baseadas em Radix e Tailwind

## 3) Dados e bibliotecas (`src/data` e `src/lib`)

- `data/store.ts`
  - dados de loja usados na storefront atual
- `data/visualAssets.ts`
  - acervo visual editorial da marca
- `lib/prisma.ts`
  - singleton do Prisma Client
- `lib/session.ts` e `lib/auth.ts`
  - sessao admin via `iron-session`
- `lib/seo.ts`
  - metadata da loja
- `lib/site.ts`
  - configuracoes centrais da marca e do fluxo de WhatsApp

## Fluxo de autenticacao

1. Usuario cria o primeiro admin em `/login/setup`.
2. Login acontece em `/login`.
3. Sessao e persistida por cookie.
4. `src/proxy.ts` protege o acesso a `/admin`.

## Fluxo publico de compra

1. Usuario navega pela home, colecoes e catalogo.
2. Escolhe uma peca em `/loja` ou `/produto/[slug]`.
3. Adiciona ao carrinho client-side.
4. Fecha o pedido pelo WhatsApp com mensagem preformatada.

## Fluxo de operacao do admin

O painel cobre o necessario para o MVP:

- banners da vitrine
- catalogo de produtos
- cabecalho e rodape
- configuracoes de marca e SEO

## Upload de arquivos

- `ImageUpload` usa upload direto para Vercel Blob via `/api/upload/client`
- `/api/upload` permanece para cenarios server-side

## Interface system

A direcao visual compartilhada entre storefront e admin esta documentada em:

- `.interface-design/system.md`

## Notas sobre o legado

O repositorio ja teve uma base maior com:

- multi-site
- editor visual por blocos
- integracao Kommo
- CRUDs adicionais e paginas dinamicas antigas

Esse desenho nao representa mais a arquitetura ativa do projeto.
