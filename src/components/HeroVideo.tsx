"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

const POSTER = "/hero/hero-poster.webp";
const POSTER_MOBILE = "/hero/hero-poster-mobile.webp";
const ESTREITA = "(max-aspect-ratio: 5/4)";

/**
 * O poster responsivo é a imagem do primeiro paint (LCP). O vídeo entra por cima quando carrega:
 * master 16:9 em telas largas, recomposto 4:5 nas estreitas. Com movimento reduzido, fica só o poster.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [estreita, setEstreita] = useState<boolean | null>(null);
  const [parado, setParado] = useState(true);

  useEffect(() => {
    const mq = matchMedia(ESTREITA);
    const reduz = matchMedia("(prefers-reduced-motion: reduce)");
    const atualiza = () => {
      setEstreita(mq.matches);
      setParado(reduz.matches);
    };
    atualiza();
    mq.addEventListener("change", atualiza);
    reduz.addEventListener("change", atualiza);
    return () => {
      mq.removeEventListener("change", atualiza);
      reduz.removeEventListener("change", atualiza);
    };
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || estreita === null || parado) return;
    v.load();
    v.play().catch(() => {});
  }, [estreita, parado]);

  const comum = { alt: "", sizes: "100vw", priority: true } as const;
  const { props: desktop } = getImageProps({ ...comum, src: POSTER, width: 1920, height: 1080 });
  const {
    props: { srcSet: srcMobile },
  } = getImageProps({ ...comum, src: POSTER_MOBILE, width: 1080, height: 1350 });

  return (
    <>
      <picture>
        <source media={ESTREITA} srcSet={srcMobile} />
        <img {...desktop} className="hero-midia absolute inset-0 -z-20 size-full object-cover" />
      </picture>
      {!parado && estreita !== null && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          poster={estreita ? POSTER_MOBILE : POSTER}
          className="hero-midia absolute inset-0 -z-10 size-full object-cover"
        >
          {estreita ? (
            <source src="/hero/hero-mobile.mp4" type="video/mp4" />
          ) : (
            <>
              <source src="/hero/hero-desktop.webm" type="video/webm" />
              <source src="/hero/hero-desktop.mp4" type="video/mp4" />
            </>
          )}
        </video>
      )}
    </>
  );
}
