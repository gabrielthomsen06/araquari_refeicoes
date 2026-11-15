import Image from "next/image";
import { restaurante } from "@/config/restaurante";
import { MENSAGEM_MARMITA, whatsappLink } from "@/lib/restaurante";
import { IconeWhatsApp } from "./IconeWhatsApp";

const LINKS = [
  ["#buffet", "Buffet"],
  ["#empresas", "Empresas"],
  ["#como-chegar", "Como chegar"],
] as const;

/** Menu sobre a hero: logo, três âncoras e o botão do WhatsApp. No celular, só logo e "Pedir". */
export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 text-cream">
      <nav aria-label="Principal" className="wrap flex h-[88px] items-center justify-between gap-4">
        <a href="#topo" className="flex items-center gap-3 text-[15px] font-bold">
          <Image src="/brand/logo-verde-144.webp" alt="" width={44} height={44} priority className="rounded-full" />
          {restaurante.nome}
        </a>
        <ul className="hidden gap-8 text-sm font-semibold uppercase tracking-[0.04em] min-[901px]:flex">
          {LINKS.map(([href, rotulo]) => (
            <li key={href}>
              <a className="opacity-85 transition-opacity hover:opacity-100" href={href}>
                {rotulo}
              </a>
            </li>
          ))}
        </ul>
        <a
          className="btn btn-gold hidden min-[901px]:inline-flex"
          href={whatsappLink(MENSAGEM_MARMITA)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pedir pelo WhatsApp
        </a>
        <a
          className="btn-menu min-[901px]:hidden"
          href={whatsappLink(MENSAGEM_MARMITA)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconeWhatsApp className="size-4" />
          Pedir
        </a>
      </nav>
    </header>
  );
}
