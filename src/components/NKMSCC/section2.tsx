// import React from 'react';
// import { Network, TrendingUp, Share2, Telescope, Lightbulb, Users, CheckCircle } from 'lucide-react';
// import { motion } from 'framer-motion';


// export function Section2Requirements() {
//   const requirements = [
//     { icon: Network, text: 'Establish networks of knowledge institutions', color: 'from-blue-500 to-cyan-500' },
//     { icon: TrendingUp, text: 'Quantum increase in climate science research', color: 'from-cyan-500 to-teal-500' },
//     { icon: Share2, text: 'Data-sharing systems', color: 'from-teal-500 to-emerald-500' },
//     { icon: Telescope, text: 'Technology foresight mechanisms', color: 'from-emerald-500 to-green-500' },
//     { icon: Lightbulb, text: 'Sub-missions for impact studies', color: 'from-green-500 to-lime-500' },
//     { icon: CheckCircle, text: 'S&T innovations', color: 'from-lime-500 to-cyan-500' },
//     { icon: Users, text: 'Strengthening institutional & human capacity', color: 'from-cyan-500 to-blue-500' },
//   ];

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-20 px-6">
//       <div className="max-w-7xl w-full">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-blue-900 mb-4">What NMSKCC Requires</h1>
//           <h2 className="text-cyan-700">The National Response</h2>
//         </motion.div>

//         {/* Roadmap Visualization */}
//         <div className="mb-16">
//           <RoadmapDiagram />
//         </div>

//         {/* Requirements Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
//           {requirements.map((req, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all group overflow-hidden"
//             >
//               <div className={`absolute inset-0 bg-gradient-to-br ${req.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
//               <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${req.color} flex items-center justify-center mb-4 shadow-md`}>
//                 <req.icon className="w-6 h-6 text-white" />
//               </div>
//               <p className="text-gray-700 relative z-10">{req.text}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function RoadmapDiagram() {
//   const stages = [
//     { label: 'Identify', icon: CheckCircle },
//     { label: 'Connect', icon: Network },
//     { label: 'Research', icon: Telescope },
//     { label: 'Innovate', icon: Lightbulb },
//     { label: 'Deploy', icon: TrendingUp },
//   ];

//   return (
//     <div className="relative max-w-5xl mx-auto">
//       <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-blue-200 p-8">
//         {/* Blueprint grid background */}
//         <div className="absolute inset-0 opacity-5">
//           <svg className="w-full h-full">
//             <defs>
//               <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
//                 <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
//           </svg>
//         </div>

//         <div className="relative flex items-center justify-between">
//           {stages.map((stage, index) => (
//             <div key={index} className="contents">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.15 }}
//                 viewport={{ once: true }}
//                 className="flex flex-col items-center"
//               >
//                 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg mb-3">
//                   <stage.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <span className="text-blue-900">{stage.label}</span>
//               </motion.div>
              
//               {index < stages.length - 1 && (
//                 <motion.div
//                   initial={{ scaleX: 0 }}
//                   whileInView={{ scaleX: 1 }}
//                   transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
//                   viewport={{ once: true }}
//                   className="flex-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-4 origin-left"
//                   style={{ transformOrigin: 'left' }}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React from "react";
// import {
//   Network,
//   TrendingUp,
//   Share2,
//   Telescope,
//   Lightbulb,
//   Users,
//   CheckCircle,
// } from "lucide-react";
// import { motion } from "framer-motion";

// export function Section2Requirements() {
//   const roadmap = [
//     {
//       label: "Identify",
//       icon: CheckCircle,
//       requirement: "Establish networks of knowledge institutions",
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       label: "Connect",
//       icon: Network,
//       requirement: "Data-sharing systems",
//       color: "from-cyan-500 to-teal-500",
//     },
//     {
//       label: "Research",
//       icon: Telescope,
//       requirement: "Quantum increase in climate science research",
//       color: "from-teal-500 to-emerald-500",
//     },
//     {
//       label: "Innovate",
//       icon: Lightbulb,
//       requirement: "S&T innovations",
//       color: "from-emerald-500 to-green-500",
//     },
//     {
//       label: "Deploy",
//       icon: TrendingUp,
//       requirement: "Strengthening institutional & human capacity",
//       color: "from-green-500 to-blue-500",
//     },
//   ];

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-20 px-6 flex justify-center">
//       <div className="max-w-5xl w-full">

//         {/* Title */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h1 className=" mb-4 text-amber-900 mb-4 text-5xl sm:text-6xl font-serif leading-tight drop-shadow-lg">What NMSKCC Requires ?</h1>
          
//         </motion.div>

//         {/* Vertical Roadmap */}
//         <div className="relative mx-auto">

//           {/* Vertical Center Line */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full" />

//           <div className="space-y-24 relative z-10">

//             {roadmap.map((step, index) => {
//               const isLeft = index % 2 === 0; // even index = left, odd = right

//               return (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 40 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6 }}
//                   viewport={{ once: true }}
//                   className={`relative flex items-center w-full`}
//                 >

//                   {/* LEFT SIDE CONTENT */}
//                   {isLeft && (
//                     <div className="flex-1 flex justify-end pr-10">
//                       <RequirementCard step={step} index={index} side="left" />
//                     </div>
//                   )}

//                   {/* CENTER ICON */}
//                   <div className="relative z-20">
//                     <div
//                       className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}
//                     >
//                       <step.icon className="w-10 h-10 text-white" />
//                     </div>

//                     {/* Step Label */}
//                     <div className="text-center mt-3 text-blue-900 font-medium">
//                       {step.label}
//                     </div>
//                   </div>

//                   {/* RIGHT SIDE CONTENT */}
//                   {!isLeft && (
//                     <div className="flex-1 flex justify-start pl-10">
//                       <RequirementCard step={step} index={index} side="right" />
//                     </div>
//                   )}
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//         {/* <h2 className="text-[#2C3E50] text-4xl sm:text-7xl font-serif leading-tight drop-shadow-lg mb-6">The National Response</h2> */}
//       </div>

      
//     </section>
//   );
// }

// /* Requirement Card */
// function RequirementCard({ step, index, side }: any) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6 }}
//       viewport={{ once: true }}
//       className="w-full md:w-3/4 p-6 rounded-xl bg-white shadow-lg border border-blue-100 relative"
//     >
//       {/* Hover gradient */}
//       <div
//         className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.color} opacity-0 hover:opacity-10 transition-opacity`}
//       />

//       <p className="relative z-10 text-[#6C91BF] text-lg Roboto mt-6 tracking-wide drop-shadow-sm font-medium">
//         {step.requirement}
//       </p>
//     </motion.div>
//   );
// }
"use client";

import { motion } from "framer-motion";
import {
  CloudRain,
  Network,
  GraduationCap,
  LineChart,
  Users,
  Award,
  CheckCircle,
  Telescope,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

export default function UnifiedNMSKCCFramework() {
  const framework = [
    {
      pillarTitle: "Pillar 1",
      pillarSubtitle: "Strengthening Climate Science",
      pillarColor: "from-blue-600 to-blue-400",
      pillarIcon: CloudRain,
      requirements: [
        { icon: Telescope, label: "Research", text: "Quantum increase in climate science research" },
        { icon: Lightbulb, label: "Innovate", text: "S&T innovations for climate modelling" },
      ],
      outputs: [
        { icon: LineChart, text: "Region-specific climate modelling" },
        { icon: CloudRain, text: "Impact assessments" },
        { icon: LineChart, text: "Sector-wise climate research" },
      ],
    },
    {
      pillarTitle: "Pillar 2",
      pillarSubtitle: "Building Knowledge & Technology Networks",
      pillarColor: "from-emerald-600 to-emerald-400",
      pillarIcon: Network,
      requirements: [
        { icon: CheckCircle, label: "Identify", text: "Establish networks of knowledge institutions" },
        { icon: Network, label: "Connect", text: "Data-sharing systems & institutional linkages" },
      ],
      outputs: [
        { icon: Network, text: "National knowledge networks" },
        { icon: Users, text: "Linking research institutions" },
        { icon: CloudRain, text: "Global technology watch groups" },
      ],
    },
    {
      pillarTitle: "Pillar 3",
      pillarSubtitle: "Enhancing Capacity",
      pillarColor: "from-teal-600 to-teal-400",
      pillarIcon: GraduationCap,
      requirements: [
        { icon: TrendingUp, label: "Deploy", text: "Strengthening institutional & human capacity" },
      ],
      outputs: [
        { icon: Award, text: "New Centres of Excellence" },
        { icon: GraduationCap, text: "50 Climate Research Chairs" },
        { icon: Users, text: "Training 200 climate professionals" },
      ],
    },
  ];

  return (
   <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-20 px-6">
      <div className="max-w-7xl w-full">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-amber-900 text-5xl sm:text-6xl font-serif drop-shadow-lg">
            NMSKCC Mission of DST
          </h1>
          
        </motion.div>

        {/* Vertical Line */}
{/* Vertical Line - starts below heading */}
{/* Vertical Line — contained inside its own section */}
<div className="absolute left-1/2 top-40 w-1 h-[85%] bg-gradient-to-b from-blue-400 to-teal-400 rounded-full z-0" />



        {/* Framework Blocks */}
        <div className="space-y-32 relative z-10">

          {framework.map((block, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative flex items-start w-full"
              >
                {/* LEFT SIDE (Requirements) */}
                {isLeft && (
                  <div className="flex-1 flex justify-end pr-10">
                    <RequirementColumn block={block} side="left" />
                  </div>
                )}

                {/* CENTER PILLAR ICON + TITLE */}
                <div className="relative flex flex-col items-center z-20">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${block.pillarColor} flex items-center justify-center shadow-xl`}>
                    <block.pillarIcon className="w-12 h-12 text-white" />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-blue-900">{block.pillarTitle}</h3>
                    <p className="text-blue-700">{block.pillarSubtitle}</p>
                  </div>
                </div>

                {/* RIGHT SIDE (Outputs) */}
                {!isLeft && (
                  <div className="flex-1 flex justify-start pl-10">
                    <OutputColumn block={block} side="right" />
                  </div>
                )}
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

/* Requirement Column */
function RequirementColumn({ block, side }: any) {
  return (
    <div className="w-full md:w-3/4 space-y-6">
      {block.requirements.map((req: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 bg-white border border-blue-100 rounded-xl shadow-lg relative"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${block.pillarColor}`}>
            <req.icon className="w-5 h-5 text-white" />
          </div>
          <h4 className="mt-3 text-blue-900 font-medium">{req.label}</h4>
          <p className="text-[#6C91BF] mt-1">{req.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* Output Column */
function OutputColumn({ block, side }: any) {
  return (
    <div className="w-full md:w-3/4 space-y-6">
      {block.outputs.map((op: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: side === "right" ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 bg-white border border-emerald-100 rounded-xl shadow-lg relative"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${block.pillarColor}`}>
            <op.icon className="w-5 h-5 text-white" />
          </div>
          <p className="mt-2 text-gray-700">{op.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
