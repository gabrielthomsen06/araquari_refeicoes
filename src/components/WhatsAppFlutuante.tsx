"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/restaurante";
import { IconeWhatsApp } from "./IconeWhatsApp";
import { useForaDaHero } from "./useForaDaHero";

/**
 * Só no celular, depois da hero, e só quando o botão "Pedir" do menu (#pedir-menu)
 * não está na tela: nunca dois botões de WhatsApp ao mesmo tempo.
 */
export function WhatsAppFlutuante() {
  const depoisDaHero = useForaDaHero(0);
  const [botaoDoMenuNaTela, setBotaoDoMenuNaTela] = useState(true);

  useEffect(() => {
    const botao = document.getElementById("pedir-menu");
    if (!botao) return setBotaoDoMenuNaTela(false);
    const io = new IntersectionObserver(([e]) => setBotaoDoMenuNaTela(e.isIntersecting));
    io.observe(botao);
    return () => io.disconnect();
  }, []);

  const visivel = depoisDaHero && !botaoDoMenuNaTela;
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel}
      className={`fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2.5 rounded-[2px] bg-cream px-4 text-[15px] font-medium text-ink shadow-[0_8px_24px_rgb(0_0_0/0.45)] transition-[opacity,transform] duration-300 motion-reduce:transition-none min-[821px]:hidden ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <IconeWhatsApp />
      WhatsApp
    </a>
  );
}
