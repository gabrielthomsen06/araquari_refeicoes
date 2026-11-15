# Mídia de banco: licenças e origem

Todos os arquivos de banco são de licença livre (Pexels License ou Unsplash License): uso comercial permitido, sem atribuição obrigatória, edição permitida. Não é permitido revender o arquivo sem alteração, nem sugerir que as pessoas fotografadas endossam a marca.

- Pexels License: https://www.pexels.com/license/
- Unsplash License: https://unsplash.com/license

## Em uso no site (v2, 15/11/2026) — todas PROVISÓRIAS até chegarem as fotos reais

| Onde | Arquivo em `assets-src/banco/` | Autor | Página |
|---|---|---|---|
| Hero (e `og.jpg`) | `unsplash-1653681472495-prato-feijao.jpg` | Unsplash | https://unsplash.com/photos/1653681472495-0a62d97e37fb (foto da maquete) |
| Galeria: "Arroz, feijão e ovo frito" | `pexels-34130182-pf-bife-ovo.jpg` | Fernanda da Silva Lopes | https://www.pexels.com/photo/traditional-brazilian-dish-with-steak-and-egg-34130182/ |
| Galeria: "Macarrão com carne moída" | `unsplash-1622973536968-macarrao.jpg` | Unsplash | https://unsplash.com/photos/1622973536968-3ead9e780960 (foto da maquete) |
| Galeria: "Marmitex" | `unsplash-1779939855722-marmitex-provisoria.jpg` | Bunly Hort | https://unsplash.com/photos/FhvW9wODr6g (marmitex de alumínio; a comida não é brasileira) |

Fotos reais (Instagram do restaurante, em `assets-src/`): `post3-slide1.jpg` (buffet com salão), `post3-slide2.jpg` (fachada), `post3-slide3.jpg` (salão vazio, usada em "Nossa casa"), `post-ossobuco.jpg` (360×640, com texto gravado; não usada).

## Histórico: vídeo da hero (removido em 15/11/2026)

### Usados no vídeo da hero (rev. 2)

| Plano | Palavra | Arquivo | Autor | Página | Arquivo original |
|---|---|---|---|---|---|
| 1 | feijão. | `pexels-40909805.mp4` | Eudes cs | https://www.pexels.com/video/rustic-kitchen-bean-stew-preparation-40909805/ | https://videos.pexels.com/video-files/40909805/17489238_2560_1440_30fps.mp4 |
| 2 | tempero. | `pexels-4661944.mp4` | A Rama Krishna | https://www.pexels.com/video/close-up-of-cooking-a-delicious-food-4661944/ | https://videos.pexels.com/video-files/4661944/4661944-hd_1920_1080_30fps.mp4 |
| 3 | panela. | `pexels-6390324.mp4` | Phillips Vinegar | https://www.pexels.com/video/a-man-mixing-the-pot-in-the-kitchen-6390324/ | https://videos.pexels.com/video-files/6390324/6390324-hd_1920_1080_25fps.mp4 |
| 4 | almoço. | `pexels-photo-34130182.jpg` (foto) | Fernanda da Silva Lopes | https://www.pexels.com/photo/traditional-brazilian-dish-with-steak-and-egg-34130182/ | https://images.pexels.com/photos/34130182/pexels-photo-34130182.jpeg (3000 px) |
| 5 | à mesa. | `../instagram/post3-slide1.jpg` | Araquari Refeições (foto própria do salão) | https://www.instagram.com/araquari_refeicoes/p/Dc3bXm1IO5L/ (3º post, carrossel, slide 1, 1086×1448) | — |

`clips/*.webm` são intermediários gerados por `src/prep-clips.sh` a partir dos vídeos acima (recorte de tempo, 1 frame de origem = 1 frame a 30 fps). Os slides 2 e 3 do mesmo post (fachada e salão vazio) foram salvos em `../instagram/` e não entram no vídeo.

## Baixados e não usados (alternativas avaliadas)

| Arquivo | Autor | Página | Motivo |
|---|---|---|---|
| `pexels-34720127.mp4` | bilal findikci | https://www.pexels.com/video/professional-chef-flambe-cooking-in-restaurant-kitchen-34720127/ | plano "fogo." da rev. 1; trocado (flambado na wok lembra à la carte/oriental) |
| `pexels-6645708.mp4` | RDNE Stock project | https://www.pexels.com/video/video-of-food-on-a-plate-6645708/ | plano "almoço." da rev. 1; trocado (prato sem feijão) |
| `pexels-9737921.mp4` | K | https://www.pexels.com/video/food-in-pot-cooking-on-gas-stove-9737921/ | panela no fogão industrial, mas sem vapor visível |
| `pexels-photo-32655177.jpg` | Daigoro Folz | https://www.pexels.com/photo/delicious-brazilian-feijoada-with-sides-32655177/ | PF com farofa, mas fundo de pano vermelho fora da paleta |
| `pexels-4362882.mp4` | Suraphat Nuea-on | https://www.pexels.com/video/a-close-up-shot-of-chickens-being-cooked-4362882/ | caldo cinza, não lê como feijão |
| `pexels-15685923.mp4` | Jari Lobo | https://www.pexels.com/video/stirring-with-the-spoon-in-red-beans-cooking-in-the-stone-pot-15685923/ | panela de pedra, sem concha |
| `pexels-20711894.mp4` | Att Unchalisangkat | https://www.pexels.com/video/20711894/ | água fervendo, sem comida |
| `pexels-8626672.mp4` | Kampus Production | https://www.pexels.com/video/chef-cooking-in-the-kitchen-8626672/ | frigideira pequena, à la carte |
| `pexels-5765844.mp4` | Andi Farruku | https://www.pexels.com/video/person-serving-food-on-the-table-5765844/ | pratos de restaurante gourmet |

## Fotos da maquete (Unsplash, referência de enquadramento; não entram no vídeo)

| Arquivo | Link |
|---|---|
| `unsplash-1734313276352-d42ba16fecac.jpg` | https://images.unsplash.com/photo-1734313276352-d42ba16fecac |
| `unsplash-1628521061262-19b5cdb7eee5.jpg` | https://images.unsplash.com/photo-1628521061262-19b5cdb7eee5 |
| `unsplash-1640583341059-12deab9bf751.jpg` | https://images.unsplash.com/photo-1640583341059-12deab9bf751 |
| `unsplash-1709114107937-6dec855d9ab5.jpg` | https://images.unsplash.com/photo-1709114107937-6dec855d9ab5 |
