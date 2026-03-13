"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/axios";

export default function DiscussionCarouselMerged({
  sort,
}: {
  sort: "recent" | "trending";
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [sort]);

async function loadData() {
  setLoading(true);
  try {
    // ✅ Trending has its own dedicated endpoint that returns a flat array
    const url = sort === "trending" ? "/forums/trending" : "/forums?page=1&pageSize=6";
    const res = await api.get(url);

    // ✅ /forums/trending → flat array
    // ✅ /forums?page=... → { forums: [...], total, totalPages }
    let list = Array.isArray(res.data) ? res.data : (res.data?.forums ?? []);

    if (sort === "recent") {
      list = list.sort((a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    if (sort === "trending") {
      list = list.sort((a: any, b: any) => (b.score || 0) - (a.score || 0));
    }

    setItems(list.slice(0, 6));
  } catch (e) {
    console.error("Failed to load carousel", e);
  }
  setLoading(false);
}

  return (
    <div className="w-full flex flex-col items-center mt-12">

      <h3 className="text-xl font-semibold">
        {sort === "recent" ? "Recently Added Discussions" : "Trending Discussions"}
      </h3>

      {loading && <p className="mt-4 text-gray-500 text-sm">Loading…</p>}

      {!loading && items.length === 0 && (
        <p className="mt-4 text-gray-500 text-sm">
          No discussions available yet.
        </p>
      )}

      {items.length > 0 && (
        <div className="relative w-full md:w-[650px] h-[450px] perspective-1000 mt-6">
          <div className="carousel3d w-full h-full relative animate-rotate360">
            {items.map((item, index) => {
              const angle = (360 / items.length) * index;

              return (
                <div
                  key={item.id}
                  className="absolute top-1/2 left-1/2 w-[200px] h-[250px]
                  -translate-x-1/2 -translate-y-1/2
                  [backface-visibility:hidden]"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(360px)`,
                  }}
                >
                  <Link href={`/Resource/Discussion/${item.id}`}>
                    <div className="bg-white border border-gray-200
                      rounded-xl p-3 w-full h-full shadow-md
                      cursor-pointer transition-all hover:shadow-xl
                      flex flex-col justify-between">

                      {/* HEADER */}
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200">
                          {item.logo && (
                            <img
                              src={item.logo || "/resource.png"}
                              alt="logo"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        <div>
                          <p className="font-bold text-[10px] leading-tight">
                            {item.title}
                          </p>
                          <p className="text-gray-500 text-[8px]">
                            {item.organization}
                          </p>
                        </div>
                      </div>

                      {/* SUMMARY */}
                      <p className="mt-2 text-gray-600 text-[9px] line-clamp-3 leading-snug">
                        {item.summary || "No summary available."}
                      </p>

                      {/* IMAGE */}
                      <img
                        src="/Phone2.png"
                        alt="cover"
                        className="w-full h-[100px] mt-2 rounded-md object-contain"
                      />

                      {/* META */}
                      <p className="text-gray-400 text-[8px] mt-1">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>

                      <div className="flex justify-between text-[8px] text-gray-600 mt-1">
                        <span>{item.feedbackCount || 0} Comments</span>
                        <span>{item.reactionCount || 0} Likes</span>
                        <span>{item.score || 0} Views</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes rotate360 {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(-360deg); }
        }

        .animate-rotate360 {
          animation: rotate360 28s linear infinite;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}