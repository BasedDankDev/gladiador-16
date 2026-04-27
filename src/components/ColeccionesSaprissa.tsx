"use client";

import Image from "next/image";
import Link from "next/link";

const colecciones = [
  {
    label: "Retro",
    image: "/hombre/retro-2008/1.png",
    href: "/tienda?cat=hombre",
    available: true,
  },
  {
    label: "Aftermatch",
    image: "/hombre/polo-modernista/1.png",
    href: null,
    available: false,
  },
];

export default function ColeccionesSaprissa() {
  return (
    <section className="bg-[#0d1117] text-white py-12 md:py-16">
      <div className="px-4 sm:px-6 md:px-16">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 md:mb-8">
          Colecciones Saprissa
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {colecciones.map((c) => {
            const card = (
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] sm:aspect-[4/5] bg-[#1a1f36] group">
                <Image
                  src={c.image}
                  alt={c.label}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    c.available ? "group-hover:scale-105" : "scale-100 brightness-50"
                  }`}
                  sizes="(max-width: 768px) 50vw, 50vw"
                />

                {/* Subtle bottom shadow for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Coming soon badge */}
                {!c.available && (
                  <span className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-gold text-black text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full">
                    Proximamente
                  </span>
                )}

                {/* Centered title */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3
                    className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide drop-shadow-lg ${
                      c.available ? "text-white" : "text-white/80"
                    }`}
                  >
                    {c.label}
                  </h3>
                </div>
              </div>
            );

            return c.available && c.href ? (
              <Link key={c.label} href={c.href} className="block">
                {card}
              </Link>
            ) : (
              <div key={c.label} className="cursor-default">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
