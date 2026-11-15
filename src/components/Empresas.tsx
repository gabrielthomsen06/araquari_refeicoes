import { restaurante } from "@/config/restaurante";
import { horarioTexto } from "@/lib/restaurante";
import { FormOrcamento } from "./FormOrcamento";

export function Empresas() {
  return (
    <section id="empresas" aria-labelledby="empresas-titulo" className="sobre-escuro bg-g800 py-[100px] text-cream">
      <div className="wrap grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow" data-reveal>
            Para empresas
          </p>
          <h2 id="empresas-titulo" className="h2" data-reveal>
            Almoço para a sua <em>equipe</em>.
          </h2>
          <p className="mt-[18px] max-w-[44ch] text-cream-soft" data-reveal>
            Atendemos empresas há {restaurante.anosDeAtuacao} anos. Sua equipe almoça no nosso salão ou recebe as marmitas
            na empresa.
          </p>
          <div className="mt-9 grid gap-px bg-cream-line sm:grid-cols-2" data-reveal>
            <div className="bg-g800 py-[22px] sm:pr-[22px]">
              <h3 className="text-[22px] leading-[1.1]">No salão</h3>
              <p className="mt-1.5 text-sm text-cream-soft">Buffet das {horarioTexto}.</p>
            </div>
            <div className="bg-g800 py-[22px] sm:pl-[22px]">
              <h3 className="text-[22px] leading-[1.1]">Marmita na empresa</h3>
              <p className="mt-1.5 text-sm text-cream-soft">Quantidade e horário combinados pelo WhatsApp.</p>
            </div>
          </div>
        </div>

        <div data-reveal>
          <FormOrcamento />
        </div>
      </div>
    </section>
  );
}
