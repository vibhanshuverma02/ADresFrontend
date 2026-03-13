"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SlidingCarousel from "./slidingcarousel";

interface Slide {
  id: string;
  heading: string;
  paragraph?: string;
  cards?: { icon: any; title: string; description: string }[];
  timeline?: { year: string; event: string }[];
}

interface MenuItem {
  title: string;
  href: string;
}

export default function AboutCarouselWrapper({ slides }: { slides: Slide[] }) {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  const [index, setIndex] = useState<number | null>(null); // ⭐ initially null

  useEffect(() => {
    if (!slides.length) return;

    if (section) {
      const foundIndex = slides.findIndex((s) => s.id === section);
      setIndex(foundIndex !== -1 ? foundIndex : 0);
    } else {
      setIndex(0);
    }
  }, [section, slides]);

  // ⭐ Do NOT render the carousel until index is fully calculated
  if (index === null) return null;

  const menuItems: MenuItem[] = slides.map((slide) => ({
    title: slide.heading,
    href: `?section=${slide.id}`,
  }));

  return (
    <SlidingCarousel
      slides={slides}
      menuItems={menuItems}
      initialIndex={index}
    />
  );
}
