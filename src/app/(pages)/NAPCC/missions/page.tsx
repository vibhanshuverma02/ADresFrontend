"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sun, Zap, Building2, Droplets, Mountain,
  Leaf, Sprout, Brain, ChevronRight, ExternalLink, ArrowUp,
} from "lucide-react";

/* ─────────────────────────────────────────────
   IMAGE SLIDESHOW COMPONENT
───────────────────────────────────────────── */
function MissionImageSlider({
  images,
  color,
  accent,
}: {
  images: { src: string; alt: string }[];
  color: string;
  accent: string;
}) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFading(false);
      }, 400);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full min-h-[260px] overflow-hidden">
      <img
        key={current}
        src={images[current].src}
        alt={images[current].alt}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: fading ? 0 : 1 }}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            `https://placehold.co/400x300/1e3a5f/ffffff?text=${encodeURIComponent(images[current].alt)}`;
        }}
      />
      {/* gradient: dark at bottom for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${accent}ee 0%, ${accent}55 45%, transparent 100%)`,
        }}
      />
      {/* dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "18px" : "6px",
              height: "6px",
              background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
            }}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MISSION DATA  (sourced from official NAPCC FAQ)
───────────────────────────────────────────── */
const missions = [
  {
    id: "green-india",
    index: "01",
    title: "National Mission for a Green India",
    short: "Green India",
    icon: Leaf,
    color: "#4ade80",
    bg: "bg-pastel-mint",
    accent: "#166534",
    tag: "Forests & Biodiversity",
    images: [
  { src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80", alt: "Dense green forest — Green India Mission" },
  { src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80", alt: "Tree planting afforestation" },
],
    website: "http://www.jkforest.gov.in/pdf/gim/GIM_Mission-Document-1.pdf",
    websiteLabel: "GIM Mission Document",
    lead: "Ministry of Environment, Forest and Climate Change",
    summary:
      "Approved as a Centrally Sponsored Scheme, the Green India Mission (GIM) places 'greening' at the heart of climate change adaptation and mitigation — enhancing ecosystem services, carbon sequestration, hydrological balance, and biodiversity.",
    objectives: [
      "Increase forest/tree cover on 5 mha of forest/non-forest lands and improve quality on another 5 mha (total 10 mha)",
      "Improve ecosystem services including biodiversity, hydrological services and carbon sequestration on 10 mha",
      "Increase forest-based livelihood income of ~3 million households living in and around forests",
      "Enhance annual CO₂ sequestration by 50–60 million tonnes by 2020",
    ],
    relatedLinks: [
      { label: "PIB Press Release", href: "https://pib.gov.in/newsite/PrintRelease.aspx?relid=103978" },
      { label: "DST Climate Programme", href: "https://dst.gov.in/climate-change-programme" },
    ],
  },
  {
    id: "energy-efficiency",
    index: "02",
    title: "National Mission for Enhanced Energy Efficiency",
    short: "Energy Efficiency",
    icon: Zap,
    color: "#facc15",
    bg: "bg-pastel-peach",
    accent: "#854d0e",
    tag: "Energy & Industry",
    images: [
  { src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80", alt: "Energy efficient lighting — NMEEE" },
  { src: "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?w=800&q=80", alt: "Industrial energy plant" },
],
    website: "https://vikaspedia.in/energy/policy-support/energy-efficiency/national-mission-for-enhanced-energy-efficiency",
    websiteLabel: "NMEEE on Vikaspedia",
    lead: "Bureau of Energy Efficiency (BEE), Ministry of Power",
    summary:
      "NMEEE aims to strengthen the market for energy efficiency by fostering innovative and sustainable business models. Implemented since 2011, it covers four key initiatives targeting energy-intensive industries.",
    objectives: [
      "Perform, Achieve and Trade (PAT) — market-based mechanism to enhance energy efficiency",
      "Market Transformation for Energy Efficiency (MTEE) — accelerate shift to energy-efficient appliances",
      "Energy Efficiency Financing Platform (EEFP) — facilitate financing for energy efficiency projects",
      "Framework for Energy Efficient Economic Development (FEEED) — fiscal instruments to promote energy efficiency",
    ],
    relatedLinks: [
      { label: "PIB: NMEEE Update", href: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1744431" },
      { label: "BEE India", href: "https://beeindia.gov.in/" },
    ],
  },
  {
    id: "himalayan-ecosystem",
    index: "03",
    title: "National Mission for Sustaining the Himalayan Ecosystem",
    short: "Himalayan Ecosystem",
    icon: Mountain,
    color: "#93c5fd",
    bg: "bg-pastel-sky",
    accent: "#1e3a5f",
    tag: "Glaciers & Biodiversity",
    images: [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", alt: "Himalayan mountain glacier" },
  { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80", alt: "Himalayan ecosystem biodiversity" },
],
    website: "http://dst.gov.in/sites/default/files/NMSHE_June_2010.pdf",
    websiteLabel: "NMSHE Mission Document",
    lead: "Department of Science & Technology (DST)",
    summary:
      "This mission aims to prevent melting of Himalayan glaciers and protect biodiversity in the Himalayan region by rapidly building national capacities in knowledge, institutions, and evidence-based governance.",
    objectives: [
      "Build human and knowledge capacities for glacier and ecosystem monitoring",
      "Strengthen institutional capacities for Himalayan research and governance",
      "Develop capacities for evidence-based policy building at regional scale",
      "Enable continuous self-learning balancing forces of Nature with human actions",
    ],
    relatedLinks: [
      { label: "DST Climate Change Programme", href: "https://dst.gov.in/climate-change-programme" },
      { label: "G.B. Pant National Himalayan Institute", href: "https://gbpihed.gov.in/" },
    ],
  },
  {
    id: "sustainable-agriculture",
    index: "04",
    title: "National Mission for Sustainable Agriculture",
    short: "Sustainable Agriculture",
    icon: Sprout,
    color: "#86efac",
    bg: "bg-pastel-sage",
    accent: "#14532d",
    tag: "Agriculture & Food Security",
    images: [
  { src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80", alt: "Sustainable farming India" },
  { src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80", alt: "Green agricultural fields India" },
],
    website: "https://nmsa.dac.gov.in/",
    websiteLabel: "NMSA Official Portal",
    lead: "Ministry of Agriculture & Farmers Welfare",
    summary:
      "Operational since 2014-15, NMSA makes agriculture more productive, sustainable, remunerative, and climate-resilient through integrated farming systems, soil health management, and efficient water use.",
    objectives: [
      "Promote location-specific integrated/composite farming systems",
      "Implement soil and moisture conservation and comprehensive soil health management",
      "Enhance water use efficiency through drip/sprinkler irrigation (Farm Water Management)",
      "Provide Soil Health Cards to all farmers with nutrient status and dosage recommendations",
    ],
    relatedLinks: [
      { label: "PIB: NMSA", href: "https://pib.gov.in/PressReleasePage.aspx?PRID=1556469" },
      { label: "PMKSY (Per Drop More Crop)", href: "https://pmksy.gov.in/" },
    ],
  },
  {
    id: "strategic-knowledge",
    index: "05",
    title: "National Mission on Strategic Knowledge for Climate Change",
    short: "Strategic Knowledge",
    icon: Brain,
    color: "#c4b5fd",
    bg: "bg-pastel-lavender",
    accent: "#4c1d95",
    tag: "Research & Knowledge",
    images: [
  { src: "https://adresnetwork.iitr.ac.in/vision1.png", alt: "ADRES Network" },
  { src: "https://adresnetwork.iitr.ac.in/india-silhouette.png", alt: "Research professionals" },
],
    website: "https://dst.gov.in/sites/default/files/NMSKCC_mission%20document%201.pdf",
    websiteLabel: "NMSKCC Mission Document",
    lead: "Department of Science & Technology (DST)",
    summary:
      "NMSKCC builds a vibrant knowledge system to inform and support national action for ecologically sustainable development — spanning climate science, regional modelling, adaptation strategies, and global technology foresight.",
    objectives: [
      "Establish at least 10 thematic knowledge networks in climate science, regional modelling, and adaptation strategies",
      "Produce 10–12 technical reports on climate change adaptation, mitigation, and impact areas",
      "Create regional and disaggregated climate models accounting for tropical physics and Indian monsoon dynamics",
      "Train ~200 climate change research professionals and establish 50 Chair professorships",
      "Develop at least 3 viable Public-Private Partnerships in adaptation and mitigation technologies",
    ],
    relatedLinks: [
      { label: "DST Climate Change Programme", href: "https://dst.gov.in/climate-change-programme" },
      { label: "India Climate Portal", href: "https://www.indiaclimateportal.org/" },
      { label: "ADRES network", href: "https://adresnetwork.iitr.ac.in/" },
    ],
  },
  {
    id: "sustainable-habitat",
    index: "06",
    title: "National Mission on Sustainable Habitat",
    short: "Sustainable Habitat",
    icon: Building2,
    color: "#fda4af",
    bg: "bg-pastel-coral",
    accent: "#9f1239",
    tag: "Urban & Infrastructure",
    images: [
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80", alt: "Sustainable urban city" },
  { src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80", alt: "Smart city urban infrastructure" },
],
    website: "http://cpheeo.gov.in/cms/national-mission-on-sustainable-habitat.php",
    websiteLabel: "CPHEEO: Mission Details",
    lead: "Ministry of Housing and Urban Affairs",
    summary:
      "Approved in June 2010, this Mission promotes sustainable urban development addressing climate change through habitat standards, city development plans, and comprehensive mobility strategies.",
    objectives: [
      "Develop sustainable habitat standards aligned with robust climate-resilient development strategies",
      "Prepare city development plans that comprehensively address adaptation and mitigation concerns",
      "Create comprehensive mobility plans for energy-efficient and cost-effective urban transport",
      "Build institutional capacity for climate-relevant urban planning and governance",
    ],
    relatedLinks: [
      { label: "Smart Cities Mission", href: "https://smartcities.gov.in/" },
      { label: "MoHUA", href: "https://mohua.gov.in/" },
    ],
  },
  {
    id: "solar-mission",
    index: "07",
    title: "National Solar Mission",
    short: "Solar Mission",
    icon: Sun,
    color: "#fbbf24",
    bg: "bg-pastel-peach",
    accent: "#78350f",
    tag: "Renewable Energy",
    images: [
  { src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80", alt: "Solar panel farm" },
  { src: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80", alt: "Rooftop solar renewable energy" },
],
    website: "https://mnre.gov.in/solar/schemes",
    websiteLabel: "MNRE Solar Schemes",
    lead: "Ministry of New and Renewable Energy (MNRE)",
    summary:
      "Launched in January 2010, NSM establishes India as a global leader in solar energy by creating policy conditions for solar diffusion across the country. The target was upscaled from 20 GW to 100 GW by 2022.",
    objectives: [
      "Establish India as a global leader in solar energy through policy-driven diffusion",
      "Phase 1 (up to 2012-13): Enable solar technology penetration at centralized and decentralized levels",
      "Phase 2 (2013-17) & Phase 3 (2017-22): Scale manufacturing and achieve grid parity",
      "Grid-connected solar power grew from 25 MW (2010-11) to 36.32 GW (October 2020), with 58.31 GW under development",
    ],
    relatedLinks: [
      { label: "PIB: NSM Launch", href: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1685046" },
      { label: "MNRE Portal", href: "https://mnre.gov.in/" },
    ],
  },
  {
    id: "water-mission",
    index: "08",
    title: "National Water Mission",
    short: "Water Mission",
    icon: Droplets,
    color: "#67e8f9",
    bg: "bg-pastel-sky",
    accent: "#164e63",
    tag: "Water Resources",
    images: [
  { src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80", alt: "River waterfall water conservation" },
  { src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80", alt: "Dam reservoir water mission" },
],
    website: "http://nwm.gov.in/",
    websiteLabel: "NWM Official Portal",
    lead: "Ministry of Jal Shakti",
    summary:
      "NWM ensures integrated water resource management — conserving water, minimising wastage, and ensuring equitable distribution. It targets a 20% improvement in water use efficiency through regulatory mechanisms.",
    objectives: [
      "Build a comprehensive water database in the public domain and assess climate change impacts on water resources",
      "Promote citizen and state actions for water conservation, augmentation and preservation",
      "Provide focused attention to vulnerable and over-exploited areas",
      "Increase water use efficiency by 20% through differential entitlements and pricing",
      "Promote basin-level integrated water resources management",
    ],
    relatedLinks: [
      { label: "NWM Portal", href: "http://nwm.gov.in/" },
      { label: "Jal Shakti Ministry", href: "https://jalshakti-dowr.gov.in/" },
    ],
  },
];

/* ─────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────── */
export default function NAPCCMissionsPage() {
  const [active, setActive] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  /* scroll-spy */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-navy text-white py-20 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5 text-white select-none"
          style={{ fontSize: "22rem", lineHeight: 1, fontWeight: 900 }}
        >
          ☸
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6 font-medium tracking-wide">
            <span>NAPCC</span>
            <ChevronRight size={14} />
            <span className="text-white">Eight National Missions</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-white/20">
            Government of India · Ministry of Environment, Forest and Climate Change
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
            National Action Plan<br />
            <span style={{ color: "#7dd3fc" }}>on Climate Change</span>
          </h1>
          <p className="text-white/70 max-w-2xl text-lg leading-relaxed mb-8">
            Launched on <strong className="text-white">30th June 2008</strong> by the Prime Minister, NAPCC outlines India's national strategy to adapt to climate change and enhance ecological sustainability. Its eight National Missions form the core of this strategy.
          </p>
          <a
            href="https://static.pib.gov.in/WriteReadData/specificdocs/documents/2021/dec/doc202112101.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-navy font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/90 transition-all"
          >
            <ExternalLink size={15} />
            Read Official NAPCC Document
          </a>
        </div>
      </section>

      {/* ── STICKY MISSION NAV ── */}
      <nav className="sticky top-0 z-40 bg-background border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-0 overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {missions.map((m) => {
              const Icon = m.icon;
              const isActive = active === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => scrollTo(m.id)}
                  className={`flex items-center gap-1.5 px-3 py-3 text-xs font-semibold rounded-none border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  <Icon size={13} />
                  {m.short}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── MISSION SECTIONS ── */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        {missions.map((mission, idx) => {
          const Icon = mission.icon;
          const isEven = idx % 2 === 0;

          return (
            <section
              key={mission.id}
              id={mission.id}
              ref={(el) => { sectionRefs.current[mission.id] = el; }}
              className="scroll-mt-16 rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* colored top bar */}
              <div className="h-1.5 w-full" style={{ background: mission.color }} />

              <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>

                {/* ── IMAGE PANEL ── */}
                <div className="relative lg:w-64 xl:w-72 shrink-0 overflow-hidden" style={{ minHeight: "260px" }}>
                  <MissionImageSlider
                    images={mission.images}
                    color={mission.color}
                    accent={mission.accent}
                  />

                  {/* overlaid icon badge + tag + number */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 pointer-events-none z-10">
                    {/* watermark number */}
                    <span
                      className="absolute top-3 left-3 text-5xl font-black select-none"
                      style={{ color: "rgba(255,255,255,0.3)", lineHeight: 1 }}
                    >
                      {mission.index}
                    </span>
                    {/* icon badge */}
                    <div
                      className="pointer-events-auto mb-2 p-3 rounded-xl shadow-lg backdrop-blur-sm"
                      style={{
                        background: "rgba(0,0,0,0.35)",
                        border: `1.5px solid ${mission.color}`,
                      }}
                    >
                      <Icon size={26} color={mission.color} strokeWidth={1.6} />
                    </div>
                    {/* tag pill */}
                    <span
                      className="pointer-events-auto text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(0,0,0,0.5)",
                        color: mission.color,
                        border: `1px solid ${mission.color}55`,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {mission.tag}
                    </span>
                  </div>
                </div>

                {/* ── CONTENT ── */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="mb-5">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">
                      Mission {mission.index}
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-1">
                      {mission.title}
                    </h2>
                    <p className="text-xs text-muted-foreground font-medium">
                      Lead: <span className="text-foreground">{mission.lead}</span>
                    </p>
                  </div>

                  <p
                    className="text-sm text-muted-foreground leading-relaxed mb-5 border-l-2 pl-3"
                    style={{ borderColor: mission.color }}
                  >
                    {mission.summary}
                  </p>

                  <div className="mb-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                      Key Objectives & Deliverables
                    </h3>
                    <ul className="space-y-2">
                      {mission.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span
                            className="mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                            style={{ background: mission.color + "33", color: mission.accent }}
                          >
                            {i + 1}
                          </span>
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    <a
                      href={mission.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all hover:opacity-80"
                      style={{
                        background: mission.color + "22",
                        borderColor: mission.color + "55",
                        color: mission.accent,
                      }}
                    >
                      <ExternalLink size={11} />
                      {mission.websiteLabel}
                    </a>
                    {mission.relatedLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                      >
                        <ExternalLink size={10} />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* ── PRINCIPLES FOOTER CARD ── */}
        <section className="rounded-2xl bg-card text-foreground p-8 mt-10 border border-border">
          <h2 className="text-xl font-bold mb-3">Principles of NAPCC</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Protecting the poor through inclusive and sustainable development sensitive to climate change",
              "Achieving national growth and poverty alleviation while ensuring ecological sustainability",
              "Efficient and cost-effective end-use demand-side management strategies",
              "Accelerated deployment of technologies for adaptation and mitigation",
              "New and innovative market, regulatory, and voluntary mechanisms for sustainable development",
              "Effective implementation through civil society, LGUs, and public-private partnerships",
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-secondary text-foreground flex items-center justify-center text-[10px] font-bold">
                  {i + 1}
                </span>
                {p}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-border flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-muted-foreground">
              Source: NAPCC FAQ, Ministry of Environment, Forest and Climate Change · December 2021
            </p>
            <a
              href="https://static.pib.gov.in/WriteReadData/specificdocs/documents/2021/dec/doc202112101.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink size={11} /> Full Document (PDF)
            </a>
          </div>
        </section>
      </main>

      {/* ── BACK TO TOP ── */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all animate-fade-in-up"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </div>
  );
}