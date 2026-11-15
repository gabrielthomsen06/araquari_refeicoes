// Grava um vídeo curto das animações (hero, faixa, parallax, galeria, setas) em 1440x900.
// Uso: node scripts/gravar.mjs  → .impeccable/review/animacoes.webm (+ .gif se o ffmpeg do Playwright aceitar)
import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, renameSync, statSync } from "node:fs";
import { join } from "node:path";

const base = process.env.BASE || "http://localhost:4173";
const dir = ".impeccable/review";
mkdirSync(dir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir, size: { width: 1440, height: 900 } },
});
const page = await ctx.newPage();
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(2400); // hero: zoom, palavras, botões

// Seta do botão secundário da hero.
await page.hover('#topo a[href="#empresas"]');
await page.waitForTimeout(700);
await page.mouse.move(10, 10);

// Rolagem contínua até o fim, parando na galeria para o hover.
const alturaGaleria = await page.evaluate(() => document.querySelector("#buffet").getBoundingClientRect().top + scrollY - 80);
const rolar = async (ate) => {
  let y = await page.evaluate(() => scrollY);
  while (y < ate) {
    y = Math.min(ate, y + 14);
    await page.evaluate((y) => scrollTo(0, y), y);
    await page.waitForTimeout(16);
  }
};
await rolar(alturaGaleria);
await page.waitForTimeout(900);
await page.hover("#buffet figure:nth-child(1) .mascara");
await page.waitForTimeout(900);
await page.mouse.move(10, 10);
const fim = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
await rolar(fim);
await page.waitForTimeout(1200);

const video = page.video();
await ctx.close();
await browser.close();
const bruto = await video.path();
const webm = join(dir, "animacoes.webm");
renameSync(bruto, webm);
console.log(webm, `${(statSync(webm).size / 1024).toFixed(0)} KB`);

// Versão leve em VP9 (960 px) com o ffmpeg que vem com o Playwright. Ele não tem encoder GIF.
const pw = join(process.env.LOCALAPPDATA || "", "ms-playwright");
const ff = existsSync(pw)
  ? readdirSync(pw)
      .filter((d) => d.startsWith("ffmpeg"))
      .map((d) => join(pw, d, "ffmpeg-win64.exe"))
      .find(existsSync)
  : null;
if (ff) {
  const leve = join(dir, "animacoes-960.webm");
  try {
    execFileSync(ff, ["-y", "-loglevel", "error", "-i", webm, "-vf", "scale=960:-2", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "34", "-deadline", "good", "-cpu-used", "4", "-an", leve], { stdio: "pipe" });
    console.log(leve, `${(statSync(leve).size / 1024).toFixed(0)} KB`);
  } catch {
    console.log("Versão leve não gerada; fica o .webm bruto.");
  }
}
