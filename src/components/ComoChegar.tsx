import { mapaBusca, restaurante } from "@/config/restaurante";
import { diasTexto, endereco, horarioTexto } from "@/lib/restaurante";

const mapaSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapaBusca)}&hl=pt-BR&z=15&output=embed`;

export function ComoChegar() {
  // "BR-101, saída km 59" → "BR-101, " + <em>saída km 59</em>
  const [via, ...resto] = endereco.referencia.split(", ");
  return (
    <section id="como-chegar" aria-labelledby="como-chegar-titulo" className="py-24">
      <div className="wrap grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <div>
          <p className="eyebrow" data-reveal>
            Como chegar
          </p>
          <h2 id="como-chegar-titulo" className="h2" data-reveal>
            {via}, <em>{resto.join(", ")}</em>.
          </h2>
          <address className="my-5 not-italic text-muted" data-reveal>
            <strong className="mb-1 block font-display text-[22px] font-normal text-ink">{endereco.local}</strong>
            {endereco.rua}, {endereco.bairro}
            <br />
            {endereco.cidadeUf}
          </address>
          <p className="mb-7 text-[15px]" data-reveal>
            {diasTexto()} · {horarioTexto}
          </p>
          <a className="btn btn-dark" href={restaurante.mapsUrl} target="_blank" rel="noopener noreferrer" data-reveal>
            Abrir no Google Maps <span className="seta" aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mapa aspect-[16/10] overflow-hidden rounded-[2px] bg-paper" data-reveal>
          <iframe
            src={mapaSrc}
            title={`Mapa: ${restaurante.nome}, ${endereco.local}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
