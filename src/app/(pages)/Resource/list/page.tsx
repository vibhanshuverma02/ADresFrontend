
// "use client";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import useSWR from "swr";
// import api from "@/lib/axios";
// import DiscussionFilters from "@/components/Discusion/DiscussionFilters";
// import ResourceSkeleton from "@/components/Resourcehub/ResourceSkeleton";
// import Pagination from "@/components/Discusion/Pagination";
// import { formatDistanceToNow } from "date-fns";

// const fetcher = (url: string) => api.get(url).then((r) => r.data);

// // ── Map raw output → display card ───────────────────────────────────────────
// function mapOutputToCard(output: any) {
//   return {
//     id: output.id,
//     title: output.title,
//     summary: output.summary,
//     fileUrl: output.fileUrl,
//     publishedAt: output.publishedAt,
//     publishType: output.publishType,
//     // ✅ Forum addon — null if no discussion, { id, createdAt } if one exists
//     forum: output.forum ?? null,
//     resource: {
//       id: output.resource?.id,
//       type: output.resource?.type,
//       region: output.resource?.region,
//       year: output.resource?.year,
//       clusterTag: output.resource?.clusterTag,
//       organization: output.resource?.organization,
//     },
//     publishedBy: output.publishedBy?.user?.name ?? "Unknown",
//   };
// }

// export default function UnifiedResourcesPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const typeFromUrl = searchParams.get("type") || "ALL";

//   const [filters, setFilters] = useState({
//     publishType: "RESOURCE",
//     type: typeFromUrl,
//     region: "ALL",
//     year: "ALL",
//     clusterTag: "ALL",
//     query: "",
//     sort: "recent",
//     page: 1,
//     pageSize: 20,
//   });

//   useEffect(() => {
//     setFilters((prev) => ({ ...prev, type: typeFromUrl, page: 1 }));
//   }, [typeFromUrl]);

//   const params = new URLSearchParams(
//     Object.entries(filters).map(([k, v]) => [k, String(v)])
//   ).toString();

//   const { data, isLoading } = useSWR(`/outputs?${params}`, fetcher, {
//     keepPreviousData: true,
//     refreshInterval: (latest) => (latest?.loading ? 1500 : 0),
//   });

//   const isBackendBuilding = data?.loading === true;
//   const outputs: ReturnType<typeof mapOutputToCard>[] = data?.outputs
//     ? data.outputs.map(mapOutputToCard)
//     : [];
//   const totalPages = data?.totalPages || 1;

//   return (
//     <main className="theme-lightdark min-h-screen bg-[var(--bg)]">
//       {/* HEADER */}
//       <section className="py-12 px-6 md:px-16">
//         <div className="max-w-7xl mx-auto space-y-6">
//           <h1 className="text-3xl md:text-4xl font-semibold">
//             {typeFromUrl.replace(/_/g, " ")}
//           </h1>
//           <DiscussionFilters
//   filters={filters}
//   onApply={(f) =>
//     setFilters((prev) => ({
//       ...prev,
//       ...f,
//       page: 1,
//     }))
//   }
// />

//         </div>
//       </section>

//       {/* RESULTS */}
//       <section className="px-6 md:px-16 pb-16">
//         <div className="max-w-7xl mx-auto">
//           {isLoading || isBackendBuilding ? (
//             <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <ResourceSkeleton key={i} />
//               ))}
//             </div>
//           ) : outputs.length === 0 ? (
//             <p className="text-center py-6 text-gray-500">
//               No resources found.
//             </p>
//           ) : (
//             <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {outputs.map((item) => (
//                 <OutputCard key={item.id} item={item} />
//               ))}
//             </div>
//           )}

//           {outputs.length > 0 && (
//             <div className="mt-10">
//               <Pagination
//                 page={filters.page}
//                 totalPages={totalPages}
//                 onChange={(page: number) =>
//   setFilters((prev) => ({ ...prev, page }))
// }

//               />
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }

// // ── Output Card ──────────────────────────────────────────────────────────────
// function OutputCard({ item }: { item: ReturnType<typeof mapOutputToCard> }) {
//   const router = useRouter();
//   const hasForum = !!item.forum;

//   return (
//     <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//       {/* Top strip — discussion badge */}
//       {hasForum && (
//         <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center gap-2">
//           <span className="text-emerald-600 text-xs font-semibold tracking-wide uppercase">
//             💬 Discussion Active
//           </span>
//         </div>
//       )}

//       <div className="flex flex-col flex-1 p-5 gap-3">
//         {/* Meta tags */}
//         <div className="flex flex-wrap gap-2">
//           {item.resource.type && (
//             <span className="text-[11px] font-medium bg-blue-50 text-blue-700 rounded-full px-2.5 py-0.5">
//               {item.resource.type.replace(/_/g, " ")}
//             </span>
//           )}
//           {item.resource.region && item.resource.region !== "ALL" && (
//             <span className="text-[11px] font-medium bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5">
//               {item.resource.region}
//             </span>
//           )}
//           {item.resource.year && item.resource.year !== "ALL" && (
//             <span className="text-[11px] font-medium bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5">
//               {item.resource.year}
//             </span>
//           )}
//         </div>

//         {/* Title */}
//         <h2 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
//           {item.title}
//         </h2>

//         {/* Summary */}
//         {item.summary && (
//           <p className="text-sm text-gray-500 line-clamp-3">{item.summary}</p>
//         )}

//         {/* Org + date */}
//         <div className="text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100 flex justify-between">
//           <span>{item.resource.organization?.name ?? ""}</span>
//           {item.publishedAt && (
//             <span>
//               {formatDistanceToNow(new Date(item.publishedAt), {
//                 addSuffix: true,
//               })}
//             </span>
//           )}
//         </div>

//         {/* Action buttons */}
//         <div className="flex gap-2 mt-1">
//           {/* View resource file */}
//           <a
//             href={item.fileUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="flex-1 text-center text-sm font-medium border border-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-50 transition-colors"
//           >
//             View Resource
//           </a>

//           {/* ✅ Join / View Discussion — only shown if forum exists */}
//           {hasForum && (
//             <button
//               onClick={() => router.push(`/Resource/Discussion/${item.forum!.id}`)}
//               className="flex-1 text-center text-sm font-medium bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-700 transition-colors"
//             >
//               Join Discussion
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import api from "@/lib/axios";
import DiscussionFilters from "@/components/Discusion/DiscussionFilters";
import ResourceSkeleton from "@/components/Resourcehub/ResourceSkeleton";
import Pagination from "@/components/Discusion/Pagination";
import { formatDistanceToNow } from "date-fns";

const fetcher = (url: string) => api.get(url).then((r) => r.data);

/* ── Carousel images ── */
const CAROUSEL_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=85",
    label: "Climate Research",
    sub: "Scientific papers & data",
  },
  {
    src: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=900&q=85",
    label: "Policy Reports",
    sub: "IPCC & intergovernmental docs",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85",
    label: "Himalayan Glaciers",
    sub: "Cryosphere & melt studies",
  },
  {
    src: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=900&q=85",
    label: "Extreme Weather",
    sub: "Storm & flood impact reports",
  },
  {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&q=85",
    label: "Sustainable Land Use",
    sub: "Deforestation & soil reports",
  },
];



/* ── Hero Carousel ── */
function HeroCarousel() {
  const [current, setCurrent]   = useState(0);
  const [leaving, setLeaving]   = useState(false);
  const [next,    setNext]      = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (idx === current || leaving) return;
    setLeaving(true);
    setNext(idx);
    setTimeout(() => {
      setCurrent(idx);
      setLeaving(false);
      setNext(null);
    }, 600);
  };

  const advance = () => {
    const nx = (current + 1) % CAROUSEL_IMAGES.length;
    goTo(nx);
  };

  useEffect(() => {
    timerRef.current = setInterval(advance, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, leaving]);

  const img      = CAROUSEL_IMAGES[current];
  const nextImg  = next !== null ? CAROUSEL_IMAGES[next] : null;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ minHeight: "140px" }}>
      {/* Current image */}
      <img
        key={`cur-${current}`}
        src={img.src}
        alt={img.label}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: "opacity 0.6s ease, transform 0.6s ease",
          opacity: leaving ? 0 : 1,
          transform: leaving ? "scale(1.04)" : "scale(1)",
        }}
      />

      {/* Incoming image (fades in) */}
      {nextImg && (
        <img
          key={`next-${next}`}
          src={nextImg.src}
          alt={nextImg.label}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transition: "opacity 0.6s ease",
            opacity: leaving ? 1 : 0,
            zIndex: 1,
          }}
        />
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,5,0,0.75) 0%, rgba(10,5,0,0.2) 50%, transparent 100%)",
        }}
      />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-5">
        <p
          className="text-white font-bold text-base leading-tight mb-0.5"
          style={{ fontFamily: "'Georgia', serif", textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
        >
          {img.label}
        </p>
        <p className="text-white/60 text-xs" style={{ fontFamily: "sans-serif" }}>
          {img.sub}
        </p>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 right-5 z-20 flex gap-1.5">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300 pointer-events-auto"
            style={{
              width:   i === current ? "20px" : "6px",
              height:  "6px",
              background: i === current ? "#d4a96a" : "rgba(255,255,255,0.4)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="absolute top-4 right-5 z-20 text-[11px] font-bold tabular-nums"
        style={{ color: "rgba(255,255,255,0.45)", fontFamily: "sans-serif" }}
      >
        {String(current + 1).padStart(2, "0")} / {String(CAROUSEL_IMAGES.length).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ── Hero Section ── */
function ResourceHero({ typeFromUrl }: { typeFromUrl: string }) {
  const displayLabel =
    typeFromUrl === "ALL"
      ? "Resource Library"
      : typeFromUrl.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a0f00 0%, #2d1a00 40%, #1a1a2e 100%)",
      }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Ledger lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{ top: `${i * 38}px`, height: "1px", background: "#d4a96a" }}
          />
        ))}
      </div>

      {/* ── Two-column layout ── */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT — text content */}
        <div>
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-5 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(212,169,106,0.12)",
              border: "1px solid rgba(212,169,106,0.25)",
              color: "#d4a96a",
            }}
          >
            <span
              style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#d4a96a", display: "inline-block",
              }}
            />
            ADRES Knowledge Repository
          </div>

          {/* Heading */}
          <h1
            className="font-bold leading-none mb-4"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              color: "#f5ead8",
              fontFamily: "'Georgia', 'Times New Roman', serif",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
            }}
          >
            {typeFromUrl === "ALL" ? (
              <>
                A Library of<br />
                <span style={{ color: "#d4a96a" }}>Climate Knowledge</span>
              </>
            ) : (
              <>
                {displayLabel}
                <br />
                <span style={{ color: "#d4a96a", fontSize: "0.58em", fontWeight: 400 }}>
                  Resource Collection
                </span>
              </>
            )}
          </h1>

          {/* Description */}
          <p
            className="leading-relaxed mb-8"
            style={{
              color: "rgba(245,234,216,0.52)",
              fontSize: "0.975rem",
              fontFamily: "sans-serif",
              maxWidth: "480px",
            }}
          >
            {typeFromUrl === "ALL"
              ? "Explore research papers, policy documents, toolkits, and expert publications from across India's climate resilience and disaster risk reduction network."
              : `Browse the full collection of ${displayLabel.toLowerCase()} curated from leading institutions, state bodies, and knowledge partners in the ADRES network.`}
          </p>

        

          {/* CTA */}
          <button
            onClick={() => {
              document
                .getElementById("resource-results")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-3 font-semibold transition-all duration-200 group"
            style={{
              background: "rgba(212,169,106,0.15)",
              border: "1px solid rgba(212,169,106,0.35)",
              color: "#d4a96a",
              padding: "10px 24px",
              borderRadius: "999px",
              fontFamily: "sans-serif",
              fontSize: "0.875rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,169,106,0.28)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,169,106,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,169,106,0.15)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,169,106,0.35)";
            }}
          >
            Explore Resources
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16" height="16"
              viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-1"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>

        {/* RIGHT — auto-cycling carousel */}
        <div className="w-full" style={{ height: "360px" }}>
          <HeroCarousel />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg, #fff4e3d3))" }}
      />
    </section>
  );
}

/* ── Map raw output → display card ── */
function mapOutputToCard(output: any) {
  return {
    id: output.id,
    title: output.title,
    summary: output.summary,
    fileUrl: output.fileUrl,
    publishedAt: output.publishedAt,
    publishType: output.publishType,
    forum: output.forum ?? null,
    resource: {
      id: output.resource?.id,
      type: output.resource?.type,
      region: output.resource?.region,
      year: output.resource?.year,
      clusterTag: output.resource?.clusterTag,
      organization: output.resource?.organization,
    },
    publishedBy: output.publishedBy?.user?.name ?? "Unknown",
  };
}

/* ── Main Page ── */
export default function UnifiedResourcesPage() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const typeFromUrl  = searchParams.get("type") || "ALL";

  const [filters, setFilters] = useState({
    publishType: "RESOURCE",
    type:        typeFromUrl,
    region:      "ALL",
    year:        "ALL",
    clusterTag:  "ALL",
    query:       "",
    sort:        "recent",
    page:        1,
    pageSize:    20,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, type: typeFromUrl, page: 1 }));
  }, [typeFromUrl]);

  const params = new URLSearchParams(
    Object.entries(filters).map(([k, v]) => [k, String(v)])
  ).toString();

  const { data, isLoading } = useSWR(`/outputs?${params}`, fetcher, {
    keepPreviousData: true,
    refreshInterval: (latest) => (latest?.loading ? 1500 : 0),
  });

  const isBackendBuilding = data?.loading === true;
  const outputs: ReturnType<typeof mapOutputToCard>[] = data?.outputs
    ? data.outputs.map(mapOutputToCard)
    : [];
  const totalPages = data?.totalPages || 1;

  return (
    <main className="theme-lightdark min-h-screen bg-[var(--bg)]">
      {/* ── HERO ── */}
      <ResourceHero typeFromUrl={typeFromUrl} />

      {/* ── FILTERS ── */}
      <section className="px-6 md:px-16 pt-8 pb-4">
        <div className="max-w-7xl mx-auto">
          <DiscussionFilters
            filters={filters}
            onApply={(f) => setFilters((prev) => ({ ...prev, ...f, page: 1 }))}
          />
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section id="resource-results" className="px-6 md:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          {!isLoading && !isBackendBuilding && outputs.length > 0 && (
            <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
              Showing{" "}
              <span style={{ color: "var(--headline)", fontWeight: 600 }}>
                {outputs.length}
              </span>{" "}
              {typeFromUrl === "ALL"
                ? "resources"
                : typeFromUrl.replace(/_/g, " ").toLowerCase()}
            </p>
          )}

          {isLoading || isBackendBuilding ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <ResourceSkeleton key={i} />
              ))}
            </div>
          ) : outputs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-5xl mb-4">📭</span>
              <p className="font-semibold mb-1" style={{ color: "var(--headline)" }}>
                No resources found
              </p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Try adjusting the filters or search query.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {outputs.map((item) => (
                <OutputCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {outputs.length > 0 && (
            <div className="mt-10">
              <Pagination
                page={filters.page}
                totalPages={totalPages}
                onChange={(page: number) =>
                  setFilters((prev) => ({ ...prev, page }))
                }
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* ── Output Card ── */
function OutputCard({ item }: { item: ReturnType<typeof mapOutputToCard> }) {
  const router   = useRouter();
  const hasForum = !!item.forum;

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {hasForum && (
        <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center gap-2">
          <span className="text-emerald-600 text-xs font-semibold tracking-wide uppercase">
            💬 Discussion Active
          </span>
        </div>
      )}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex flex-wrap gap-2">
          {item.resource.type && (
            <span className="text-[11px] font-medium bg-blue-50 text-blue-700 rounded-full px-2.5 py-0.5">
              {item.resource.type.replace(/_/g, " ")}
            </span>
          )}
          {item.resource.region && item.resource.region !== "ALL" && (
            <span className="text-[11px] font-medium bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5">
              {item.resource.region}
            </span>
          )}
          {item.resource.year && item.resource.year !== "ALL" && (
            <span className="text-[11px] font-medium bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5">
              {item.resource.year}
            </span>
          )}
        </div>

        <h2 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
          {item.title}
        </h2>

        {item.summary && (
          <p className="text-sm text-gray-500 line-clamp-3">{item.summary}</p>
        )}

        <div className="text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100 flex justify-between">
          <span>{item.resource.organization?.name ?? ""}</span>
          {item.publishedAt && (
            <span>
              {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-1">
          <a
            href={item.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center text-sm font-medium border border-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-50 transition-colors"
          >
            View Resource
          </a>
          {hasForum && (
            <button
              onClick={() => router.push(`/Resource/Discussion/${item.forum!.id}`)}
              className="flex-1 text-center text-sm font-medium bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-700 transition-colors"
            >
              Join Discussion
            </button>
          )}
        </div>
      </div>
    </div>
  );
}