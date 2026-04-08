"use client";

import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";

const allCards = articles.map((a) => ({
  slug: a.slug,
  category: a.category,
  title: a.title,
  author: a.author,
  coverImage: a.coverImage,
}));

const categoryColors: Record<string, string> = {
  HISTORIA: "text-amber-500",
  INSTITUCIONAL: "text-maroon-light",
  HOMENAJE: "text-blue-400",
  LEYENDA: "text-gold",
};

export default function Exclusivas() {
  const featured = allCards[0];
  const rest = allCards.slice(1);

  return (
    <section id="editorial" className="bg-[#0d1117] text-white py-16 md:py-24">
      <div className="px-6 md:px-16">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <p className="text-[11px] font-bold text-white/30 uppercase tracking-[0.3em] mb-2">
            Editorial
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tight leading-none">
            EXCLUSIVAS
          </h2>
        </div>

        {/* Magazine layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Featured — large card */}
          <Link href={`/editorial/${featured.slug}`} className="group relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[520px]">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${categoryColors[featured.category] || "text-white/50"}`}>
                {featured.category}
              </span>
              <h3 className="text-xl md:text-2xl font-black uppercase leading-tight mt-2 group-hover:text-gold transition-colors">
                {featured.title}
              </h3>
              <p className="text-xs text-white/40 mt-3">{featured.author}</p>
            </div>
          </Link>

          {/* Right side — stacked list */}
          <div className="flex flex-col gap-4">
            {rest.map((card, i) => (
              <Link
                key={i}
                href={`/editorial/${card.slug}`}
                className="group flex gap-4 items-stretch bg-white/[0.03] hover:bg-white/[0.07] rounded-xl overflow-hidden transition-colors duration-300"
              >
                {/* Thumbnail */}
                <div className="relative w-28 md:w-36 shrink-0 aspect-[4/3] self-stretch">
                  <Image
                    src={card.coverImage}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
                {/* Text */}
                <div className="py-3 md:py-4 pr-4 flex flex-col justify-center">
                  <span className={`text-[9px] font-bold tracking-[0.15em] uppercase ${categoryColors[card.category] || "text-white/40"}`}>
                    {card.category}
                  </span>
                  <h3 className="text-xs md:text-sm font-bold uppercase leading-snug mt-1 group-hover:text-gold transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[10px] text-white/30 mt-2">{card.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
