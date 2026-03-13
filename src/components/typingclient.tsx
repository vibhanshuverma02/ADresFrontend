"use client";

import TypingText from "./typingtext";
import { useEffect, useState } from "react";
import { useTyping } from "@/hooks/typing";

export default function HeroTypingClient({ text }: { text: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { displayed, done } = useTyping(text, 30, mounted);

  return (
    <TypingText
      displayedText={displayed}
      done={done}
      as="p"
      className="mt-6 text-xl leading-8 max-w-3xl text-left"
    />
  );
}
