"use client";

import Image from "next/image";
import { restaurante } from "@/config/restaurante";
import { MENSAGEM_MARMITA, whatsappLink } from "@/lib/restaurante";
import { IconeWhatsApp } from "./IconeWhatsApp";
import { useForaDaHero } from "./useForaDaHero";

/** Transparente sobre a hero; sólida com blur depois que ela sai da tela. */
export function Nav() {
  const solida = useForaDaHero();
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,padding,border-color] duration-300 motion-reduce:transition-none ${
        solida
          ? "border-b border-hair bg-verde-escuro/90 py-3 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-7"
      }`}
    >
      <nav aria-label="Principal" className="flex items-center justify-between px-[var(--pad)] text-sm">
        <a href="#topo" className="flex items-center gap-3 font-semibold tracking-[0.02em] text-cream">
          <Image src="/brand/logo-verde-144.webp" alt="" width={44} height={44} priority className="rounded-full" />
          {restaurante.nome}
        </a>
        <ul className="hidden items-center gap-8 text-muted min-[821px]:flex">
          <li><a className="transition-colors hover:text-cream" href="#buffet">Buffet</a></li>
          <li><a className="transition-colors hover:text-cream" href="#marmitas">Marmitas</a></li>
          <li><a className="transition-colors hover:text-cream" href="#empresas">Empresas</a></li>
          <li>
            <a
              className="border-b border-line pb-[3px] text-cream transition-colors hover:border-cream"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </li>
        </ul>
        <a
          id="pedir-menu"
          href={whatsappLink(MENSAGEM_MARMITA)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-menu min-[821px]:hidden"
        >
          <IconeWhatsApp className="size-4" />
          Pedir
        </a>
      </nav>
    </header>
  );
}
