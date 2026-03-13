// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import useSWR from "swr";
// import api from "@/lib/axios";

// import DiscussionFilters from "@/components/Discusion/DiscussionFilters";
// import ResourceCard, { mapResourceToCard } from "@/components/Resourcehub/ResourceCard";
// import Pagination from "@/components/Discusion/Pagination";
// import ResourceSkeleton from "@/components/Resourcehub/ResourceSkeleton";

// const fetcher = (url: string) => api.get(url).then(r => r.data);

// export default function UnifiedResourcesPage() {
//   const searchParams = useSearchParams();
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
//     setFilters((prev) => ({
//       ...prev,
//       type: typeFromUrl,
//       page: 1,
//     }));
//   }, [typeFromUrl]);

//   const params = new URLSearchParams(
//     Object.entries(filters).map(([k, v]) => [k, String(v)])
//   ).toString();

//  const { data, isLoading } = useSWR(
//   `/outputs?${params}`,
//   fetcher,
//   {
//     keepPreviousData: true,
//     refreshInterval: (latestData) =>
//       latestData?.loading ? 1500 : 0,
//   }
// );


//   const isBackendBuilding = data?.loading === true;
//   const resources = data?.outputs ? data.outputs.map(mapResourceToCard) : [];
//   const totalPages = data?.totalPages || 1;

//   return (
//     <main className=" theme-lightdark min-h-screen bg-[var(--bg)]">

//       {/* HEADER */}
//       <section className="py-12 px-6 md:px-16">
//         <div className="max-w-7xl mx-auto space-y-6">
//           <h1 className="text-3xl md:text-4xl font-semibold">
//             {typeFromUrl.replace(/([A-Z])/g, " $1").trim()}
//           </h1>

//           <DiscussionFilters
//             filters={filters}
//             onApply={(f) => setFilters(f)}
//           />
//         </div>
//       </section>

//       {/* RESULTS */}
//       <section className="px-6 md:px-16 pb-16">
//         <div className="max-w-7xl mx-auto">

//           {(isLoading || isBackendBuilding) ? (
//             <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <ResourceSkeleton key={i} />
//               ))}
//             </div>
//           ) : resources.length === 0 ? (
//             <p className="text-center py-6">No resources found.</p>
//           ) : (
//             <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {resources.map((r) => (
//                 <ResourceCard key={r.id} item={r} />
//               ))}
//             </div>
//           )}

//           {resources.length > 0 && (
//             <div className="mt-10">
//               <Pagination
//                 page={filters.page}
//                 totalPages={totalPages}
//                 onChange={(page) =>
//                   setFilters({ ...filters, page })
//                 }
//               />
//             </div>
//           )}

//         </div>
//       </section>
//     </main>
//   );
// }
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useSWR from "swr";
import api from "@/lib/axios";
import DiscussionFilters from "@/components/Discusion/DiscussionFilters";
import ResourceSkeleton from "@/components/Resourcehub/ResourceSkeleton";
import Pagination from "@/components/Discusion/Pagination";
import { formatDistanceToNow } from "date-fns";

const fetcher = (url: string) => api.get(url).then((r) => r.data);

// ── Map raw output → display card ───────────────────────────────────────────
function mapOutputToCard(output: any) {
  return {
    id: output.id,
    title: output.title,
    summary: output.summary,
    fileUrl: output.fileUrl,
    publishedAt: output.publishedAt,
    publishType: output.publishType,
    // ✅ Forum addon — null if no discussion, { id, createdAt } if one exists
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

export default function UnifiedResourcesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeFromUrl = searchParams.get("type") || "ALL";

  const [filters, setFilters] = useState({
    publishType: "RESOURCE",
    type: typeFromUrl,
    region: "ALL",
    year: "ALL",
    clusterTag: "ALL",
    query: "",
    sort: "recent",
    page: 1,
    pageSize: 20,
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
      {/* HEADER */}
      <section className="py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-4xl font-semibold">
            {typeFromUrl.replace(/_/g, " ")}
          </h1>
          <DiscussionFilters
  filters={filters}
  onApply={(f) =>
    setFilters((prev) => ({
      ...prev,
      ...f,
      page: 1,
    }))
  }
/>

        </div>
      </section>

      {/* RESULTS */}
      <section className="px-6 md:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          {isLoading || isBackendBuilding ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <ResourceSkeleton key={i} />
              ))}
            </div>
          ) : outputs.length === 0 ? (
            <p className="text-center py-6 text-gray-500">
              No resources found.
            </p>
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

// ── Output Card ──────────────────────────────────────────────────────────────
function OutputCard({ item }: { item: ReturnType<typeof mapOutputToCard> }) {
  const router = useRouter();
  const hasForum = !!item.forum;

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Top strip — discussion badge */}
      {hasForum && (
        <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center gap-2">
          <span className="text-emerald-600 text-xs font-semibold tracking-wide uppercase">
            💬 Discussion Active
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Meta tags */}
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

        {/* Title */}
        <h2 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
          {item.title}
        </h2>

        {/* Summary */}
        {item.summary && (
          <p className="text-sm text-gray-500 line-clamp-3">{item.summary}</p>
        )}

        {/* Org + date */}
        <div className="text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100 flex justify-between">
          <span>{item.resource.organization?.name ?? ""}</span>
          {item.publishedAt && (
            <span>
              {formatDistanceToNow(new Date(item.publishedAt), {
                addSuffix: true,
              })}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-1">
          {/* View resource file */}
          <a
            href={item.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center text-sm font-medium border border-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-50 transition-colors"
          >
            View Resource
          </a>

          {/* ✅ Join / View Discussion — only shown if forum exists */}
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
