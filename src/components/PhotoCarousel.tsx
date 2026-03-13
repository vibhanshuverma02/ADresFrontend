"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type CardCarouselProps = {
  images: string[];
  position?: string;
  className?: string; // Let user control dimensions fully
};

export default function StackedCardCarousel({
  images,
  position = "absolute right-0 top-1/2 -translate-y-1/2",
  className = "w-[260px] md:w-[360px] ", // Default ratio (3:5)
}: CardCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={`${position} pointer-events-none`}>
      <div className="relative flex items-center justify-center">
        {images.map((img, i) => {
          const rotation = i === index ? 0 : i < index ? -4 : 4;
          const scale = i === index ? 1 : 0.92;
          const zIndex = i === index ? 10 : 5;

          return (
            <AnimatePresence key={i}>
              {i === index && (
                <motion.div
                  className={`absolute shadow-xl rounded-2xl overflow-hidden ${className}`}
                  style={{ zIndex }}
                  initial={{ opacity: 0, scale: 0.95, rotate: rotation }}
                  animate={{ opacity: 1, scale, rotate: rotation }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      alt="carousel card"
                      fill
                      className="object-contain rounded-2xl"
                      unoptimized
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
}
