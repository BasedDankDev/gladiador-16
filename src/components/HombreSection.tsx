"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
}

const HOMBRE_ORDER = [
  { slug: "camiseta-goku-hombre", displayName: "Camiseta Goku Sublimada", image: "/hombre/camiseta-goku/1.png" },
  { slug: "polo-modernista-hombre", displayName: "Polo Modernista Oversize", image: "/hombre/polo-modernista/1.png" },
  { slug: "polo-retro-hombre", displayName: "Polo Retro Oversize", image: "/hombre/polo-retro/1.png" },
];

const formatPrice = (price: number) => {
  const whole = Math.floor(price / 1000);
  const rest = price % 1000;
  return `${whole} ${rest.toString().padStart(3, "0")}`;
};

export default function HombreSection() {
  const [priceBySlug, setPriceBySlug] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: ApiProduct[]) => {
        const map: Record<string, number> = {};
        for (const p of data) map[p.slug] = p.price;
        setPriceBySlug(map);
      })
      .catch(() => setPriceBySlug({}));
  }, []);

  const hombreProducts = HOMBRE_ORDER.map((p) => ({
    ...p,
    name: p.displayName,
    price: priceBySlug[p.slug] ? formatPrice(priceBySlug[p.slug]) : "—",
  }));

  return (
    <section id="hombre" className="py-16 md:py-24">
      <div className="relative overflow-hidden">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] via-[#ede4dc] to-[#e8ddd4]" />

        {/* Content */}
        <div className="relative z-10 px-4 sm:px-6 md:px-16 py-12 md:py-16">
          {/* Title */}
          <div className="flex items-end justify-between mb-6 sm:mb-8 md:mb-10">
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold text-black/40 uppercase tracking-[0.3em] mb-2">
                Coleccion Masculina
              </p>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black italic text-[#1a1f36] tracking-tight leading-none">
                Para El
              </h2>
            </div>
            <Link
              href="/tienda?cat=hombre"
              className="hidden md:inline-block text-[11px] font-bold text-black/50 uppercase tracking-[0.2em] hover:text-black transition-colors border-b border-black/20 hover:border-black pb-1"
            >
              Ver Todo
            </Link>
          </div>

          {/* Layout: hero model (left) + product cards (right) */}
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-4 md:gap-5 items-stretch">
            {/* Left — hero model photo */}
            <div className="relative rounded-2xl overflow-hidden min-h-[320px] sm:min-h-[400px] md:min-h-0">
              <Image
                src="/hombre/retro-2008/1.png"
                alt="Coleccion Hombre Saprissa"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 md:p-8">
                <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Nuevo</p>
                <p className="text-white text-lg md:text-xl font-bold">Coleccion Hombre Saprissa</p>
                <p className="text-white/70 text-sm mt-1">Edicion limitada 2026</p>
              </div>
            </div>

            {/* Right — product cards grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              {hombreProducts.map((product) => (
                <Link key={product.slug} href={`/producto/${product.slug}`} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-sm">
                    <div className="relative aspect-square overflow-hidden bg-white">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain scale-[1.15] group-hover:scale-[0.88] transition-transform duration-500 ease-out p-3"
                        sizes="(max-width: 768px) 45vw, 20vw"
                      />
                    </div>
                    {/* Sizes */}
                    <div className="flex justify-center gap-1.5 px-3 pt-1 pb-1 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300 overflow-hidden">
                      {["XS", "S", "M", "L", "XL", "2XL"].map((size) => (
                        <span key={size} className="text-[10px] font-semibold text-[#1a1f36] border border-gray-300 rounded px-1.5 py-0.5 min-w-[26px] text-center">
                          {size}
                        </span>
                      ))}
                    </div>
                    <div className="px-4 pb-4 pt-2 mt-auto">
                      <h3 className="text-xs md:text-[13px] font-semibold text-[#1a1f36] leading-snug group-hover:underline decoration-[#1a1f36]">
                        {product.name}
                      </h3>
                      <p className="text-xs md:text-sm font-bold text-black mt-3">
                        ₡{product.price},00
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Ver Toda la Colección — CTA card to fill 4th slot */}
              <Link
                href="/tienda?cat=hombre"
                className="group bg-[#1a1f36] rounded-2xl overflow-hidden h-full flex flex-col items-center justify-center p-6 text-center shadow-sm hover:bg-[#252b48] transition-colors"
              >
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mb-3">
                  Coleccion Hombre
                </p>
                <h3 className="text-xl md:text-2xl font-black italic text-white tracking-tight leading-tight mb-4">
                  Ver toda<br/>la coleccion
                </h3>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold text-gold uppercase tracking-[0.2em]">
                  Comprar
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
