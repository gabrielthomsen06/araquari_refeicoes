import type { Metadata } from "next";
import Image from "next/image";
import { Secao } from "@/components/Secao";
import { Selo } from "@/components/Selo";

export const metadata: Metadata = { title: "Styleguide · Araquari Refeições", robots: { index: false } };

const cores = [
  { nome: "Fundo", valor: "#121410", classe: "bg-ink", uso: "fundo das seções e da hero" },
  { nome: "Superfície", valor: "#1A1C17", classe: "bg-surface", uso: "faixas e blocos alternados" },
  { nome: "Texto", valor: "#F2EDE4", classe: "bg-cream", uso: "títulos, texto, botão primário" },
  { nome: "Secundário", valor: "#F2EDE4 · 68%", classe: "bg-muted", uso: "parágrafos, rótulos, nav (7,8:1)" },
  { nome: "Linha", valor: "#F2EDE4 · 38%", classe: "bg-line", uso: "bordas de botão e campo" },
  { nome: "Itálico", valor: "#E7DCCB", classe: "bg-accent-text", uso: "palavra em itálico dos títulos" },
  { nome: "Verde", valor: "#66902C", classe: "bg-green", uso: "faixa da marmita, selo, foco" },
  { nome: "Verde-escuro", valor: "#1F2A14", classe: "bg-verde-escuro", uso: "Para empresas, menu sólido" },
];

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="px-[var(--pad)] py-14">
      <div className="mx-auto grid max-w-[1328px] gap-6 border-t border-hair pt-6 md:grid-cols-12 md:gap-x-8">
        <p className="rotulo md:col-span-3">{titulo}</p>
        <div className="md:col-span-9">{children}</div>
      </div>
    </div>
  );
}

function Nota({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs text-muted">{children}</p>;
}

export default function Styleguide() {
  return (
    <main className="pb-24">
      <header className="px-[var(--pad)] pb-6 pt-16">
        <div className="mx-auto max-w-[1328px]">
          <p className="rotulo">Araquari Refeições · sistema visual</p>
          <h1 className="mt-5 max-w-[13ch] font-serif text-[clamp(46px,7.4vw,112px)] leading-[0.95] tracking-[-0.02em]">
            Styleguide do site, <em className="text-accent-text">a partir da hero.</em>
          </h1>
        </div>
      </header>

      <Bloco titulo="Cores">
        <ul className="grid grid-cols-2 gap-px border border-hair bg-hair sm:grid-cols-4 lg:grid-cols-8">
          {cores.map((c) => (
            <li key={c.nome} className="bg-ink">
              <div className={`h-20 border-b border-hair ${c.classe}`} />
              <div className="p-3">
                <p className="text-sm font-medium">{c.nome}</p>
                <p className="mt-1 text-xs tabular-nums text-muted">{c.valor}</p>
                <p className="mt-2 text-xs leading-snug text-muted">{c.uso}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-[60ch] text-sm text-muted">
          Verde como superfície (Para empresas, faixa da marmita, menu sólido), nunca sobre a comida nem sobre o vídeo.
        </p>
      </Bloco>

      <Bloco titulo="Tipografia">
        <div className="space-y-10">
          <div>
            <Nota>H1 · Instrument Serif 400 · 46 → 112 px · só na hero</Nota>
            <p className="max-w-[11ch] font-serif text-[clamp(46px,7.4vw,112px)] leading-[0.95] tracking-[-0.02em]">
              Almoço de verdade, <em className="text-accent-text">a dois minutos</em>
            </p>
          </div>
          <div>
            <Nota>H2 · Instrument Serif 400 · 40 → 72 px · reto (itálico só no H1 e na faixa da marmita)</Nota>
            <p className="titulo max-w-[16ch]">
              Almoço para a sua equipe, aqui no condomínio.
            </p>
          </div>
          <div>
            <Nota>H3 · Instrument Serif 400 · 30 px</Nota>
            <p className="font-serif text-[30px] leading-[1.1]">Marmita na empresa</p>
          </div>
          <div>
            <Nota>Texto de apoio · Geist 400 · 18 px / 1,55 · 68%</Nota>
            <p className="max-w-[56ch] text-lg leading-[1.55] text-muted">
              Atendemos empresas há mais de 10 anos. Sua equipe pode almoçar no nosso salão ou receber as marmitas na empresa.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-x-12 gap-y-6">
            <div>
              <Nota>Rótulo · Geist 500 · 12 px · 0,14em</Nota>
              <p className="rotulo">Para empresas</p>
            </div>
            <div>
              <Nota>UI · Geist 500 · 15 px</Nota>
              <p className="text-[15px] font-medium">Abrir no Google Maps</p>
            </div>
            <div>
              <Nota>Detalhe · Geist 400 · 13 px</Nota>
              <p className="text-[13px] text-muted">BR-101, saída km 59</p>
            </div>
          </div>
        </div>
      </Bloco>

      <Bloco titulo="Botões, campos e selo">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-2.5">
            <a className="btn btn-primario" href="#exemplo">
              Buffet <span>R$ 23</span>
            </a>
            <a className="btn" href="#exemplo">
              Marmita <span>R$ 20</span>
            </a>
            <a className="btn" href="#exemplo">
              Para empresas →
            </a>
            <button type="button" className="btn" disabled>
              Desativado
            </button>
          </div>
          <p className="max-w-[60ch] text-sm text-muted">
            Retangulares, raio 2 px, 48 px de altura (44 px no celular dentro da hero). Hover: borda creme; o primário clareia.
          </p>
          <div className="grid max-w-[640px] gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Nome da empresa</span>
              <input className="campo" placeholder="Ex.: nome da sua empresa" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Número de pessoas</span>
              <input className="campo" aria-invalid="true" defaultValue="0" />
              <span className="mt-2 block text-sm text-erro">Informe pelo menos 1 pessoa.</span>
            </label>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            <Selo forcar="2026-11-16T12:00:00-03:00" />
            <Selo forcar="2026-11-16T15:00:00-03:00" />
            <Selo forcar="2026-11-20T15:00:00-03:00" />
          </div>
        </div>
      </Bloco>

      <Bloco titulo="Tratamento de foto">
        <div className="grid grid-cols-2 gap-2 md:max-w-[720px]">
          <figure>
            <div className="foto aspect-[4/5]">
              <Image src="/fotos/buffet-salao-640.webp" alt="Buffet e salão da Araquari Refeições" width={640} height={853} sizes="(min-width: 768px) 360px, 50vw" />
            </div>
            <figcaption className="mt-2 text-[13px] text-muted">Quente, altas abaixadas, borda escura, grão 6%</figcaption>
          </figure>
          <figure>
            <div className="foto aspect-[4/5]">
              <Image src="/fotos/fachada-640.webp" alt="Fachada do restaurante com estacionamento" width={640} height={853} sizes="(min-width: 768px) 360px, 50vw" />
            </div>
            <figcaption className="mt-2 text-[13px] text-muted">A mesma curva em toda foto real</figcaption>
          </figure>
        </div>
      </Bloco>

      <div className="mt-6 bg-ink">
        <p className="rotulo px-[var(--pad)] text-center">Bloco de seção com rótulo (só Para empresas)</p>
        <Secao id="exemplo" rotulo="Para empresas" titulo="Almoço para a sua equipe, aqui no condomínio.">
          <div className="mx-auto mt-10 grid max-w-[1328px] md:grid-cols-12 md:gap-x-8">
            <div className="md:col-span-9 md:col-start-4">
              <p className="max-w-[56ch] text-lg leading-[1.55] text-muted">
                Atendemos empresas há mais de 10 anos. Sua equipe pode almoçar no nosso salão ou receber as marmitas na empresa.
              </p>
              <div className="mt-12 grid border-t border-hair sm:grid-cols-2">
                <div className="py-6 sm:border-r sm:border-hair sm:pr-8">
                  <h3 className="font-serif text-[30px] leading-[1.1]">No salão</h3>
                  <p className="mt-3 max-w-[38ch] text-muted">Sua equipe almoça no buffet, das 11h às 13h30.</p>
                </div>
                <div className="border-t border-hair py-6 sm:border-t-0 sm:pl-8">
                  <h3 className="font-serif text-[30px] leading-[1.1]">Marmita na empresa</h3>
                  <p className="mt-3 max-w-[38ch] text-muted">Entregamos marmitas na sua empresa. Quantidade e horário a gente combina pelo WhatsApp.</p>
                </div>
              </div>
            </div>
          </div>
        </Secao>
      </div>
    </main>
  );
}
