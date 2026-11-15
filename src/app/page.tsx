import { Buffet } from "@/components/Buffet";
import { ComoChegar } from "@/components/ComoChegar";
import { Empresas } from "@/components/Empresas";
import { Faixa } from "@/components/Faixa";
import { Hero } from "@/components/Hero";
import { NossaCasa } from "@/components/NossaCasa";
import { Revelacao } from "@/components/Revelacao";
import { Rodape } from "@/components/Rodape";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Faixa />
        <NossaCasa />
        <Buffet />
        <Empresas />
        <ComoChegar />
      </main>
      <Rodape />
      <Revelacao />
    </>
  );
}
