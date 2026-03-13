"use client";

const categories = [
  { label: "Travel", icon: "🏕️" },
  { label: "Business", icon: "💼" },
  { label: "Music", icon: "🎸" },
  { label: "Game", icon: "🎮" },
  { label: "Financial", icon: "🏦" },
  { label: "Sports", icon: "⚽" },
];

export default function FilterBar() {
  return (
    <div className="flex gap-3 overflow-x-auto py-3 max-w-5xl mx-auto">
      {categories.map((c) => (
        <button
          key={c.label}
          className="px-4 py-2 whitespace-nowrap border rounded-full bg-white shadow-sm text-sm hover:bg-blue-600 hover:text-white transition"
        >
          {c.icon} {c.label}
        </button>
      ))}
    </div>
  );
}
