export type Experience = {
  id: string;
  title: string;
  province: string;
  category: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
  tags: string[];
  description: string;
};

export const image = (file: string, width = 1200) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

export const outdoorExperiences: Experience[] = [
  {
    id: "kalandula-premium",
    title: "Quedas de Kalandula",
    province: "Malanje",
    category: "Natureza",
    price: 185000,
    duration: "3 dias / 2 noites",
    rating: 4.9,
    image: image("Kalandula Falls Pan.jpg", 1600),
    tags: ["Cascatas", "Guia local", "Drone spots"],
    description:
      "Roteiro pelo vale do Lucala, miradouros naturais e Pungo Andongo com transporte executivo.",
  },
  {
    id: "tundavala-sunset",
    title: "Fenda da Tundavala",
    province: "Huíla",
    category: "Montanha",
    price: 142000,
    duration: "2 dias / 1 noite",
    rating: 4.8,
    image: image("Tundavala Gap.jpg", 1600),
    tags: ["Nascer do sol", "Geoturismo", "Fotografia"],
    description:
      "Experiência de altitude entre Lubango, Serra da Leba e miradouros acima do planalto da Huíla.",
  },
  {
    id: "mussulo-blue",
    title: "Ilha do Mussulo",
    province: "Luanda",
    category: "Praia",
    price: 68000,
    duration: "Dia inteiro",
    rating: 4.7,
    image: image("Mussulo, Angola.jpg", 1600),
    tags: ["Catamarã", "Beach club", "Marisco"],
    description:
      "Passeio marítimo com transfer, cabana reservada, almoço costeiro e atividades aquáticas.",
  },
  {
    id: "miradouro-lua",
    title: "Miradouro da Lua",
    province: "Luanda",
    category: "Paisagem",
    price: 52000,
    duration: "6 horas",
    rating: 4.6,
    image: image("Moon view (cropped).jpg", 1600),
    tags: ["Cabo Ledo", "Pôr do sol", "4x4"],
    description:
      "Circuito ao sul de Luanda com paragens no Miradouro, Barra do Kwanza e Cabo Ledo.",
  },
];

export const indoorExperiences: Experience[] = [
  {
    id: "fortaleza-sao-miguel",
    title: "Fortaleza de São Miguel",
    province: "Luanda",
    category: "Museu",
    price: 35000,
    duration: "4 horas",
    rating: 4.7,
    image: image("Luanda-SMiguelFort2.jpg", 1200),
    tags: ["História", "Baía de Luanda", "Património"],
    description:
      "Visita guiada ao antigo forte e Museu Nacional de História Militar, com leitura urbana da baía.",
  },
  {
    id: "palacio-ferro",
    title: "Palácio de Ferro",
    province: "Luanda",
    category: "Cultura",
    price: 28000,
    duration: "3 horas",
    rating: 4.5,
    image: image("Palácio de Ferro.jpg", 1200),
    tags: ["Arquitetura", "Centro", "Arte"],
    description:
      "Percurso cultural pelo centro histórico, arquitetura metálica e galerias independentes de Luanda.",
  },
  {
    id: "kizomba-night",
    title: "Noite Kizomba Premium",
    province: "Luanda",
    category: "Experiência",
    price: 49000,
    duration: "Noite",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80",
    tags: ["Música", "Jantar", "Motorista"],
    description:
      "Jantar, lounge e música ao vivo com curadoria local e transporte privado em Luanda.",
  },
];

export const vouchers = [
  {
    title: "Luanda Weekend",
    value: 95000,
    cover: image("Moon view (banner).jpg", 1400),
    perks: ["Mussulo", "Miradouro da Lua", "Restaurante parceiro"],
  },
  {
    title: "Angola Selvagem",
    value: 245000,
    cover: image("Kalandula waterfalls of the Lucala-River in Malange, Angola.JPG", 1400),
    perks: ["Kalandula", "Pungo Andongo", "Hospedagem"],
  },
  {
    title: "Cultura Viva",
    value: 78000,
    cover: image("Luanda-SMiguelFort2.jpg", 1400),
    perks: ["Museus", "Kizomba", "Transfer urbano"],
  },
];

export const flights = [
  {
    route: "LAD - SDD",
    airline: "TAAG",
    cabin: "Económica",
    departure: "08:20",
    arrival: "09:45",
    seats: 12,
    fare: 108500,
    gds: "AMADEUS-AO-7842",
  },
  {
    route: "LAD - SPP",
    airline: "Fly Angola",
    cabin: "Flex",
    departure: "11:10",
    arrival: "12:30",
    seats: 7,
    fare: 97500,
    gds: "SABRE-AO-3190",
  },
  {
    route: "LAD - NOV",
    airline: "TAAG",
    cabin: "Executiva",
    departure: "16:40",
    arrival: "18:05",
    seats: 5,
    fare: 182000,
    gds: "GALILEO-AO-5521",
  },
];

export const formatKwanza = (value: number) =>
  new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    maximumFractionDigits: 0,
  }).format(value);
