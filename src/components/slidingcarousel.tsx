"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu , GripVertical } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { BookOpen, Target, Mountain, Globe } from "lucide-react";
import { time } from "console";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Target,
  Mountain,
  Globe,
};

interface Slide {
  id: string;
  heading: string;
  paragraph?: string;
  cards?: { icon: any; title: string; description: string }[];
  timeline?:{year: string; event:string}[];
}

interface MenuItem {
  title: string;
  href: string; // something like "?section=mission"
}

interface SlidingCarouselProps {
  slides: Slide[];
  menuItems?: MenuItem[];
  initialIndex?: number;
}

export default function SlidingCarousel({
  slides,
  menuItems = [],
  initialIndex = 0,
}: SlidingCarouselProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [openMenu, setOpenMenu] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [hasShown, setHasShown] = useState(false);
const [hasMounted, setHasMounted] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // Sync with initialIndex prop
  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex]);

  // Jump to slide based on query param
  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      const index = slides.findIndex((s) => s.id === section);
      if (index !== -1) {
        setCurrent(index);
        carouselRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams, slides]);

  // Show floating menu when carousel comes into view (once)
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setShowToggle(entry.isIntersecting); // show only when in view
    },
    { root: null, threshold: 0.3 }
  );

  if (carouselRef.current) {
    observer.observe(carouselRef.current);
  }

  return () => {
    if (carouselRef.current) {
      observer.unobserve(carouselRef.current);
    }
  };
}, []);


  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  return (
    <div ref={carouselRef} className="relative w-full flex flex-col items-center">
      {/* Floating Toggle Menu */}
      {showToggle && (
  <div
    className="absolute top-20 left-0 z-50 group"
    ref={menuRef}
  >
   
<div className="relative group">
  {/* Edge Tab */}
  <div
    className="bg-gray-800 text-white px-2 py-3 rounded-r-md shadow-lg 
               flex items-center justify-center"
  >
    <span className="text-sm font-medium [writing-mode:vertical-rl] rotate-180">
      Menu
    </span>
  </div>

  {/* Dropdown Menu */}
  <div className="absolute left-full top-0 mt-0 ml-0 w-48 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 pointer-events-none 
                  group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
    {menuItems.map((item) => {
      const slideIndex = slides.findIndex(
        (s) => s.id === item.href.split("=")[1]
      );
      return (
        <button
          key={item.href}
          onClick={() => {
            if (slideIndex !== -1) {
              setCurrent(slideIndex);
              carouselRef.current?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
            slideIndex === current ? "bg-blue-600 text-white" : ""
          }`}
        >
          {item.title}
        </button>
      );
    })}
  </div>
</div>

</div>
      )}
      {/* Carousel Content */}
      <div className="w-full max-w-5xl overflow-hidden bg-white/80 p-6 mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">{slides[current].heading}</h2>
         {slides[current].cards ? (
  // Cards layout
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
    {slides[current].cards!.map((card, idx) => {
      const Icon = iconMap[card.icon];
      return (
        <div
          key={idx}
          className="p-4 border rounded-lg shadow hover:shadow-lg transition"
        >
          <div className="mb-4 flex justify-center">
            {Icon && <Icon className="h-8 w-8 text-primary" />}
          </div>
          <h3 className="font-semibold">{card.title}</h3>
          <p className="text-sm text-muted-foreground">{card.description}</p>
        </div>
      );
    })}
  </div>
) : slides[current].timeline ? (
  // Timeline layout
  <div className="mt-8 space-y-4">
    {slides[current].timeline.map((timeline, idx:any) => (
      <div key={idx} className="flex items-start space-x-4">
        <span className="text-lg font-bold text-primary">{timeline.year}</span>
        <p className="text-muted-foreground">{timeline.event}</p>
      </div>
    ))}
  </div>
) : (
  // Default paragraph layout
  <p className="text-gray-700">{slides[current].paragraph}</p>
)}

          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 w-2 rounded-full transition ${
                idx === current ? "bg-blue-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
