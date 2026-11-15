import Image from "next/image";
import { restaurante } from "@/config/restaurante";
import { endereco, instagramUsuario, telefoneTexto, whatsappLink } from "@/lib/restaurante";

const icone = "size-5 shrink-0 fill-none stroke-mustard-2 [stroke-width:1.6]";

export function Rodape() {
  return (
    <footer className="bg-g900 text-cream">
      <div className="wrap flex flex-wrap items-center justify-between gap-6 py-[34px] text-sm">
        <a href="#topo" className="flex items-center gap-3 text-[15px] font-bold">
          <Image src="/brand/logo-verde-144.webp" alt="" width={44} height={44} loading="lazy" className="rounded-full" />
          {restaurante.nome}
        </a>
        <ul className="flex flex-wrap gap-x-9 gap-y-3">
          <li className="flex items-center gap-2.5">
            <svg viewBox="0 0 20 20" className={icone} aria-hidden="true">
              <path d="M4 3h3l2 4-2 1a9 9 0 0 0 5 5l1-2 4 2v3a2 2 0 0 1-2 2A15 15 0 0 1 2 5a2 2 0 0 1 2-2z" />
            </svg>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {telefoneTexto()}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <svg viewBox="0 0 20 20" className={icone} aria-hidden="true">
              <rect x="3" y="3" width="14" height="14" rx="4" />
              <circle cx="10" cy="10" r="3.2" />
            </svg>
            <a href={restaurante.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {instagramUsuario}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <svg viewBox="0 0 20 20" className={icone} aria-hidden="true">
              <path d="M10 18s6-5.5 6-10a6 6 0 0 0-12 0c0 4.5 6 10 6 10z" />
            </svg>
            <address className="not-italic">
              {endereco.referenciaCurta} · {endereco.cidadeUf}
            </address>
          </li>
        </ul>
      </div>
    </footer>
  );
}
