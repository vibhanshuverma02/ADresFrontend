"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import api from "@/lib/axios";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import HeroSection from "@/components/Discusion/HeroSection";
import Pagination from "@/components/Discusion/Pagination";
import DiscussionCarouselMerged from "@/components/Discusion/DiscussionCarousel";

const fetcher = (url: string) => api.get(url).then((r) => r.data);

interface ForumItem {
  id: string;
  title: string;
  summary: string;
  organization: string;
  logo: string | null;
  type: string | null;
  region: string | null;
  year: string | null;
  createdAt: string;
  feedbackCount: number;
  reactionCount: number;
  score: number;
  metadata: any;
}

export default function DiscussionListPage() {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;
const searchParams = useSearchParams();

useEffect(() => {
  const section = searchParams.get("section");

  if (!section) return;

  const timer = setTimeout(() => {
    const el = document.getElementById(section);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, 300);

  return () => clearTimeout(timer);
}, [searchParams]);

  // ✅ Trending — top 6 by engagement, shown in 3D carousel
  const { data: trending = [] } = useSWR<ForumItem[]>(
    "/forums/trending",
    fetcher,
    { revalidateOnFocus: false }
  );

  // ✅ All forums paginated — GET /forums?page=1&pageSize=12
  const { data, isLoading } = useSWR<{
    forums: ForumItem[];
    total: number;
    totalPages: number;
  }>(
    `/forums?page=${page}&pageSize=${PAGE_SIZE}`,
    fetcher,
    { keepPreviousData: true, revalidateOnFocus: false }
  );

  const forums = data?.forums ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <main className="w-full min-h-screen bg-[#f8f7f4]">
      {/* Hero */}
      <HeroSection />

      {/* ── Trending carousel ───────────────────────────────────────────── */}
      {trending.length > 0 && (
        <section  id="latest-discussions" className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <SectionHeading label="🔥 Latest Discussions" />
          {/* 3D carousel from existing component — pass sort="trending" */}
          <DiscussionCarouselMerged sort="trending" />
        </section>
      )}

      {/* ── Latest discussions ──────────────────────────────────────────── */}
      <section  id="discussion-list" className="max-w-7xl mx-auto px-4 md:px-8 pb-20 pt-4">
        <SectionHeading label="💬 Explore All  Discussions" />

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : forums.length === 0 ? (
          <p className="text-center py-16 text-gray-400 text-sm">
            No discussions yet — check back soon.
          </p>
        ) : (
          <>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {forums.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ForumCard item={item} />
                </motion.div>
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={(p: number) => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// Forum card
// ─────────────────────────────────────────────────────────────────
function ForumCard({ item }: { item: ForumItem }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/Resource/Discussion/${item.id}`)}
      className="group cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex flex-col overflow-hidden"
    >
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Org */}
        <div className="flex items-center gap-2">
          {item.logo ? (
            <img
              src={item.logo}
              className="w-7 h-7 rounded-full object-cover border border-gray-100"
              alt={item.organization}
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[10px] font-bold">
              {item.organization?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}
          <span className="text-xs text-gray-500 truncate">{item.organization}</span>

          {/* Resource type badge */}
          {item.type && (
            <span className="ml-auto text-[10px] bg-blue-50 text-blue-600 rounded-full px-2 py-0.5 shrink-0">
              {item.type.replace(/_/g, " ")}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
          {item.title}
        </h3>

        {/* Summary */}
        {item.summary && (
          <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed flex-1">
            {item.summary}
          </p>
        )}

        {/* Region / Year tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.region && item.region !== "ALL" && (
            <span className="text-[10px] bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
              📍 {item.region}
            </span>
          )}
          {item.year && item.year !== "ALL" && (
            <span className="text-[10px] bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
              📅 {item.year}
            </span>
          )}
        </div>

        {/* Footer stats */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex gap-3">
            <span>💬 {item.feedbackCount}</span>
            <span>👍 {item.reactionCount}</span>
          </div>
          <span>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Skeleton
// ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gray-200" />
        <div className="h-3 bg-gray-200 rounded w-28" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-2/3" />
      <div className="flex gap-2">
        <div className="h-5 bg-gray-100 rounded-full w-14" />
        <div className="h-5 bg-gray-100 rounded-full w-14" />
      </div>
      <div className="pt-3 border-t border-gray-100 flex justify-between">
        <div className="h-3 bg-gray-100 rounded w-16" />
        <div className="h-3 bg-gray-100 rounded w-20" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Section heading
// ─────────────────────────────────────────────────────────────────
function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <h2 className="text-xl font-semibold text-gray-900 whitespace-nowrap">{label}</h2>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}
