"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

const fullText = "UNA MIRADA MÁS EXCLUSIVA A LA HISTORIA DEL MÁS GRANDE";
const characters = fullText.split("");
const totalChars = characters.length;

function AnimatedChar({
  char,
  index,
  scrollYProgress,
}: {
  char: string;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Each character lights up based on scroll progress
  // Spread across 0.1 → 0.8 of scroll range so there's lead-in and lead-out
  const charStart = 0.1 + (index / totalChars) * 0.6;
  const charEnd = charStart + 0.04; // narrow transition window per character

  const opacity = useTransform(
    scrollYProgress,
    [charStart - 0.02, charStart, charEnd],
    [0.15, 1, 1]
  );

  return (
    <motion.span style={{ opacity }} className="inline-block text-white">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export default function HistoryReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Split into lines for layout
  const lines = [
    "UNA MIRADA",
    "MÁS EXCLUSIVA",
    "A LA HISTORIA",
    "DEL MÁS GRANDE",
  ];

  // Track the global char index across lines
  let globalIndex = 0;

  return (
    <section
      ref={containerRef}
      className="relative bg-[#1c1c1c] py-32 md:py-48 overflow-hidden"
    >
      {/* Centered logo */}
      <div className="flex justify-center mb-12">
        <Image
          src="/cool-s-logo.svg"
          alt="Gladiador 16"
          width={28}
          height={38}
          className="invert"
        />
      </div>

      <div className="text-center px-4 md:px-8">
        <h2 className="text-[7vw] md:text-[8vw] font-black tracking-tighter leading-[0.92] uppercase italic">
          {lines.map((line, lineIdx) => {
            const lineChars = line.split("");
            const lineElement = (
              <span key={lineIdx} className="block">
                {lineChars.map((char, charIdx) => {
                  const currentGlobal = globalIndex;
                  globalIndex++;
                  return (
                    <AnimatedChar
                      key={`${lineIdx}-${charIdx}`}
                      char={char}
                      index={currentGlobal}
                      scrollYProgress={scrollYProgress}
                    />
                  );
                })}
              </span>
            );
            // Account for the space between lines in global index
            globalIndex++;
            return lineElement;
          })}
        </h2>
      </div>
    </section>
  );
}
