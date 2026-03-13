"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  const objectives = [
    {
      title: "Integrating Research into Operations",
      desc: "Provides evidence-based insights that help practitioners develop innovative and adaptive disaster risk reduction strategies.",
      icon: "/icons/1.png",
    },
    {
      title: "Translating Science into Action",
      desc: "Offers policy documents and guides that convert scientific and technological advancements into practical interventions on the ground.",
      icon: "/icons/2.png",
    },
    {
      title: "Disseminating Knowledge",
      desc: "Facilitates collaborative learning and sharing of best practices across stakeholders, strengthening informed decision-making.",
      icon: "/icons/3.png",
    },
  ];

  return (
    <section className="timeline-section py-16 md:py-24 px-6 md:px-16">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Text */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[var(--headline)]">
            ADRES Resource Library
          </h1>

          <p className="text-lg md:text-xl text-[var(--subtext)] leading-relaxed">
            A central hub for reports, frameworks, case studies, and research on disaster risk reduction 
            and climate resilience. Access structured knowledge, learn from past initiatives, and strengthen
            strategies for future challenges.
          </p>
        </div>

        {/* Illustration */}
        <div className="lg:w-1/2 relative w-full h-80 md:h-[420px]">
          <Image
            src="/Resourcepage.png"
            alt="Resource Library Illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {objectives.map((obj, index) => (
          <motion.div
            key={obj.title}
            className="rounded-xl p-6 shadow-lg border"
            style={{
              background: "var(--card-bg)",
              color: "var(--card-text)",
              borderColor: "var(--border, rgba(0,0,0,0.08))",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="w-12 h-12 mb-4">
              <Image src={obj.icon} alt={obj.title} width={48} height={48} />
            </div>

            <h3 className="text-xl font-semibold mb-2 text-[var(--headline)]">
              {obj.title}
            </h3>

            <p className="text-sm leading-relaxed text-[var(--subtext)]">
              {obj.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <p className="max-w-3xl mx-auto mt-12 text-center text-[var(--subtext)] text-lg">
        By connecting research, technology, policy, and practice, the ADRES Resource Library empowers the network 
        to build more resilient and sustainable disaster management strategies across India.
      </p>
    </section>
  );
}
