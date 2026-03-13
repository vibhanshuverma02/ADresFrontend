"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import api from "@/lib/axios";

// ─── types ────────────────────────────────────────────────────────────────────
interface GalleryItem {
  id: string; title: string; fileUrl: string; type: string; uploadedAt: string;
  coeProfile?: { organization: { id: string; name: string; logo?: string } };
}
interface CoEOption { id: string; name: string; logo?: string; }
type MediaType = "all" | "image" | "video" | "doc";

// ─── SafeImage — graceful fallback if presigned URL fails/expires ─────────────
function SafeImage({
  src, alt = "", className = "", style,
}: { src: string; alt?: string; className?: string; style?: React.CSSProperties }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        className={`bg-white/5 flex items-center justify-center text-gray-600 ${className}`}
        style={style}
      >
        <span className="text-3xl">🖼</span>
      </div>
    );
  }
  return (
    <img
      src={src} alt={alt} className={className} style={style}
      onError={() => setErrored(true)}
    />
  );
}

// ─── OrgLogo — small avatar with initial fallback ────────────────────────────
function OrgLogo({ logo, name }: { logo?: string; name: string }) {
  const [errored, setErrored] = useState(false);
  if (logo && !errored) {
    return (
      <img
        src={logo} alt="" className="w-4 h-4 rounded-full object-cover"
        onError={() => setErrored(true)}
      />
    );
  }
  return (
    <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center text-[8px] font-bold text-white">
      {name?.[0] ?? "?"}
    </div>
  );
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mediaType, setMediaType] = useState<MediaType>("all");
  const [selectedCoe, setSelectedCoe] = useState<string>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    // ✅ Backend returns fresh presigned URLs on every fetch — safe to render directly
    api.get("/gallery/public/all")
      .then((r) => setItems(r.data))
      .finally(() => setLoading(false));
  }, []);

  // Derive CoE list from fetched items — no extra API call needed
  const coeList: CoEOption[] = [];
  const seen = new Set<string>();
  items.forEach((item) => {
    const org = item.coeProfile?.organization;
    if (org && !seen.has(org.id)) {
      seen.add(org.id);
      coeList.push({ id: org.id, name: org.name, logo: org.logo });
    }
  });

  const filtered = items.filter((item) => {
    const matchType = mediaType === "all" || item.type === mediaType;
    const matchCoe  = selectedCoe === "all" || item.coeProfile?.organization?.id === selectedCoe;
    return matchType && matchCoe;
  });

  const counts = { all: items.length, image: 0, video: 0, doc: 0 };
  items.forEach((i) => { if (i.type in counts) (counts as any)[i.type]++; });

  // Close lightbox on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-['DM_Serif_Display',serif]">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[80px] rounded-full" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4 font-sans">ADRES Network</p>
          <h1 className="text-6xl sm:text-8xl font-light text-white mb-4 leading-none">Gallery</h1>
          <p className="text-gray-400 text-lg font-sans font-light max-w-xl mx-auto">
            A visual archive of research, events, and knowledge across the network.
          </p>
        </motion.div>
      </section>

      {/* ── Filters ── */}
      <section className="sticky top-0 z-30 bg-gray-950/90 backdrop-blur border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Media type tabs */}
          <div className="flex gap-1 font-sans">
            {(["all", "image", "video", "doc"] as MediaType[]).map((t) => (
              <button key={t} onClick={() => setMediaType(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  mediaType === t
                    ? "bg-amber-500 text-black"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}>
                {t === "all"   ? `All (${counts.all})` :
                 t === "image" ? `🖼️ Images (${counts.image})` :
                 t === "video" ? `🎬 Videos (${counts.video})` :
                                 `📄 Docs (${counts.doc})`}
              </button>
            ))}
          </div>

          {/* CoE filter */}
          <div className="flex items-center gap-3 font-sans">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Filter by CoE:</span>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setSelectedCoe("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  selectedCoe === "all"
                    ? "bg-white text-black border-white"
                    : "border-white/20 text-gray-400 hover:border-white/40"
                }`}>
                All CoEs
              </button>
              {coeList.map((coe) => (
                <button key={coe.id} onClick={() => setSelectedCoe(coe.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5 ${
                    selectedCoe === coe.id
                      ? "bg-white text-black border-white"
                      : "border-white/20 text-gray-400 hover:border-white/40"
                  }`}>
                  {/* ✅ OrgLogo handles broken presigned logo URLs gracefully */}
                  {coe.logo && <OrgLogo logo={coe.logo} name={coe.name} />}
                  {coe.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 animate-pulse space-y-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="rounded-xl bg-white/5 break-inside-avoid"
                style={{ height: `${[180, 240, 200, 280, 160, 220][i % 6]}px` }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-600">
            <div className="text-5xl mb-4">🖼️</div>
            <p className="font-sans">No items found for this filter.</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((item, i) => (
                <motion.div key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.4 }}
                  className="break-inside-avoid">
                  <GalleryCard
                    item={item}
                    onClick={() => item.type !== "doc" && setLightbox(item)}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div key="lightbox"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] w-full">
              {lightbox.type === "image" ? (
                // ✅ SafeImage in lightbox — shows placeholder if URL expired between
                // gallery load and lightbox open (e.g. user left tab open > 1hr)
                <SafeImage
                  src={lightbox.fileUrl}
                  alt={lightbox.title}
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <video
                  src={lightbox.fileUrl}
                  controls autoPlay playsInline
                  className="w-full rounded-xl"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-6 rounded-b-xl">
                <p className="text-white font-medium">{lightbox.title}</p>
                <p className="text-gray-400 text-sm font-sans">
                  {lightbox.coeProfile?.organization?.name}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors text-xl"
                aria-label="Close"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────────────────
function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-xl overflow-hidden bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300 ${
        item.type !== "doc" ? "cursor-pointer" : ""
      }`}
    >
      {item.type === "image" && (
        // ✅ SafeImage — shows placeholder emoji instead of broken image on expiry
        <SafeImage
          src={item.fileUrl}
          alt={item.title}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}

      {item.type === "video" && (
        <div className="relative">
          {/* Video thumbnail — browser generates from first frame */}
          <video src={item.fileUrl} className="w-full object-cover" muted playsInline preload="metadata" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white text-xl group-hover:bg-amber-500/80 transition-colors">
              ▶
            </div>
          </div>
        </div>
      )}

      {item.type === "doc" && (
        // ✅ presigned URL — clicking opens/downloads the doc in a new tab
        <a href={item.fileUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
          <div className="h-40 flex flex-col items-center justify-center gap-3 group-hover:bg-white/10 transition-colors">
            <span className="text-4xl">📄</span>
            <span className="text-xs text-gray-400 font-sans text-center px-3 line-clamp-2">
              {item.title}
            </span>
            <span className="text-xs text-amber-400 font-sans">↗ Open</span>
          </div>
        </a>
      )}

      {/* Hover overlay — only for image/video */}
      {item.type !== "doc" && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
          <p className="text-white text-sm font-medium line-clamp-1">{item.title}</p>
          {item.coeProfile?.organization && (
            <div className="flex items-center gap-1.5 mt-0.5">
              {/* ✅ OrgLogo handles broken logo gracefully in overlay too */}
              <OrgLogo
                logo={item.coeProfile.organization.logo}
                name={item.coeProfile.organization.name}
              />
              <p className="text-gray-300 text-xs font-sans">
                {item.coeProfile.organization.name}
              </p>
            </div>
          )}
          <p className="text-gray-400 text-[10px] font-sans mt-1">
            {formatDistanceToNow(new Date(item.uploadedAt), { addSuffix: true })}
          </p>
        </div>
      )}
    </div>
  );
}