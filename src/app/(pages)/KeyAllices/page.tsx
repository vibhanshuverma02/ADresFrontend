"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/lib/axios";


type Actor = {
  id: string;
  name: string;
  email:string;
  profile?: {
    designation?: string;
    organization?: string;
    contactNumber?: string;
    website?: string;
    bio?: string;
  };
};

export default function AdresNetworkPage() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
const [sdmas, setSdmas] = useState<Actor[]>([]);
const [ministries, setMinistries] = useState<Actor[]>([]);
const [loading, setLoading] = useState(true);
const scroll = (id: string, direction: "left" | "right") => {
  const el = document.getElementById(id);
  if (!el) return;

  const amount = direction === "left" ? -600 : 600;
  el.scrollBy({ left: amount, behavior: "smooth" });
};

const scrollVertical = (id: string, dir: "up" | "down") => {
  const el = document.getElementById(id);
  if (!el) return;

  const amount = dir === "up" ? -300 : 300;
  el.scrollBy({ top: amount, behavior: "smooth" });
};
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const SDMA_PER_SLIDE = 4;
const MINISTRY_PER_SLIDE = 4;

const sdmaSlides = chunkArray(sdmas, SDMA_PER_SLIDE);
const ministrySlides = chunkArray(ministries, MINISTRY_PER_SLIDE);

const [sdmaIndex, setSdmaIndex] = useState(0);
const [ministryIndex, setMinistryIndex] = useState(0);
const prev = (setter: any) => setter((i: number) => Math.max(i - 1, 0));
const next = (setter: any, max: number) =>
  setter((i: number) => Math.min(i + 1, max));

useEffect(() => {
  const fetchActors = async () => {
    try {
      const [sdmaRes, ministryRes] = await Promise.all([
        api.get("/users/Allices", { params: { type: "SDMA" } }),
        api.get("/users/Allices", { params: { type: "MINISTRY" } }),
      ]);

      setSdmas(sdmaRes.data);
      setMinistries(ministryRes.data);
    } catch (err) {
      console.error("Failed to load actors", err);
    } finally {
      setLoading(false);
    }
  };

  fetchActors();
}, []);

  useEffect(() => {
    if (!section) return;

    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [section]);

  return (
    <main className="theme-lightdark">


      {/* ---------- Section 1: Background Image ---------- */}
      <section className="relative h-screen w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("/image.png")` }}
        ></div>

        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/40"></div> {/* adjust opacity here */}

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col justify-center items-start px-8 lg:px-32 space-y-6 h-full text-white"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <h1 className="timeline-title text-4xl sm:text-5xl font-serif mb-8">KEY ALLICES</h1>
          <div className="flex space-x-4">
            <button className="px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition">
              LEARN MORE
            </button>
            <button className="px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition">
              ADRES FRAMEWORK
            </button>
          </div>
        </motion.div>
      </section>

      {/* ---------- Section 2: COE Map + Vision ---------- */}
      <section id="coe" className="theme-light timeline-section relative min-h-screen grid grid-cols-1 lg:grid-cols-[50%_50%] items-stretch">

    
    {/* LEFT — IMAGE / MAP */}
    <motion.div
      className="flex-1 relative w-full h-96 lg:h-[480px] overflow-hidden rounded-lg shadow-lg"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
    >
      {/* Map Header */}
      <div className="absolute top-0 left-0 w-full h-16 bg-white/90 z-20 pointer-events-none flex items-center justify-center">
        <h3 className="text-[#2C3E50] text-2xl sm:text-3xl font-serif leading-tight drop-shadow-lg">
          COE Network Map
        </h3>
      </div>

      {/* Google Map */}
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1UdOcvhsQbL7e8_zohICnQcVdbiTHNSA"
        className="absolute inset-0 w-full h-full border-0 z-10"
      ></iframe>

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
    </motion.div>

  <div className="relative flex items-center px-8 lg:px-16 py-10 ">
        <div className="max-w-xl">
 <h2 className="timeline-title text-4xl sm:text-5xl font-serif mb-8">
    Meet with leading Centres of Excellence
  </h2>

         <ul className="space-y-6">
    {[
      "Support the network with accurate and timely information on disaster risk reduction (DRR), climate change, and sustainability.",
      "Collaborate with Centres of Excellence (BHU, IITs, ICRISAT, TAU, Tezpur University, Kashmir University) to leverage expertise.",
      "Disseminate existing research and explore new knowledge to maintain a dynamic and evolving knowledge base.",
      "Provide a directory to facilitate direct communication and collaboration among network members."
    ].map((point, idx) => (
      <motion.li
        key={idx}
        className="flex gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: idx * 0.2 }}
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
          {idx + 1}
        </div>
        <p className="timeline-description text-lg leading-8">{point}</p>
      </motion.li>
    ))}
  </ul>

          <div className="h-px w-20 mb-6" style={{ backgroundColor: "var(--border)" }} />

          <div className="flex flex-wrap gap-3">
            <button
              className="px-6 py-3 rounded-xl shadow transition"
              style={{ backgroundColor: "var(--accent)", color: "#1d1d1eff" }}
            >
             Key Allices
            </button>
            <button
              className="px-6 py-3 rounded-xl shadow transition"
              style={{ backgroundColor: "var(--accent)", color: "#1d1d1eff" }}
            >
             Resource Hub
            </button>
          </div>

        </div>
      </div>


       
      </section>
     

      {/* ---------- Section 3: State SDMA ---------- */}
<section id="sdma" className="theme-light timeline-section">
  <div className="section-inner relative">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="timeline-title text-4xl font-serif">
          State Disaster Management Authorities
        </h2>
        <p className="timeline-description mt-2 max-w-3xl">
          State-level authorities coordinating disaster preparedness,
          response, and resilience across India.
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => prev(setSdmaIndex)}
          disabled={sdmaIndex === 0}
          className="px-3 py-2 border rounded-full disabled:opacity-30"
        >
          ←
        </button>
        <button
          onClick={() => next(setSdmaIndex, sdmaSlides.length - 1)}
          disabled={sdmaIndex === sdmaSlides.length - 1}
          className="px-3 py-2 border rounded-full disabled:opacity-30"
        >
          →
        </button>
      </div>
    </div>

    {/* SLIDER */}
    <div className="overflow-hidden">
      <motion.div
        className="flex"
        animate={{ x: `-${sdmaIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
      >
        {sdmaSlides.map((slide, slideIdx) => (
          <div
            key={slideIdx}
            className="min-w-full grid grid-cols-4 gap-5"
          >
            {slide.map((sdma) => (
              <div
                key={sdma.id}
                className="timeline-card bg-white rounded-xl shadow p-5"
              >
                <h3 className="text-lg font-semibold text-[#2C3E50]">
                  {sdma.name}
                </h3>

                <p className="text-sm text-gray-600">
                  {sdma.profile?.designation}
                 
                </p>

                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {sdma.profile?.bio}
                  <br/>


                
                </p>
<p className="text-sm text-gray-500 mt-2 line-clamp-3">
                contact: 
                <br/>
                 Email:    {sdma.email}
                  <br/>
                 {sdma.profile?.contactNumber}

                
                </p>
                {sdma.profile?.website && (
                  <a
                    href={sdma.profile.website}
                    target="_blank"
                    className="inline-block mt-3 text-sm font-medium text-accent hover:underline"
                  >
                    Official Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  </div>
</section>




      {/* ---------- Section 4: Ministries ---------- */}
{/* ---------- Section 4: Ministries ---------- */}
<section id="ministries" className="theme-light timeline-section">
  <div className="section-inner relative">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="timeline-title text-4xl font-serif">
          Key Ministries & Institutions
        </h2>
        <p className="timeline-description mt-2 max-w-3xl">
          Central ministries contributing to disaster risk reduction and
          climate resilience.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => prev(setMinistryIndex)}
          disabled={ministryIndex === 0}
          className="px-3 py-2 border rounded-full disabled:opacity-30"
        >
          ←
        </button>
        <button
          onClick={() => next(setMinistryIndex, ministrySlides.length - 1)}
          disabled={ministryIndex === ministrySlides.length - 1}
          className="px-3 py-2 border rounded-full disabled:opacity-30"
        >
          →
        </button>
      </div>
    </div>

    <div className="overflow-hidden">
      <motion.div
        className="flex"
        animate={{ x: `-${ministryIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
      >
        {ministrySlides.map((slide, slideIdx) => (
          <div
            key={slideIdx}
            className="min-w-full grid grid-cols-4 gap-4"
          >
            {slide.map((min) => (
              <div
                key={min.id}
                className="timeline-card bg-white rounded-xl shadow p-4"
              >

                 <h2 className="text-md font-semibold text-[#2C3E50]">
                  {min.profile?.organization}
                </h2>
                <h3 className="text-md font-semibold text-[#2C3E50]">
                  {min.name}
                </h3>

                <p className="text-sm text-gray-600">
                  {min.profile?.designation}
                </p>


<p className="text-sm text-gray-600">
                  Contact :
                  <br/>
                  Email:    {min.email}
                  <br/>

                  {min.profile?.contactNumber}
                </p>
                {min.profile?.website && (
                  <a
                    href={min.profile.website}
                    target="_blank"
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    Official Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  </div>
</section>



    </main>
  );
}
