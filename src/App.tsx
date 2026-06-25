import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Camera,
  Check,
  Facebook,
  Gift,
  Globe2,
  Headphones,
  HeartHandshake,
  Instagram,
  MapPin,
  Menu,
  Mountain,
  Palmtree,
  Plane,
  Play,
  Quote,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Ticket,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import {
  Experience,
  flights,
  formatKwanza,
  image,
  indoorExperiences,
  outdoorExperiences,
  vouchers,
} from "./data";

const navItems = [
  { path: "/", label: "Início" },
  { path: "/lazer-exterior", label: "Lazer Exterior" },
  { path: "/lazer-interior", label: "Lazer Interior" },
  { path: "/vouchers", label: "Vouchers" },
  { path: "/compras-reservas", label: "Compras/Reservas" },
  { path: "/parceiros-aereos", label: "Parceiros Aéreos" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header nav-hover-only ${open || scrolled ? "is-scrolled" : "is-top"}`}>
      <Link to="/" className="brand">
        <img src="/navbar.png" alt="Cosmos Travel Angola" className="brand-icon" />
      </Link>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button className="icon-button menu-toggle" onClick={() => setOpen(!open)} aria-label="Abrir menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer-brand">
          <img src="/logo.png" alt="Cosmos Travel Angola" className="brand-logo footer-logo" />
        </div>
        <p>Reservas, vouchers e experiências turísticas premium em Angola.</p>
      </div>
      <div>
        <h3>Contactos</h3>
        <p>+244 923 000 900</p>
        <p>reservas@cosmos-viagens.co.ao</p>
        <p>Luanda, Angola</p>
      </div>
      <div>
        <h3>Links úteis</h3>
        <Link to="/compras-reservas">Minhas reservas</Link>
        <Link to="/vouchers">Comprar voucher</Link>
        <Link to="/parceiros-aereos">Integração GDS</Link>
      </div>
      <div>
        <h3>Redes sociais</h3>
        <div className="socials">
          <a href="#" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="#" aria-label="Facebook">
            <Facebook size={20} />
          </a>
          <a href="https://cosmos-viagens.co.ao" aria-label="Website" target="_blank" rel="noopener noreferrer">
            <Globe2 size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Hero() {
  return (
    <section className="hero">
      <img src={image("Kalandula Falls Pan.jpg", 1800)} alt="Quedas de Kalandula em Malanje" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="eyebrow"><Sparkles size={16} /> Angola em modo premium</span>
        <h1>Explore Angola com lazer, reservas e voos num só ecossistema.</h1>
        <p>
          Um protótipo moderno para vender experiências em Kalandula, Mussulo, Tundavala, Luanda cultural
          e rotas aéreas nacionais conectadas a GDS mockado.
        </p>
        <div className="hero-actions">
          <Link className="primary-action" to="/compras-reservas">
            Reservar agora <ArrowRight size={18} />
          </Link>
          <Link className="secondary-action" to="/parceiros-aereos">
            Ver GDS <Plane size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <section className="section grid-two">
        <div>
          <span className="eyebrow">Destino inteligente</span>
          <h2>Turismo angolano com estética tech e fluxo comercial pronto para mock.</h2>
        </div>
        <div className="metrics">
          <div><strong>18</strong><span>experiências mockadas</span></div>
          <div><strong>5</strong><span>páginas principais</span></div>
          <div><strong>3</strong><span>provedores GDS simulados</span></div>
        </div>
      </section>
      <section className="section card-grid">
        {[...outdoorExperiences.slice(0, 2), ...indoorExperiences.slice(0, 1)].map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </section>
    </>
  );
}

function HomeV2() {
  const popularDestinations = [
    { title: "Ilha do Mussulo", place: "Luanda", price: "68.000 Kz", photo: image("Mussulo, Angola.jpg", 900) },
    { title: "Quedas de Kalandula", place: "Malanje", price: "185.000 Kz", photo: image("Kalandula Falls Pan.jpg", 900) },
    { title: "Fenda da Tundavala", place: "Huíla", price: "142.000 Kz", photo: image("Tundavala Gap.jpg", 900) },
    { title: "Miradouro da Lua", place: "Luanda", price: "52.000 Kz", photo: image("Moon view (cropped).jpg", 900) },
    { title: "Fortaleza de São Miguel", place: "Luanda", price: "35.000 Kz", photo: image("Luanda-SMiguelFort2.jpg", 900) },
    { title: "Palácio de Ferro", place: "Luanda", price: "28.000 Kz", photo: image("Palácio de Ferro.jpg", 900) },
  ];
  const [currentDestination, setCurrentDestination] = useState(0);
  const [selectedRecommendation, setSelectedRecommendation] = useState<null | {
    id: number;
    title: string;
    desc: string;
    url: string;
  }>(null);
  const recommendationItems = [
    {
      id: 1,
      title: "Quedas de Kalandula",
      desc: "Cascatas monumentais em Malanje para uma experiência natural inesquecível.",
      url: image("Kalandula waterfalls of the Lucala-River in Malange, Angola.JPG", 1200),
    },
    {
      id: 2,
      title: "Ilha do Mussulo",
      desc: "Praia, mar calmo e escapada premium perto de Luanda.",
      url: image("Mussulo, Angola.jpg", 1000),
    },
    {
      id: 3,
      title: "Fenda da Tundavala",
      desc: "Paisagem de altitude na Huíla com vistas dramáticas.",
      url: image("Tundavala Gap.jpg", 1000),
    },
    {
      id: 4,
      title: "Miradouro da Lua",
      desc: "Formações naturais ao sul de Luanda com visual cinematográfico.",
      url: image("Moon view (cropped).jpg", 1000),
    },
    {
      id: 5,
      title: "Fortaleza de São Miguel",
      desc: "Património, história e uma das vistas mais marcantes da baía.",
      url: image("Luanda-SMiguelFort2.jpg", 1000),
    },
    {
      id: 6,
      title: "Palácio de Ferro",
      desc: "Arquitetura icónica e cultura no centro de Luanda.",
      url: image("Palácio de Ferro.jpg", 1000),
    },
  ];

  const moveDestination = (direction: "previous" | "next") => {
    setCurrentDestination((current) => {
      if (direction === "previous") {
        return current === 0 ? popularDestinations.length - 1 : current - 1;
      }

      return current === popularDestinations.length - 1 ? 0 : current + 1;
    });
  };

  return (
    <main className="home-luxury">
      <section className="luxury-hero full-image-hero">
        <img
          src={image("Kalandula waterfalls of the Lucala-River in Malange, Angola.JPG", 2200)}
          alt="Quedas de Kalandula em Malanje"
        />
        <div className="full-hero-shade" />
        <div className="luxury-hero-copy">
          <span className="script-label">Angola awaits</span>
          <h1>Descubra Angola.</h1>
          <p>Kalandula, Mussulo, Tundavala e Luanda cultural em experiências premium.</p>
          <div className="hero-actions">
            <Link className="primary-action" to="/lazer-exterior">
              Explorar <ArrowRight size={18} />
            </Link>
            <Link className="secondary-action light" to="/compras-reservas">
              <Play size={17} /> Reservar
            </Link>
          </div>
        </div>
        <div className="luxury-benefits floating-benefits">
          <span><MapPin size={22} /> Destinos escolhidos</span>
          <span><ShieldCheck size={22} /> Reserva segura</span>
          <span><Headphones size={22} /> Apoio 24/7</span>
          <span><HeartHandshake size={22} /> Guias locais</span>
        </div>
      </section>

      <section className="destination-gallery-section">
        <div className="gallery-heading">
          <div>
            <span className="script-label">Dream, Explore, Discover</span>
            <h2>Destinos populares</h2>
            <p>
              Explore experiências selecionadas em Angola, com paisagens naturais, cultura urbana e
              roteiros premium para reservar no protótipo.
            </p>
          </div>
          <div className="gallery-controls">
            <button onClick={() => moveDestination("previous")} aria-label="Destino anterior">
              <ArrowLeft size={20} />
            </button>
            <button onClick={() => moveDestination("next")} aria-label="Próximo destino">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="destination-carousel">
          <div
            className="destination-carousel-track"
            style={{ transform: `translateX(calc(${currentDestination} * (var(--slide-step) * -1)))` }}
          >
            {popularDestinations.map((destination) => (
              <Link className="destination-slide" to="/compras-reservas" key={destination.title}>
                <img src={destination.photo} alt={destination.title} />
                <div>
                  <h3>{destination.title}</h3>
                  <p>{destination.place}</p>
                  <span>A partir de {destination.price}</span>
                  <small>Ver experiência <ArrowRight size={17} /></small>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="gallery-dots">
          {popularDestinations.map((destination, index) => (
            <button
              key={destination.title}
              className={currentDestination === index ? "active" : ""}
              onClick={() => setCurrentDestination(index)}
              aria-label={`Ir para ${destination.title}`}
            />
          ))}
        </div>
      </section>

      <section className="visit-angola">
        <img src={image("Tundavala panorama.jpg", 1800)} alt="Panorama da Tundavala em Angola" />
        <div className="visit-overlay" />
        <div className="visit-content">
          <span className="travel-dot">Travel</span>
          <h2>Visit Angola</h2>
          <div className="visit-copy-grid">
            <p>Da costa atlântica de Luanda às montanhas da Huíla, Angola combina paisagens imensas, cultura viva e roteiros ainda exclusivos.</p>
            <p>Kalandula, Mussulo, Miradouro da Lua e Tundavala formam uma rota premium para lazer, fotografia, natureza e descanso.</p>
          </div>
        </div>
      </section>

      <section className="luxury-section experiences-strip">
        <span className="script-label center">Something for everyone</span>
        <h2>Experiências únicas</h2>
        <div className="experience-icons">
          <article><Palmtree size={30} /><h3>Praias e ilhas</h3><p>Mussulo, Cabo Ledo e costa sul.</p></article>
          <article><Mountain size={30} /><h3>Aventura</h3><p>Escarpas, trilhos e miradouros.</p></article>
          <article><Building2 size={30} /><h3>Cultura</h3><p>Fortalezas, centro histórico e arte.</p></article>
          <article><Camera size={30} /><h3>Fotografia</h3><p>Cenários naturais de alto impacto.</p></article>
          <article><Plane size={30} /><h3>Rotas aéreas</h3><p>Voos nacionais com GDS mockado.</p></article>
        </div>
      </section>

      <section className="luxury-section why-band">
        <div className="postcard-stack">
          <img src={image("Moon view (banner).jpg", 900)} alt="Miradouro da Lua em Luanda" />
          <img src={image("Mussulo, Angola.jpg", 600)} alt="Ilha do Mussulo" />
        </div>
        <div>
          <span className="script-label">Why travel with us?</span>
          <h2>Viagens pensadas com curadoria local e conforto digital.</h2>
          <p>
            Organizamos experiências com informação clara, preços mockados, filtros de reserva e parceiros aéreos
            simulados para apresentar uma jornada completa de turismo em Angola.
          </p>
          <div className="why-points">
            <span><Users size={22} /> Guias experientes</span>
            <span><Sparkles size={22} /> Itinerários personalizados</span>
            <span><ShieldCheck size={22} /> Compra simplificada</span>
            <span><Headphones size={22} /> Suporte contínuo</span>
          </div>
        </div>
      </section>

      <section className="recommendations bento-recommendations">
        <div className="bento-heading">
          <span>confuso? estas recomendações ajudam</span>
          <h2>Destinos recomendados</h2>
          <p>Toque numa imagem para explorar a recomendação em destaque.</p>
        </div>
        <div className="bento-grid">
          {recommendationItems.map((item, index) => (
            <button
              className={`bento-item bento-item-${index + 1}`}
              key={item.id}
              onClick={() => setSelectedRecommendation(item)}
            >
              <img src={item.url} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
        {selectedRecommendation && (
          <div className="bento-modal" onClick={() => setSelectedRecommendation(null)}>
            <div className="bento-modal-card" onClick={(event) => event.stopPropagation()}>
              <button className="bento-close" onClick={() => setSelectedRecommendation(null)} aria-label="Fechar">
                <X size={18} />
              </button>
              <img src={selectedRecommendation.url} alt={selectedRecommendation.title} />
              <div>
                <h3>{selectedRecommendation.title}</h3>
                <p>{selectedRecommendation.desc}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="luxury-section testimonials-plan">
        <div className="testimonial-card">
          <span className="script-label">Happy travelers</span>
          <h2>O que os viajantes dizem</h2>
          <Quote size={28} />
          <p>
            "A proposta ficou perfeita para vender Angola como destino premium. Kalandula e Mussulo parecem
            experiências de alto valor, não apenas passeios."
          </p>
          <strong>Sarah A.</strong>
          <small>Luanda, Angola</small>
        </div>
        <form className="plan-card">
          <h2>Vamos planear a sua próxima aventura</h2>
          <input placeholder="Seu nome" />
          <input placeholder="Email" />
          <input placeholder="Destino em Angola" />
          <textarea placeholder="Mensagem" />
          <button type="button">Enviar pedido</button>
        </form>
      </section>
    </main>
  );
}

function ExperienceCard({ item }: { item: Experience }) {
  return (
    <article className="experience-card">
      <img src={item.image} alt={item.title} />
      <div className="card-body">
        <div className="card-meta">
          <span>{item.province}</span>
          <span><Star size={14} /> {item.rating}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="tag-row">
          {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="card-bottom">
          <strong>{formatKwanza(item.price)}</strong>
          <Link to="/compras-reservas">Reservar</Link>
        </div>
      </div>
    </article>
  );
}

function ListingPage({
  title,
  subtitle,
  items,
  icon,
}: {
  title: string;
  subtitle: string;
  items: Experience[];
  icon: React.ReactNode;
}) {
  return (
    <main className="page">
      <PageIntro title={title} subtitle={subtitle} icon={icon} />
      <section className="section card-grid">
        {items.map((item) => <ExperienceCard key={item.id} item={item} />)}
      </section>
    </main>
  );
}

function OutdoorLeisurePage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const progress = Math.min(window.scrollY / 620, 1);
      setScrollProgress(progress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const mediaWidth = 320 + scrollProgress * 840;
  const mediaHeight = 420 + scrollProgress * 260;
  const titleOffset = scrollProgress * 90;

  return (
    <main className="outdoor-page">
      <section className="scroll-expand-hero">
        <img
          className="scroll-expand-bg"
          src={image("Kalandula Falls Pan.jpg", 1900)}
          alt="Paisagem das Quedas de Kalandula"
        />
        <div className="scroll-expand-bg-shade" />
        <div
          className="scroll-expand-media"
          style={{
            width: `${mediaWidth}px`,
            height: `${mediaHeight}px`,
          }}
        >
          <img
            src={image("Kalandula waterfalls of the Lucala-River in Malange, Angola.JPG", 1800)}
            alt="Quedas de Kalandula em Malanje"
          />
          <div />
        </div>
        <div className="scroll-expand-title">
          <h1 style={{ transform: `translateX(-${titleOffset}px)` }}>Lazer</h1>
          <h1 style={{ transform: `translateX(${titleOffset}px)` }}>Exterior</h1>
          <p>Role para expandir a paisagem</p>
        </div>
      </section>

      <section className="luxury-section outdoor-content">
        <div className="section-heading-row">
          <div>
            <span className="script-label">Nature, Ocean, Adventure</span>
            <h2>Angola ao ar livre</h2>
            <p>
              Praias, quedas de água, escarpas e miradouros para viver experiências de natureza com curadoria premium.
            </p>
          </div>
          <Link to="/compras-reservas">Reservar agora <ArrowRight size={16} /></Link>
        </div>
        <div className="outdoor-experience-grid">
          {outdoorExperiences.map((item) => (
            <article key={item.id}>
              <img src={item.image} alt={item.title} />
              <div>
                <span>{item.province} • {item.duration}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{formatKwanza(item.price)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function InteriorLeisurePage() {
  return (
    <main className="interior-page">
      <section className="animated-interior-hero">
        <img src={image("Luanda-SMiguelFort2.jpg", 1800)} alt="Fortaleza de São Miguel em Luanda" />
        <div className="interior-hero-overlay" />
        <div className="interior-hero-content">
          <h1>Angola por dentro.</h1>
          <p>Cultura, história, gastronomia e noite em experiências premium.</p>
          <div className="interior-hero-actions">
            <Link to="/compras-reservas">Reservar experiência</Link>
            <Link to="/vouchers">Oferecer voucher</Link>
          </div>
        </div>
        <div className="interior-mini-nav">
          <a href="#museus">Museus</a>
          <a href="#cultura">Cultura</a>
          <a href="#noite">Noite</a>
        </div>
      </section>

      <section className="luxury-section interior-showcase" id="museus">
        <div className="section-heading-row">
          <div>
            <span className="script-label">Inside Angola</span>
            <h2>Experiências interiores</h2>
          </div>
          <Link to="/compras-reservas">Ver reservas <ArrowRight size={16} /></Link>
        </div>
        <div className="interior-showcase-grid">
          {indoorExperiences.map((item) => (
            <article key={item.id}>
              <img src={item.image} alt={item.title} />
              <div>
                <span>{item.category} • {item.province}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{formatKwanza(item.price)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function PageIntro({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <section className="page-intro">
      <div className="intro-icon">{icon}</div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
}

function Vouchers() {
  const [selected, setSelected] = useState("Luanda Weekend");

  return (
    <main className="page">
      <PageIntro
        title="Vouchers"
        subtitle="Ofertas digitais para experiências angolanas, com saldo, validade e benefícios mockados."
        icon={<Gift size={28} />}
      />
      <section className="section voucher-grid">
        {vouchers.map((voucher) => (
          <button
            key={voucher.title}
            className={selected === voucher.title ? "voucher active" : "voucher"}
            onClick={() => setSelected(voucher.title)}
          >
            <img src={voucher.cover} alt={voucher.title} />
            <span>{voucher.title}</span>
            <strong>{formatKwanza(voucher.value)}</strong>
            <small>{voucher.perks.join(" + ")}</small>
          </button>
        ))}
      </section>
      <section className="section confirmation-panel">
        <Ticket size={34} />
        <div>
          <h2>Voucher selecionado: {selected}</h2>
          <p>O protótipo gera um código digital, simula pagamento e permite enviar a oferta por e-mail.</p>
        </div>
        <button className="primary-action">Gerar voucher</button>
      </section>
    </main>
  );
}

function Booking() {
  const all = useMemo(() => [...outdoorExperiences, ...indoorExperiences], []);
  const [province, setProvince] = useState("Todas");
  const filtered = province === "Todas" ? all : all.filter((item) => item.province === province);

  return (
    <main className="page">
      <PageIntro
        title="Compras e Reservas"
        subtitle="Fluxo mock para consultar disponibilidade, escolher experiência e simular checkout em kwanzas."
        icon={<ShoppingBag size={28} />}
      />
      <section className="section booking-layout">
        <aside className="filters">
          <h2>Consulta rápida</h2>
          <label>
            Província
            <select value={province} onChange={(event) => setProvince(event.target.value)}>
              {["Todas", "Luanda", "Malanje", "Huíla"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Data
            <input type="date" defaultValue="2026-06-20" />
          </label>
          <label>
            Pessoas
            <input type="number" min="1" defaultValue="2" />
          </label>
          <button className="primary-action"><Search size={18} /> Procurar disponibilidade</button>
        </aside>
        <div className="booking-results">
          {filtered.map((item) => (
            <article className="reservation-row" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div>
                <span>{item.category} • {item.duration}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="row-action">
                <strong>{formatKwanza(item.price)}</strong>
                <button>Adicionar</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function BookingV2() {
  const all = useMemo(
    () => [outdoorExperiences[0], outdoorExperiences[1], indoorExperiences[0], indoorExperiences[1]],
    [],
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas as categorias");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("Qualquer número");
  const [maxPrice, setMaxPrice] = useState(250000);
  const filtered = all.filter((item) => {
    const searchText = `${item.title} ${item.description} ${item.province}`.toLowerCase();
    const matchesQuery = searchText.includes(query.toLowerCase());
    const matchesCategory =
      category === "Todas as categorias" ||
      (category === "Exterior" && outdoorExperiences.some((experience) => experience.id === item.id)) ||
      (category === "Interior" && indoorExperiences.some((experience) => experience.id === item.id));
    const matchesLocation =
      location.trim() === "" || item.province.toLowerCase().includes(location.toLowerCase());

    return matchesQuery && matchesCategory && matchesLocation && item.price <= maxPrice;
  });

  return (
    <main className="page">
      <PageIntro
        title="Compras & Reservas"
        subtitle="Encontre e reserve suas experiências ideais. Sistema de busca inteligente e processo de reserva simplificado para sua comodidade."
        icon={<ShoppingBag size={28} />}
      />
      <section className="section booking-shell">
        <div className="booking-tab">Explorar Experiências</div>
        <div className="filters booking-search">
          <h2><Search size={18} /> Buscar Experiências</h2>
          <p>Use os filtros abaixo para encontrar a experiência perfeita</p>
          <label className="search-field">
            <Search size={16} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome ou descrição..."
            />
          </label>
          <div className="filter-grid">
            <label>
              Categoria
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {["Todas as categorias", "Exterior", "Interior"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              Data
              <input type="date" defaultValue="2026-06-20" />
            </label>
            <label>
              Local
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Localização..."
              />
            </label>
            <label>
              Participantes
              <select value={participants} onChange={(event) => setParticipants(event.target.value)}>
                {["Qualquer número", "Até 6 pessoas", "7 a 12 pessoas", "Mais de 12 pessoas"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="price-range">
            Faixa de Preço: {formatKwanza(0)} - {formatKwanza(maxPrice)}
            <input
              type="range"
              min="50000"
              max="300000"
              step="10000"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
          </label>
        </div>
        <div className="results-toolbar">
          <h2>Experiências Encontradas ({filtered.length})</h2>
          <select defaultValue="relevance" aria-label="Ordenar experiências">
            <option value="relevance">Mais Relevantes</option>
            <option value="price-low">Menor preço</option>
            <option value="rating">Melhor avaliação</option>
          </select>
        </div>
        <div className="booking-results">
          {filtered.map((item) => (
            <article className="reservation-card" key={item.id}>
              <div className="reservation-image">
                <img src={item.image} alt={item.title} />
                <span>{outdoorExperiences.some((experience) => experience.id === item.id) ? "Exterior" : "Interior"}</span>
                <strong>-20%</strong>
              </div>
              <div className="reservation-content">
                <div className="availability">Disponível</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="reservation-details">
                  <span><MapPin size={16} /> {item.province}</span>
                  <span><CalendarDays size={16} /> {item.duration}</span>
                  <span><Users size={16} /> {participants === "Qualquer número" ? "Até 12 pessoas" : participants}</span>
                  <span><Star size={16} /> {item.rating} (mock avaliações)</span>
                </div>
                <div className="reservation-footer">
                  <div>
                    <span>{formatKwanza(Math.round(item.price * 1.25))}</span>
                    <strong>{formatKwanza(item.price)}</strong>
                  </div>
                  <button>Reservar Agora</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="booking-actions">
          <article>
            <h3>Reagendar Reserva</h3>
            <p>Precisa alterar a data? Reagende facilmente suas experiências.</p>
            <button>Reagendar</button>
          </article>
          <article>
            <h3>Reserva em Grupo</h3>
            <p>Descontos especiais para grupos acima de 6 pessoas.</p>
            <button>Consultar</button>
          </article>
          <article>
            <h3>Minhas Reservas</h3>
            <p>Acesse e gerencie todas suas reservas ativas.</p>
            <button>Ver Reservas</button>
          </article>
        </div>
      </section>
    </main>
  );
}

function AirPartners() {
  const [synced, setSynced] = useState(false);

  return (
    <main className="page">
      <PageIntro
        title="Parceiros Aéreos"
        subtitle="Painel protótipo para consultar tarifas nacionais com integração GDS simulada."
        icon={<Plane size={28} />}
      />
      <section className="section gds-panel">
        <div>
          <span className="eyebrow"><ShieldCheck size={16} /> Gateway mock</span>
          <h2>Integração GDS preparada para Amadeus, Sabre e Galileo.</h2>
          <p>
            O protótipo apresenta disponibilidade, assentos, tarifa e código de rastreio, sem conectar a APIs reais.
          </p>
          <button className="primary-action" onClick={() => setSynced(true)}>
            Sincronizar tarifas <Activity size={18} />
          </button>
          {synced && <p className="success"><Check size={16} /> Tarifas mock sincronizadas há instantes.</p>}
        </div>
        <div className="flight-list">
          {flights.map((flight) => (
            <article className="flight-card" key={flight.gds}>
              <div>
                <span>{flight.airline}</span>
                <h3>{flight.route}</h3>
                <p>{flight.departure} - {flight.arrival} • {flight.cabin}</p>
              </div>
              <div>
                <strong>{formatKwanza(flight.fare)}</strong>
                <small>{flight.seats} lugares • {flight.gds}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function AirPartnersV2() {
  const availableFlights = [
    {
      airline: "TAAG",
      code: "DT 578 • Boeing 737",
      from: "LAD",
      to: "SDD",
      depart: "08:30",
      arrive: "09:45",
      oldFare: 142000,
      fare: 108500,
      services: ["Bagagem", "Lanche", "Milhas"],
    },
    {
      airline: "Fly Angola",
      code: "EQ 214 • Dash 8",
      from: "LAD",
      to: "SPP",
      depart: "10:15",
      arrive: "11:35",
      oldFare: 126000,
      fare: 97500,
      services: ["Flex", "Check-in", "Bagagem"],
    },
    {
      airline: "TAAG",
      code: "DT 451 • Airbus A220",
      from: "LAD",
      to: "NOV",
      depart: "14:20",
      arrive: "15:40",
      oldFare: 210000,
      fare: 182000,
      services: ["Executiva", "Refeição", "Prioridade"],
    },
  ];
  const partners = [
    { name: "TAAG Angola Airlines", rating: "4.5", tier: "Parceiro Gold", routes: "35 destinos", perks: ["Milhas", "Executiva", "Bagagem"] },
    { name: "Fly Angola", rating: "4.3", tier: "Parceiro Premium", routes: "12 destinos", perks: ["Flex", "Check-in", "Regional"] },
    { name: "Airlink", rating: "4.4", tier: "Parceiro Internacional", routes: "45 destinos", perks: ["Conexões", "Interline", "Bagagem"] },
  ];
  const destinations = [
    { city: "Lubango", code: "SDD", fare: 108500, img: image("Tundavala Gap.jpg", 600) },
    { city: "Saurimo", code: "VHC", fare: 97500, img: image("Kalandula Falls Pan.jpg", 600) },
    { city: "Huambo", code: "NOV", fare: 182000, img: image("Moon view (cropped).jpg", 600) },
    { city: "Cabinda", code: "CAB", fare: 129000, img: image("Mussulo, Angola.jpg", 600) },
  ];
  const roadmapMilestones = [
    { name: "Pesquisa", status: "complete", className: "air-node-1" },
    { name: "GDS", status: "complete", className: "air-node-2" },
    { name: "Tarifas", status: "in-progress", className: "air-node-3" },
    { name: "Emissão", status: "pending", className: "air-node-4" },
  ];

  return (
    <main className="page air-page">
      <PageIntro
        title="Parceiros Aéreos"
        subtitle="Conecte-se ao mundo com nossas parcerias aéreas. Sistema GDS integrado para busca e reserva de voos em tempo real com as melhores tarifas."
        icon={<Plane size={28} />}
      />
      <section className="section air-roadmap-section">
        <div className="air-roadmap-copy">
          <h2>Plano claro para voos integrados</h2>
          <p>
            Visualize o fluxo de consulta aérea: origem, GDS, comparação de tarifas e emissão simulada num painel único.
          </p>
          <div>
            <a href="#buscar-voos">Buscar voos</a>
            <a href="#gds-tech">Ver tecnologia</a>
          </div>
        </div>
        <div className="air-roadmap-map" aria-label="Roadmap de integração GDS">
          <div className="air-map-backdrop">
            <Plane size={110} />
          </div>
          <svg viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 55 330 Q 210 60 405 205 T 745 92" />
          </svg>
          {roadmapMilestones.map((milestone, index) => (
            <div className={`air-roadmap-node ${milestone.className}`} key={milestone.name}>
              <span className={milestone.status} />
              <strong>{milestone.name}</strong>
              <small>{index + 1}</small>
            </div>
          ))}
        </div>
      </section>
      <section className="section air-search-panel">
        <span className="gds-strip">Integração GDS - Amadeus | Sabre | Travelport</span>
        <div className="flight-search-card" id="buscar-voos">
          <h2><Plane size={18} /> Buscar Voos</h2>
          <p>Encontre os melhores voos com nossos parceiros aéreos</p>
          <div className="trip-tabs">
            <button>Ida e Volta</button>
            <button>Somente Ida</button>
            <button>Múltiplas Cidades</button>
          </div>
          <div className="flight-filter-grid">
            <label>
              Origem
              <input defaultValue="Luanda (LAD)" />
            </label>
            <label>
              Destino
              <input defaultValue="Lubango (SDD)" />
            </label>
            <label>
              Ida
              <input type="date" />
            </label>
            <label>
              Volta
              <input type="date" />
            </label>
            <label>
              Passageiros
              <select defaultValue="1 Passageiro">
                <option>1 Passageiro</option>
                <option>2 Passageiros</option>
                <option>Família</option>
              </select>
            </label>
          </div>
          <button className="air-search-button"><Search size={17} /> Buscar Voos</button>
        </div>
      </section>

      <section className="section air-results">
        <h2>Voos Disponíveis</h2>
        <div className="available-flights">
          {availableFlights.map((flight) => (
            <article className="available-flight-card" key={flight.code}>
              <div>
                <h3>{flight.airline}</h3>
                <span>{flight.code}</span>
              </div>
              <div className="route-times">
                <strong>{flight.depart}</strong>
                <span>{flight.from}</span>
                <small>1h 15m<br />Direto</small>
                <strong>{flight.arrive}</strong>
                <span>{flight.to}</span>
              </div>
              <div className="included-services">
                <h4>Serviços Inclusos</h4>
                {flight.services.map((service) => <span key={service}>{service}</span>)}
              </div>
              <div className="fare-box">
                <span>{formatKwanza(flight.oldFare)}</span>
                <strong>{formatKwanza(flight.fare)}</strong>
                <small>por pessoa</small>
                <button>Selecionar Voo</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section airline-partners-grid">
        <h2>Nossas Parcerias Aéreas</h2>
        <div>
          {partners.map((partner) => (
            <article key={partner.name}>
              <h3>{partner.name}</h3>
              <strong>{partner.rating}</strong>
              <p>{partner.tier}</p>
              <span>{partner.routes}</span>
              <div>{partner.perks.map((perk) => <small key={perk}>{perk}</small>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section popular-air-destinations">
        <h2>Destinos Populares</h2>
        <div>
          {destinations.map((destination) => (
            <article key={destination.code}>
              <img src={destination.img} alt={destination.city} />
              <h3>{destination.city}</h3>
              <span>{destination.code}</span>
              <small>A partir de</small>
              <strong>{formatKwanza(destination.fare)}</strong>
              <button>Ver Voos</button>
            </article>
          ))}
        </div>
      </section>

      <section className="section gds-tech" id="gds-tech">
        <h2>Sistema GDS Integrado</h2>
        <p>Tecnologia de ponta para busca e reserva de voos</p>
        <div>
          <article><Activity size={28} /><h3>Tempo Real</h3><p>Preços e disponibilidade atualizados via GDS mock.</p></article>
          <article><Globe2 size={28} /><h3>Ampla Cobertura</h3><p>Acesso simulado a companhias nacionais e internacionais.</p></article>
          <article><Ticket size={28} /><h3>Melhores Tarifas</h3><p>Comparação automática para encontrar preços competitivos.</p></article>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomeV2 />} />
        <Route path="/lazer-exterior" element={<OutdoorLeisurePage />} />
        <Route
          path="/lazer-exterior"
          element={
            <ListingPage
              title="Lazer Exterior"
              subtitle="Praias, quedas de água, escarpas e paisagens de Angola com experiências prontas para venda."
              items={outdoorExperiences}
              icon={<Sparkles size={28} />}
            />
          }
        />
        <Route path="/lazer-interior" element={<InteriorLeisurePage />} />
        <Route
          path="/lazer-interior"
          element={
            <ListingPage
              title="Lazer Interior"
              subtitle="Museus, patrimônio, gastronomia e noite cultural em Luanda com reservas simuladas."
              items={indoorExperiences}
              icon={<CalendarDays size={28} />}
            />
          }
        />
        <Route path="/vouchers" element={<Vouchers />} />
        <Route path="/compras-reservas" element={<BookingV2 />} />
        <Route path="/parceiros-aereos" element={<AirPartnersV2 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
