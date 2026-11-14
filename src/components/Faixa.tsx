import { restaurante } from "@/config/restaurante";
import { endereco, horarioTexto, preco } from "@/lib/restaurante";

const itens = [
  `Há ${restaurante.anosDeAtuacao} anos`,
  `Almoço das ${horarioTexto}`,
  `Buffet ${preco(restaurante.precos.buffet)} · Marmita ${preco(restaurante.precos.marmita)}`,
  `No ${endereco.local}`,
];

export function Faixa() {
  return (
    <section aria-label="Informações" className="border-b border-hair bg-surface px-[var(--pad)]">
      <ul className="mx-auto grid max-w-[1328px] grid-cols-2 md:grid-cols-4">
        {itens.map((item, i) => (
          <li
            key={item}
            className={`flex items-center py-7 font-serif text-[clamp(20px,1.9vw,27px)] leading-[1.15] md:py-9 ${
              i % 2 === 1 ? "border-l border-hair pl-4 md:pl-8" : "pr-4 md:pr-8"
            } ${i > 1 ? "border-t border-hair md:border-t-0" : ""} ${i === 2 ? "md:border-l md:pl-8" : ""}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
