"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  function toggleSound() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
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

      {/* Sound toggle — bottom right */}
      <button
        onClick={toggleSound}
        className="absolute bottom-8 right-6 md:right-12 z-20 text-white/60 hover:text-white transition-colors"
        aria-label={muted ? "Activar sonido" : "Silenciar"}
      >
        {muted ? (
          /* Speaker with X (muted) */
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          /* Speaker with waves (unmuted) */
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>

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
