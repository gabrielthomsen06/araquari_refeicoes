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
      {/* Só isto sobre o vídeo: verde-escuro atrás do menu, sumindo em 120 px (160 px no desktop). */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-[5] h-[120px] bg-gradient-to-b from-verde-escuro/85 to-transparent min-[821px]:h-[160px]" />

      <div className="absolute inset-x-[var(--pad)] bottom-[clamp(32px,6vh,64px)] grid items-end gap-8 min-[821px]:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <Selo className="mb-[22px]" />
          <h1 className="hero-h1 font-serif leading-[0.95] tracking-[-0.02em]">
            Há {restaurante.anosDeAtuacao} anos no almoço do <em className="text-accent-text">{endereco.localCurto}</em>.
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
          <b className="font-medium text-cream">
            {endereco.rua}, {endereco.bairro}
          </b>
          <br />
          {endereco.referencia}
          <br />
          Almoço · {horarioTexto}
        </address>
      </div>
    </section>
  );
}
