import { restaurante } from "@/config/restaurante";
import { MENSAGEM_MARMITA, endereco, horarioTexto, preco, whatsappLink } from "@/lib/restaurante";
import { HeroVideo } from "./HeroVideo";
import { Selo } from "./Selo";

/** Hero aprovada (araquari_refeições_motion/test/index.html). O vídeo já traz grade, grão, degradês e a palavra. */
export function Hero() {
  return (
    <section
      id="topo"
      aria-label={restaurante.nome}
      className="relative isolate h-[min(100svh,860px)] min-h-[600px] overflow-hidden bg-ink"
    >
      <HeroVideo />

      <div className="absolute inset-x-[var(--pad)] bottom-[clamp(32px,6vh,64px)] grid items-end gap-8 min-[821px]:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <Selo className="mb-[22px]" />
          <h1 className="max-w-[11ch] font-serif text-[clamp(46px,7.4vw,112px)] leading-[0.95] tracking-[-0.02em]">
            Almoço de verdade, <em className="text-accent-text">a dois minutos</em> da sua empresa.
          </h1>
          <div className="mt-[30px] flex flex-wrap gap-2.5">
            <a className="btn btn-primario btn-hero" href="#buffet">
              Buffet <span>{preco(restaurante.precos.buffet)}</span>
            </a>
            <a className="btn btn-hero" href={whatsappLink(MENSAGEM_MARMITA)} target="_blank" rel="noopener noreferrer">
              Marmita <span>{preco(restaurante.precos.marmita)}</span>
            </a>
            <a className="btn btn-hero" href="#empresas">
              Para empresas →
            </a>
          </div>
        </div>
        <address className="hidden border-l border-line pl-5 text-right text-[13px] not-italic leading-[1.7] text-muted min-[821px]:block">
          <b className="font-medium text-cream">{endereco.local}</b>
          <br />
          {endereco.via}
          <br />
          Almoço · {horarioTexto}
        </address>
      </div>
    </section>
  );
}
