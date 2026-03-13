"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import api from "@/lib/axios";
import { motion } from "framer-motion";

import HeroSection from "@/components/Resourcehub/Herosection";
import ResourceCard, { mapResourceToCard } from "@/components/Resourcehub/ResourceCard";
import DiscussionFilters from "@/components/Discusion/DiscussionFilters";
import Pagination from "@/components/Discusion/Pagination";
import BrowseResourcesPage from "@/components/Resourcehub/Browse";

const fetcher = (url: string) => api.get(url).then((r) => r.data);

export default function ResourcesPage() {
  const [filters, setFilters] = useState<any>({
    publishType: "RESOURCE",
    type: "ALL",
    region: "ALL",
    year: "ALL",
    clusterTag: "ALL",
    query: "",
    sort: "recent",
    page: 1,
    pageSize: 20,
  });

  const params = new URLSearchParams(
    Object.fromEntries(
      Object.entries(filters).map(([k, v]) => [k, String(v)])
    )
  ).toString();

  const { data, isLoading } = useSWR(`/outputs?${params}`, fetcher, {
    keepPreviousData: true,
    revalidateOnMount: true,
    revalidateOnFocus: false,
    dedupingInterval: 4000,
  });

  const resources = (data?.outputs || []).map(mapResourceToCard);
  const totalPages = data?.totalPages || 1;

  return (
    <main className="w-full min-h-screen bg-[var(--bg)]">

      {/* HERO SECTION */}
      <HeroSection />

      {/* ----------------------
          FILTERS SECTION
      -----------------------*/}
      <section className="theme-lightdark py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* <h2 className="text-3xl md:text-4xl font-semibold">Browse Resources</h2>

          <DiscussionFilters filters={filters} onApply={(f: any) => setFilters(f)} /> */}
          <BrowseResourcesPage/>
        </div>
      </section>


    </main>
  );
}
