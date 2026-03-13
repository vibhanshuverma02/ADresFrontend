
// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";

// export default function PortalGrid() {
//   const tiles = [
//     {
//       title: "Knowledge Hub",
//       images: ["/image.png", "/latest resource.png", "/image.png"],
//       link: "/knowledge",
//       size: "row-span-2",
//     },
//     {
//       title: "Events Calendar",
//       images: ["/latest resource.png", "/image.png"],
//       link: "/events",
//     },
//     {
//       title: "Global News",
//       images: ["/latest resource.png", "/image.png", "/latest resource.png"],
//       link: "/news",
//     },
//     {
//       title: "Gallery",
//       images: ["/image.png", "/latest resource.png"],
//       link: "/gallery",
//     },
//     {
//       title: "Discussion Forums",
//       images: ["/latest resource.png", "/image.png"],
//       link: "/forum",
//     },
//     {
//       title: "Working & Development Community",
//       images: ["/latest resource.png", "/image.png"],
//       link: "/community",
//       size: "col-span-2",
//     },
//     {
//       title: "People Directory",
//       images: [ "/latest resource.png","/image.png" ],
//       link: "/members",
//     },
//   ];

//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => prev + 1);
//     }, 3500); // change speed here

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="theme-light timeline-section py-24 px-6 lg:px-16">
//       <div className="max-w-8xl mx-auto">
//         <h2 className="timeline-title text-4xl sm:text-6xl font-serif leading-tight mb-5">
//           Explore the ADRES Platform
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[220px]">
//           {tiles.map((t, i) => {
//             const img = t.images[index % t.images.length];

//             return (
//               <motion.div
//                 key={i}
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 1.08 }}
//                 transition={{ duration: 0.25 }}
//                 className={`relative rounded-3xl overflow-hidden shadow-xl border bg-white ${t.size}`}
//                 style={{ borderColor: "var(--border)" }}
//               >
//                 <Link href={t.link} className="block w-full h-full">
//                   <motion.img
//                     key={img}
//                     src={img}
//                     alt={t.title}
//                     className="w-full h-full object-contain bg-[#f4f4f4]"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.6 }}
//                   />

//                  <div className="absolute inset-0 bg-gradient-to-t from-[#8C6239]/50 via-[#F8F6F2]/10 to-transparent" />


//                   <div className="absolute bottom-4 left-4 text-white text-lg font-semibold tracking-wide">
//                     {t.title}
//                   </div>
//                 </Link>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// // }
// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";

// export default function PortalGrid() {
//   const initialTiles = [
//     { title: "Knowledge Hub", images: ["/image.png", "/latest resource.png" ], link: "/knowledge" , size: "row-col-2",},
//     { title: "Events Calendar", images: ["/latest resource.png", "/image.png"], link: "/events" , size: "row-span-2", },
//     { title: "Global News", images: ["/latest resource.png", "/image.png"], link: "/news" , },
//     { title: "Gallery", images: ["/image.png", "/latest resource.png"], link: "/gallery" },
//     { title: "Discussion Forums", images: ["/latest resource.png", "/image.png"], link: "/forum" },
//     { title: "Working & Development Community", images: ["/image.png"], link: "/community" ,  size: "row-span-2",},
//     { title: "People Directory", images: ["/latest resource.png"], link: "/members" },
//   ];

//   const [tiles, setTiles] = useState(initialTiles);
//   const [index, setIndex] = useState(0);

//   // helper — shuffle
//   const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => prev + 1);

//       setTiles((prev) => {
//         // shuffle positions
//         let shuffled = shuffle(prev);

//         // randomly give a couple cards larger sizes
//         return shuffled.map((t, i) => ({
//           ...t,
//           size:
//             i === 0
//               ? "row-span-2"
//               : i === 3
//               ? "col-span-2"
//               : "" // others normal
//         }));
//       });
//     }, 3500);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="theme-light py-24 px-6 lg:px-16">
//       <div className="max-w-8xl mx-auto">
//         <h2 className="text-4xl sm:text-6xl font-serif mb-5">
//           Explore the ADRES Platform
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]">
//           {tiles.map((t, i) => {
//             const img = t.images[index % t.images.length];

//             return (
//               <motion.div
//                 key={t.title}
//                 layout        // 👈 smooth movement animation
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 1.08 }}
//                 transition={{ duration: 0.45 }}
//                 className={`relative rounded-3xl overflow-hidden shadow-xl border bg-white ${t.size}`}
//               >
//                 <Link href={t.link} className="block w-full h-full">
//                   <motion.img
//                     key={img}
//                     src={img}
//                     className="w-full h-full object-contain"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.6 }}
//                   />

//                  <div className="absolute inset-0 bg-gradient-to-t from-[#8C6239]/50 via-[#F8F6F2]/10 to-transparent" />

//                   <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
//                     {t.title}
//                   </div>
//                 </Link>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function PortalGrid() {
  const initialTiles = [
    { title: "Knowledge Hub", images: [ "/latest resource.png", "/Resourcepage.png"], link: "/Resource", size: "col-span-2" },
    { title: "Events Calendar", images: ["/events/image3.png", "/events/image1.png"], link: "/events", size: "row-span-2" },
    { title: "Global News", images: ["/india-silhouette.png"], link: "/news" },
    { title: "Gallery", images: ["/events/image.png","/events/image1.png","/events/image2.png"], link: "/events" },
    { title: "Discussion Forums", images: ["/test1.png", "/discusion.png"], link: "/Resource/Discussion" },
    { title: "Working & Development Community", images: ["/image1.png"], link: "/KeyAllices" },
     ];

  const [tiles, setTiles] = useState(initialTiles);
  const [index, setIndex] = useState(0);

  const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);

  // 👉 TIMER 1 — rotate images (every 3s)
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(rotateInterval);
  }, []);

  // 👉 TIMER 2 — shuffle + resize cards (every 10s)
  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setTiles((prev) => {
        let shuffled = shuffle(prev);

        return shuffled.map((t, i) => ({
          ...t,
          size:
            i === 0
              ? "row-span-2"
              : i === 3  
              ? "col-span-2"
              : ""
        }));
      });
    }, 100000);

    return () => clearInterval(shuffleInterval);
  }, []);

  return (
    <section className="theme-light py-24 px-6 lg:px-16">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-serif mb-5">
          Explore the ADRES Platform
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
          {tiles.map((t) => {
            const isLarge =
              t.size?.includes("row-span-2") ||
              t.size?.includes("col-span-2");

            const img = t.images[index % t.images.length];

            return (
              <motion.div
                key={t.title}
                layout
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 1.08 }}
                transition={{ duration: 0.45 }}
                className={`relative rounded-3xl overflow-hidden shadow-xl border bg-white ${t.size}`}
              >
                <Link href={t.link} className="block w-full h-full">
                  
                  {isLarge ? (
                    <div className="grid grid-cols-2 gap-2 w-full h-full p-3 bg-[#f4f4f4]">
                      {t.images.slice(0, 6).map((img, i) => (
                        <motion.img
                          key={i}
                          src={img}
                          className="w-full h-full object-cover rounded-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      ))}
                    </div>
                  ) : (
                    <motion.img
                      key={img}
                      src={img}
                      className="w-full h-full object-cover bg-[#f4f4f4]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#8C6239]/50 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                    {t.title}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
