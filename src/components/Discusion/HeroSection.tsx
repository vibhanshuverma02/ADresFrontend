// "use client";

// import StackedCardCarousel from "../PhotoCarousel";

// export default function HeroSection() {
//   return (
//    <section className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-16 ">

//       <div className="max-w-5xl">
        
//         <h1 className="text-5xl md:text-7xl lg:text-[90px] leading-tight font-semibold tracking-tight">
//           Uniting Individuals  Bringing Change!
//         </h1>
  
//         <p className="mt-8 text-lg md:text-2xl text-gray-300 max-w-3xl">
//           Discover New Ideas And Perspectives From Members Around The World
//         </p>

//         <div className="mt-12">
//           <button className="px-10 py-4 rounded-full border border-gray-600 hover:border-white transition-all text-lg md:text-xl font-medium flex items-center gap-3">
//             JOIN Discussion Forum
//             <span className="text-sm">🔗</span>
//           </button>
//         </div>
        
//       </div>

//       {/* VIDEO FROM RIGHT WITH FADE / SLIDE ANIMATION */}
  
//     </section>
//   );
// }
// "use client";

// import Image from "next/image";

// export default function HeroSection() {
//   return (
// <section className="relative w-full min-h-screen flex items-center px-6 md:px-16 theme <section
// theme-light timeline-section 
// ">
//       <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

//         {/* LEFT CONTENT */}
//         <div className="max-w-3xl">
//           <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900">
//             Welcome to the ADRES Discussion Forum
//           </h1>

//           <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
//             This forum serves as an institutional platform to support informed
//             dialogue, knowledge exchange, and collaboration among members of the
//             ADRES network. Participants are encouraged to share insights,
//             discuss emerging issues, and strengthen adaptation and sustainability efforts.
//           </p>

//          <section className="max-w-5xl mx-auto mt-16 space-y-10">
  
//   <div>
//     <h2 className="text-2xl font-semibold">How the Discussion Forum Supports ADRES Objectives</h2>

//     <div className="mt-6 space-y-6 text-gray-700 leading-relaxed">

//       <div>
//         <h3 className="font-semibold text-lg">
//           1. Integrating Research into Operations
//         </h3>
//         <p>
//           Centres of Excellence share tools, models, and research outputs, while
//           implementers provide on-ground feedback. This turns research into
//           actionable guidance and helps refine strategies through real-world
//           experience.
//         </p>
//       </div>

//       <div>
//         <h3 className="font-semibold text-lg">
//           2. Linking Science & Technology with Policy and Action
//         </h3>
//         <p>
//           Policymakers engage directly with experts to understand feasibility,
//           challenges, and opportunities. Discussions help convert innovations
//           into practical policies and implementation frameworks.
//         </p>
//       </div>

//       <div>
//         <h3 className="font-semibold text-lg">
//           3. Dissemination of Knowledge and Expertise
//         </h3>
//         <p>
//           Members share lessons learned, case studies, and best practices from
//           across India, creating a living knowledge ecosystem and preventing
//           duplication of effort.
//         </p>
//       </div>

//     </div>
//   </div>

// </section>

//         </div>

//         {/* RIGHT — CIRCLE GRAPHIC / ILLUSTRATION */}
//         <div className="relative w-full flex justify-center lg:justify-end">
//           <div className="relative w-[420px] h-[420px]">
//             <Image
//               src="/discusion.png"   // <-- replace with your circular graphic
//               alt="Forum Illustration"
//               fill
//               className="object-contain"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  const objectives = [
    {
      title: "Integrating Research into Operations",
      desc: "  Centres of Excellence share tools, models, and research outputs, while implementers provide on-ground feedback. This turns research intoactionable guidance and helps refine strategies through real-world experience.",
      icon: "/icons/1.png",
    },
    {
      title: "Translating Science into Action",
      desc: "Policymakers engage directly with experts to understand feasibility,challenges, and opportunities. Discussions help convert innovationsinto practical policies and implementation frameworks..",
      icon: "/icons/2.png",
    },
    {
      title: "Disseminating Knowledge",
      desc: "Members share lessons learned, case studies, and best practices from across India, creating a living knowledge ecosystem and preventinG  duplication of effort..",
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
           Welcome to the ADRES Discussion Forum
          </h1>
          <h2>
            provide a dedicated space where experts and professionals can engage in meaningful dialogue, share insights, and build collective knowledge to strengthen community resilience.
          </h2>
       
        </div>

        {/* Illustration */}
        <div className="lg:w-1/2 relative w-full h-80 md:h-[420px]">
         <Image
              src="/discusion.png"   // <-- replace with your circular graphic
              alt="Forum Illustration"
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
