"use client";
import { motion } from "framer-motion";

import HorizontalTimeline from "@/components/try";
import DimmedVideo from "@/components/backgroundimages";

import PortalNavigation from "@/components/tt";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";


const textVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.3, // Stagger effect
      duration: 0.8,
       ease: "easeInOut" as const,
    },
  }),
};

const blurb = `"Connecting science, policy, and action for safer futures."`;

const howWeWork = [
  { icon: "BookOpen", title: "Research → Policy → Action", description: "Translating science into actionable solutions." },
  { icon: "Target", title: "Local Knowledge Integration", description: "Empowering communities as co-creators of solutions." },
  { icon: "Mountain", title: "Cross-Sector Collaboration", description: "Bridging academia, government, and communities." },
  { icon: "Globe", title: "Capacity Building & Training", description: "Strengthening skills for resilience and adaptation." },
];
const timeline = [
  { year: "2023", event: "Conceptualization of ADRES framework." },
  { year: "2024", event: "Network launch with national and regional workshops." },
  { year: "2025", event: "Public launch of the ADRES portal." },
];
const slide = [
  {
    heading: "Our Vision",
    paragraph:
      "A resilient Himalayan region where communities, ecosystems, and economies thrive despite climate change and natural s, supported by collaborative research, innovative solutions, and evidence-based adaptation strategies.",
    id: "vision",
  },
  {
    heading: "Our Mission",
    paragraph:
      "To advance  risk reduction and climate adaptation in the Himalayan region by fostering collaborative research, building capacity through education and training, facilitating knowledge exchange, and supporting evidence-based policy development.To advance  risk reduction and climate adaptation in the Himalayan region by fostering collaborative research, building capacity through education and training, facilitating knowledge exchange, and supporting evidence-based policy development.",
    id: "mission",
  },
  {
  heading: "How We Work",
  id: "how-we-work",
  cards: howWeWork
},
  {
  heading: "Our Journey",
  id: "journey",
  timeline: timeline
}
];





const strategicPartners = [
{name: "DST", logo: "/DST_Logo_June_2020.png", tooltip: "Funding & national coordination." },
  { name: "IIT Roorkee", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRe_F-jR-uE93EcsPeLfbX9OyEBJURcNWYlw&s", tooltip: "Lead institution & host of ICARS." }
];

const thematicPartners = [
  { name: "ICIMOD", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZNuYxp0nxQgGOtpq522_TfJ3Q0ySx3woNnw&s", tooltip: "Regional knowledge sharing & research." },
  { name: "UNEP", logo: "data:image/png;base64,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", tooltip: "Global policy integration & environmental data." },
  { name: "NAP Global Network", logo: "data:image/png;base64,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", tooltip: "Support for national adaptation planning." }
];

export default function About() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("section");

    if (section) {
      const el = document.getElementById(section);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 200);
      }
    }
  }, [searchParams]);
 
  return (<main className="relative w-full min-h-screen">

  <section
    id="hero"
    className="theme-light timeline-section relative min-h-screen grid grid-cols-1 lg:grid-cols-[60%_40%] items-stretch"
  >


      {/* LEFT — VIDEO */}
      <div className="relative w-full h-full p-6 lg:p-12">
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl border"
             style={{ borderColor: "var(--border)" }}>
          
          <DimmedVideo src="/videos/bg4.mp4" opacity={0.85} />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />
        </div>
      </div>

      {/* RIGHT — TEXT */}
      <div className="relative flex items-center px-8 lg:px-16 py-10">
        <div className="max-w-xl">

          <h1 className="timeline-title text-4xl sm:text-6xl font-serif leading-tight mb-5">
            Together for a<br />
            Resilient India
          </h1>

          <p className="timeline-description text-lg leading-8 mb-8">
            The ADRES Network brings institutions, experts, and communities together
            to strengthen climate knowledge, policy dialogue, and coordinated action.
          </p>

          <div className="h-px w-20 mb-6" style={{ backgroundColor: "var(--border)" }} />

          <div className="flex flex-wrap gap-3">
            <Link href="/About?section=portal">   <button
              className="px-6 py-3 rounded-xl shadow transition"
              style={{ backgroundColor: "var(--accent)", color: "#1d1d1eff" }}
            >
              Explore the Network
            </button></Link>
         
          </div>

        </div>
      </div>

    </section>





      {/* TIMELINE — now clean, no background video inside */}
     
    <section id="timeline" className="relative z-10 overflow-visible min-h-[120vh] sm:min-h-[140vh] md:min-h-[180vh]">
<HorizontalTimeline/>
</section>



<section id="vision"  className="theme-lightdark relative py-20 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* LEFT — IMAGE */}
        <motion.div
          className="flex-1 relative w-full h-96 lg:h-[480px]  overflow-hidden "
          
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <img 
            src="/vision1.png" 
            alt="ADRES Vision" 
            className="w-3/4 h-full object-cover object-center"
          />
        </motion.div>

        {/* RIGHT — VISION POINTS */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="timeline-title text-4xl sm:text-5xl font-serif mb-8">
            Vision of the ADRES Network
          </h2>
          
          <ul className="space-y-6">
            {[
              "Integrate scientific research into disaster risk reduction strategies, ensuring all initiatives are evidence-based and innovative.",
              "Translate science and technology into actionable policies and practical interventions on the ground.",
              "Promote knowledge dissemination and collaborative learning through case studies, workshops, and discussion forums.",
              "Facilitate coordination and interaction among stakeholders via the ADRES portal for better policy integration and international collaboration."
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
        </motion.div>

      </div>
    </section>

<section
    className="theme-light timeline-section relative min-h-screen grid grid-cols-1 lg:grid-cols-[50%_50%] items-stretch"
  >


      

      {/* RIGHT — TEXT */}
      <div  id="framework" className="relative flex items-center px-8 lg:px-16 py-10 ">
        <div className="max-w-xl">

          <h1 className="timeline-title text-4xl sm:text-6xl font-serif leading-tight mb-5">
            ADRES <br />
            FrameWork
          </h1>

          <p className="timeline-description text-lg leading-8 mb-8">
            The ADRES network is built on a coordinated framework that connects knowledge, action, policy, and global collaboration.
             It brings together four core groups — the Feeder Group, State Climate Change Cells and SDMAs as Implementers, Policy Users, and External Resource partners —
              each playing a distinct role in reducing disaster risk and strengthening climate resilience. Research and expertise flow from Centres of Excellence through the Feeder Group, are translated into on-ground actions by Implementers, adopted and enforced through government ministries and agencies, and enhanced through collaboration with international organizations. This entire system is guided by a multidisciplinary advisory board, ensuring science-based decisions, policy relevance, sustainability, and national alignment. Together, the framework ensures that ideas do not stay on paper — they transform into real, measurable impact for communities and governments.
          </p>

          <div className="h-px w-20 mb-6" style={{ backgroundColor: "var(--border)" }} />

          <div className="flex flex-wrap gap-3">
              <Link href="/KeyAllices"> 
            <button
              className="px-6 py-3 rounded-xl shadow transition"
              style={{ backgroundColor: "var(--accent)", color: "#1d1d1eff" }}
            >
             Key Allices
            </button>
            </Link>
            <Link href="/Resource"> 
            <button
              className="px-6 py-3 rounded-xl shadow transition"
              style={{ backgroundColor: "var(--accent)", color: "#1d1d1eff" }}
            >
             Resource Hub
            </button>
              </Link>
          </div>

        </div>
      </div>

{/* LEFT — VIDEO */}
      <div className="relative w-full h-full p-6 lg:p-12">
        <div className="relative w-full h-6/7 rounded-3xl overflow-hidden shadow-xl border"
             style={{ borderColor: "var(--border)" }}>
          
          <DimmedVideo src="/videos/framework.mp4" opacity={0.85} />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />
        </div>
      </div>
    </section>
      

      <section id="portal"  className="relative z-10 overflow-visible min-h-[120vh] sm:min-h-[140vh] md:min-h-[180vh]">
<PortalNavigation/>
</section>

    </main>
  );
}


