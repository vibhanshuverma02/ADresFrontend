"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/lib/axios";
import { Variants } from "framer-motion"


// ── Cluster visual identity ───────────────────────────────────────────────────
const CLUSTER_IDENTITY: Record<string, {
  emoji: string;
  tagline: string;
  color: string;
  bg: string;
  border: string;
  pattern: string;
}> = {
  Mountains: {
    emoji: "⛰️",
    tagline: "Hindu Kush Himalayan ecosystem research & resilience",
    color: "#1e3a5f",
    bg: "from-slate-800 to-slate-600",
    border: "border-slate-300",
    pattern: "radial-gradient(ellipse at 80% 20%, rgba(148,163,184,0.15) 0%, transparent 60%)",
  },
  MHRM: {
    emoji: "🏔️",
    tagline: "Mountain Hazard & Risk Management across fragile terrain",
    color: "#7c2d12",
    bg: "from-orange-900 to-amber-700",
    border: "border-orange-300",
    pattern: "radial-gradient(ellipse at 20% 80%, rgba(251,191,36,0.15) 0%, transparent 60%)",
  },
  NBS: {
    emoji: "🌿",
    tagline: "Nature-Based Solutions for climate adaptation",
    color: "#14532d",
    bg: "from-emerald-900 to-green-700",
    border: "border-emerald-300",
    pattern: "radial-gradient(ellipse at 90% 10%, rgba(74,222,128,0.15) 0%, transparent 60%)",
  },
  "Green Growth": {
    emoji: "🌱",
    tagline: "Sustainable development pathways and green economy",
    color: "#365314",
    bg: "from-lime-900 to-lime-700",
    border: "border-lime-300",
    pattern: "radial-gradient(ellipse at 10% 90%, rgba(163,230,53,0.15) 0%, transparent 60%)",
  },
  "Water Resilience": {
    emoji: "💧",
    tagline: "Water security, flood risk and integrated management",
    color: "#0c4a6e",
    bg: "from-cyan-900 to-sky-700",
    border: "border-cyan-300",
    pattern: "radial-gradient(ellipse at 50% 0%, rgba(125,211,252,0.15) 0%, transparent 60%)",
  },
  Training: {
    emoji: "🎓",
    tagline: "Capacity building and knowledge transfer programmes",
    color: "#4a1d96",
    bg: "from-violet-900 to-purple-700",
    border: "border-violet-300",
    pattern: "radial-gradient(ellipse at 0% 50%, rgba(196,181,253,0.15) 0%, transparent 60%)",
  },
};

interface Cluster {
  id: string;
  name: string;
  lead?: { name: string } | null;
  _count: { organizations: number; outputs: number };
}

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

export default function ThematicClustersPublicPage() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [loading, setLoading]   = useState(true);
  const searchParams             = useSearchParams();
  const router                   = useRouter();
  const nameFilter               = searchParams.get("name"); // from navbar dropdown

  useEffect(() => {
    api.get("/clusters/public")
      .then(r => {
        const data: Cluster[] = r.data;
        setClusters(data);
        // If ?name=X in URL, navigate directly to that cluster
        if (nameFilter) {
          const match = data.find(c => c.name.toLowerCase() === nameFilter.toLowerCase());
          if (match) router.push(`/clusters/${match.id}`);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [nameFilter]);

  return (
    <div className="min-h-screen" style={{ background: "#262626", fontFamily: "'Georgia', serif" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-20 px-6">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234ade80' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-sans tracking-[0.3em] uppercase text-emerald-400 mb-6 px-4 py-1.5 border border-emerald-800 rounded-full">
              Research Clusters
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}>
              Thematic
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-black-300">
                Clusters
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
              Collaborative research clusters uniting Centres of Excellence, 
              policymakers and scientists to tackle climate, environment and resilience challenges.
            </p>
          </motion.div>

          {/* Stats bar */}
          {!loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex justify-center gap-12 mt-12">
              {[
                { label: "Active Clusters",      value: clusters.length },
                { label: "Organisations",         value: clusters.reduce((s, c) => s + c._count.organizations, 0) },
                { label: "Published Outputs",     value: clusters.reduce((s, c) => s + c._count.outputs, 0) },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-500 font-sans mt-1 tracking-wide">{s.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Cluster grid ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clusters.map((cluster, i) => {
              const identity = CLUSTER_IDENTITY[cluster.name] ?? {
                emoji: "🔬", tagline: "Research cluster",
                color: "#1e293b", bg: "from-slate-800 to-slate-700",
                border: "border-slate-600",
                pattern: "none",
              };
              return (
                <motion.div key={cluster.id}
                  custom={i} variants={fade} initial="hidden" animate="show">
                  <Link href={`/clusters/${cluster.id}`}>
                    <div className={`relative overflow-hidden rounded-2xl border ${identity.border} border-opacity-30 bg-gradient-to-br ${identity.bg} group cursor-pointer h-64 flex flex-col justify-between p-7 transition-transform duration-300 hover:-translate-y-1`}
                      style={{ boxShadow: `0 0 40px ${identity.color}22` }}>
                      {/* Pattern overlay */}
                      <div className="absolute inset-0" style={{ background: identity.pattern }} />
                      {/* Hover glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(ellipse at 50% 50%, ${identity.color}33 0%, transparent 70%)` }} />

                      <div className="relative">
                        <span className="text-4xl block mb-3">{identity.emoji}</span>
                        <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                          {cluster.name}
                        </h2>
                        <p className="text-sm text-white/60 font-sans leading-snug line-clamp-2">
                          {identity.tagline}
                        </p>
                      </div>

                      <div className="relative flex items-end justify-between">
                        <div className="flex gap-4 font-sans text-xs text-white/50">
                          <span>🏢 {cluster._count.organizations} orgs</span>
                          <span>📦 {cluster._count.outputs} outputs</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/70 group-hover:text-white transition-colors text-xs font-sans">
                          Explore
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}