// "use client";

// import { motion } from "framer-motion";

// export default function PrismScene() {
//   return (
//     <section className="relative w-full h-[600px] flex flex-col items-center justify-center bg-white overflow-hidden">

//       {/* White Light Beam */}
//       <motion.div
//         initial={{ opacity: 0, x: -80 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1 }}
//         className="absolute left-0 top-1/2 h-2 w-[40%] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
//       />

//       {/* Prism */}
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         whileInView={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="relative w-0 h-0 
//           border-l-[80px] border-l-transparent
//           border-r-[80px] border-r-transparent
//           border-b-[120px] border-b-slate-200
//           drop-shadow-xl"
//       >
//         {/* Prism shine */}
//         <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent blur-md"></div>
//       </motion.div>

//       {/* VIBGYOR beam */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="absolute top-[55%] w-4/5 h-6
//           bg-gradient-to-r
//           from-red-500 via-orange-400 via-yellow-400 via-green-500
//           via-blue-500 via-indigo-500 to-purple-600
//           rounded-full blur-sm shadow-[0_0_30px_rgba(0,0,0,0.2)]"
//       />

//       {/* ADRES Network Label */}
//       <motion.h1
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="absolute bottom-10 text-4xl font-semibold text-slate-700 tracking-wide"
//       >
//         ADRES Network
//       </motion.h1>

//     </section>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(false);
//       setTimeout(onFinish, 600);
//     }, 2400);
//     return () => clearTimeout(timer);
//   }, [onFinish]);

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           exit={{ y: "100%", opacity: 0 }}
//           transition={{ duration: 0.7, ease: "easeInOut" }}
//           className="fixed inset-0 flex items-center justify-center bg-white z-[9999]"
//         >
//           <div className="flex flex-col items-center space-y-8">

//             {/* =======================
//                 Paint Funnel Animation
//             ========================== */}
//             <div className="relative w-64 h-56 flex items-center justify-center">

//               {/* 4 Pouring Paint Streams */}
//               {[
//                 { color: "#B38C00", left: "10%" }, // Feder
//                 { color: "#6AAAE0", left: "35%" }, // Implementer
//                 { color: "#4B8D3A", left: "60%" }, // Policy User
//                 { color: "#C1520D", left: "85%" }, // Resource Agencies
//               ].map((p, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ height: 0 }}
//                   animate={{ height: 80 }}
//                   transition={{
//                     duration: 0.8,
//                     delay: i * 0.2,
//                     ease: "easeInOut",
//                   }}
//                   className="absolute top-0 w-3 rounded-b-full"
//                   style={{
//                     left: p.left,
//                     backgroundColor: p.color,
//                   }}
//                 />
//               ))}

//               {/* Funnel */}
//               <motion.div
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 transition={{ delay: 0.5, duration: 0.5 }}
//                 className="absolute top-20 w-48 h-24 bg-gray-300 rounded-full shadow-inner"
//               />

//               {/* Funnel Neck */}
//               <motion.div
//                 initial={{ height: 0 }}
//                 animate={{ height: 40 }}
//                 transition={{ delay: 1, duration: 0.6 }}
//                 className="absolute top-36 w-10 bg-gray-400 rounded-b-lg"
//               />

//               {/* Mixed Paint Coming Out */}
//               <motion.div
//                 initial={{ height: 0 }}
//                 animate={{ height: 50 }}
//                 transition={{ delay: 1.2, duration: 0.6 }}
//                 className="absolute top-[13.5rem] w-4 rounded-b-full"
//                 style={{
//                   background:
//                     "linear-gradient(to bottom, #B38C00, #6AAAE0, #4B8D3A, #C1520D)",
//                 }}
//               />
//             </div>

//             {/* =======================
//                 ADRES Network Text
//             ========================== */}
//             <motion.h1
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{
//                 duration: 0.6,
//                 ease: "easeInOut",
//               }}
//               className="text-4xl font-extrabold tracking-wide"
//             >
//               <span style={{ color: "#B38C00" }}>A</span>
//               <span style={{ color: "#B38C00" }}>D</span>
//               <span style={{ color: "#6AAAE0" }}>R</span>
//               <span style={{ color: "#6AAAE0" }}>E</span>
//               <span style={{ color: "#4B8D3A" }}>S</span>{" "}
//               <span style={{ color: "#C1520D" }}>Network</span>
//             </motion.h1>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 600);
    }, 2400);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
      <motion.div
  initial={{ opacity: 1 }}
  exit={{ y: "100%", opacity: 0 }}
  transition={{ duration: 0.7, ease: "easeInOut" }}
  className="fixed inset-0 flex items-center justify-center bg-black z-[9999]"
>
  {/* Video container @ 50% width + height */}
  <div className="relative w-1/2  rounded-xl overflow-hidden">

    <motion.video
      src="/videos/spalsh.mp4"
      autoPlay
      muted
      loop
      playsInline
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-full object-cover"
    />

  </div>
</motion.div>
      )}
    </AnimatePresence>
  );
}
