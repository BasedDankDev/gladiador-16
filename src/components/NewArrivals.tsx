"use client";

import Image from "next/image";
import Link from "next/link";

export default function NewArrivals() {
  return (
    <section id="nuevo" className="py-16 md:py-24">
      {/* Full-width dark container */}
      <div className="relative overflow-hidden">
        {/* Blurred stadium background */}
        <div className="absolute inset-0">
          <Image
            src="/hombre/polo-retro/1.png"
            alt=""
            fill
            className="object-cover scale-110 blur-2xl brightness-[0.2]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0d1117]/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-16 py-12 md:py-16">
          {/* Title — left-aligned, large italic bold like reference */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic text-white tracking-tight leading-none mb-8 md:mb-10">
            Bring Back 2026
          </h2>

          {/* Two-part layout: cards (left ~half) + hero photo (right ~half) */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-4 md:gap-5 items-stretch">
            {/* Left side — two product cards side by side */}
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {/* Card 1 */}
              <Link href="/producto/retro-2005-hombre" className="group">
                <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <Image
                      src="/hombre/retro-2005/3.png"
                      alt="Retro Saprissa 2005"
                      fill
                      className="object-contain scale-[1.15] group-hover:scale-[0.88] transition-transform duration-500 ease-out p-3"
                      sizes="(max-width: 768px) 45vw, 20vw"
                    />
                  </div>
                  <div className="flex justify-center gap-1.5 px-3 pt-1 pb-1 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300 overflow-hidden">
                    {["XS", "S", "M", "L", "XL", "2XL"].map((size) => (
                      <span key={size} className="text-[10px] font-semibold text-[#1a1f36] border border-gray-300 rounded px-1.5 py-0.5 min-w-[26px] text-center">
                        {size}
                      </span>
                    ))}
                  </div>
                  <div className="px-4 pb-4 pt-2 mt-auto">
                    <h3 className="text-xs md:text-[13px] font-semibold text-[#1a1f36] leading-snug group-hover:underline decoration-[#1a1f36]">
                      Retro Saprissa 2005
                      <br />
                      Hombre Bring Back 2026
                    </h3>
                    <p className="text-xs md:text-sm font-bold text-black mt-3">
                      ₡15 500,00
                    </p>
                  </div>
                </div>
              </Link>

              {/* Card 2 */}
              <Link href="/producto/retro-2008-hombre" className="group">
                <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <Image
                      src="/hombre/retro-2008/2.png"
                      alt="Retro Saprissa 2008"
                      fill
                      className="object-contain scale-[1.15] group-hover:scale-[0.88] transition-transform duration-500 ease-out p-3"
                      sizes="(max-width: 768px) 45vw, 20vw"
                    />
                  </div>
                  <div className="flex justify-center gap-1.5 px-3 pt-1 pb-1 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300 overflow-hidden">
                    {["XS", "S", "M", "L", "XL", "2XL"].map((size) => (
                      <span key={size} className="text-[10px] font-semibold text-[#1a1f36] border border-gray-300 rounded px-1.5 py-0.5 min-w-[26px] text-center">
                        {size}
                      </span>
                    ))}
                  </div>
                  <div className="px-4 pb-4 pt-2 mt-auto">
                    <h3 className="text-xs md:text-[13px] font-semibold text-[#1a1f36] leading-snug group-hover:underline decoration-[#1a1f36]">
                      Retro Saprissa 2008
                      <br />
                      Hombre Bring Back 2026
                    </h3>
                    <p className="text-xs md:text-sm font-bold text-black mt-3">
                      ₡15 500,00
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right side — hero action photo */}
            <div className="relative rounded-2xl overflow-hidden min-h-[300px] md:min-h-0">
              <Image
                src="/hombre/polo-retro/1.png"
                alt="Bring Back 2026"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
