import type { Metadata, Viewport } from "next";
import { restaurante, siteUrl } from "@/config/restaurante";
import { diasSchema, endereco, preco } from "@/lib/restaurante";
import { dmSerif, manrope } from "./fonts";
import "./globals.css";

const titulo = "Araquari Refeições · Buffet e marmitas no Condomínio BHW";
const descricao = `Buffet por ${preco(restaurante.precos.buffet)} e marmitas por ${preco(restaurante.precos.marmita)} no ${endereco.local}, ${endereco.referencia}. Almoço para empresas há ${restaurante.anosDeAtuacao} anos.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: titulo,
  description: descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: restaurante.nome,
    title: titulo,
    description: descricao,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Prato com arroz, feijão e farofa sobre a mesa de madeira" }],
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao, images: ["/og.jpg"] },
  icons: { icon: "/brand/logo-verde-96.webp" },
};

export const viewport: Viewport = { themeColor: "#1c2a16", colorScheme: "light" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurante.nome,
  url: siteUrl,
  image: `${siteUrl}/og.jpg`,
  telephone: `+${restaurante.whatsapp}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: endereco.rua,
    addressLocality: endereco.cidade,
    addressRegion: endereco.uf,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: diasSchema,
      opens: restaurante.horario.abre,
      closes: restaurante.horario.fecha,
    },
  ],
  priceRange: `${preco(restaurante.precos.marmita)}–${preco(restaurante.precos.buffet)}`,
  servesCuisine: "Brasileira",
  hasMap: restaurante.mapsUrl,
  sameAs: [restaurante.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${dmSerif.variable} ${manrope.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
