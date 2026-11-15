"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { horarioTexto, statusAgora } from "@/lib/restaurante";

type Estado = ReturnType<typeof statusAgora> | null;

/** Selo de funcionamento pelo horário de Brasília. Antes de hidratar mostra só o horário, sem afirmar nada. */
export function Selo({ forcar, className = "", style }: { forcar?: string; className?: string; style?: CSSProperties }) {
  const [estado, setEstado] = useState<Estado>(null);

  useEffect(() => {
    const atualiza = () => setEstado(statusAgora(forcar ? new Date(forcar) : new Date()));
    atualiza();
    if (forcar) return;
    const t = setInterval(atualiza, 60_000);
    return () => clearInterval(t);
  }, [forcar]);

  const aberto = estado?.aberto ?? false;
  return (
    <p
      style={style}
      className={`inline-flex items-center gap-2.5 rounded-[2px] border border-cream/25 bg-ink/35 px-3.5 py-2 text-[13px] font-semibold text-cream backdrop-blur-sm ${className}`}
    >
      <span
        aria-hidden="true"
        className={`size-2 shrink-0 rounded-full ${aberto ? "bg-brand shadow-[0_0_0_4px_rgb(102_144_44/0.3)]" : "bg-cream/55"}`}
      />
      {estado ? (
        <span>
          {estado.destaque} <span className="font-medium text-cream/80">· {estado.resto}</span>
        </span>
      ) : (
        <span>Almoço das {horarioTexto}</span>
      )}
    </p>
  );
}
