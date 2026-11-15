# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind, exportação estática (`output: 'export'`), deploy na Vercel. Sem backend: formulários montam a mensagem e abrem o WhatsApp. Fontes via `next/font` (arquivos locais): DM Serif Display nos títulos e Manrope no texto, nenhuma outra.

## Users

Funcionários e RH/gestores das empresas do Condomínio Industrial BHW (BR-101, saída km 59, Araquari/SC). Os funcionários decidem onde almoçar no intervalo; RH e gestores decidem se contratam almoço no salão ou marmitas entregues na empresa para a equipe.

## Product Purpose

Restaurante de buffet e marmitas que atende o condomínio no almoço (11h às 13h30). O site precisa levar o visitante a ir almoçar no salão, pedir uma marmita pelo WhatsApp ou pedir orçamento para a equipe.

## Positioning

Está dentro do condomínio ("a dois minutos da sua empresa"), com preço fixo (buffet R$ 23, marmita R$ 20) e mais de 10 anos atendendo empresas. Comida de verdade de cozinha industrial e buffet: nada de gourmet inacessível, nada de à la carte.

## Operating Context

Pedidos e orçamentos acontecem pelo WhatsApp. Funcionamento só no almoço, em dias úteis (dias abertos a confirmar com o cliente). Salão amplo com estacionamento na frente.

## Capabilities and Constraints

- Todo dado que muda com o tempo (preços, horário, dias, telefone, endereço, links) vive em `src/config/restaurante.ts`.
- WhatsApp `5547992616566` e dias abertos `[1..5]` aguardam confirmação do cliente.
- Fora desta versão: avaliações (o Google tem só 3 hoje) e logos de clientes (o cliente pediu para não citar).

## Brand Commitments

- Nome: Araquari Refeições. Logo em creme: `public/brand/logo-creme.png`.
- Site v2 (15/11/2026) refeito a partir de `maquete-site-araquari-v2.html`: creme `#F4EDE1` e papel `#EAE0CF` de fundo, texto `#1F2419`, verde-escuro `#1C2A16`/`#24361C` em faixas, mostarda `#B98A2C` em destaques e botões.
- Logo original verde dentro de um círculo creme (`public/brand/logo-verde-*.webp`, gerado por `scripts/images.mjs`).
- Verde `#66902C` do logo só em ícones e no logo.
- O vídeo da hero foi removido; a hero é uma foto de comida com degradê escuro.

## Evidence on Hand

- Fotos reais: buffet com salão (`post3-slide1`), salão vazio (`post3-slide3`), fachada com estacionamento (`post3-slide2`), ossobuco na cuba (`post-ossobuco`, 360×640, texto do Instagram gravado na imagem).
- Fotos de banco (Pexels/Unsplash) na hero e, provisoriamente, na galeria do buffet (três fotos com legenda só do nome da comida, sem preço) até chegarem as fotos reais; origem em `_referencia/LICENSES.md`.
- Ausentes e proibidos de inventar: depoimentos, avaliações, clientes nomeados, números além de "mais de 10 anos".

## Product Principles

1. Mostrar o lugar real; banco de imagem só onde não pode ser confundido com o restaurante.
2. Todo caminho termina no WhatsApp ou no mapa, com a mensagem já pronta.
3. Preço e horário à vista, sempre vindos do config.
4. Tom de restaurante de comida de verdade: direto, sem floreio.

## Accessibility & Inclusion

Contraste AA em todo texto; respeitar `prefers-reduced-motion` (todas as animações desligadas, tudo visível). Meta Lighthouse mobile 90+ nas quatro categorias.
