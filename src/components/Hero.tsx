"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero-poster.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-12 pb-8 md:pb-12">
        {/* Tagline + EST row */}
        <div className="flex justify-between items-end mb-3">
          <p className="text-[10px] md:text-xs font-light tracking-[0.25em] uppercase text-white/70 leading-relaxed">
            Ropa deportiva de elite<br />
            San Jose, Costa Rica
          </p>
          <p className="text-[10px] md:text-xs font-light tracking-[0.25em] uppercase text-white/70">
            EST. 2024
          </p>
        </div>

        {/* Big brand name — bottom, full width */}
        <h1 className="text-[15vw] md:text-[13vw] font-black tracking-tighter leading-[0.85] uppercase text-white">
          GLADIADOR <span className="text-outline">16</span>
        </h1>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-6">
          <Link
            href="#productos"
            className="bg-maroon-light text-white text-xs font-light tracking-[0.2em] uppercase px-8 py-3 hover:bg-maroon transition-colors"
          >
            IR A TIENDA
          </Link>
          <Link
            href="#nuevo"
            className="border border-white/50 text-white text-xs font-light tracking-[0.2em] uppercase px-8 py-3 hover:bg-white/10 transition-colors"
          >
            LO NUEVO
          </Link>
        </div>
      </div>
    </section>
  );
}
