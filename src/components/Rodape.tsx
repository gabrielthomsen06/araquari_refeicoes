import Image from "next/image";
import { restaurante } from "@/config/restaurante";
import { endereco, instagramUsuario, telefoneTexto, whatsappLink } from "@/lib/restaurante";

export function Rodape() {
  const ano = new Date().getFullYear();
  return (
    <footer className="border-t border-hair bg-deep px-[var(--pad)] pb-28 pt-16 md:pb-12">
      <div className="mx-auto grid max-w-[1328px] gap-10 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4">
            <Image src="/brand/logo-verde-192.webp" alt="" width={64} height={64} loading="lazy" className="rounded-full" />
            <p className="font-serif text-[30px] leading-none">{restaurante.nome}</p>
          </div>
          <p className="mt-4 text-muted">Alimentação para empresas há {restaurante.anosDeAtuacao} anos.</p>
        </div>

        <ul className="space-y-2 text-[15px] md:col-span-3">
          <li>
            <a className="link" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp {telefoneTexto()}
            </a>
          </li>
          <li>
            <a className="link" href={restaurante.instagram} target="_blank" rel="noopener noreferrer">
              Instagram {instagramUsuario}
            </a>
          </li>
        </ul>

        <address className="max-w-[40ch] text-[15px] not-italic leading-[1.7] text-muted md:col-span-4">{endereco.completo}</address>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1328px] flex-col gap-3 border-t border-hair pt-6 text-[13px] text-muted md:flex-row md:justify-between">
        <p>
          © {ano} {restaurante.nome}
        </p>
      </div>
    </footer>
  );
}
