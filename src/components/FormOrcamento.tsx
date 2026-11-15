"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/restaurante";

const OPCOES = [
  { valor: "salao", rotulo: "No salão", mensagem: "almoço no salão" },
  { valor: "marmita", rotulo: "Marmita na empresa", mensagem: "marmita na empresa" },
  { valor: "os-dois", rotulo: "Os dois", mensagem: "salão e marmita" },
] as const;

type Campo = "empresa" | "nome" | "pessoas" | "opcao";
type Erros = Partial<Record<Campo, string>>;

function valida(d: FormData): Erros {
  const e: Erros = {};
  if (!String(d.get("empresa") ?? "").trim()) e.empresa = "Informe o nome da empresa.";
  if (!String(d.get("nome") ?? "").trim()) e.nome = "Informe o seu nome.";
  const n = Number(d.get("pessoas"));
  if (!Number.isInteger(n) || n < 1) e.pessoas = "Informe quantas pessoas, a partir de 1.";
  if (!d.get("opcao")) e.opcao = "Escolha salão, marmita ou os dois.";
  return e;
}

/** Monta a mensagem e abre o WhatsApp. Nada é enviado nem guardado pelo site. */
export function FormOrcamento() {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const [erros, setErros] = useState<Erros>({});

  function enviar(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const d = new FormData(ev.currentTarget);
    const e = valida(d);
    setErros(e);
    const primeiro = (Object.keys(e) as Campo[])[0];
    if (primeiro) {
      form.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }
    const opcao = OPCOES.find((o) => o.valor === d.get("opcao"))!;
    const mensagem = [
      "Olá! Quero um orçamento de almoço para a minha equipe.",
      `Empresa: ${String(d.get("empresa")).trim()}`,
      `Nome: ${String(d.get("nome")).trim()}`,
      `Pessoas: ${d.get("pessoas")}`,
      `Opção: ${opcao.mensagem}`,
    ].join("\n");
    window.open(whatsappLink(mensagem), "_blank", "noopener,noreferrer");
  }

  const limpa = (c: Campo) => erros[c] && setErros(({ [c]: _, ...resto }) => resto);

  const erro = (c: Campo) =>
    erros[c] ? (
      <span id={`${id}-${c}`} className="block text-[13px] text-erro">
        {erros[c]}
      </span>
    ) : null;

  const aria = (c: Campo) => ({
    "aria-invalid": erros[c] ? true : undefined,
    "aria-describedby": erros[c] ? `${id}-${c}` : undefined,
    onChange: () => limpa(c),
  });

  const texto = (c: "empresa" | "nome", rotulo: string, autoComplete: string) => (
    <label className="grid gap-2 text-[13px] font-semibold text-cream/85">
      {rotulo}
      <input name={c} className="campo" autoComplete={autoComplete} {...aria(c)} />
      {erro(c)}
    </label>
  );

  return (
    <form ref={form} onSubmit={enviar} noValidate className="grid gap-4 rounded-[2px] bg-g900 p-6 sm:p-[34px]">
      <h3 className="mb-1 text-[26px] leading-[1.1]">Peça um orçamento</h3>
      <div className="grid gap-3.5 sm:grid-cols-2">
        {texto("empresa", "Empresa", "organization")}
        {texto("nome", "Seu nome", "name")}
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="grid gap-2 text-[13px] font-semibold text-cream/85">
          Número de pessoas
          <input name="pessoas" type="number" inputMode="numeric" min={1} step={1} className="campo tabular-nums" {...aria("pessoas")} />
          {erro("pessoas")}
        </label>
        <label className="grid gap-2 text-[13px] font-semibold text-cream/85">
          Como vão almoçar
          <select name="opcao" className="campo" defaultValue="" {...aria("opcao")}>
            <option value="" disabled>
              Selecione
            </option>
            {OPCOES.map((o) => (
              <option key={o.valor} value={o.valor}>
                {o.rotulo}
              </option>
            ))}
          </select>
          {erro("opcao")}
        </label>
      </div>
      <button type="submit" className="btn btn-gold mt-1.5 border-0">
        Enviar pelo WhatsApp
      </button>
      <p className="text-[13px] text-cream-soft">Abre o WhatsApp com a mensagem pronta.</p>
    </form>
  );
}
