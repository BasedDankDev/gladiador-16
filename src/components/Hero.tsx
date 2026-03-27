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
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* GLADIADOR - solid white */}
        <h1 className="text-[8vw] md:text-[10vw] font-black tracking-tighter leading-[0.9] uppercase">
          GLADIADOR
        </h1>
        {/* 16 - outline effect */}
        <h1 className="text-[8vw] md:text-[10vw] font-black tracking-tighter leading-[0.9] uppercase text-outline">
          16
        </h1>

        {/* Tagline */}
        <p className="mt-auto mb-8 text-sm font-light tracking-wider text-white/70 absolute bottom-24 left-8">
          Ropa deportiva de elite — San Jose, Costa Rica
        </p>

        {/* CTA Buttons */}
        <div className="absolute bottom-8 right-8 flex gap-4">
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
