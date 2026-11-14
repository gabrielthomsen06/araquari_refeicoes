import { Buffet } from "@/components/Buffet";
import { ComoChegar } from "@/components/ComoChegar";
import { Empresas } from "@/components/Empresas";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Revelacao } from "@/components/Revelacao";
import { Rodape } from "@/components/Rodape";
import { WhatsAppFlutuante } from "@/components/WhatsAppFlutuante";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Empresas />
        <Buffet />
        <ComoChegar />
      </main>
      <Rodape />
      <WhatsAppFlutuante />
      <Revelacao />
    </>
  );
}
