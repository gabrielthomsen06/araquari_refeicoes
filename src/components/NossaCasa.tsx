import { restaurante } from "@/config/restaurante";
import { endereco, horarioTexto } from "@/lib/restaurante";

const icone = "size-[34px] shrink-0 fill-none stroke-brand [stroke-width:1.5]";

/** Layout dividido: a foto real do salão ocupa metade da tela de ponta a ponta; o texto fica na outra metade. */
export function NossaCasa() {
  const itens = [
    {
      titulo: horarioTexto,
      texto: "Só almoço",
      icone: (
        <svg viewBox="0 0 34 34" className={icone} aria-hidden="true">
          <circle cx="17" cy="17" r="13" />
          <path d="M17 9v8l5 3" />
        </svg>
      ),
    },
    {
      titulo: "Estacionamento",
      texto: restaurante.estacionamento,
      icone: (
        <svg viewBox="0 0 34 34" className={icone} aria-hidden="true">
          <rect x="5" y="5" width="24" height="24" rx="4" />
          <path d="M13 24V10h5a4 4 0 0 1 0 8h-5" />
        </svg>
      ),
    },
    {
      titulo: endereco.referenciaCurta,
      texto: `${endereco.rua}, ${endereco.bairro}`,
      icone: (
        <svg viewBox="0 0 34 34" className={icone} aria-hidden="true">
          <path d="M17 30s9-8.5 9-16a9 9 0 0 0-18 0c0 7.5 9 16 9 16z" />
          <circle cx="17" cy="14" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <section id="nossa-casa" aria-labelledby="nossa-casa-titulo" className="grid lg:grid-cols-2">
      <figure className="relative aspect-[4/3] overflow-hidden bg-paper lg:aspect-auto lg:min-h-[640px]">
        <img
          src="/fotos/salao-1080.webp"
          srcSet="/fotos/salao-720.webp 720w, /fotos/salao-1080.webp 1080w"
          sizes="(min-width: 1024px) 50vw, 100vw"
          width={1080}
          height={1440}
          loading="lazy"
          decoding="async"
          alt="O salão da Araquari Refeições: mesas e cadeiras de madeira, piso claro e janelas amplas para a mata"
          className="parallax object-[50%_42%]"
        />
      </figure>

      <div className="flex items-center">
        <div className="w-full max-w-[600px] px-6 py-16 lg:px-[clamp(40px,6vw,96px)] lg:py-24">
          <p className="eyebrow" data-reveal>
            Nossa casa
          </p>
          <h2 id="nossa-casa-titulo" className="h2" data-reveal>
            Desde {restaurante.fundacao} no <em>{endereco.localCurto}</em>.
          </h2>
          <p className="mt-[18px] max-w-[44ch] text-muted" data-reveal>
            A {restaurante.nome} abriu em {restaurante.fundacao} dentro do {endereco.local}. Servimos o almoço de quem
            trabalha ali e levamos marmitas até as empresas.
          </p>

          <p className="eyebrow mt-12" data-reveal>
            Como funciona
          </p>
          <ul className="mt-[22px] grid gap-[22px]">
            {itens.map((it, i) => (
              <li key={it.titulo} className="flex items-start gap-4" data-reveal style={{ ["--i" as string]: i }}>
                {it.icone}
                <div>
                  <strong className="block font-display text-[21px] font-normal leading-[1.15]">{it.titulo}</strong>
                  <small className="text-sm text-muted">{it.texto}</small>
                </div>
              </li>
            ))}
          </ul>

          <a className="btn btn-dark mt-10" href="#como-chegar" data-reveal>
            Como chegar <span className="seta" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
