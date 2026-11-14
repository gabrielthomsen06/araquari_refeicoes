# Araquari Refeições: guia de estilo de motion

Referência para manter a consistência em vídeos futuros. Origem: hero "cozinha de cinema", versão aprovada em 13/11/2026 (rev. 2). Substitui o conceito de ilustração vetorial, reprovado por parecer infantil e arquivado em `_arquivo-flat/`.

## Conceito

Vídeo em tela cheia, escuro nas bordas e claro na comida, quente e de alto contraste, montado por código a partir de mídia real. **O código anima e corta; nunca desenha comida.** Referências: Roberta's Pizza (close real de preparo, vídeo em tela cheia, botões sobre a imagem) e Flower Valley (cinematográfico, profundidade de campo, tipografia grande sobre a imagem). Layout, tipografia e tratamento seguem a maquete aprovada (`maquete-hero-araquari.html`, Opção A).

Tom: restaurante contemporâneo de comida de verdade, de cozinha industrial e buffet. Nada infantil, nada de gourmet inacessível, nada que lembre à la carte ou cozinha oriental (o flambado na wok foi trocado por isso).

## Cores

| Papel | Hex | Uso |
|---|---|---|
| Fundo | `#121410` | fundo da hero e preenchimento do canvas |
| Tinta dos degradês e da sombra da palavra | `rgba(10,11,9,a)` | escurecimento da zona segura e sombra localizada |
| Texto | `#F2EDE4` | H1, palavra do vídeo (a 92%), botão primário |
| Texto secundário | `#F2EDE4` a 68% | nav, selo, endereço |
| Itálico do H1 | `#E7DCCB` | trecho "a dois minutos" |
| Borda | `#F2EDE4` a 38% | botões secundários, divisória do endereço |
| **Destaque único** | `#66902C` | **medido** no traço do logo; só no ponto do selo "Aberto agora" (HTML) |

O verde nunca entra no vídeo como cor de interface. Quando a mídia traz um verde forte, a saturação do plano é reduzida para ele não competir com o destaque.

## Tipografia

Uma display e uma UI, servidas localmente de `assets/fonts/` (OFL).

| Elemento | Fonte | Tamanho | Detalhe |
|---|---|---|---|
| H1 (HTML) | Instrument Serif 400 | `clamp(46px, 7.4vw, 112px)` | line-height 0,95 · tracking −0,02em · máx. 11ch · trecho em itálico `#E7DCCB` |
| Palavra do vídeo | Instrument Serif itálico | 76 px no master 1920 (60 px na tela de 1440) · 68 px no master mobile (42 px em 390) | creme a 92%, alinhada à direita no terço superior direito; borda direita em x = 1720, topo em y = 222 (desktop) · x = 800, y = 196 (mobile) |
| Nav | Geist 14 px | — | links a 68%, WhatsApp com sublinhado de borda 38% |
| Selo | Geist 13 px | — | ponto 7 px `#66902C` com anel de 4 px a 22% |
| Botões | Geist 15 px / 500 | altura 48 px (44 px até 820 px) | retangulares, raio 2 px |

Não há rótulo sobre a palavra: o "NO FOGO AGORA" da rev. 1 foi removido. Fica só a palavra de cada plano.

## Ritmo e movimento

- **100 BPM, 12 s, 20 batidas.** Corte seco a cada 4 batidas (2,4 s = 72 frames a 30 fps). Cinco planos.
- **A palavra troca no mesmo frame do corte.** Sem fade, sem entrada animada.
- **Push-in linear de 4,5%** por plano (`push.from 1.0 → to 1.045`), em torno do ponto de interesse. O movimento já existe dentro do clipe (escumadeira, vapor, pá); a câmera só respira. Nas fotos, um tilt vertical leve (`drift`) soma movimento.
- **O loop começa e termina num corte seco.** O frame 0 é o primeiro frame do plano 1; o último frame é o fim do plano 5. A emenda é um corte igual aos outros, cai na batida 20 = 0, e os keyframes H.264/VP9 são forçados em todos os cortes (frames 0, 72, 144, 216, 288).
- Clipes de 24/25 fps viram câmera lenta leve: 1 frame de origem = 1 frame a 30 fps (0,8x / 0,83x), sem frame duplicado nem interpolado.

## Planos

| # | t | Palavra | Mídia | Por quê |
|---|---|---|---|---|
| 1 | 0,0 s | feijão. | Pexels 40909805: escumadeira levantando feijão de panela de alumínio, luz quente | abre o loop e o poster com o gesto da cozinha |
| 2 | 2,4 s | tempero. | Pexels 4661944: close de carne cozinhando, vapor subindo | textura e calor; recorte na área com menos névoa |
| 3 | 4,8 s | panela. | Pexels 6390324: caldeirão grande de alumínio, vapor, pá mexendo | escala de cozinha industrial; no celular, o recorte mostra o braço, a alça e a borda |
| 4 | 7,2 s | almoço. | Pexels foto 34130182: prato feito com arroz, feijão, bife, couve, ovo e fritas | o PF servido |
| 5 | 9,6 s | à mesa. | `assets/instagram/post3-slide1.jpg`: o salão real com o buffet (3º post, 1086×1448) | prova de lugar real, fecha antes de voltar ao feijão |

Licenças e links: `assets/stock/LICENSES.md`. Parâmetros por plano (início, exposição, contraste, recorte, tinta, sombra da palavra): `beats.json`.

## Tratamento de imagem

Aplicado no canvas, por frame, a toda mídia. **A comida fica clara; o escuro existe só nos degradês da zona segura e na sombra localizada da palavra.**

1. `brightness(exposição do plano)`, entre 0,93 e 1,16 conforme a fonte.
2. `saturate(0,9)` × multiplicador do plano (`sat`).
3. `contrast(1,06)` × multiplicador do plano (`contrast`; o tempero usa 1,24 para tirar a névoa).
4. Filtro SVG `#grade`: curva gamma leve por canal. R 1,04/1,08, G 1,00/1,11, B 0,92/1,20. Assenta os pretos sem afundar os meios-tons e esquenta (azul mais baixo).
5. Tinta quente por plano em multiply, quando a fonte é fria (tempero `rgb(255,196,150)` a 30%; panela `rgb(255,206,160)` a 28%; salão `rgb(255,212,170)` a 25%).
6. Grão de ~6%: ruído semeado (8 ladrilhos 384 px, mulberry32), blend overlay; ladrilho e deslocamento dependem só do número do frame.

Proibido: vinheta exagerada, glow, partículas, fades, transições, caixa atrás de texto.

## Zona segura, degradês e sombra da palavra

- O terço inferior esquerdo (selo, H1, botões) e o terço inferior direito (endereço) não recebem palavra nem detalhe importante. O ponto de interesse de cada plano é ancorado em x ≈ 0,6–0,64 da tela (desktop) e no terço central/superior (mobile).
- Degradês da maquete, gravados no vídeo:
  - Desktop, de baixo para cima: 0,92 → 0,55 (38%) → 0,15 (70%) → 0,35 (topo). Da esquerda para a direita: 0,55 → 0 (55%).
  - Mobile, de baixo para cima: 0,95 → 0,80 (40%) → 0,50 (52%) → 0,14 (64%) → 0,16 (80%) → 0,55 (topo). Lateral 0,25 → 0 (60%).
- **Sombra localizada da palavra**: elipse escura em degradê radial, centrada na palavra e dimensionada pela largura medida dela (raio horizontal = metade da largura + 1,6 × corpo; vertical = 1,6 × corpo), com queda 1 → 0,85 → 0,4 → 0,12 → 0. Fica sob o grão, como parte da imagem. Intensidade por plano (`wordShade`): feijão 0,45 · tempero 0,30 (mobile 0,42) · panela 0,30 (mobile 0,48) · almoço 0,48 · salão 0,30. Mais uma sombra de texto escura e difusa (`rgba(10,11,9,.45)`, blur = 0,3 × corpo). Sem caixa, sem glow.

## Legibilidade medida

Percentil 95 da luminância do fundo, contra o creme. Medição frame a frame (um a cada 4, mais o último de cada plano: 95 frames por formato).

| Medida | Ferramenta | Meta | Desktop (pior) | Mobile (pior) |
|---|---|---|---|---|
| H1 + selo + botões | `src/check-h1.py` | 4,5:1 | 5,8:1 | 9,3:1 |
| Palavra animada (fundo só sob as letras) | `src/check-word.py` | 3:1 | 3,6:1 (feijão) | 4,0:1 (panela) |

`check-word.py` compara o frame renderizado com o mesmo frame sem a palavra (`--debug noword`); a diferença é a máscara exata das letras.

## Saídas

| Arquivo | Formato | Limite |
|---|---|---|
| `out/hero-master.mp4` | 1920×1080, 30 fps, H.264 yuv420p, CRF 16 | master |
| `out/hero-master-mobile.mp4` | 1080×1350, 30 fps, H.264 yuv420p, CRF 16 | master mobile |
| `out/hero-desktop.mp4` | 1920×1080, H.264 CRF 26, sem áudio, faststart | ≤ 2,5 MB |
| `out/hero-desktop.webm` | 1920×1080, VP9 2 passes a 1100k, sem áudio | ≤ 2,5 MB e menor que o MP4 |
| `out/hero-mobile.mp4` | 1080×1350 recomposto, H.264 CRF 27, sem áudio, faststart | ≤ 1,5 MB |
| `out/hero-poster.jpg`, `out/hero-poster-mobile.jpg` | frame 0 | — |

Na página: `object-fit: cover`, `object-position: 72% 50%` (desktop) e `50% 20%` (mobile). O vídeo mobile entra quando a hero tem proporção até 5:4. Hero com `height: min(100svh, 860px)`.

## Pipeline

```
bash src/prep-clips.sh                                   # Pexels -> intermediários VP9 (1 frame = 1 frame a 30 fps)
node render.mjs --stills beats --dir out/stills-d        # 1 frame por batida
python -I src/contact.py out/stills-d out/contact-sheet.png
node render.mjs --stills every:4 --dir out/w             # medição da palavra
node render.mjs --stills every:4 --debug noword --dir out/wn
python -I src/check-word.py out/w out/wn
python -I src/check-h1.py out/stills-d out/stills-m
node render.mjs                                          # master desktop (CRF 16)
node render.mjs --layout mobile                          # master mobile
bash build-web.sh                                        # derivados web, posters, teste de loop 3x
node src/shoot-html.mjs                                  # screenshots do test/index.html em 1440 e 390 (Edge, por causa do H.264)
```

Contrato: `await window.seek(t)` pinta o frame t. Os clipes são posicionados por `video.currentTime` (seek determinístico, sem playback) e o canvas é repintado por inteiro a cada frame. Sem transições CSS, `setTimeout` nem `requestAnimationFrame` no render.
