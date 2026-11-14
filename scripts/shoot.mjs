// Screenshots de página inteira. Uso: node scripts/shoot.mjs <rota> <prefixo> [larguras]
// Ex.: node scripts/shoot.mjs /styleguide/ styleguide 1440,390
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const [rota = "/", prefixo = "home", larguras = "1440,390"] = process.argv.slice(2);
const base = process.env.BASE || "http://localhost:4173";
const dir = ".impeccable/review";
mkdirSync(dir, { recursive: true });

const browser = await chromium.launch();
for (const w of larguras.split(",").map(Number)) {
  const mobile = w < 600;
  const page = await browser.newPage({
    viewport: { width: w, height: mobile ? 844 : 900 },
    deviceScaleFactor: mobile ? 2 : 1,
    isMobile: mobile,
    hasTouch: mobile,
    reducedMotion: "reduce", // revelações já visíveis e vídeo parado no poster
  });
  await page.goto(base + rota, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Percorre a página para disparar o lazy-load das imagens e do mapa.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
  });
  // O mapa é um iframe lazy: espera ele pintar antes de voltar ao topo.
  if (await page.locator("iframe").count()) {
    await page.locator("iframe").scrollIntoViewIfNeeded();
    await page.waitForTimeout(3500);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  // fullPage não captura o canvas do mapa; um viewport da altura da página captura.
  const altura = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({ width: w, height: altura });
  await page.waitForTimeout(3500);
  const file = `${dir}/${prefixo}-${w}.png`;
  await page.screenshot({ path: file });
  console.log(file);
  await page.close();
}
await browser.close();
