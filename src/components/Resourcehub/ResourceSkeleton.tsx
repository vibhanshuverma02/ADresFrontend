export default function ResourceSkeleton() {
  return (
    <div
      className="
        animate-pulse
        rounded-xl
        border
        p-4
        space-y-4
        bg-[var(--card-bg)]
        border-[var(--border)]
      "
    >
      {/* Image */}
      <div className="h-40 rounded-lg bg-[var(--year)]" />

      {/* Title */}
      <div className="h-4 rounded w-3/4 bg-[var(--year)]" />

      {/* Subtitle */}
      <div className="h-4 rounded w-1/2 bg-[var(--year)]" />

      {/* Button */}
      <div className="h-8 rounded w-32 bg-[var(--year)]" />
    </div>
  );
}
