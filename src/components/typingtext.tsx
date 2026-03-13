"use client";

import { motion } from "framer-motion";

type Props = {
  displayedText: string;
  done: boolean;
  as?: "p" | "span" | "div";
  className?: string;
};

export default function TypingText({
  displayedText,
  done,
  as = "p",
  className,
}: Props) {
  const Tag = as as any;

  return (
    <Tag className={className}>
      {displayedText}
      {/* IMPORTANT: use <span>, not <div>, inside a <p> */}
      {done && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      )}
    </Tag>
  );
}
