// components/discussion/TrendingSidebar.tsx
"use client";
import React from "react";

export default function TrendingSidebar({ items = [] as any[] }) {
  return (
    <aside className="w-full md:w-80 space-y-4">
      <div className="p-4 rounded-lg border bg-white shadow-sm">
        <h4 className="font-semibold">Top Trending Topics</h4>
        <ol className="mt-3 space-y-2">
          {items.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="text-sm text-gray-500">Loading…</li>
              ))
            : items.map((it: any, idx: number) => (
                <li key={it.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-medium text-sm">{idx + 1}.</div>
                    <div>
                      <div className="text-sm font-medium">{it.title}</div>
                      <div className="text-xs text-gray-500">💬 {it.replies} • ❤️ {it.likes}</div>
                    </div>
                  </div>
                </li>
              ))}
        </ol>
      </div>

      <div className="p-4 rounded-lg border bg-white shadow-sm text-sm text-gray-600">
        <strong>Tip:</strong> Use filters to discover focused discussions.
      </div>
    </aside>
  );
}
