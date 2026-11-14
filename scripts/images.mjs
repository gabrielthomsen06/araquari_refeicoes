// Gera as fotos do site em WebP, com o tratamento da hero: mais escuro nas altas, quente, um pouco menos saturado.
// O grão é aplicado por CSS, igual para todas as fotos.
import sharp from "sharp";

const SRC = "assets-src";
const OUT = "public/fotos";

// Curva por canal: out = a·in + b. Abaixa os brancos (teto e piso claros) e esquenta (azul mais baixo).
const grade = (img, sat = 0.9) =>
  img
    .modulate({ saturation: sat })
    .linear([0.86, 0.82, 0.72], [-6, -7, -6]);

const jobs = [
  { src: "post3-slide1.jpg", name: "buffet-salao", widths: [640, 1086] },
  // Buffet em tela cheia: corte largo (desktop) do mesmo quadro; no celular entra o retrato inteiro.
  { src: "post3-slide1.jpg", name: "buffet-largo", widths: [1086], extract: { left: 0, top: 470, width: 1086, height: 640 } },
  // Detalhe das cubas, bem fechado, para não repetir o quadro largo.
  { src: "post3-slide1.jpg", name: "buffet-cubas", widths: [640], extract: { left: 300, top: 760, width: 640, height: 300 } },
  { src: "post3-slide3.jpg", name: "salao", widths: [640, 1086] },
  // Céu azul forte compete com a paleta quente: saturação menor.
  { src: "post3-slide2.jpg", name: "fachada", widths: [640, 1086], sat: 0.55 },
  // Recorte abaixo do texto do Instagram gravado na imagem.
  { src: "post-ossobuco.jpg", name: "ossobuco", widths: [360], extract: { left: 0, top: 388, width: 360, height: 156 } },
];

for (const j of jobs) {
  for (const w of j.widths) {
    let img = sharp(`${SRC}/${j.src}`);
    if (j.extract) img = img.extract(j.extract);
    img = grade(img.resize({ width: w, withoutEnlargement: true }), j.sat);
    const info = await img.webp({ quality: 74, effort: 6 }).toFile(`${OUT}/${j.name}-${w}.webp`);
    console.log(`${j.name}-${w}.webp`, `${info.width}x${info.height}`, `${(info.size / 1024).toFixed(0)} KB`);
  }
}

// Open Graph a partir do poster da hero.
const og = await sharp("public/hero/hero-poster.jpg").resize(1200, 630, { fit: "cover", position: "left" }).jpeg({ quality: 82 }).toFile("public/og.jpg");
console.log("og.jpg", og.width + "x" + og.height);

// Posters da hero e logo em WebP.
for (const p of ["hero-poster", "hero-poster-mobile"]) {
  const i = await sharp(`public/hero/${p}.jpg`).webp({ quality: 72, effort: 6 }).toFile(`public/hero/${p}.webp`);
  console.log(`${p}.webp`, `${(i.size / 1024).toFixed(0)} KB`);
}
const logo = await sharp("public/brand/logo-creme.png").resize(96, 96).webp({ quality: 90 }).toFile("public/brand/logo-creme-96.webp");
console.log("logo-creme-96.webp", `${(logo.size / 1024).toFixed(1)} KB`);
