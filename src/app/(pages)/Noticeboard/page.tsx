"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import api from "@/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
  postedBy?: { user: { name: string } };
}

type FilterType = "all" | "newsletter" | "alert" | "notification";

const TYPE_META: Record<
  string,
  { label: string; bg: string; text: string; border: string; icon: string; accent: string }
> = {
  event: {
    label: "Event",
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    icon: "📅",
    accent: "bg-violet-500",
  },
  newsletter: {
    label: "Newsletter",
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    icon: "📰",
    accent: "bg-sky-500",
  },
  alert: {
    label: "Alert",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    icon: "🚨",
    accent: "bg-rose-500",
  },
  notification: {
    label: "Notification",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: "🔔",
    accent: "bg-emerald-500",
  },
};

export default function PublicNoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const type = (searchParams.get("type") || "all") as FilterType;
  const search = searchParams.get("search") || "";

  useEffect(() => {
    api
      .get("/noticeboard/public")
      .then((r) => setNotices(r.data))
      .finally(() => setLoading(false));
  }, []);

  const updateURL = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/Noticeboard?${params.toString()}`);
  };

  const filtered = notices.filter((n) => {
    const matchType = type === "all" || n.type === type;

    const matchSearch =
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());

    return matchType && matchSearch;
  });

  const counts = notices.reduce((acc, n) => {
    acc[n.type] = (acc[n.type] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-['Libre_Baskerville',serif]">

      {/* Hero */}
      <section className="bg-gray-950 text-white pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-light mb-4">Notice Board</h1>
          <p className="text-gray-400 font-sans">
            Stay informed with the latest announcements and updates.
          </p>

          <div className="flex gap-6 mt-10 flex-wrap font-sans text-sm">
            {(["event", "newsletter", "alert", "notification"] as FilterType[]).map(
              (t) => {
                const m = TYPE_META[t];
                return (
                  <div key={t} className="flex items-center gap-2 text-gray-400">
                    <span>{m.icon}</span>
                    <span>
                      {counts[t] ?? 0} {m.label}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-30 bg-white border-b px-6 py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-between">

          {/* Type buttons */}
          <div className="flex gap-2 flex-wrap font-sans">
            <button
              onClick={() => updateURL("type", "all")}
              className={`px-4 py-1.5 rounded-full text-sm border ${
                type === "all"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              All ({notices.length})
            </button>

            {(["alert",  "newsletter", "notification"] as FilterType[]).map(
              (t) => {
                const m = TYPE_META[t];
                return (
                  <button
                    key={t}
                    onClick={() => updateURL("type", t)}
                    className={`px-4 py-1.5 rounded-full text-sm border flex items-center gap-2 ${
                      type === t
                        ? `${m.bg} ${m.text} ${m.border}`
                        : "border-gray-200 text-gray-500"
                    }`}
                  >
                    {m.icon} {m.label}
                  </button>
                );
              }
            )}
          </div>

          {/* Search */}
          <input
            defaultValue={search}
            onChange={(e) => updateURL("search", e.target.value)}
            placeholder="Search notices"
            className="px-4 py-2 border rounded-full text-sm w-52"
          />
        </div>
      </section>

      {/* Notices */}
      <section className="max-w-4xl mx-auto px-6 py-12 space-y-4">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-gray-100 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>No notices found.</p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((n) => {
              const meta =
                TYPE_META[n.type] ??
                {
                  label: n.type,
                  bg: "bg-gray-50",
                  text: "text-gray-600",
                  border: "border-gray-200",
                  icon: "📌",
                  accent: "bg-gray-400",
                };

              const isExpanded = expanded === n.id;

              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border rounded-xl shadow-sm"
                >
                  <div className="flex">

                    <div className={`w-1 ${meta.accent}`} />

                    <div className="p-5 flex-1">

                      <div className="flex justify-between">

                        <div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${meta.bg} ${meta.text}`}
                          >
                            {meta.icon} {meta.label}
                          </span>

                          <h3 className="text-lg font-medium mt-2">
                            {n.title}
                          </h3>
                        </div>

                        <button
                          onClick={() =>
                            setExpanded(isExpanded ? null : n.id)
                          }
                          className="text-xs text-gray-500"
                        >
                          {isExpanded ? "Show less ▲" : "Read more ▼"}
                        </button>
                      </div>

                      {isExpanded && (
                        <p className="text-sm text-gray-600 mt-3 whitespace-pre-line">
                          {n.content}
                        </p>
                      )}

                      <div className="mt-4 text-xs text-gray-400">
                        {format(new Date(n.createdAt), "dd MMM yyyy")}
                        {n.postedBy?.user?.name &&
                          ` · ${n.postedBy.user.name}`}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </section>
    </div>
  );
}
