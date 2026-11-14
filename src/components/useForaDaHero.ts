"use client";

import { useEffect, useState } from "react";

/** true depois que a hero (#topo) sai da tela. */
export function useForaDaHero(margemTopo = 64) {
  const [fora, setFora] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("topo");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setFora(!e.isIntersecting), {
      rootMargin: `-${margemTopo}px 0px 0px 0px`,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [margemTopo]);
  return fora;
}
