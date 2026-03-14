"use client";
import Link from "next/link";

const resourceSections = [
  
  {
    title: "Books",
    type: "BOOK",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv3a5hb5zcWpXrW2s0cx47wA7yWOfXNjrPvQ&s",
    description: "Curated books and publications",
  },
  
  {
    title: "Dossiers",
    type: "DOSSIERS",
    image: "https://bkmhealth.com/wp-content/uploads/2024/10/dossier-preparatio-new-1024x647.jpg",
    description: "Concise policy-focused insights",
  },
  {
    title: "Publications",
    type: "PUBLICATION",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByPw0zabKcidb08HAi2a4Er644K4rLOAvTQ&s",  
    description: "In-depth analytical documents",
  },
  {
    title: "Reports",
    type: "REPORTS",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLn8GJ4kNZL8kPhUB_d0bzyWtFHI9BpJ_VQ&s",
    description: "In-depth analytical documents",
  },
  {
    title: "Research Papers",
    type: "RESEARCH_PAPER",
    image: "https://phdthesiswriter.in/wp-content/uploads/2023/12/blog-design-1-1.jpg",
    description: "Peer-reviewed research and academic studies",
  },
  {
    title: "Toolkits",
    type: "Toolkit",
    image: "https://s3.amazonaws.com/libapps/accounts/97321/images/ResearchToolkit_Logo.png",
    description: "Practical guides and tools",
  },
  {
    title: "Whitepapers",
    type: "WHITE_PAPER",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDlvYFZMJ3PGFvSfoYZmw879kDMle8uVb6bQ&s",
    description: "In-depth analytical documents",
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
