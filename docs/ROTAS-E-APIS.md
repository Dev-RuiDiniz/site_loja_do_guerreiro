# Rotas e APIs Atuais

## Rotas web públicas

Principais rotas ativas:

- `/`
- `/loja`
- `/produto/[slug]`
- `/categorias`
- `/sobre`
- `/contato`
- `/faq`
- `/garantia`
- `/blog`
- `/blog/[slug]`
- `/blog/categorias`

Rotas públicas auxiliares ainda presentes no projeto:

- `/marcas`
- `/produtos`
- `/produtos/[slug]`
- `/p/[slug]`

## Catálogo público exposto

Categorias públicas ativas:

- `saias`
- `ojas`
- `panos-das-costas`
- `lancamentos`

Categorias removidas da vitrine pública:

- `camisas-e-batas`
- `conjuntos-rituais`
- `saias-ojas-e-panos-das-costas`

## Rotas de login e admin

- `/login`
- `/login/setup`
- `/admin`
- `/admin/banners`
- `/admin/produtos`
- `/admin/cabecalho`
- `/admin/rodape`
- `/admin/configuracoes`

## APIs administrativas

- `/api/admin/banners` `[GET, POST]`
- `/api/admin/banners/[id]` `[GET, PUT, DELETE]`
- `/api/admin/categories` `[GET, POST]`
- `/api/admin/categories/[id]` `[DELETE]`
- `/api/admin/layout` `[GET, PUT]`
- `/api/admin/products` `[GET, POST]`
- `/api/admin/products/[id]` `[GET, PUT, DELETE]`
- `/api/admin/settings` `[GET, POST]`

## APIs de autenticação

- `/api/auth/forgot-password` `[POST]`
- `/api/auth/login` `[POST]`
- `/api/auth/logout` `[POST]`
- `/api/auth/session` `[GET]`
- `/api/auth/setup` `[GET, POST]`

## APIs públicas

- `/api/categories` `[GET]`
- `/api/products` `[GET]`
- `/api/products/[slug]` `[GET]`
- `/api/products/search` `[GET]`
- `/api/upload` `[POST]`
- `/api/upload/client` `[POST]`

Observações:

- `/api/categories` reflete apenas as categorias públicas atuais do dataset
- `/api/products` e `/api/products/[slug]` não expõem mais produtos de `Camisas e Batas` nem de `Conjuntos Rituais`

## Metadados e utilitários

- `/robots.txt`
- `/sitemap.xml`

## Fora de escopo atual

As rotas abaixo pertenciam ao legado e não devem mais ser usadas como referência de implementação:

- multi-site por domínio
- `/admin/blog`
- `/admin/paginas`
- `/admin/editor/[pageId]`
- `/admin/kommo`
- `/api/admin/blog*`
- `/api/admin/pages*`
- `/api/admin/kommo*`
- `/api/seed-home`
