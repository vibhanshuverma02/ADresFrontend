"use client";
import Link from "next/link";

const resourceSections = [
  {
    title: "Research Papers",
    type: "RESEARCH_PAPER",
    image: "/images/research.jpg",
    description: "Peer-reviewed research and academic studies",
  },
  {
    title: "Books",
    type: "BOOK",
    image: "/images/books.jpg",
    description: "Curated books and publications",
  },
  {
    title: "Whitepapers",
    type: "WHITE_PAPER",
    image: "/images/whitepapers.jpg",
    description: "In-depth analytical documents",
  },
  {
    title: "Policy Briefs",
    type: "PolicyBrief",
    image: "/images/policy.jpg",
    description: "Concise policy-focused insights",
  },
  {
    title: "Toolkits",
    type: "Toolkit",
    image: "/images/toolkits.jpg",
    description: "Practical guides and tools",
  },
];

export default function BrowseResourcesPage() {
  return (
    <main className=" min-h-screen py-14 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-10">
          Browse Resources
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourceSections.map((r) => (
            <Link
              key={r.type}
              href={`/Resource/list?type=${r.type}`}
              className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={r.image}
                alt={r.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition"
              />

              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {r.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
