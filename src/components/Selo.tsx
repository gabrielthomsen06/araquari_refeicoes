"use client";

import { useEffect, useState } from "react";
import { horarioTexto, statusAgora } from "@/lib/restaurante";

type Estado = ReturnType<typeof statusAgora> | null;

/** Selo de funcionamento pelo horário de Brasília. Antes de hidratar mostra só o horário, sem afirmar nada. */
export function Selo({ forcar, className = "" }: { forcar?: string; className?: string }) {
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
    <p className={`inline-flex items-center gap-2 text-[13px] text-muted ${className}`}>
      <span
        aria-hidden="true"
        className={`size-[7px] shrink-0 rounded-full ${aberto ? "bg-green shadow-[0_0_0_4px_rgb(102_144_44/0.22)]" : "bg-muted"}`}
      />
      {estado ? (
        <span>
          <b className="font-medium text-cream">{estado.destaque}</b> · {estado.resto}
        </span>
      ) : (
        <span>Almoço das {horarioTexto}</span>
      )}
    </p>
  );
}
