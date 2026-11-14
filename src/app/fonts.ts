import localFont from "next/font/local";

// Arquivos OFL, subset latin, os mesmos da hero (ver _referencia/LICENSE.txt).
export const instrumentSerif = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic-latin.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

export const geist = localFont({
  src: "../fonts/Geist-Variable-latin.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
});
