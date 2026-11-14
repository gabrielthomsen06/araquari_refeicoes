import type { ReactNode } from "react";

type Props = {
  id: string;
  rotulo?: string;
  titulo: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * Com rótulo: trilho à esquerda alinhado ao topo do título, sobre uma linha fina.
 * Sem rótulo: o título abre a seção sozinho, alinhado à margem.
 */
export function Secao({ id, rotulo, titulo, children, className = "" }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={`px-[var(--pad)] py-[clamp(56px,7.5vw,112px)] ${className}`}>
      {rotulo ? (
        <div className="mx-auto grid max-w-[1328px] gap-y-5 border-t border-hair pt-6 md:grid-cols-12 md:gap-x-8 md:pt-8" data-reveal>
          <p className="rotulo md:col-span-3 md:pt-[calc(clamp(40px,5.2vw,72px)*0.2)]">{rotulo}</p>
          <div className="md:col-span-9">
            <h2 id={`${id}-titulo`} className="titulo max-w-[16ch]">
              {titulo}
            </h2>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-[1328px]" data-reveal>
          <h2 id={`${id}-titulo`} className="titulo max-w-[18ch]">
            {titulo}
          </h2>
        </div>
      )}
      {children}
    </section>
  );
}
