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

  const texto = (c: "empresa" | "nome", rotulo: string, autoComplete: string) => (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{rotulo}</span>
      <input
        name={c}
        className="campo"
        autoComplete={autoComplete}
        aria-invalid={erros[c] ? true : undefined}
        aria-describedby={erros[c] ? `${id}-${c}` : undefined}
        onChange={() => limpa(c)}
      />
      {erros[c] && (
        <span id={`${id}-${c}`} className="mt-2 block text-sm text-erro">
          {erros[c]}
        </span>
      )}
    </label>
  );

  return (
    <form ref={form} onSubmit={enviar} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {texto("empresa", "Nome da empresa", "organization")}
        {texto("nome", "Seu nome", "name")}
      </div>

      <label className="block sm:max-w-[calc(50%-10px)]">
        <span className="mb-2 block text-sm font-medium">Número de pessoas</span>
        <input
          name="pessoas"
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          className="campo tabular-nums"
          aria-invalid={erros.pessoas ? true : undefined}
          aria-describedby={erros.pessoas ? `${id}-pessoas` : undefined}
          onChange={() => limpa("pessoas")}
        />
        {erros.pessoas && (
          <span id={`${id}-pessoas`} className="mt-2 block text-sm text-erro">
            {erros.pessoas}
          </span>
        )}
      </label>

      <fieldset aria-describedby={erros.opcao ? `${id}-opcao` : undefined}>
        <legend className="mb-2 text-sm font-medium">Como a equipe vai almoçar</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {OPCOES.map((o) => (
            <label key={o.valor} className="opcao">
              <input type="radio" name="opcao" value={o.valor} className="sr-only" onChange={() => limpa("opcao")} />
              <span aria-hidden="true" className="opcao-ponto" />
              {o.rotulo}
            </label>
          ))}
        </div>
        {erros.opcao && (
          <span id={`${id}-opcao`} className="mt-2 block text-sm text-erro">
            {erros.opcao}
          </span>
        )}
      </fieldset>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
        <button type="submit" className="btn btn-primario">
          Pedir orçamento
        </button>
        <p className="text-[13px] text-muted">Abre o WhatsApp com a mensagem pronta. Nada fica salvo aqui.</p>
      </div>
    </form>
  );
}
