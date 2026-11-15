export const restaurante = {
  nome: "Araquari Refeições",
  whatsapp: "5547992616566", // conferido em 15/11/2026
  instagram: "https://www.instagram.com/araquari_refeicoes/",
  mapsUrl: "https://maps.app.goo.gl/6QjDuyz7hC5rSqkV8",
  endereco: {
    rua: "R. Mariano Soares",
    bairro: "Corveta",
    local: "Condomínio Industrial BHW",
    localCurto: "Condomínio BHW",
    referencia: "BR-101, saída km 59",
    referenciaCurta: "BR-101, km 59",
    cidade: "Araquari",
    uf: "SC",
  },
  horario: { abre: "11:00", fecha: "13:30", fuso: "America/Sao_Paulo" },
  diasAbertos: [1, 2, 3, 4, 5], // CONFIRMAR com o cliente (0 = domingo)
  precos: { buffet: 23, marmita: 20 },
  anosDeAtuacao: "mais de 10",
  fundacao: 2015, // CNPJ: aberto em 20/07/2015
  estacionamento: "Na frente do salão",
};

// Busca usada no mapa incorporado: o pin do próprio restaurante no Google Maps.
// O link acima (mapsUrl) aponta para "BHW Condomínio Logístico, R. Mariano Soares, 255, Corveta". Conferido em 15/11/2026.
export const mapaBusca = "Araquari Refeições, Araquari - SC";

// Usado no Open Graph, canonical e JSON-LD. Trocar quando houver domínio próprio.
export const siteUrl = "https://araquari-refeicoes.vercel.app";
