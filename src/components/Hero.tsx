import { Fragment, type CSSProperties } from "react";
import { restaurante } from "@/config/restaurante";
import { MENSAGEM_MARMITA, endereco, horarioTexto, preco, whatsappLink } from "@/lib/restaurante";
import { Nav } from "./Nav";
import { Selo } from "./Selo";

const STAGGER = 60;

/** Cada palavra em um span com o próprio atraso; o CSS faz a subida. */
function Palavras({ texto, inicio = 0, em = false }: { texto: string; inicio?: number; em?: boolean }) {
  const palavras = texto.split(" ");
  const Tag = em ? "em" : "span";
  return (
    <>
      {palavras.map((p, i) => (
        <Fragment key={i}>
          <span className="palavra">
            <span style={{ "--i": inicio + i } as CSSProperties}>
              <Tag>{p}</Tag>
            </span>
          </span>
          {i < palavras.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export function Hero() {
  const antes = `Há ${restaurante.anosDeAtuacao} anos no almoço do`;
  const destaque = `${endereco.localCurto}.`;
  const nAntes = antes.split(" ").length;
  const total = nAntes + destaque.split(" ").length;
  const depois = (extra: number) => ({ "--atraso": `${200 + total * STAGGER + 300 + extra}ms` }) as CSSProperties;

  return (
    <section
      id="topo"
      aria-label={restaurante.nome}
      className="relative isolate grid min-h-[min(92svh,820px)] place-items-center overflow-hidden bg-g900 text-center text-cream"
    >
      <picture>
        <source
          media="(max-width: 820px)"
          srcSet="/fotos/hero-mobile-750.webp 750w, /fotos/hero-mobile-1080.webp 1080w"
          sizes="100vw"
        />
        <img
          src="/fotos/hero-1920.webp"
          srcSet="/fotos/hero-1280.webp 1280w, /fotos/hero-1920.webp 1920w"
          sizes="100vw"
          width={1920}
          height={1080}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="hero-foto absolute inset-0 -z-20 size-full object-cover"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(18_22_14/0.70),rgb(18_22_14/0.45)_45%,rgb(18_22_14/0.75))]"
      />

      <Nav />

      <div className="max-w-[900px] px-6 pb-[150px] pt-[140px] max-[900px]:px-5 max-[900px]:pb-[130px] max-[900px]:pt-[120px]">
        <Selo className="hero-depois" style={{ "--atraso": "0ms" } as CSSProperties} />
        <h1 className="mb-5 mt-[18px] text-[clamp(40px,6.4vw,80px)] leading-[1.02]">
          <Palavras texto={antes} /> <Palavras texto={destaque} inicio={nAntes} em />
        </h1>
        <p className="hero-depois mx-auto max-w-[560px] text-[clamp(16px,1.6vw,19px)] opacity-90" style={depois(0)}>
          Buffet a {preco(restaurante.precos.buffet)} e marmita a {preco(restaurante.precos.marmita)}, das {horarioTexto}.
        </p>
        <div className="hero-depois mt-[34px] flex flex-wrap justify-center gap-3" style={depois(150)}>
          <a className="btn btn-gold" href={whatsappLink(MENSAGEM_MARMITA)} target="_blank" rel="noopener noreferrer">
            Pedir marmita
          </a>
          <a className="btn btn-line" href="#empresas">
            Almoço para empresas <span className="seta" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
