"use client";

import { useEffect } from "react";

/**
 * Revela [data-reveal] ao rolar, uma vez só. Só esconde o que ainda está abaixo da tela,
 * então sem JS tudo fica visível. Com movimento reduzido o CSS ignora o estado.
 */
export function Revelacao() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]")].filter(
      (el) => el.getBoundingClientRect().top > innerHeight * 0.92,
    );
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.reveal = "shown";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of els) {
      el.dataset.reveal = "hidden";
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return null;
}
