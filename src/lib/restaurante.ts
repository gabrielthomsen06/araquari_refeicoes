import { restaurante } from "@/config/restaurante";

const r = restaurante;

/** "11:00" → "11h", "13:30" → "13h30" */
export function hora(hhmm: string) {
  const [h, m] = hhmm.split(":");
  return `${Number(h)}h${m === "00" ? "" : m}`;
}

export const preco = (valor: number) => `R$ ${valor}`;

export const horarioTexto = `${hora(r.horario.abre)} às ${hora(r.horario.fecha)}`;

const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const DIAS_SCHEMA = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** [1,2,3,4,5] → "Segunda a sexta"; dias soltos viram lista. */
export function diasTexto(dias: number[] = r.diasAbertos) {
  const d = [...dias].sort((a, b) => a - b);
  const seguidos = d.every((x, i) => i === 0 || x === d[i - 1] + 1);
  const texto =
    seguidos && d.length > 2
      ? `${DIAS[d[0]]} a ${DIAS[d[d.length - 1]]}`
      : d.map((x) => DIAS[x]).join(", ").replace(/, ([^,]*)$/, " e $1");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export const diasSchema = r.diasAbertos.map((d) => DIAS_SCHEMA[d]);

/** Endereço do config mais as formas de exibição. */
const e = r.endereco;
export const endereco = {
  ...e,
  cidadeUf: `${e.cidade} (${e.uf})`,
  /** "R. Mariano Soares, Corveta · Condomínio Industrial BHW (BR-101, saída km 59), Araquari (SC)" */
  completo: `${e.rua}, ${e.bairro} · ${e.local} (${e.referencia}), ${e.cidade} (${e.uf})`,
  /** "R. Mariano Soares, Corveta · Condomínio Industrial BHW, Araquari (SC)" */
  linha: `${e.rua}, ${e.bairro} · ${e.local}, ${e.cidade} (${e.uf})`,
};

export function whatsappLink(mensagem?: string) {
  const base = `https://wa.me/${r.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

/** "5547992616566" → "(47) 99261-6566" */
export function telefoneTexto(numero: string = r.whatsapp) {
  const n = numero.replace(/^55/, "");
  return `(${n.slice(0, 2)}) ${n.slice(2, n.length - 4)}-${n.slice(-4)}`;
}

export const instagramUsuario = "@" + r.instagram.replace(/\/$/, "").split("/").pop();

export const MENSAGEM_MARMITA = "Olá! Quero pedir uma marmita.";

/** Estado do selo. `agora` é injetável para teste. */
export function statusAgora(agora: Date = new Date()) {
  const p = new Intl.DateTimeFormat("en-US", {
    timeZone: r.horario.fuso,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(agora);
  const get = (t: string) => p.find((x) => x.type === t)!.value;
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const min = Number(get("hour")) * 60 + Number(get("minute"));
  const toMin = (s: string) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m;
  };
  const abre = toMin(r.horario.abre);
  const fecha = toMin(r.horario.fecha);
  const abertoHoje = r.diasAbertos.includes(dia);

  if (abertoHoje && min >= abre && min < fecha) {
    return { aberto: true, destaque: "Aberto agora", resto: `até ${hora(r.horario.fecha)}` };
  }
  // Próximo dia aberto: hoje (antes de abrir) ou nos próximos 7 dias.
  let adiante = abertoHoje && min < abre ? 0 : 1;
  while (adiante < 8 && !r.diasAbertos.includes((dia + adiante) % 7)) adiante++;
  const quando = adiante <= 1 ? "" : `${DIAS[(dia + adiante) % 7]} `;
  return { aberto: false, destaque: "Fechado", resto: `abre ${quando}às ${hora(r.horario.abre)}` };
}
