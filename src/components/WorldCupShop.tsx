"use client";

import { useRef } from "react";
import Link from "next/link";

const countries = [
  { name: "Mexico", gradient: "linear-gradient(90deg, #006847 0%, #006847 33%, #ffffff 33%, #ffffff 66%, #ce1126 66%, #ce1126 100%)" },
  { name: "Argentina", gradient: "linear-gradient(180deg, #74acdf 0%, #74acdf 33%, #ffffff 33%, #ffffff 66%, #74acdf 66%, #74acdf 100%)" },
  { name: "Brasil", gradient: "linear-gradient(135deg, #009c3b 0%, #009c3b 50%, #ffdf00 50%, #ffdf00 100%)" },
  { name: "Colombia", gradient: "linear-gradient(180deg, #fcd116 0%, #fcd116 50%, #003893 50%, #003893 75%, #ce1126 75%, #ce1126 100%)" },
  { name: "Espana", gradient: "linear-gradient(180deg, #aa151b 0%, #aa151b 25%, #f1bf00 25%, #f1bf00 75%, #aa151b 75%, #aa151b 100%)" },
  { name: "Alemania", gradient: "linear-gradient(180deg, #000000 0%, #000000 33%, #dd0000 33%, #dd0000 66%, #ffce00 66%, #ffce00 100%)" },
  { name: "Japon", gradient: "radial-gradient(circle, #bc002d 0%, #bc002d 30%, #ffffff 30%, #ffffff 100%)" },
  { name: "Francia", gradient: "linear-gradient(90deg, #002654 0%, #002654 33%, #ffffff 33%, #ffffff 66%, #ed2939 66%, #ed2939 100%)" },
  { name: "Inglaterra", gradient: "linear-gradient(0deg, #ffffff 0%, #ffffff 40%, #ce1124 40%, #ce1124 60%, #ffffff 60%, #ffffff 100%)" },
];

export default function WorldCupShop() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-10">
      <div className="px-4 md:px-10">
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black mb-6">
          Shop FIFA World Cup 26™
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-black/10 rounded-full items-center justify-center shadow-md hover:bg-black hover:text-white transition-colors"
          aria-label="Scroll left"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-black/10 rounded-full items-center justify-center shadow-md hover:bg-black hover:text-white transition-colors"
          aria-label="Scroll right"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto px-4 md:px-10 pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {countries.map((country) => (
            <Link
              key={country.name}
              href="#"
              className="group relative shrink-0 w-[42vw] sm:w-[28vw] md:w-[18vw] lg:w-[15vw] aspect-[4/5] snap-start overflow-hidden"
            >
              <div
                className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                style={{ background: country.gradient }}
              />
              {/* Country pill bottom-left */}
              <div className="absolute bottom-3 left-3">
                <span className="bg-white text-black text-xs font-medium px-3 py-1.5 inline-block">
                  {country.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mx-4 md:mx-10 h-px bg-black/10 relative">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-black" />
        </div>
      </div>
    </section>
  );
}
