// Mede o fundo atrás do texto da hero (com o texto escondido) e calcula o contraste com o creme #F4EDE1.
// Uso: node scripts/contraste.mjs  (servidor em http://localhost:4173)
import { chromium } from "playwright-core";
import sharp from "sharp";

const base = process.env.BASE || "http://localhost:4173";
const lum = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const L = (r, g, b) => 0.2126 * lum(r) + 0.7152 * lum(g) + 0.0722 * lum(b);
const CREME = L(244, 237, 225);

const browser = await chromium.launch();
for (const w of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width: w, height: w < 600 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const alvos = { h1: "#topo h1", subtitulo: "#topo h1 + p" };
  const caixas = {};
  for (const [k, sel] of Object.entries(alvos)) caixas[k] = await page.locator(sel).boundingBox();
  await page.addStyleTag({ content: "#topo h1, #topo h1 + p { visibility: hidden }" });
  const png = await page.screenshot();
  for (const [k, c] of Object.entries(caixas)) {
    const { data, info } = await sharp(png)
      .extract({ left: Math.round(c.x), top: Math.round(c.y), width: Math.round(c.width), height: Math.round(c.height) })
      .raw().toBuffer({ resolveWithObject: true });
    const ls = [];
    for (let i = 0; i < data.length; i += info.channels) ls.push(L(data[i], data[i + 1], data[i + 2]));
    ls.sort((a, b) => a - b);
    const p = (q) => ls[Math.floor(q * (ls.length - 1))];
    const ratio = (l) => ((CREME + 0.05) / (l + 0.05)).toFixed(2);
    console.log(`${w}px ${k.padEnd(10)} mediana ${ratio(p(0.5))}:1  p90 ${ratio(p(0.9))}:1  p99 ${ratio(p(0.99))}:1  pior ${ratio(p(1))}:1`);
  }
  await page.close();
}
await browser.close();
