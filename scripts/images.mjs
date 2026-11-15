// Gera as fotos do site em WebP a partir de assets-src/. Uso: npm run images
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OUT = "public/fotos";
mkdirSync(OUT, { recursive: true });

const log = (nome, info) => console.log(nome.padEnd(28), `${info.width}x${info.height}`, `${(info.size / 1024).toFixed(0)} KB`);

async function webp(src, nome, { width, extract, quality = 74, sat = 1 }) {
  let img = sharp(src);
  if (extract) img = img.extract(extract);
  img = img.resize({ width, withoutEnlargement: true });
  if (sat !== 1) img = img.modulate({ saturation: sat });
  const info = await img.webp({ quality, effort: 6 }).toFile(`${OUT}/${nome}.webp`);
  log(`${nome}.webp`, info);
  return info;
}

// ---- Hero (banco, provisória até a foto real): prato de arroz, feijão e farofa sobre madeira. 2400x3231.
const HERO = "assets-src/banco/unsplash-1653681472495-prato-feijao.jpg";
const heroLargo = { left: 0, top: 1050, width: 2400, height: 1350 }; // 16:9, prato ao centro
const heroAlto = { left: 50, top: 400, width: 2100, height: 2800 }; // 3:4
for (const w of [1280, 1920]) await webp(HERO, `hero-${w}`, { width: w, extract: heroLargo, quality: 72 });
for (const w of [750, 1080]) {
  const info = await webp(HERO, `hero-mobile-${w}`, { width: w, extract: heroAlto, quality: 66 });
  if (info.size > 250 * 1024) throw new Error(`hero-mobile-${w} passou de 250 KB`);
}

// ---- Fotos reais (Instagram do restaurante)
for (const w of [720, 1080]) await webp("assets-src/post3-slide3.jpg", `salao-${w}`, { width: w, quality: 74 });

// ---- Galeria do buffet (banco, provisórias)
const galeria = [
  ["assets-src/banco/pexels-34130182-pf-bife-ovo.jpg", "pf"],
  ["assets-src/banco/unsplash-1622973536968-macarrao.jpg", "macarrao"],
  ["assets-src/banco/unsplash-1779939855722-marmitex-provisoria.jpg", "marmitex"],
];
for (const [src, nome] of galeria) for (const w of [800, 1200]) await webp(src, `${nome}-${w}`, { width: w, quality: 74 });

// ---- Open Graph a partir do corte largo da hero.
const og = await sharp(HERO).extract(heroLargo).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 82 }).toFile("public/og.jpg");
log("og.jpg", og);

// ---- Logo original verde sobre círculo creme (#F4EDE1). O traço sai do JPG pela luminância
// (fundo branco → transparente) e é pintado de volta no verde medido do logo.
{
  const LADO = 1080, CREME = [244, 237, 225], VERDE = [102, 144, 44];
  const { data } = await sharp("assets-src/logo-verde.jpg").resize(LADO, LADO).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = Buffer.alloc(LADO * LADO * 4);
  const r = LADO / 2;
  for (let i = 0; i < LADO * LADO; i++) {
    const x = (i % LADO) + 0.5 - r, y = Math.floor(i / LADO) + 0.5 - r;
    const borda = Math.min(1, Math.max(0, r - Math.hypot(x, y))); // antialias do círculo
    const L = 0.299 * data[i * 3] + 0.587 * data[i * 3 + 1] + 0.114 * data[i * 3 + 2];
    const tinta = Math.min(1, Math.max(0, (246 - L) / (246 - 132)));
    for (let c = 0; c < 3; c++) px[i * 4 + c] = Math.round(CREME[c] * (1 - tinta) + VERDE[c] * tinta);
    px[i * 4 + 3] = Math.round(255 * borda);
  }
  const buf = await sharp(px, { raw: { width: LADO, height: LADO, channels: 4 } }).png().toBuffer();
  for (const s of [96, 144, 192]) {
    const o = await sharp(buf).resize(s, s).webp({ quality: 92, alphaQuality: 100 }).toFile(`public/brand/logo-verde-${s}.webp`);
    log(`logo-verde-${s}.webp`, o);
  }
}
