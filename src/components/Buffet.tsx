import type { CSSProperties } from "react";
import { restaurante } from "@/config/restaurante";
import { MENSAGEM_MARMITA, preco, whatsappLink } from "@/lib/restaurante";

// "pf" e "macarrao" são de banco, provisórias (ver _referencia/LICENSES.md); "buffet" é foto real do restaurante.
// A marmitex entra na galeria quando chegar a foto real.
const fotos = [
  { nome: "pf", larguras: [800, 1200], legenda: "Bife, ovo e couve", alt: "Prato com arroz, bife, couve, batata frita e ovo frito" },
  { nome: "macarrao", larguras: [800, 1200], legenda: "Macarrão com carne moída", alt: "Prato de macarrão com molho de carne moída" },
  { nome: "buffet", larguras: [800, 1086], legenda: "O buffet", alt: "O balcão do buffet da Araquari Refeições, com as cubas de comida e o salão ao fundo" },
];

/** Galeria para abrir o apetite: o cliente monta o próprio prato, então nenhuma foto tem preço. */
export function Buffet() {
  return (
    <section id="buffet" aria-labelledby="buffet-titulo" className="bg-paper py-24">
      <div className="wrap">
        <header className="mb-11 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow" data-reveal>
              O buffet
            </p>
            <h2 id="buffet-titulo" className="h2" data-reveal>
              Você monta o <em>prato</em>.
            </h2>
            <p className="mt-3 text-muted" data-reveal>
              Buffet com preço fixo de {preco(restaurante.precos.buffet)}.
            </p>
          </div>
          <a className="btn btn-dark" href={whatsappLink(MENSAGEM_MARMITA)} target="_blank" rel="noopener noreferrer" data-reveal>
            Pedir marmita pelo WhatsApp
          </a>
        </header>

        <div className="grid gap-5 md:grid-cols-[1.25fr_1fr] md:grid-rows-[1fr_1fr]">
          {fotos.map((f, i) => (
            <figure key={f.nome} className={i === 0 ? "md:row-span-2" : ""}>
              <div
                className={`mascara relative overflow-hidden rounded-[2px] bg-cream ${i === 0 ? "aspect-[4/3] md:aspect-[4/5]" : "aspect-[4/3] md:aspect-auto md:h-[calc(100%-44px)]"}`}
                data-reveal
                style={{ "--i": i } as CSSProperties}
              >
                <img
                  src={`/fotos/${f.nome}-${f.larguras[1]}.webp`}
                  srcSet={f.larguras.map((w) => `/fotos/${f.nome}-${w}.webp ${w}w`).join(", ")}
                  sizes={i === 0 ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
                  width={f.larguras[1]}
                  height={Math.round((f.larguras[1] * 2) / 3)}
                  loading="lazy"
                  decoding="async"
                  alt={f.alt}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <figcaption className="mt-3 font-display text-[20px] leading-[1.2]">{f.legenda}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
