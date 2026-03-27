"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";

// All cards come from real articles
const allCards = articles.map((a) => ({
  slug: a.slug,
  category: a.category,
  title: a.title,
  author: a.author,
  coverImage: a.coverImage,
}));

export default function Exclusivas() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="editorial" className="bg-[#1a1a1a] text-white py-16 md:py-24">
      <div className="px-6 md:px-16">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase italic">
              EXCLUSIVAS
            </h2>
            <p className="text-sm text-white/40 mt-2 font-light">
              Artículos, noticias y entrevistas especiales.
            </p>
          </div>

          {/* Circular Nav Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Anterior"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Siguiente"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide -mx-6 px-6"
        >
          {allCards.map((card, i) => (
            <Link
              key={i}
              href={`/editorial/${card.slug}`}
              className="flex-shrink-0 w-[260px] md:w-[280px] group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <Image
                  src={card.coverImage}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="280px"
                />
                <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <span className="text-[10px] font-medium tracking-[0.15em] text-white/50 uppercase">
                  {card.category}
                </span>
                <h3 className="text-xs font-bold uppercase mt-1.5 leading-snug tracking-tight text-white">
                  {card.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-[11px] text-white/40">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Autor: {card.author}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
