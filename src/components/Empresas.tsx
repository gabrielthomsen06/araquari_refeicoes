import Image from "next/image";
import { restaurante } from "@/config/restaurante";
import { horarioTexto } from "@/lib/restaurante";
import { FormOrcamento } from "./FormOrcamento";
import { Secao } from "./Secao";

export function Empresas() {
  return (
    <Secao
      id="empresas"
      rotulo="Para empresas"
      className="bg-verde-escuro"
      titulo={
        <>
          Almoço para a sua equipe, aqui no condomínio.
        </>
      }
    >
      <div className="mx-auto mt-12 grid max-w-[1328px] gap-y-12 md:mt-16 md:grid-cols-12 md:gap-x-8">
        <figure className="md:col-span-5" data-reveal>
          <div className="foto aspect-[4/5]">
            <Image
              src="/fotos/salao-1086.webp"
              alt="O salão da Araquari Refeições, com mesas de madeira e janelas amplas para a mata"
              width={1086}
              height={1440}
              sizes="(min-width: 768px) 40vw, 100vw"
              loading="lazy"
            />
          </div>
        </figure>

        <div className="md:col-span-7 md:pl-[4%]">
          <p className="max-w-[52ch] text-lg leading-[1.55] text-muted" data-reveal>
            Atendemos empresas há {restaurante.anosDeAtuacao} anos. Sua equipe pode almoçar no nosso salão ou receber as
            marmitas na empresa.
          </p>

          <div className="mt-10 grid border-y border-hair sm:grid-cols-2" data-reveal>
            <div className="py-6 sm:border-r sm:border-hair sm:pr-8">
              <h3 className="font-serif text-[30px] leading-[1.1]">No salão</h3>
              <p className="mt-3 max-w-[36ch] text-muted">Sua equipe almoça no buffet, das {horarioTexto}.</p>
            </div>
            <div className="border-t border-hair py-6 sm:border-t-0 sm:pl-8">
              <h3 className="font-serif text-[30px] leading-[1.1]">Marmita na empresa</h3>
              <p className="mt-3 max-w-[36ch] text-muted">
                Entregamos marmitas na sua empresa. Quantidade e horário a gente combina pelo WhatsApp.
              </p>
            </div>
          </div>

          <div className="mt-12" data-reveal>
            <h3 className="mb-6 font-serif text-[30px] leading-[1.1]">Peça um orçamento</h3>
            <FormOrcamento />
          </div>
        </div>
      </div>
    </Secao>
  );
}
