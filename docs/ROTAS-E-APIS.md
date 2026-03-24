# Rotas e APIs Atuais

## Rotas web publicas

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

Rotas publicas auxiliares ainda presentes no projeto:

- `/marcas`
- `/produtos`
- `/produtos/[slug]`
- `/p/[slug]`

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

## APIs de autenticacao

- `/api/auth/forgot-password` `[POST]`
- `/api/auth/login` `[POST]`
- `/api/auth/logout` `[POST]`
- `/api/auth/session` `[GET]`
- `/api/auth/setup` `[GET, POST]`

## APIs publicas

- `/api/categories` `[GET]`
- `/api/products` `[GET]`
- `/api/products/[slug]` `[GET]`
- `/api/products/search` `[GET]`
- `/api/upload` `[POST]`
- `/api/upload/client` `[POST]`

## Metadados e utilitarios

- `/robots.txt`
- `/sitemap.xml`

## Fora de escopo atual

As rotas abaixo pertenciam ao legado e nao devem mais ser usadas como referencia de implementacao:

- multi-site por dominio
- `/admin/blog`
- `/admin/paginas`
- `/admin/editor/[pageId]`
- `/admin/kommo`
- `/api/admin/blog*`
- `/api/admin/pages*`
- `/api/admin/kommo*`
- `/api/seed-home`
