// import React from "react";
// import { motion } from "framer-motion";

// export function Section1Challenge() {
//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-red-50 to-orange-50 py-20 px-6">
//       <div className="max-w-7xl w-full">

//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-amber-900 mb-4 text-5xl sm:text-8xl font-serif leading-tight drop-shadow-lg">
//             The Challenge
//           </h1>
//         </motion.div>

//         <div className="relative mb-16">
//           <IndiaMapBroken />
//         </div>

//       </div>
//     </section>
//   );
// }

// function IndiaMapBroken() {
//   const gaps = [
//     "Knowledge gaps in climate science",
//     "Insufficient observational & scientific data",
//     "Weak connectivity between knowledge communities",
//     "No global technology watch system",
//     "Limited understanding of sectoral climate impacts",
//     "Lack of national mechanism for delivering knowledge",
//     "Sectoral climate impact uncertainties",
//   ];

//   const nodes = [
//     { x: 35, y: 12 },
//     { x: 62, y: 20 },
//     { x: 48, y: 32 },
//     { x: 25, y: 45 },
//     { x: 64, y: 50 },
//     { x: 22, y: 62 },
//     { x: 55, y: 68 },
//   ];

//   return (
//     <div className="relative h-[520px] w-full overflow-visible">

//       {/* India Map Background */}
//       <img
//         src="/india-silhouette.png"
//         alt="India Map"
//         className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none"
//       />

//       {/* Center Warning Symbol */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
//         <div className="text-red-600 text-8xl font-black opacity-30 leading-none">
//           ⚠
//         </div>
//         <p className="text-red-700 text-lg font-semibold opacity-80 mt-2 whitespace-nowrap">
//           India’s Climate Knowledge Gaps
//         </p>
//       </div>

//       {/* Nodes + Labels */}
//       {nodes.map((node, i) => {
//         const isLeftSide = node.x < 50; // Dynamic: card flips automatically
//         return (
//           <div
//             key={i}
//             className="absolute"
//             style={{
//               left: `${node.x}%`,
//               top: `${node.y}%`,
//               transform: "translate(-50%, -50%)",
//             }}
//           >
//             {/* Dot */}
//             <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.7)]" />

//             {/* Floating Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 10, scale: 0.95 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{
//                 duration: 0.6,
//                 ease: "easeOut",
//                 delay: i * 0.15,
//               }}
//               className={`
//                 absolute bg-white/95 px-4 py-2 rounded-lg 
//                 text-[0.8rem] sm:text-sm
//                 leading-snug border border-red-200 
//                 shadow-lg backdrop-blur
//                 max-w-[200px] sm:max-w-[230px]
//                 ${isLeftSide ? "-translate-x-full -ml-3" : "ml-3"}
//               `}
//               style={{
//                 top: "-6px",
//                 whiteSpace: "normal",
//               }}
//             >
//               {gaps[i]}
//             </motion.div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default IndiaMapBroken;
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function IndiaBrokenKnowledgeNetwork() {
  const gaps = [
    "Knowledge gaps in climate science",
    "Insufficient observational & scientific data",
    "Weak connectivity between knowledge communities",
    "No global technology watch system",
    "Limited understanding of sectoral climate impacts",
    "Lack of national mechanism for delivering knowledge",
    "Sectoral climate impact uncertainties",
  ];

  const nodes = [
    { x: "22%", y: "18%" },
    { x: "72%", y: "20%" },
    { x: "55%", y: "5%" },
    { x: "10%", y: "50%" },
    { x: "78%", y: "52%" },
    { x: "25%", y: "70%" },
    { x: "60%", y: "78%" },
  ];

  // BROKEN / DISCONNECTED LINES
  const brokenConnections = [
    { from: 0, to: 1 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 5, to: 6 },
  ];

  return (
    <div className="relative h-[550px] w-full bg-gradient-to-br from-amber-50 via-red-50 to-orange-50 backdrop-blur-md rounded-3xl border border-white/30 shadow-xl overflow-hidden">

      {/* India Silhouette Background */}
      <img
        src="/india-silhouette.png"
        className="absolute inset-0 w-full h-full object-contain opacity-10"
      />
 <h1 className="text-amber-900 mb-4 text-5xl sm:text-8xl font-serif leading-tight drop-shadow-lg">
           The Challenge
         </h1>
      {/* Warning / Gap Indicator */}
     <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-[5] pointer-events-none">
  <AlertTriangle className="w-20 h-20 text-red-500 opacity-40" />
  <p className="text-red-700 font-semibold mt-2 text-lg">
    India's Climate Knowledge Gaps
  </p>
</div>


      {/* BROKEN LINES */}
      {/* <svg className="absolute inset-0 w-full h-full pointer-events-none z-[3]">
        <defs>
          <linearGradient id="broken-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {brokenConnections.map((conn, i) => {
          const a = nodes[conn.from];
          const b = nodes[conn.to];

          return (
            <motion.line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#broken-line)"
              strokeWidth="2.5"
              strokeDasharray="14 10"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.2, delay: i * 0.12 }}
              viewport={{ once: true }}
            />
          );
        })}
      </svg> */}

      {/* Nodes + Labels */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute z-[10]"
          style={{
            left: node.x,
            top: node.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
          viewport={{ once: true }}
        >
          <div className="relative flex flex-col items-center">

            {/* Node Dot */}
           <div className="text-red-600 text-3xl font-bold 
     drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] mb-2">
  ?
</div>


            {/* Gap Card */}
            <motion.div
              className="bg-white shadow-md rounded-2xl px-4 py-2 text-sm text-gray-800 max-w-[160px] text-center border border-red-100"
              initial={{ y: 8, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {gaps[i]}
            </motion.div>

          </div>
        </motion.div>
      ))}
    </div>
  );
}
