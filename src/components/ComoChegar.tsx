import Image from "next/image";
import { mapaBusca, restaurante } from "@/config/restaurante";
import { diasTexto, endereco, horarioTexto } from "@/lib/restaurante";
import { Secao } from "./Secao";

const mapaSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapaBusca)}&hl=pt-BR&z=15&output=embed`;

export function ComoChegar() {
  return (
    <Secao id="como-chegar" titulo={`${endereco.via}.`}>
      <div className="mx-auto mt-12 grid max-w-[1328px] gap-y-10 md:mt-16 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-4" data-reveal>
          <address className="not-italic">
            <p className="font-serif text-[30px] leading-[1.1]">{endereco.local}</p>
            <p className="mt-2 text-lg leading-[1.55] text-muted">
              {endereco.via}
              <br />
              {endereco.cidade}
            </p>
          </address>

          <dl className="mt-8 border-t border-hair pt-5 text-[15px]">
            <dt className="rotulo">Horário</dt>
            <dd className="mt-2">
              {diasTexto()} · {horarioTexto}
            </dd>
          </dl>

          <a className="btn btn-primario mt-8" href={restaurante.mapsUrl} target="_blank" rel="noopener noreferrer">
            Abrir no Google Maps
          </a>
        </div>

        <div className="md:col-span-8 md:col-start-5 md:row-span-2 md:row-start-1" data-reveal>
          <div className="mapa relative aspect-[4/3] overflow-hidden border border-hair bg-surface sm:aspect-[16/11]">
            <iframe
              src={mapaSrc}
              title={`Mapa: ${restaurante.nome}, ${endereco.local}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </div>

        <div className="md:col-span-4 md:row-start-2 md:self-end" data-reveal>
          <figure className="max-w-[360px]">
            <div className="foto aspect-[4/3]">
              <Image
                src="/fotos/fachada-640.webp"
                alt="Fachada do restaurante com o estacionamento na frente"
                width={640}
                height={853}
                sizes="360px"
                loading="lazy"
                className="object-[50%_70%]"
              />
            </div>
          </figure>
        </div>
      </div>
    </Secao>
  );
}
