"use client";

export type ResourceCard = {
  id: string;
  title: string;
  summary: string;
  fileUrl: string;
  type: string;
  year: string;
  region: string;
  clusterTag: string;
  organization: string;
};

export function mapResourceToCard(item: any): ResourceCard {
  return {
    id: item?.id,
    title: item?.title || item?.resource?.title || "Untitled Resource",
    summary: item?.summary || "",
    fileUrl: item?.fileUrl || "",
    type: item?.resource?.type || "",
    year: item?.resource?.year || "",
    region: item?.resource?.region || "",
    clusterTag: item?.resource?.clusterTag || "",
    organization: item?.resource?.organization?.name || "",
  };
}
export default function ResourceCard({ item }: { item: ResourceCard }) {
  return (
    <a
      href={item.fileUrl}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="timeline-card block p-6 transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 items-center">
        {/* LEFT: CONTENT */}
        <div className="md:col-span-2 space-y-3">
          {/* TITLE */}
          <h3 className="timeline-title text-xl font-semibold">
            {item.title}
          </h3>

          {/* DESCRIPTION */}
          {item.summary && (
            <p className="timeline-description text-sm leading-relaxed">
              {item.summary}
            </p>
          )}

          {/* META */}
          <div className="text-sm text-gray-600 flex flex-wrap gap-3 mt-2">
            {item.type && <span>📄 {item.type}</span>}
            {item.organization && <span> {item.organization}</span>}
            {item.year && <span> {item.year}</span>}
          </div>
        </div>

        {/* RIGHT: DOWNLOAD PREVIEW */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-3">
            <img
              src="/resource.png"   // <-- replace with your image
              alt="Resource preview"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="px-4 py-2 rounded-xl border bg-white text-sm text-center">
            ⬇️  Download
          </div>
        </div>
      </div>
    </a>
  );
}
