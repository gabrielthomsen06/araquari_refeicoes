import localFont from "next/font/local";

// Arquivos OFL do Google Fonts, subset latin (ver _referencia/LICENSE.txt).
export const dmSerif = localFont({
  src: [
    { path: "../fonts/DMSerifDisplay-Regular-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/DMSerifDisplay-Italic-latin.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-dm-serif",
  display: "swap",
});

export const manrope = localFont({
  src: "../fonts/Manrope-Variable-latin.woff2",
  weight: "400 800",
  variable: "--font-manrope",
  display: "swap",
});
