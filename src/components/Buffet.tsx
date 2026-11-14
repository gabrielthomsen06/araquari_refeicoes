import Image from "next/image";
import { restaurante } from "@/config/restaurante";
import { MENSAGEM_MARMITA, horarioTexto, preco, whatsappLink } from "@/lib/restaurante";
import { Secao } from "./Secao";

// Só fotos reais do restaurante nesta seção: o visitante entende que é o lugar.
export function Buffet() {
  return (
    <>
      <Secao
        id="buffet"
        rotulo="Buffet"
        titulo={
          <>
            Buffet por <em>{preco(restaurante.precos.buffet)}</em>.
          </>
        }
      >
        <div className="mx-auto grid max-w-[1328px] md:grid-cols-12 md:gap-x-8">
          <p className="mt-6 max-w-[48ch] text-lg leading-[1.55] text-muted md:col-span-9 md:col-start-4" data-reveal>
            Preço fixo, das {horarioTexto}. O salão é amplo e tem estacionamento na frente.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1328px] gap-y-8 md:mt-16 md:grid-cols-12 md:gap-x-8">
          <figure className="md:col-span-7 md:col-start-6 md:row-start-1" data-reveal>
            <div className="foto aspect-[1086/600]">
              <Image
                src="/fotos/buffet-cubas-1086.webp"
                alt="Cubas do buffet com frango assado, polenta e acompanhamentos"
                width={1086}
                height={600}
                sizes="(min-width: 768px) 56vw, 100vw"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-[13px] text-muted">As cubas do buffet.</figcaption>
          </figure>

          <figure className="md:col-span-5 md:col-start-1 md:row-span-2 md:row-start-1" data-reveal>
            <div className="foto aspect-[4/5]">
              <Image
                src="/fotos/salao-1086.webp"
                alt="Salão com mesas de madeira e janelas amplas para a mata"
                width={1086}
                height={1440}
                sizes="(min-width: 768px) 40vw, 100vw"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-[13px] text-muted">O salão, com vista para a mata.</figcaption>
          </figure>

          <figure className="md:col-span-4 md:col-start-6 md:row-start-2 md:self-end" data-reveal>
            <div className="foto aspect-[360/156] max-w-[360px]">
              <Image
                src="/fotos/ossobuco-360.webp"
                alt="Ossobuco com cebola na cuba do buffet"
                width={360}
                height={156}
                sizes="360px"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-[13px] text-muted">Ossobuco, no buffet.</figcaption>
          </figure>
        </div>
      </Secao>

      <section id="marmitas" aria-labelledby="marmitas-titulo" className="bg-surface px-[var(--pad)]">
        <div
          className="mx-auto flex max-w-[1328px] flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-14"
          data-reveal
        >
          <h2 id="marmitas-titulo" className="font-serif text-[clamp(30px,3.4vw,46px)] leading-[1.05] tracking-[-0.01em]">
            Prefere levar? <em className="text-accent-text">A marmita sai por {preco(restaurante.precos.marmita)}.</em>
          </h2>
          <a className="btn btn-primario shrink-0" href={whatsappLink(MENSAGEM_MARMITA)} target="_blank" rel="noopener noreferrer">
            Pedir marmita
          </a>
        </div>
      </section>
    </>
  );
}
