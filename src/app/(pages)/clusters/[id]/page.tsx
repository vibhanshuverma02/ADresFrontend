"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";import api from "@/lib/axios";
const CLUSTER_IDENTITY: Record<string, {
  emoji: string; tagline: string; description: string;
  gradient: string; accent: string; lightBg: string;
}> = {
  Mountains: {
    emoji: "⛰️",
    tagline: "Hindu Kush Himalayan Resilience",
    description: "Research and policy work focused on mountain ecosystem conservation, glacial retreat, community resilience and transboundary water in the Hindu Kush Himalayan region.",
    gradient: "from-slate-900 via-slate-800 to-slate-700",
    accent: "#94a3b8",
    lightBg: "#f1f5f9",
  },
  MHRM: {
    emoji: "🏔️",
    tagline: "Mountain Hazard & Risk Management",
    description: "Integrated approaches to managing landslides, avalanches, GLOFs and multi-hazard risks in fragile mountain environments through science, early warning and community action.",
    gradient: "from-orange-950 via-orange-900 to-amber-800",
    accent: "#fb923c",
    lightBg: "#fff7ed",
  },
  NBS: {
    emoji: "🌿",
    tagline: "Nature-Based Solutions",
    description: "Harnessing ecosystems and biodiversity to address climate adaptation, disaster risk reduction and sustainable development through nature-led interventions.",
    gradient: "from-emerald-950 via-emerald-900 to-green-800",
    accent: "#4ade80",
    lightBg: "#f0fdf4",
  },
  "Green Growth": {
    emoji: "🌱",
    tagline: "Sustainable Development Pathways",
    description: "Bridging economic development with environmental sustainability through green finance, clean technology, circular economy and low-carbon transitions.",
    gradient: "from-lime-950 via-lime-900 to-lime-800",
    accent: "#a3e635",
    lightBg: "#f7fee7",
  },
  "Water Resilience": {
    emoji: "💧",
    tagline: "Water Security & Integrated Management",
    description: "Cross-sectoral research on flood risk, drought, water governance, and integrated water resource management to build community and institutional resilience.",
    gradient: "from-cyan-950 via-cyan-900 to-sky-800",
    accent: "#38bdf8",
    lightBg: "#f0f9ff",
  },
  Training: {
    emoji: "🎓",
    tagline: "Capacity Building & Knowledge Transfer",
    description: "Structured training programmes, toolkits and learning exchanges that strengthen institutional and individual capacity across the ADRES network.",
    gradient: "from-violet-950 via-violet-900 to-purple-800",
    accent: "#c084fc",
    lightBg: "#faf5ff",
  },
};

const TYPE_LABEL: Record<string, string> = {
  RESEARCH_PAPER: "Research Paper",
  WHITE_PAPER:    "White Paper",
  POLICY_BRIEF:   "Policy Brief",
  BOOK:           "Book",
  REPORT:         "Report",
  OTHER:          "Document",
};

interface ClusterDetail {
  id: string; name: string;
  lead?: { id: string; name: string; email: string } | null;
  organizations: { organization: { id: string; name: string; logo?: string; type?: string; state?: string } }[];
  outputs: {
    id: string; title: string; publishedAt: string; publishType: string;
    forum?: { id: string } | null;
    resource?: { type: string; year: number; region: string };
  }[];
  members: {
    researcher: {
      id: string;
      user: { id: string; name: string; image?: string; designation?: string };
      coeProfile?: { id: string; organization: { name: string; logo?: string } } | null;
    };
  }[];
  _count: { outputs: number; members: number; organizations: number; activities: number };
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
});

export default function ClusterDetailPage() {
  const params                          = useParams();
  const router                          = useRouter();
  const id                              = params?.id as string;
  const [cluster, setCluster]           = useState<ClusterDetail | null>(null);
  const [loading, setLoading]           = useState(true);
  const [activeTab, setActiveTab]       = useState<"outputs" | "orgs" | "members">("outputs");

  useEffect(() => {
    if (!id) return;
    api.get(`/clusters/public/${id}`)
      .then(r => setCluster(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0f0d" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        <p className="text-slate-500 font-sans text-sm">Loading cluster…</p>
      </div>
    </div>
  );

  if (!cluster) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0f0d" }}>
      <div className="text-center">
        <p className="text-2xl text-white mb-4">Cluster not found</p>
        <Link href="/clusters" className="text-emerald-400 font-sans text-sm hover:underline">
          ← Back to all clusters
        </Link>
      </div>
    </div>
  );

  const identity = CLUSTER_IDENTITY[cluster.name] ?? {
    emoji: "🔬", tagline: "Research Cluster",
    description: "A thematic research cluster.",
    gradient: "from-slate-900 to-slate-700",
    accent: "#64748b", lightBg: "#f8fafc",
  };

  const tabs = [
    { key: "outputs",  label: `Outputs`,       count: cluster._count.outputs       },
    { key: "orgs",     label: `Organisations`,  count: cluster._count.organizations },
    { key: "members",  label: `Researchers`,    count: cluster._count.members       },
  ] as const;

  return (
    <div className="min-h-screen" style={{ background: "#0a0f0d", fontFamily: "'Georgia', serif" }}>

      {/* ── Hero ── */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${identity.gradient} pt-8 pb-16`}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <motion.div {...fade(0)} className="flex items-center gap-2 text-white/40 text-sm font-sans mb-8">
            <Link href="/clusters" className="hover:text-white transition-colors">Thematic Clusters</Link>
            <span>/</span>
            <span className="text-white/70">{cluster.name}</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <motion.span {...fade(0.05)} className="text-6xl block mb-4">{identity.emoji}</motion.span>
              <motion.h1 {...fade(0.1)}
                className="text-4xl md:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}>
                {cluster.name}
              </motion.h1>
              <motion.p {...fade(0.15)} className="text-lg mt-2 font-sans"
                style={{ color: identity.accent }}>
                {identity.tagline}
              </motion.p>
              <motion.p {...fade(0.2)} className="text-base text-white/60 mt-4 max-w-2xl font-sans leading-relaxed">
                {identity.description}
              </motion.p>
              {cluster.lead && (
                <motion.p {...fade(0.25)} className="text-sm text-white/40 font-sans mt-4">
                  Cluster Lead: <span className="text-white/70 font-medium">{cluster.lead.name}</span>
                </motion.p>
              )}
            </div>

            {/* Stats */}
            <motion.div {...fade(0.2)}
              className="flex gap-6 shrink-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-5">
              {[
                { label: "Organisations", value: cluster._count.organizations },
                { label: "Outputs",       value: cluster._count.outputs       },
                { label: "Researchers",   value: cluster._count.members       },
                { label: "Activities",    value: cluster._count.activities    },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-white/40 font-sans mt-0.5 whitespace-nowrap">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Tabs + Content ── */}
      <section className="max-w-6xl mx-auto px-6 py-10">

        {/* Tab bar */}
        <div className="flex gap-1 mb-8 bg-white/5 rounded-xl p-1 w-fit">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-sans font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-white/50 hover:text-white"
              }`}>
              {tab.label}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key ? "bg-gray-100 text-gray-600" : "bg-white/10 text-white/40"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Outputs ── */}
        {activeTab === "outputs" && (
          <motion.div {...fade(0)} className="space-y-3">
            {cluster.outputs.length === 0 ? (
              <EmptyState icon="📄" message="No published outputs in this cluster yet." />
            ) : cluster.outputs.map((output, i) => (
              <motion.div key={output.id} {...fade(i * 0.04)}
                className="group flex items-start justify-between gap-4 bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl px-6 py-5 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-sans px-2 py-0.5 rounded-full border border-white/20 ">
                      {TYPE_LABEL[output.resource?.type ?? ""] ?? output.resource?.type ?? "Document"}
                    </span>
                    {output.forum && (
                      <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-emerald-400">
                        💬 Discussion
                      </span>
                    )}
                    <span className="text-xs  font-sans">
                      {new Date(output.publishedAt).getFullYear()}
                      {output.resource?.region ? ` · ${output.resource.region}` : ""}
                    </span>
                  </div>
                  <h3 className=" font-medium font-sans leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">
                    {output.title}
                  </h3>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link href={`/Resource/${output.id}`}
                    className="text-xs font-sans px-3 py-1.5 border border-white/20 rounded-lg hover:bg-white hover:text-gray-900 transition-all">
                    View
                  </Link>
                  {output.forum && (
                    <Link href={`/Resource/Discussion/${output.forum.id}`}
                      className="text-xs font-sans px-3 py-1.5 border border-emerald-700/50 text-emerald-400 rounded-lg hover:bg-emerald-900/40 transition-all">
                      Discuss
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Organisations ── */}
        {activeTab === "orgs" && (
          <motion.div {...fade(0)}>
            {cluster.organizations.length === 0 ? (
              <EmptyState icon="🏢" message="No organisations linked to this cluster yet." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cluster.organizations.map(({ organization: org }, i) => (
                  <motion.div key={org.id} {...fade(i * 0.05)}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-sm font-bold text-white overflow-hidden">
                        {org.logo
                          ? <img src={org.logo} className="w-full h-full object-cover" alt="" />
                          : org.name?.[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium font-sans text-sm truncate">{org.name}</p>
                        {org.type && (
                          <p className="text-white/40 font-sans text-xs">{org.type}</p>
                        )}
                      </div>
                    </div>
                    {org.state && (
                      <p className="text-white/30 font-sans text-xs">📍 {org.state}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ── Members ── */}
        {activeTab === "members" && (
          <motion.div {...fade(0)}>
            {cluster.members.length === 0 ? (
              <EmptyState icon="👥" message="No researchers linked to this cluster yet." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cluster.members.map(({ researcher }, i) => (
                  <motion.div key={researcher.id} {...fade(i * 0.05)}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-sm font-bold text-white overflow-hidden">
                        {researcher.user.image
                          ? <img src={researcher.user.image} className="w-full h-full object-cover" alt="" />
                          : researcher.user.name?.[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium font-sans text-sm truncate">{researcher.user.name}</p>
                        {researcher.user.designation && (
                          <p className="text-white/40 font-sans text-xs truncate">{researcher.user.designation}</p>
                        )}
                        {researcher.coeProfile && (
                          <p className="text-white/30 font-sans text-xs truncate mt-0.5">
                            {researcher.coeProfile.organization.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </section>

      {/* ── Back link ── */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <Link href="/clusters"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white font-sans text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Thematic Clusters
        </Link>
      </div>
    </div>
  );
}

function EmptyState({ icon, message }: { icon: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <p className="text-white/30 font-sans text-sm">{message}</p>
    </div>
  );
}