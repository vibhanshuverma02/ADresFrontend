// app/ceo/CeoList.tsx  (Client Component with SWR)
"use client";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CeoList({ initialData }: { initialData: any[] }) {
  const { data: ceos, error } = useSWR("http://localhost:3010/ceos", fetcher, {
    refreshInterval: 60000, // refresh every 60s
    fallbackData: initialData, // use ISR data if backend is down
    revalidateOnMount: true,  // try to update immediately on load
  });

  if (error && !ceos) {
    return <p className="text-center text-red-500">Failed to load CEOs</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">Disaster Risk Reduction</h1>

      {ceos?.length === 0 ? (
        <p className="text-center text-gray-500">No CEOs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ceos?.map((ceo: any) => (
            <div
              key={ceo.id}
              className="border rounded-xl shadow-md hover:shadow-lg p-6 transition bg-white"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  {ceo.name?.charAt(0) ?? "C"}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{ceo.name}</h2>
                  <p className="text-sm text-gray-500">{ceo.state}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Type:</span> {ceo.type}
              </p>

              {ceo.subType && (
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Subtype:</span> {ceo.subType.name}
                </p>
              )}

              <p className="text-gray-500 text-sm mb-4">{ceo.about}</p>

              <div className="flex justify-end">
                <Link
                  href={`/ceo/${ceo.id}`}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View CEO
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
