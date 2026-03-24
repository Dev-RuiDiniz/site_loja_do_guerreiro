# Interface System

## Direction
- Ritual commerce com base editorial quente e mineral.
- A storefront comunica presenca, materia e compra assistida.
- O admin opera como caderno tecnico da mesma marca: mais denso, mais silencioso e sem cair em dashboard generico.

## Tokens
- Primarios: azul profundo, areia ritual, dourado fosco, verde contido e argila queimada.
- Superficies publicas: `commerce-panel`, `commerce-card`, `brand-panel`.
- Superficies admin: `admin-canvas`, `admin-panel`, `admin-panel-strong`.
- Bordas devem ser suaves e discretas; foco usa halo do acento, nunca contraste duro preto/branco.

## Depth
- Estrategia dominante: borda suave + shift de superficie.
- Sombra fica reservada para planos altos, modais e cards de destaque.
- Sidebar e shell do admin usam profundidade quieta, sem blocos gritantes.

## Spacing
- Base unit: 8px.
- Ritmo principal: 8 / 16 / 24 / 32 / 40.
- Cards e modais usam padding generoso e simetrico.

## Radius
- Controles e chips: pill radius.
- Cards e paines: 1.2rem a 2rem.
- Modais: cantos amplos, mas sem linguagem excessivamente macia.

## Typography
- Display e ancora de assinatura: `Cormorant Garamond`.
- Interface, labels e dados: `Manrope`.
- Kicker em uppercase com tracking alto para orientar leitura editorial e operacional.

## Navigation
- A navegacao deve sempre situar o usuario dentro da loja ou da operacao.
- Sidebar do admin e header publico precisam indicar lugar, contexto e acao adjacente.

## Component Patterns
- Page hero: kicker editorial + titulo serifado + texto de apoio + bloco auxiliar.
- Action cards: icone em circulo, titulo curto, detalhe operacional, CTA implcito pelo container.
- Data list row: miniatura, identificacao, badges suaves, acoes em pills.
- Filter chips: pills com acento ativo e hover leve.
- Modal: cabecalho editorial curto + corpo tecnico consistente com `admin-input`.
