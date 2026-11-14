import Image, { getImageProps } from "next/image";
import { restaurante } from "@/config/restaurante";
import { MENSAGEM_MARMITA, horarioTexto, preco, whatsappLink } from "@/lib/restaurante";

// Só fotos reais do restaurante nesta seção: o visitante entende que é o lugar.
// O buffet em tela cheia é o momento da página depois da hero.
export function Buffet() {
  const comum = { alt: "", sizes: "100vw", loading: "lazy" } as const;
  const { props: largo } = getImageProps({ ...comum, src: "/fotos/buffet-largo-1086.webp", width: 1086, height: 640 });
  const {
    props: { srcSet: retrato },
  } = getImageProps({ ...comum, src: "/fotos/buffet-salao-1086.webp", width: 1086, height: 1448 });

  return (
    <>
      <section id="buffet" aria-labelledby="buffet-titulo" className="relative isolate overflow-hidden bg-ink">
        <div className="buffet-palco relative h-[min(80svh,700px)] min-h-[560px] sm:h-[min(100svh,880px)] sm:min-h-[620px]">
          <picture>
            <source media="(max-aspect-ratio: 1/1)" srcSet={retrato} />
            <img
              {...largo}
              alt="O balcão do buffet da Araquari Refeições, com as cubas de comida e o salão ao fundo"
              className="buffet-foto absolute inset-0 -z-20 size-full object-cover"
            />
          </picture>
          <div aria-hidden="true" className="buffet-scrim absolute inset-0 -z-10" />

          <div className="absolute inset-x-[var(--pad)] bottom-[clamp(32px,7vh,72px)] mx-auto max-w-[1328px]" data-reveal>
            <h2
              id="buffet-titulo"
              className="font-serif text-[clamp(56px,7.6vw,108px)] leading-[0.95] tracking-[-0.02em] tabular-nums"
            >
              Buffet por {preco(restaurante.precos.buffet)}.
            </h2>
            <p className="mt-5 max-w-[34ch] text-lg leading-[1.55] text-cream/85">
              Preço fixo, das {horarioTexto}. O salão é amplo e tem estacionamento na frente.
            </p>
          </div>
        </div>
      </section>

      <div className="px-[var(--pad)] pb-[clamp(56px,7.5vw,112px)] pt-6">
        <div className="mx-auto grid max-w-[1328px] gap-6 sm:grid-cols-2 md:grid-cols-12 md:gap-x-8">
          <figure className="md:col-span-6" data-reveal>
            <div className="foto aspect-[640/300]">
              <Image
                src="/fotos/buffet-cubas-640.webp"
                alt="Cubas do buffet com frango assado, polenta e acompanhamentos"
                width={640}
                height={300}
                sizes="(min-width: 768px) 46vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-[13px] text-muted">As cubas, de perto.</figcaption>
          </figure>
          <figure className="md:col-span-4" data-reveal>
            <div className="foto aspect-[360/156]">
              <Image
                src="/fotos/ossobuco-360.webp"
                alt="Ossobuco com cebola na cuba do buffet"
                width={360}
                height={156}
                sizes="(min-width: 768px) 30vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-[13px] text-muted">Ossobuco, no buffet.</figcaption>
          </figure>
        </div>
      </div>

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
