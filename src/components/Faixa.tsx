import type { CSSProperties, ReactNode } from "react";
import { restaurante } from "@/config/restaurante";
import { horarioTexto, preco } from "@/lib/restaurante";

const icone = "size-10 shrink-0 fill-none stroke-mustard-2 [stroke-width:1.4]";

const blocos: { titulo: string; texto: ReactNode; icone: ReactNode }[] = [
  {
    titulo: "Buffet",
    texto: (
      <>
        <b>{preco(restaurante.precos.buffet)}</b>, preço fixo, das {horarioTexto}.
      </>
    ),
    icone: (
      <svg viewBox="0 0 40 40" className={icone} aria-hidden="true">
        <path d="M6 26h28M9 26a11 11 0 0 1 22 0M20 13v-3M17 10h6M4 30h32" />
      </svg>
    ),
  },
  {
    titulo: "Marmita",
    texto: (
      <>
        <b>{preco(restaurante.precos.marmita)}</b>. Peça pelo WhatsApp.
      </>
    ),
    icone: (
      <svg viewBox="0 0 40 40" className={icone} aria-hidden="true">
        <rect x="6" y="13" width="28" height="18" rx="2" />
        <path d="M6 19h28M17 13v18" />
      </svg>
    ),
  },
  {
    titulo: "Para empresas",
    texto: <>Equipe no salão ou marmitas entregues na empresa.</>,
    icone: (
      <svg viewBox="0 0 40 40" className={icone} aria-hidden="true">
        <path d="M6 33V13l9 5v-5l9 5v-5l10 6v14z" />
        <path d="M11 27h3M19 27h3M27 27h3" />
      </svg>
    ),
  },
];

/** Três blocos em verde-escuro, sobrepostos ao fim da hero. */
export function Faixa() {
  return (
    <section aria-label="Resumo" className="relative z-10 -mt-[72px]">
      <div className="wrap">
        <div className="grid overflow-hidden rounded-[2px] bg-g900 text-cream shadow-[0_24px_50px_-24px_rgb(0_0_0/0.45)] min-[901px]:grid-cols-3">
          {blocos.map((b, i) => (
            <div
              key={b.titulo}
              className="feat flex items-start gap-[18px] border-b border-cream-line p-[22px] last:border-b-0 min-[901px]:border-b-0 min-[901px]:border-r min-[901px]:px-7 min-[901px]:py-[30px] min-[901px]:last:border-r-0"
              data-reveal
              style={{ "--i": i } as CSSProperties}
            >
              {b.icone}
              <div>
                <h2 className="text-[22px] leading-[1.1]">{b.titulo}</h2>
                <p className="mt-1.5 text-sm text-cream-soft [&_b]:font-bold [&_b]:text-mustard-2">{b.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
