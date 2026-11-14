import Image from "next/image";
import { restaurante } from "@/config/restaurante";
import { endereco, instagramUsuario, telefoneTexto, whatsappLink } from "@/lib/restaurante";

// Créditos conforme _referencia/LICENSES.md (licença Pexels, atribuição opcional).
const creditos = [
  { autor: "Eudes cs", url: "https://www.pexels.com/video/rustic-kitchen-bean-stew-preparation-40909805/" },
  { autor: "A Rama Krishna", url: "https://www.pexels.com/video/close-up-of-cooking-a-delicious-food-4661944/" },
  { autor: "Phillips Vinegar", url: "https://www.pexels.com/video/a-man-mixing-the-pot-in-the-kitchen-6390324/" },
  { autor: "Fernanda da Silva Lopes", url: "https://www.pexels.com/photo/traditional-brazilian-dish-with-steak-and-egg-34130182/" },
];

export function Rodape() {
  const ano = new Date().getFullYear();
  return (
    <footer className="border-t border-hair bg-deep px-[var(--pad)] pb-28 pt-16 md:pb-12">
      <div className="mx-auto grid max-w-[1328px] gap-10 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Image src="/brand/logo-creme-96.webp" alt="" width={40} height={40} loading="lazy" />
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

        <address className="text-[15px] not-italic leading-[1.7] text-muted md:col-span-4">
          <span className="text-cream">{endereco.local}</span>
          <br />
          {endereco.via}
          <br />
          {endereco.cidade}
        </address>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1328px] flex-col gap-3 border-t border-hair pt-6 text-[13px] text-muted md:flex-row md:justify-between">
        <p>
          © {ano} {restaurante.nome}
        </p>
        <p className="max-w-[80ch]">
          Vídeo de abertura com imagens do Pexels:{" "}
          {creditos.map((c, i) => (
            <span key={c.autor}>
              <a className="link" href={c.url} target="_blank" rel="noopener noreferrer">
                {c.autor}
              </a>
              {i < creditos.length - 2 ? ", " : i === creditos.length - 2 ? " e " : "."}
            </span>
          ))}{" "}
          O salão é foto própria.
        </p>
      </div>
    </footer>
  );
}
