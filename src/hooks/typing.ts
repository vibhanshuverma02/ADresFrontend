"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stable typing hook:
 * - avoids hydration mismatch
 * - safe in React Strict Mode
 * - ignores leading spaces (or preserve with whiteSpace: 'pre')
 */
export function useTyping(text: string, speed = 30, start = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  const idxRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start || !text) return;

    // Option A: trim leading spaces so HTML collapsing doesn't “eat” them
    const normalized = text.replace(/^\s+/, "");
    // Option B: if you want to keep leading spaces visually, use CSS: white-space: 'pre-wrap'

    idxRef.current = 0;
    setDisplayed("");
    setDone(false);

    const tick = () => {
      const i = idxRef.current;
      setDisplayed(normalized.slice(0, i + 1));
      idxRef.current = i + 1;

      if (idxRef.current >= normalized.length) {
        setDone(true);
        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = null;
        return;
      }
      timerRef.current = window.setTimeout(tick, speed);
    };

    timerRef.current = window.setTimeout(tick, speed);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [text, speed, start]);

  return { displayed, done };
}
