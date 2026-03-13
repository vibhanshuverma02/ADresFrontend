
// "use client";"use client";

// import { useState, useEffect } from "react";
// import api from "@/lib/axios";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";

// type FilterProps = {
//   filters: any;
//   onApply: (f: any) => void;
// };

// export default function DiscussionFilters({ filters, onApply }: FilterProps) {
//   const [query, setQuery] = useState(filters.q ?? "");
//   const [selectedRegion, setSelectedRegion] = useState(filters.region ?? "ALL");
//   const [selectedYear, setSelectedYear] = useState(filters.year ?? "ALL");
//   const [selectedCluster, setSelectedCluster] = useState(
//     filters.clusterTag ?? "ALL"
//   );
//   const [selectedType, setSelectedType] = useState(filters.type ?? "ALL");

//   const [options, setOptions] = useState({
//     regions: [] as string[],
//     years: [] as string[],
//     clusterTags: [] as string[],
//     resourceTypes: [] as string[],
//   });

//   useEffect(() => {
//     const loadOptions = async () => {
//       const res = await api.get("/users/resource-options");
//       setOptions(res.data);
//     };
//     loadOptions();
//   }, []);

//   const applyFilters = () => {
//     onApply({
//       ...filters,
//       q: query,
//       region: selectedRegion,
//       year: selectedYear,
//       clusterTag: selectedCluster,
//       type: selectedType,
//       page: 1,
//     });
//   };

//   return (
//     <div className="timeline-card p-4 md:p-5 space-y-4">

//       {/* SEARCH */}
//       <Input
//         placeholder="Search…"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onBlur={applyFilters}
//         className="bg- black"
//       />

//       {/* FILTER GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

//         {/* TYPE */}
//         <Select value={selectedType} onValueChange={(v) => { setSelectedType(v); applyFilters(); }}>
//           <SelectTrigger>
//             <SelectValue placeholder="Type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="ALL">All Types</SelectItem>
//             {options.resourceTypes.map((r) => (
//               <SelectItem key={r} value={r}>
//                 {r.replace("_", " ")}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         {/* REGION */}
//         <Select value={selectedRegion} onValueChange={(v) => { setSelectedRegion(v); applyFilters(); }}>
//           <SelectTrigger>
//             <SelectValue placeholder="Region" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="ALL">All Regions</SelectItem>
//             {options.regions.map((r) => (
//               <SelectItem key={r} value={r}>
//                 {r}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         {/* YEAR */}
//         <Select value={selectedYear} onValueChange={(v) => { setSelectedYear(v); applyFilters(); }}>
//           <SelectTrigger>
//             <SelectValue placeholder="Year" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="ALL">All Years</SelectItem>
//             {options.years.map((y) => (
//               <SelectItem key={y} value={y}>
//                 {y.replace("Y", "")}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         {/* CLUSTER */}
//         <Select value={selectedCluster} onValueChange={(v) => { setSelectedCluster(v); applyFilters(); }}>
//           <SelectTrigger>
//             <SelectValue placeholder="Cluster" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="ALL">All Clusters</SelectItem>
//             {options.clusterTags.map((c) => (
//               <SelectItem key={c} value={c}>
//                 {c}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   );
// }


export interface DiscussionFiltersState {
  query?: string;
  region?: string;
  year?: string;
  clusterTag?: string;
  sort?: string;
  page?: number;
}
type FilterOptions = {
  regions: string[];
  years: string[];
  clusterTags: string[];
};
export interface FilterProps {
  filters: DiscussionFiltersState;
  onApply: (next: DiscussionFiltersState) => void;
}

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/axios";

export default function DiscussionFilters({ filters, onApply }: FilterProps) {
  const [query, setQuery] = useState(filters.query ?? "");
  const [selectedRegion, setSelectedRegion] = useState(filters.region ?? "ALL");
  const [selectedYear, setSelectedYear] = useState(filters.year ?? "ALL");
  const [selectedCluster, setSelectedCluster] = useState(
    filters.clusterTag ?? "ALL"
  );

  const [showAdvanced, setShowAdvanced] = useState(false);

 const [options, setOptions] = useState<FilterOptions>({
  regions: [],
  years: [],
  clusterTags: [],
});

  useEffect(() => {
    const loadOptions = async () => {
      const res = await api.get("/users/resource-options");
      setOptions(res.data);
    };
    loadOptions();
  }, []);

  const applyFilters = () => {
    onApply({
      ...filters,
      query,
      region: selectedRegion,
      year: selectedYear,
      clusterTag: selectedCluster,
      page: 1,
    });
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedRegion("ALL");
    setSelectedYear("ALL");
    setSelectedCluster("ALL");

    onApply({
      ...filters,
      query: "",
      region: "ALL",
      year: "ALL",
      clusterTag: "ALL",
      page: 1,
    });
  };

  return (
    <section className="w-full">
      <div className="bg-black/5 border border-black/10 rounded-2xl p-6 space-y-4">

        {/* SEARCH BAR */}
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <Input
            placeholder="Search within this resource…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="bg-white border-black/20 w-full"
          />

          <Button onClick={applyFilters}>🔍 Search</Button>

          <Button variant="ghost" onClick={clearFilters}>
            ✕
          </Button>
        </div>

        {/* ADVANCED FILTER TOGGLE */}
        <div>
          <button
            onClick={() => setShowAdvanced((v) => !v)}
            className="text-sm font-medium text-black/70 hover:text-black"
          >
            {showAdvanced ? "▾ Hide Advanced Filters" : "▸ Advanced Filters"}
          </button>
        </div>

        {/* ADVANCED FILTERS */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">

            {/* <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-white border-black/20">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Regions</SelectItem>
                {options.regions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="bg-white border-black/20">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Years</SelectItem>
                {options.years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y.replace("Y", "")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCluster} onValueChange={setSelectedCluster}>
              <SelectTrigger className="bg-white border-black/20">
                <SelectValue placeholder="Cluster" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Clusters</SelectItem>
                {options.clusterTags.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </section>
  );
}
