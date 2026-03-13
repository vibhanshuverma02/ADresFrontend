// "use client";

// import { useEffect, useRef, useState } from "react";
// import { cn } from "@/lib/utils";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { Building, Eye, Flag, Globe, Globe2, LucideIcon, Network, Users } from "lucide-react";


// export type TimelineItem = {
//   year: number;
//   title?: string;
//   description: string;
//   side?: "top" | "bottom";
//   icon: LucideIcon;
// };

// const DEFAULT_ITEMS: TimelineItem[] = [
//   {
//     year: 2010,
//     title: "National Strategy Push Begins",
//     description:
//       "Major national initiatives like NMSKCC, NPDRR, and PM’s 10-Point Agenda begin highlighting the need for stronger climate– knowledge integration.",
//     side: "top",
//     icon: Flag,
//   },
//   {
//     year: 2022,
//     title: "DST Recognises the Need",
//     description:
//       "The Department of Science & Technology (DST) identifies a gap in coordination and mandates creation of a unified national knowledge backbone.",
//     side: "bottom",
//     icon: Eye,
//   },
//   {
//     year: 2023,
//     title: "ICARS Assigned by DST",
//     description:
//       "DST entrusts ICARS, IIT Roorkee with the responsibility to conceptualise and build a unified climate– knowledge integration platform.",
//     side: "top",
//     icon: Building,
//   },
//   {
//     year: 2023,
//     title: "National Consultation",
//     description:
//       "A major national consultation on 18 July 2023, jointly organised by DST & NIDM, becomes the turning point where the idea of ADRES takes final shape.",
//     side: "bottom",
//     icon: Users,
//   },
//   {
//     year: 2024,
//     title: "ADRES Network Conceptualised",
//     description:
//       "ADRES (Adaptation, Resilience & Sustainability) Network is structured to integrate scientific knowledge from CoEs and convert it into policy-ready strategies.",
//     side: "top",
//     icon: Network,
//   },
//   {
//     year: 2025,
//     title: "ADRES as National Knowledge Backbone",
//     description:
//       "The Knowledge Network evolves to act as India’s digital backbone connecting CoEs, ministries, missions & agencies to support evidence-based climate action.",
//     side: "bottom",
//     icon: Network
//   },
// ];

// export function HorizontalTimeline({
//   items = DEFAULT_ITEMS,
//   className,
// }: {
//   items?: TimelineItem[];
//   className?: string;
// }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const railRef = useRef<HTMLDivElement>(null);
//   const firstItemRef = useRef<HTMLDivElement>(null);
//   const lastItemRef = useRef<HTMLDivElement>(null);

//   const [railWidth, setRailWidth] = useState(0);
//   const [viewportWidth, setViewportWidth] = useState(1500);
//   const [buffer, setBuffer] = useState(100);

//   // measure widths
//   useEffect(() => {
//     const measure = () => {
//       if (railRef.current) {
//         setRailWidth(railRef.current.scrollWidth);
//       }
//       setViewportWidth(window.innerWidth);

//       const firstW = firstItemRef.current?.offsetWidth ?? 100;
//       const lastW = lastItemRef.current?.offsetWidth ?? 100;
//       setBuffer(Math.max(firstW, lastW) / 2);
//     };
//     measure();
//     window.addEventListener("resize", measure);
//     return () => window.removeEventListener("resize", measure);
//   }, [items]);

//   // dynamic scroll height
//   const minHeight = `${items.length * 60}vh`;

//   const isMobile = viewportWidth < 768;
//   // scroll progress
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start 55%", "end start"],
//   });

//   // heading animation
//   const headerX = useTransform(scrollYProgress, [0, 0.15], ["-100%", "0%"]);
//   const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

//   // horizontal slide
//   // horizontal slide (FIXED)
// const slideAmount = Math.max(0, railWidth - viewportWidth);

// // calculate end offset so last item is fully readable
// const endOffset = slideAmount + buffer;

// // horizontal slide
// const railX = useTransform(
//   scrollYProgress,
//   [0, 1],
//   [`${buffer}px`, `-${endOffset}px`]
// );

//   const railOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

//   return (
//     <section
//   ref={containerRef}
//   style={{ minHeight }}
//   className={cn("relative w-full !bg-transparent !bg-none", className)}
// >
 

//       {/* 🔥 FIXED VIDEO BACKGROUND */}
      

//       <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-transparent pointer-events-none">

//       {/* TITLE */}
// <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center pointer-events-none">
//   <motion.h2
//     style={{ x: headerX, opacity: headerOpacity }}
//     className="text-[#2C3E50] text-[clamp(2rem,5vw,4rem)] sm:text-[clamp(1.5rem,4vw,3.5rem)] font-serif leading-tight drop-shadow-lg mb-6"
//   >
//     National Mandates to System Design — The Genesis of ADRES
//   </motion.h2>

//   <motion.div
//     initial={{ scaleX: 0, opacity: 0 }}
//     whileInView={{ scaleX: 1, opacity: 1 }}
//     transition={{ duration: 0.5 }}
//     viewport={{ once: true }}
//     className="mx-auto mt-4 h-[2px] w-16 origin-left bg-slate-700/60"
//   />

//   <motion.p
//     initial={{ x: 100, opacity: 0 }}
//     whileInView={{ x: 0, opacity: 1 }}
//     transition={{ duration: 0.6, delay: 0.2 }}
//     viewport={{ once: true }}
//     className="mt-6 text-[clamp(0.9rem,2vw,1.25rem)] sm:text-[clamp(1rem,1.5vw,1.25rem)] text-slate-500 max-w-3xl mx-auto"
//   >
//     Supporting India’s Unified Climate & Knowledge Backbone
//   </motion.p>
// </div>

//    {/* ---------------------- MOBILE (VERTICAL) ---------------------- */}
//       {isMobile && (
//         <div className="mt-16 space-y-10 px-4">
//           {items.map((item, i) => (
//             <VerticalItem key={i} item={item} />
//           ))}
//         </div>
//       )}
//         {/* TIMELINE RAIL */}
    
//       {!isMobile && (  <motion.div
//   ref={railRef}
//   style={{ x: railX, opacity: railOpacity }}
//   className="
//   relative mt-28
//   flex w-max items-center
//   gap-[clamp(2rem,6vw,6rem)]
//   px-[clamp(10vw,18vw,25vw)]
//   h-[clamp(360px,48vh,520px)]
// "

// >


//           {/* AXIS LINE */}
//         <div
//   className="absolute left-0 top-1/2 -translate-y-1/2 
//              w-full h-[2px]
//              bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200"
// />


//           {items.map((item, idx) => (
//             <motion.div
//               key={item.year + idx}
//               ref={
//                 idx === 0
//                   ? firstItemRef
//                   : idx === items.length - 1
//                   ? lastItemRef
//                   : null
//               }
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: idx * 0.15 }}
//               viewport={{ once: true, amount: 0.6 }}
//               className="px-8 snap-center"
//             >
//               <TimelineItem item={item} index={idx} />
//             </motion.div>
//           ))}
//         </motion.div>
//  )}
//       </div>
//     </section>
//   );
// }




// function TimelineItem({
//   item,
//   index,
// }: {
//   item: TimelineItem;
//   index: number;
// }) {
//   const isTop =
//     (item.side ?? (index % 2 === 0 ? "top" : "bottom")) === "top";

//   const Icon = item.icon;

//   const cardRef = useRef<HTMLDivElement>(null);
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     if (!cardRef.current) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => setIsActive(entry.intersectionRatio > 0.35),
//       { threshold: [0, 0.25, 0.5, 0.75, 1] }
//     );

//     observer.observe(cardRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       transition={{ type: "spring", stiffness: 180, damping: 16 }}
//       className="
//   relative flex items-center justify-center shrink-0
//   w-[78vw] max-w-[380px]
//   sm:w-[340px]
//   md:w-[360px]
//   lg:w-[380px]
// "

//     >
//       {/* CENTRAL AXIS */}
//     <div className="relative">
//   <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-slate-300/60" />

//   {/* map items here */}



//       {/* CONNECTOR */}
//       <div
//        className={cn(
//   "absolute left-1/2 -translate-x-1/2 w-[2px] bg-slate-400/70",
//   isTop
//   ? "bottom-[50%] h-12"
//   : "top-[50%] h-12"

// )}

//       />

//       {/* ICON ON RAIL */}
//       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//         <div className="grid size-11 place-items-center rounded-full border-[3px] border-slate-500 bg-white shadow">
//           <Icon size={18} />
//         </div>
//       </div>

//       {/* YEAR BADGE (close to icon) */}
//      <div
//   className={cn(
//     "absolute left-1/2 -translate-x-1/2 px-3 py-1 text-sm bg-white text-slate-600 rounded-full border shadow-sm",

//     // 👇 Flip depending on side
//     isTop
//       ? "top-[calc(50%+3.2rem)]"
//       : "bottom-[calc(50%+3.2rem)]"
//   )}
// >
//   {item.year}
// </div>


//       {/* CARD */}
//       <motion.div
//         ref={cardRef}
//         whileHover={{ y: isTop ? -6 : 6 }}
//         className={cn(
//           "absolute left-1/2 -translate-x-1/2  w-[82vw] max-w-[460px] sm:w-[340px] md:w-[360px] lg:w-[420px] rounded-2xl border backdrop-blur-md p-5 shadow-xl bg-white/40",
//           isTop
//   ? "bottom-[calc(50%+3rem)]"
//   : "top-[calc(50%+3rem)]"

//         )}
//         style={{
//           backgroundColor: isActive
//             ? "rgba(191, 219, 254, 0.35)"
//             : "rgba(199, 210, 254, 0.20)",
//           borderColor: "rgba(255,255,255,0.3)",
//           boxShadow: isActive
//             ? "0 10px 28px rgba(147, 197, 253, 0.35)"
//             : "0 6px 18px rgba(148, 163, 184, 0.18)",
//           transform: isActive ? "scale(1.05)" : "scale(1)",
//           transition: "all 0.3s ease",
//         }}
//       >
//         <div className="text-lg font-semibold text-slate-800">
//           {item.title ?? item.year}
//         </div>

//         <p className="mt-2 text-sm text-slate-700 leading-snug">
//           {item.description}
//         </p>
//       </motion.div>
//       </div>
//     </motion.div>
    
//   );
// }

// /* ---------------------- MOBILE CARD ---------------------- */

// function VerticalItem({ item }: { item: TimelineItem }) {
//   const Icon = item.icon;

//   return (
//     <div className="relative pl-12">
//       <div className="absolute left-4 top-2">
//         <div className="grid size-8 place-items-center rounded-full bg-white border shadow">
//           <Icon size={14} />
//         </div>
//       </div>

//       <div className="rounded-xl p-4 bg-indigo-50 border">
//         <span className="text-xs text-slate-500">{item.year}</span>
//         <h4 className="font-semibold text-slate-800">{item.title}</h4>
//         <p className="mt-1 text-sm text-slate-700">{item.description}</p>
//       </div>
//     </div>
//   );
// }



// export function HorizontalTimeline({
//   items = DEFAULT_ITEMS,
//   className,
// }: {
//   items?: TimelineItem[];
//   className?: string;
// }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const railRef = useRef<HTMLDivElement>(null);

//   const [railWidth, setRailWidth] = useState(0);
//   const [viewportWidth, setViewportWidth] = useState(1000);

//   // Measure rail width for scrolling
//   useEffect(() => {
//     const measure = () => {
//       if (railRef.current) {
//         setRailWidth(railRef.current.scrollWidth);
//       }
//       setViewportWidth(window.innerWidth);
//     };
//     measure();
//     // Delay slightly to ensure fonts/layout loaded
//     setTimeout(measure, 100);
//     window.addEventListener("resize", measure);
//     return () => window.removeEventListener("resize", measure);
//   }, [items]);

//   // Determine scroll height based on horizontal length
//   const minHeight = `${Math.max(200, items.length * 40)}vh`;
//   const isMobile = viewportWidth < 768;

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Header Animation (Fade out faster so it doesn't distract)
//   const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
//   const headerY = useTransform(scrollYProgress, [0, 0.05], [0, -50]);

//   // Horizontal Slide Calculation
//   // We subtract viewportWidth to stop exactly at the end
//   const slideAmount = railWidth - viewportWidth + (isMobile ? 100 : 200); 
//   const x = useTransform(scrollYProgress, [0, 1], [0, -slideAmount]);

//   return (
//     <section
//       ref={containerRef}
//       style={{ minHeight }}
//       className={cn("relative w-full bg-slate-50", className)}
//     >
//       {/* STICKY CONTAINER */}
//       <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">
        
//         {/* --- HEADER (Moved Up) --- */}
//         <motion.div 
//           style={{ opacity: headerOpacity, y: headerY }}
//           className="flex-none pt-8 pb-4 px-4 text-center z-20 bg-gradient-to-b from-slate-50 to-transparent"
//         >
//           <h2 className="text-3xl md:text-5xl font-serif text-slate-800 font-bold">
//             The Genesis of ADRES
//           </h2>
//           <p className="text-slate-500 mt-2 text-sm md:text-base">
//              National Mandates to System Design
//           </p>
//         </motion.div>

//         {/* --- TIMELINE AREA (Takes remaining space) --- */}
//         <div className="flex-grow flex items-center relative">
          
//           {/* MOBILE VIEW (Vertical List) */}
//           {isMobile ? (
//             <div className="w-full px-4 pb-20 overflow-y-auto">
//               {items.map((item, i) => (
//                 <VerticalItem key={i} item={item} />
//               ))}
//             </div>
//           ) : (
//             /* DESKTOP VIEW (Horizontal Scroll) */
//             <motion.div
//               style={{ x }}
//               ref={railRef}
//               className="flex items-center pl-[10vw] pr-[10vw] relative"
//             >
//               {/* MAIN AXIS LINE */}
//               <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-300" />

//               {/* RULER TICKS (Background Pattern) */}
//               <div 
//                 className="absolute top-1/2 left-0 w-full h-4 -mt-2 opacity-30 pointer-events-none"
//                 style={{
//                   backgroundImage: `linear-gradient(to right, black 1px, transparent 1px)`,
//                   backgroundSize: '40px 100%' // Distance between small ticks
//                 }}
//               />

//               {/* ITEMS */}
//               {items.map((item, idx) => (
//                 <TimelineItem key={idx} item={item} index={idx} />
//               ))}
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// // --- DESKTOP ITEM (WAMOS STYLE) ---
// function TimelineItem({ item, index }: { item: TimelineItem; index: number }) {
//   // Alternate top/bottom if not specified
//   const isTop = (item.side ?? (index % 2 === 0 ? "top" : "bottom")) === "top";
//   const Icon = item.icon;

//   return (
//     <div className="relative shrink-0 w-[300px] md:w-[400px] h-[500px] flex justify-center items-center snap-center">
      
//       {/* DOT ON AXIS */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
//         <div className="w-4 h-4 bg-slate-800 rounded-full border-4 border-slate-50" />
//       </div>

//       {/* CONTENT GROUP */}
//       <motion.div
//         initial={{ opacity: 0, y: isTop ? -20 : 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//         className={cn(
//           "absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center",
//           // Positioning logic:
//           // If Top: sit at 50% (middle) and go UP.
//           // If Bottom: sit at 50% (middle) and go DOWN.
//           isTop ? "bottom-1/2 pb-8" : "top-1/2 pt-8"
//         )}
//       >
//         {/* VERTICAL LINE CONNECTOR */}
//         <div 
//           className={cn(
//             "absolute w-[1px] bg-slate-400 h-16",
//             isTop ? "bottom-0" : "top-0"
//           )}
//         />

//         {/* CONTENT CARD / TEXT */}
//         <div className={cn("relative z-10 p-4", isTop ? "mb-2" : "mt-2")}>
//           <span className="block text-4xl md:text-5xl font-bold text-slate-200 mb-2">
//             {item.year}
//           </span>
//           <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
//           <p className="text-sm text-slate-500 max-w-[250px] mx-auto leading-relaxed">
//             {item.description}
//           </p>
          
//           {/* ICON FLOATING */}
//           <div className="mt-2 text-slate-400 opacity-50 flex justify-center">
//              <Icon size={20} />
//           </div>
//         </div>

//       </motion.div>
//     </div>
//   );
// }

// // --- MOBILE ITEM (Simple Vertical Stack) ---
// function VerticalItem({ item }: { item: TimelineItem }) {
//   const Icon = item.icon;
//   return (
//     <div className="flex gap-4 mb-8">
//       <div className="flex flex-col items-center">
//         <div className="w-3 h-3 bg-slate-800 rounded-full shrink-0 mt-2" />
//         <div className="w-[1px] h-full bg-slate-200 my-1" />
//       </div>
//       <div className="pb-8">
//         <span className="text-2xl font-bold text-slate-300 block">{item.year}</span>
//         <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
//         <p className="text-slate-600 mt-1 text-sm">{item.description}</p>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Building,
  Eye,
  Flag,
  Globe,
  LucideIcon,
  Network,
  Users,
} from "lucide-react";

// --- TYPES ---
export type TimelineItem = {
  year: number;
  title?: string;
  description: string;
  side?: "top" | "bottom";
  icon: LucideIcon;
};

const DEFAULT_ITEMS: TimelineItem[] = [
  {
    year: 2016,
    title: "PM's 10-Point Agenda",
    description:
      "Hon'ble PM presents 10-point agenda at AMCDRR, New Delhi — Point 6 calls for a network of universities to collaborate on diverse climate change issues, laying the strategic foundation for ADRES.",
    side: "top",
    icon: Flag,
  },
  {
    year: 2020,
    title: "National Mandates Strengthen",
    description:
      "NPDRR proceedings outline the need to promote platforms for knowledge exchange, support CoEs on DRR themes, and link interdisciplinary research with policy planning and capacity building.",
    side: "bottom",
    icon: Globe,
  },
  {
    year: 2022,
    title: "DST Identifies the Gap",
    description:
      "The Department of Science & Technology (DST) recognises the fragmented landscape of climate and DRR research and identifies the urgent need for a unified national knowledge integration platform.",
    side: "top",
    icon: Eye,
  },
  {
    year: 2023,
    title: "ICARS Assigned by DST",
    description:
      "DST entrusts ICARS at IIT-Roorkee — India's Centre of Excellence in Adaptation — with the responsibility to conceptualise and build the ADRES network.",
    side: "bottom",
    icon: Building,
  },
  {
    year: 2023,
    title: "ADRES Conceived — 18 July 2023",
    description:
      "At a high-level consultative workshop jointly organised by NIDM and DST, the ADRES network is formally conceived as a 'network of networks' to bridge critical knowledge gaps in climate change adaptation and resilience.",
    side: "top",
    icon: Users,
  },
  {
    year: 2024,
    title: "National Consultation — December 2024",
    description:
      "A national consultation meeting refines the ADRES conceptual framework, consolidating inputs from CoEs, state agencies, sectoral ministries, and international partners.",
    side: "bottom",
    icon: Network,
  },
  {
    year: 2025,
    title: "National Consultation Workshop — February 2025",
    description:
      "A national consultation workshop advances the ADRES framework, aligning thematic clusters and portal design with stakeholder needs across DRR, climate adaptation, and sustainability.",
    side: "top",
    icon: Network,
  },
  {
    year: 2026,
    title: "Climate Knowledge Platform Ready to Launch",
    description:
      "The ADRES Knowledge Network and Portal is ready to launch — acting as India's unified digital backbone connecting CoEs, ministries, missions, and agencies for evidence-based climate action.",
    side: "bottom",
    icon: Globe,
  },
];;

export function HorizontalTimeline({
  items = DEFAULT_ITEMS,
  className,
}: {
  items?: TimelineItem[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(1000);

  // --- LAYOUT CONFIGURATION ---
  const ITEM_WIDTH = 300; // Distance between items
  const START_OFFSET = 800; // Pushes the first item RIGHT so it's not cut off
  const END_OFFSET = 400;   // Extra space at the end so you can scroll past the last item

  // Calculate total width of the rail content
  const totalRailWidth = START_OFFSET + (items.length - 1) * ITEM_WIDTH + END_OFFSET;

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewportWidth < 768;
  const minHeight = isMobile ? "auto" : `${items.length * 35}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  // Calculate how far to slide Left
  // We want to stop sliding when the end of the rail hits the right side of the screen
  const maxTranslate = totalRailWidth - viewportWidth;
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);
  const headerX = useTransform(scrollYProgress, [0, 0.15], ["-100%", "0%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  return (
   <section
  ref={containerRef}
  style={{ minHeight }}
  className="timeline-section theme-light relative w-full overflow-visible"
>



      <div className={cn("sticky top-0 h-screen w-full flex flex-col overflow-hidden", isMobile && "h-auto static block")}>
        
        {/* --- HEADER --- */}
   <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center pointer-events-none">
  <h2
    // style={{ x: headerX, opacity: headerOpacity }}
   className="timeline-title text-4xl sm:text-6xl font-serif leading-tight mb-5"
  >
    National Mandates to System Design — The Genesis of ADRES
  </h2>

</div>

        {/* --- TIMELINE RAIL --- */}
        <div className="flex-grow flex items-center relative w-full h-full">
          
          {isMobile ? (
            // MOBILE: Simple Vertical List
            <div className="w-full px-4 pb-20 pt-10">
              {items.map((item, i) => (
                <MobileItem key={i} item={item} />
              ))}
            </div>
          ) : (
            // DESKTOP: Horizontal Rail
            <motion.div
              style={{ x }}
              className="relative flex items-center h-full"
            >
              {/* MAIN AXIS LINE */}
             

              {/* RULER TICKS PATTERN (The "WAMOS" Look) */}
              <div 
                className="absolute top-1/2 left-0 h-4 w-full opacity-40 pointer-events-none"
                style={{ 
                    width: `${totalRailWidth}px`,
                    transform: 'translateY(-60%)',
backgroundImage: 'linear-gradient(90deg, #00060cff 1px, transparent 1px)',

                    backgroundSize: '50px 100%' // A tick every 20px
                }}
              />

              {/* ITEMS */}
              {items.map((item, index) => {
                // Determine absolute left position
                const leftPos = START_OFFSET + index * ITEM_WIDTH;
                const side = item.side || (index % 2 === 0 ? "top" : "bottom");

                return (
                   <TimelineNode 
                     key={index} 
                     item={item} 
                     leftPos={leftPos} 
                     side={side}
                   />
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// --- DESKTOP NODE COMPONENT ---
function TimelineNode({ item, leftPos, side }: { item: TimelineItem; leftPos: number, side: "top" | "bottom" }) {
  const isTop = side === "top";
  const Icon = item.icon;

  return (
    <div
      className="absolute top-1/2 flex flex-col items-center justify-center z-10"
      style={{ left: `${leftPos}px`, transform: "translate(-50%, -50%)" }}
    >
      {/* CIRCLE NODE (WAMOS Style) */}
   <div
  className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 z-20 shadow-sm"
 style={{
  backgroundColor: "var(--accent)",
  color: "var(--headline)"
}}

>

        <div className="w-2.5 h-2.5 bg-black rounded-full" />
      </div>

      {/* VERTICAL CONNECTOR LINE */}
      <div 
        className={cn(
          "absolute w-[2px] bg-black h-20 z-0",
          isTop ? "bottom-4" : "top-4"
        )}
      />

      {/* CONTENT CARD */}
      <motion.div
        initial={{ opacity: 0, y: isTop ? 10 : -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "absolute w-[360px] flex flex-col text-center",
          isTop ? "bottom-[6rem]" : "top-[6rem]"
        )}
      >
        {/* YEAR (Background Layer) */}
<span className="timeline-year text-[10rem] absolute left-1/2 -translate-x-1/2 -z-10">
          {item.year}
        </span>

        <div className="relative pt-4"> 
            {/* ICON */}
            <div className="mx-auto mb-3 p-2 bg-slate-100/50 rounded-full w-fit backdrop-blur-sm border border-slate-200">
           <Icon size={18} className="timeline-icon" />

            </div>

            {/* TEXT */}
            <h3 className="timeline-title text-xl">

            {item.title}
            </h3>
            {/* <p className="timeline-description mt-2 text-sm">

            {item.description}
            </p> */}
        </div>
      </motion.div>
    </div>
  );
}

// --- MOBILE COMPONENT ---
function MobileItem({ item }: { item: TimelineItem }) {
  const Icon = item.icon;

  return (
    <div className="relative pl-8 pb-12 border-l-2 last:border-0"
         style={{ borderColor: "var(--border)" }}>
      
      <div
        className="absolute left-[-9px] top-0 w-4 h-4 rounded-full border-4"
        style={{
          backgroundColor: "var(--accent)",
          borderColor: "var(--card-bg)",
        }}
      />

      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold" style={{ color: "var(--muted)" }}>
          {item.year}
        </span>
        <Icon size={16} className="timeline-icon" />
      </div>

      <h3 className="timeline-title text-lg">{item.title}</h3>

      <p className="timeline-description mt-2 text-sm">
        {item.description}
      </p>
    </div>
  );
}

export default HorizontalTimeline;