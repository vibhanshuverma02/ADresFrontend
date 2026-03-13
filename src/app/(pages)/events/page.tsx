"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import Link from "next/link";
import api from "@/lib/axios";

// ─── types ────────────────────────────────────────────────────────────────────
interface UpcomingEvent {
  id: string; title: string; date: string; location?: string;
  description?: string; category: "MAJOR" | "MINOR";
  organization: { id: string; name: string; logo?: string };
}
interface PastEvent {
  id: string; title: string; date: string; location?: string;
  description?: string; category?: string;
  organization: { id: string; name: string; logo?: string };
  photos: { id: string; fileUrl: string }[];
  abstract: { id: string; title: string; fileUrl: string; summary?: string } | null;
}
type Tab = "upcoming" | "past";
type Category = "ALL" | "MAJOR" | "MINOR";

// ─── SafeImage — graceful fallback if presigned URL fails ─────────────────────
function SafeImage({
  src, alt = "", className = "",
}: { src: string; alt?: string; className?: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center text-gray-300 ${className}`}>
        <span className="text-2xl">🖼</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setErrored(true)} />;
}

// ─── OrgLogo — small avatar with initial fallback ────────────────────────────
function OrgLogo({ logo, name, size = "w-7 h-7" }: { logo?: string; name: string; size?: string }) {
  const [errored, setErrored] = useState(false);
  if (logo && !errored) {
    return (
      <img
        src={logo}
        className={`${size} rounded-full object-cover border border-gray-100`}
        alt=""
        onError={() => setErrored(true)}
      />
    );
  }
  return (
    <div className={`${size} rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500`}>
      {name?.[0] ?? "?"}
    </div>
  );
}

export default function EventsPage() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const [category, setCategory] = useState<Category>("ALL");
  const [search, setSearch] = useState("");
  const [upcoming, setUpcoming] = useState<UpcomingEvent[]>([]);
  const [past, setPast] = useState<PastEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Backend returns fresh presigned URLs on every fetch — safe to use directly
    Promise.all([
      api.get("/events/public"),
      api.get("/events/public/past"),
    ]).then(([u, p]) => {
      setUpcoming(u.data);
      setPast(p.data);
    }).finally(() => setLoading(false));
  }, []);

  const filteredUpcoming = upcoming.filter((e) => {
    const matchCat = category === "ALL" || e.category === category;
    const matchSearch =
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.organization.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredPast = past.filter((e) => {
    const matchCat = category === "ALL" || e.category === category;
    const matchSearch =
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.organization?.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // First major event in the upcoming list (used for featured card)
  const firstMajorId = filteredUpcoming.find((e) => e.category === "MAJOR")?.id;

  return (
    <div className="min-h-screen bg-white font-['Cormorant_Garamond',serif]">
      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-[url('/events/image1.png')]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <motion.div
          className="relative z-10 h-full flex flex-col justify-end pb-16 px-8 lg:px-24"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-3 font-sans">
            ADRES Network
          </p>
          <h1 className="text-white text-5xl sm:text-7xl font-light leading-none mb-6">
            Events
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setTab("upcoming")}
              className="px-6 py-2 border border-white/70 text-white text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300 font-sans"
            >
              UPCOMING
            </button>
            <Link
              href="/gallery"
              className="px-6 py-2 border border-white/70 text-white text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300 font-sans"
            >
              GALLERY
            </Link>
          </div>
        </motion.div>
        <div className="absolute right-24 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />
      </section>

      {/* ── Filter Bar ── */}
      <section className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Tabs */}
          <div className="flex gap-0 border border-gray-200 rounded-lg overflow-hidden">
            {(["upcoming", "past"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-6 py-2 text-sm font-medium font-sans transition-colors ${
                  tab === t ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"
                }`}>
                {t === "upcoming" ? "Upcoming" : "Past Events"}
              </button>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap items-center">
            {/* Category filter */}
            <div className="flex gap-1 border border-gray-200 rounded-lg overflow-hidden font-sans text-sm">
              {(["ALL", "MAJOR", "MINOR"] as Category[]).map((c) => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-4 py-2 transition-colors ${
                    category === c ? "bg-amber-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}>
                  {c === "ALL" ? "All" : c === "MAJOR" ? "🔴 Major" : "🔵 Minor"}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative font-sans">
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events…"
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 w-56"
              />
            </div>
            <span className="text-sm text-gray-400 font-sans">
              {tab === "upcoming" ? filteredUpcoming.length : filteredPast.length} results
            </span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <AnimatePresence mode="wait">
            {tab === "upcoming" ? (
              <motion.div key="upcoming"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                {filteredUpcoming.length === 0 ? (
                  <EmptyState message="No upcoming events found." />
                ) : (
                  <div className="space-y-8">
                    {/* Featured — first MAJOR event */}
                    {filteredUpcoming
                      .filter((e) => e.category === "MAJOR")
                      .slice(0, 1)
                      .map((e) => <FeaturedEventCard key={e.id} event={e} />)
                    }
                    {/* Remaining events in grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredUpcoming
                        .filter((e) => e.id !== firstMajorId)
                        .map((e) => <UpcomingEventCard key={e.id} event={e} />)
                      }
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div key="past"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                {filteredPast.length === 0 ? (
                  <EmptyState message="No past events found." />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPast.map((e) => <PastEventCard key={e.id} event={e} />)}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="bg-gray-950 text-white py-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4 font-sans">Stay Connected</p>
          <h2 className="text-4xl font-light mb-4">Never Miss an Event</h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto mb-8 font-sans font-light">
            Subscribe to receive notifications about upcoming research events, webinars, and training opportunities.
          </p>
          <div className="flex gap-4 justify-center flex-wrap font-sans">
            <button className="px-8 py-3 bg-amber-500 text-black text-sm font-medium tracking-wider hover:bg-amber-400 transition-colors">
              SUBSCRIBE TO UPDATES
            </button>
            <Link href="/gallery"
              className="px-8 py-3 border border-white/30 text-white text-sm tracking-wider hover:bg-white/10 transition-colors">
              VIEW GALLERY
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// ─── Featured Event Card (large horizontal) ───────────────────────────────────
function FeaturedEventCard({ event }: { event: UpcomingEvent }) {
  const daysLeft = Math.ceil(
    (new Date(event.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="relative border border-amber-200 bg-amber-50/30 rounded-2xl overflow-hidden flex flex-col md:flex-row"
    >
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest font-sans">
          MAJOR EVENT
        </span>
      </div>
      <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4 mt-6">
            <OrgLogo logo={event.organization.logo} name={event.organization.name} size="w-8 h-8" />
            <span className="text-sm text-gray-500 font-sans">{event.organization.name}</span>
          </div>
          <h2 className="text-3xl font-light text-gray-900 leading-snug mb-4">{event.title}</h2>
          {event.description && (
            <p className="text-gray-500 text-base font-sans font-light line-clamp-3 mb-6">
              {event.description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-6 items-center font-sans text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">📅</span>
            {format(new Date(event.date), "EEEE, dd MMMM yyyy")}
          </div>
          <div className="flex items-center gap-2">
            <span>🕐</span>
            {format(new Date(event.date), "hh:mm a")}
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <span>📍</span>{event.location}
            </div>
          )}
          <span className="ml-auto bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
            {daysLeft > 0 ? `${daysLeft} days to go` : "Today!"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Regular Upcoming Event Card ──────────────────────────────────────────────
function UpcomingEventCard({ event }: { event: UpcomingEvent }) {
  const daysLeft = Math.ceil(
    (new Date(event.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  return (
    <motion.div
      whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden flex flex-col"
    >
      <div className={`h-1 w-full ${event.category === "MAJOR" ? "bg-amber-400" : "bg-blue-400"}`} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <OrgLogo logo={event.organization.logo} name={event.organization.name} />
            <span className="text-xs text-gray-400 font-sans truncate max-w-[140px]">
              {event.organization.name}
            </span>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full font-sans ${
            event.category === "MAJOR" ? "bg-amber-100 text-amber-700" : "bg-blue-50 text-blue-600"
          }`}>
            {event.category}
          </span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 leading-snug mb-3 line-clamp-2">
          {event.title}
        </h3>
        {event.description && (
          <p className="text-sm text-gray-500 font-sans font-light line-clamp-2 mb-4 flex-1">
            {event.description}
          </p>
        )}
        <div className="mt-auto space-y-2 font-sans text-xs text-gray-500 border-t border-gray-50 pt-4">
          <div className="flex items-center gap-2">
            <span>📅</span> {format(new Date(event.date), "dd MMM yyyy · hh:mm a")}
          </div>
          {event.location && (
            <div className="flex items-center gap-2"><span>📍</span>{event.location}</div>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="text-amber-600 font-medium">
              {daysLeft > 0 ? `${daysLeft}d remaining` : "Today!"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Past Event Card ──────────────────────────────────────────────────────────
function PastEventCard({ event }: { event: PastEvent }) {
  // ✅ presigned URL from API — valid at render time
  const coverPhoto = event.photos?.[0]?.fileUrl;

  return (
    <motion.div
      whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden flex flex-col"
    >
      {/* Cover photo or placeholder */}
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        {coverPhoto ? (
          <SafeImage
            src={coverPhoto}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">🏛</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-3 left-3 text-white text-xs font-sans font-medium bg-black/40 px-2 py-1 rounded-full">
          Past Event
        </span>
        {event.category && (
          <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full font-sans ${
            event.category === "MAJOR" ? "bg-amber-400 text-white" : "bg-blue-100 text-blue-700"
          }`}>
            {event.category}
          </span>
        )}
        {event.photos?.length > 1 && (
          <span className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full font-sans">
            📷 {event.photos.length}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <OrgLogo logo={event.organization?.logo} name={event.organization?.name ?? ""} size="w-6 h-6" />
          <span className="text-xs text-gray-400 font-sans">{event.organization?.name}</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 leading-snug mb-2 line-clamp-2">
          {event.title}
        </h3>
        <div className="flex flex-wrap gap-3 font-sans text-xs text-gray-500 mb-4">
          <span>📅 {format(new Date(event.date), "dd MMM yyyy")}</span>
          {event.location && <span>📍 {event.location}</span>}
        </div>
        {event.description && (
          <p className="text-sm text-gray-500 font-sans font-light line-clamp-2 mb-4">
            {event.description}
          </p>
        )}

        {/* Resources */}
        <div className="mt-auto space-y-2 border-t border-gray-50 pt-4">
          {/* Photo thumbnails — clicking opens presigned URL in new tab */}
          {event.photos?.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {event.photos.map((p, i) => (
                <a key={p.id} href={p.fileUrl} target="_blank" rel="noreferrer">
                  <SafeImage
                    src={p.fileUrl}
                    alt={`Photo ${i + 1}`}
                    className="w-14 h-10 object-cover rounded-lg border border-gray-100 hover:opacity-80 transition-opacity"
                  />
                </a>
              ))}
            </div>
          )}

          {/* Abstract download link — presigned URL opens/downloads doc */}
          {event.abstract && (
            <a
              href={event.abstract.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 font-sans transition-colors"
            >
              <span>📄</span>
              <span className="truncate">{event.abstract.title}</span>
              <span className="ml-auto shrink-0">↗</span>
            </a>
          )}

          {!event.abstract && event.photos?.length === 0 && (
            <p className="text-xs text-gray-300 font-sans italic">No resources attached yet</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────
function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-24 text-gray-400">
      <div className="text-5xl mb-4">📭</div>
      <p className="font-sans text-base">{message}</p>
    </div>
  );
}
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-2xl bg-gray-100 h-64" />
      ))}
    </div>
  );
}