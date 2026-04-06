"use client";

import Image from "next/image";
import Link from "next/link";

export default function MujerSection() {
  return (
    <section id="mujer" className="py-16 md:py-24">
      <div className="relative overflow-hidden">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] via-[#ede4dc] to-[#e8ddd4]" />

        {/* Content */}
        <div className="relative z-10 px-6 md:px-16 py-12 md:py-16">
          {/* Title */}
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <p className="text-[11px] font-bold text-black/40 uppercase tracking-[0.3em] mb-2">
                Coleccion Femenina
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic text-[#1a1f36] tracking-tight leading-none">
                Para Ella
              </h2>
            </div>
            <Link
              href="/#productos"
              className="hidden md:inline-block text-[11px] font-bold text-black/50 uppercase tracking-[0.2em] hover:text-black transition-colors border-b border-black/20 hover:border-black pb-1"
            >
              Ver Todo
            </Link>
          </div>

          {/* Layout: hero model (left) + product cards (right) */}
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-4 md:gap-5 items-stretch">
            {/* Left — hero model photo */}
            <div className="relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-0">
              <Image
                src="/mujer/saprissa-mujer-front.png"
                alt="Coleccion Mujer - Saprissa Retro"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 md:p-8">
                <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Nuevo</p>
                <p className="text-white text-lg md:text-xl font-bold">Retro Saprissa Mujer</p>
                <p className="text-white/70 text-sm mt-1">Edicion limitada 2026</p>
              </div>
            </div>

            {/* Right — two product cards stacked */}
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {/* Card 1 — Flat lay */}
              <Link href="/producto/saprissa-mujer-retro" className="group">
                <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-sm">
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <Image
                      src="/mujer/saprissa-mujer-flatlay.png"
                      alt="Saprissa Mujer Retro - Frente"
                      fill
                      className="object-contain scale-[1.15] group-hover:scale-[0.88] transition-transform duration-500 ease-out p-3"
                      sizes="(max-width: 768px) 45vw, 20vw"
                    />
                  </div>
                  {/* Sizes */}
                  <div className="flex justify-center gap-1.5 px-3 pt-1 pb-1 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300 overflow-hidden">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <span key={size} className="text-[10px] font-semibold text-[#1a1f36] border border-gray-300 rounded px-1.5 py-0.5 min-w-[26px] text-center">
                        {size}
                      </span>
                    ))}
                  </div>
                  <div className="px-4 pb-4 pt-2 mt-auto">
                    <h3 className="text-xs md:text-[13px] font-semibold text-[#1a1f36] leading-snug group-hover:underline decoration-[#1a1f36]">
                      Camiseta Retro
                      <br />
                      Mujer Saprissa 2026
                    </h3>
                    <p className="text-xs md:text-sm font-bold text-black mt-3">
                      ₡12 500,00
                    </p>
                  </div>
                </div>
              </Link>

              {/* Card 2 — Close-up model */}
              <Link href="/producto/saprissa-mujer-retro" className="group">
                <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-sm">
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <Image
                      src="/mujer/saprissa-mujer-closeup.png"
                      alt="Saprissa Mujer Retro - Detalle"
                      fill
                      className="object-cover scale-[1.05] group-hover:scale-[0.95] transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 45vw, 20vw"
                    />
                  </div>
                  {/* Sizes */}
                  <div className="flex justify-center gap-1.5 px-3 pt-1 pb-1 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300 overflow-hidden">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <span key={size} className="text-[10px] font-semibold text-[#1a1f36] border border-gray-300 rounded px-1.5 py-0.5 min-w-[26px] text-center">
                        {size}
                      </span>
                    ))}
                  </div>
                  <div className="px-4 pb-4 pt-2 mt-auto">
                    <h3 className="text-xs md:text-[13px] font-semibold text-[#1a1f36] leading-snug group-hover:underline decoration-[#1a1f36]">
                      Camiseta Retro
                      <br />
                      Detalle Escudo
                    </h3>
                    <p className="text-xs md:text-sm font-bold text-black mt-3">
                      ₡12 500,00
                    </p>
                  </div>
                </div>
              </Link>

              {/* Card 3 — Back view, spans full width */}
              <Link href="/producto/saprissa-mujer-retro" className="group col-span-2">
                <div className="bg-white rounded-2xl overflow-hidden flex flex-row shadow-sm">
                  <div className="relative w-1/3 min-h-[140px] overflow-hidden bg-white">
                    <Image
                      src="/mujer/saprissa-mujer-back.png"
                      alt="Saprissa Mujer Retro - Espalda"
                      fill
                      className="object-cover scale-[1.05] group-hover:scale-[0.95] transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 30vw, 15vw"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center px-5 py-4">
                    <p className="text-[10px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1">Deportivo Saprissa</p>
                    <h3 className="text-sm md:text-base font-bold text-[#1a1f36] group-hover:underline decoration-[#1a1f36]">
                      Edicion Retro Mujer
                    </h3>
                    <p className="text-xs text-black/50 mt-1">Slim Fit | Blanco + Morado</p>
                    <div className="flex gap-1.5 mt-3">
                      {["XS", "S", "M", "L", "XL"].map((size) => (
                        <span key={size} className="text-[9px] font-semibold text-[#1a1f36]/60 border border-gray-200 rounded px-1.5 py-0.5 min-w-[22px] text-center">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
