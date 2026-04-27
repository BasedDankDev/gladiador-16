"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";

export default function RelatedResources() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  function update() {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function scroll(dir: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className="bg-white pt-2 pb-12">
      <div className="pl-4 md:pl-10 pr-0">
        <h2 className="text-base md:text-lg font-black uppercase tracking-tight text-black mb-6 pr-4 md:pr-10">
          Recursos Relacionados
        </h2>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pl-4 md:pl-10 pr-4 md:pr-10 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/editorial/${article.slug}`}
              className="group block flex-shrink-0 snap-start w-[72%] sm:w-[44%] md:w-[calc((100%-3rem)/4.15)]"
            >
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 72vw, 24vw"
                />
              </div>
              <div className="pt-3 md:pt-4">
                <h3 className="text-sm md:text-base font-bold text-black leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs md:text-sm text-black/70 mt-2 leading-relaxed line-clamp-3">
                  {article.intro}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll arrows — desktop only */}
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Anterior"
          disabled={!canLeft}
          className="hidden md:flex absolute left-2 top-[38%] -translate-y-1/2 w-12 h-12 bg-white border border-black/30 shadow-[0_2px_8px_rgba(0,0,0,0.12)] text-black items-center justify-center hover:bg-gray-50 transition disabled:opacity-0 disabled:pointer-events-none z-10"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Siguiente"
          disabled={!canRight}
          className="hidden md:flex absolute right-2 top-[38%] -translate-y-1/2 w-12 h-12 bg-white border border-black/30 shadow-[0_2px_8px_rgba(0,0,0,0.12)] text-black items-center justify-center hover:bg-gray-50 transition disabled:opacity-0 disabled:pointer-events-none z-10"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
