"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const products: {
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  badge: string;
  slug: string;
  category: string;
}[] = [
  // NUEVO — mix of best sellers from both
  {
    name: "Camiseta El Papa Sublimada",
    price: "12 500",
    image: "/hombre/camiseta-papa/1.png",
    hoverImage: "/hombre/camiseta-papa/4.png",
    badge: "NUEVO",
    slug: "camiseta-papa-hombre",
    category: "nuevo",
  },
  {
    name: "Camiseta Atemporal Morada",
    price: "12 500",
    image: "/mujer/atemporal-morada/1.png",
    hoverImage: "/mujer/atemporal-morada/3.png",
    badge: "NUEVO",
    slug: "atemporal-morada-mujer",
    category: "nuevo",
  },
  {
    name: "Polo Modernista Oversize",
    price: "19 900",
    image: "/hombre/polo-modernista/1.png",
    hoverImage: "/hombre/polo-modernista/3.png",
    badge: "NUEVO",
    slug: "polo-modernista-hombre",
    category: "nuevo",
  },
  {
    name: "Polo Retro Crop Mujer",
    price: "19 900",
    image: "/mujer/polo-retro-crop/4.png",
    hoverImage: "/mujer/polo-retro-crop/2.png",
    badge: "NUEVO",
    slug: "polo-retro-crop-mujer",
    category: "nuevo",
  },
  // HOMBRE
  {
    name: "Camiseta El Papa Sublimada",
    price: "12 500",
    image: "/hombre/camiseta-papa/1.png",
    hoverImage: "/hombre/camiseta-papa/4.png",
    badge: "NUEVO",
    slug: "camiseta-papa-hombre",
    category: "hombre",
  },
  {
    name: "Camiseta Goku Sublimada",
    price: "12 500",
    image: "/hombre/camiseta-goku/1.png",
    hoverImage: "/hombre/camiseta-goku/3.png",
    badge: "NUEVO",
    slug: "camiseta-goku-hombre",
    category: "hombre",
  },
  {
    name: "Retro Saprissa 2005",
    price: "15 500",
    image: "/hombre/retro-2005/1.png",
    hoverImage: "/hombre/retro-2005/3.png",
    badge: "NUEVO",
    slug: "retro-2005-hombre",
    category: "hombre",
  },
  {
    name: "Polo Modernista Oversize",
    price: "19 900",
    image: "/hombre/polo-modernista/1.png",
    hoverImage: "/hombre/polo-modernista/3.png",
    badge: "NUEVO",
    slug: "polo-modernista-hombre",
    category: "hombre",
  },
  {
    name: "Polo Retro Oversize",
    price: "19 900",
    image: "/hombre/polo-retro/1.png",
    hoverImage: "/hombre/polo-retro/3.png",
    badge: "NUEVO",
    slug: "polo-retro-hombre",
    category: "hombre",
  },
  {
    name: "Retro Saprissa 2008",
    price: "15 500",
    image: "/hombre/retro-2008/1.png",
    hoverImage: "/hombre/retro-2008/2.png",
    badge: "NUEVO",
    slug: "retro-2008-hombre",
    category: "hombre",
  },
  // MUJER
  {
    name: "Camiseta Atemporal Blanca",
    price: "12 500",
    image: "/mujer/saprissa-mujer-front.png",
    hoverImage: "/mujer/saprissa-mujer-closeup.png",
    badge: "NUEVO",
    slug: "saprissa-mujer-retro",
    category: "mujer",
  },
  {
    name: "Camiseta Atemporal Morada",
    price: "12 500",
    image: "/mujer/atemporal-morada/1.png",
    hoverImage: "/mujer/atemporal-morada/3.png",
    badge: "NUEVO",
    slug: "atemporal-morada-mujer",
    category: "mujer",
  },
  {
    name: "Polo Modernista Crop",
    price: "19 900",
    image: "/mujer/polo-modernista-crop/2.png",
    hoverImage: "/mujer/polo-modernista-crop/3.png",
    badge: "NUEVO",
    slug: "polo-modernista-crop-mujer",
    category: "mujer",
  },
  {
    name: "Polo Retro Crop",
    price: "19 900",
    image: "/mujer/polo-retro-crop/4.png",
    hoverImage: "/mujer/polo-retro-crop/2.png",
    badge: "NUEVO",
    slug: "polo-retro-crop-mujer",
    category: "mujer",
  },
];

const tabs = [
  { key: "nuevo", label: "LO NUEVO" },
  { key: "hombre", label: "HOMBRE" },
  { key: "mujer", label: "MUJER" },
  { key: "todos", label: "VER TODO" },
];

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState("nuevo");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeTab === "todos" ? products : products.filter((p) => p.category === activeTab);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section id="productos" className="bg-cream text-black py-16 md:py-24">
      {/* Divider */}
      <div className="border-t border-gray-300/60 mx-6 md:mx-16 mb-12" />

      {/* Category Tabs */}
      <div className="flex justify-center gap-6 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-xs tracking-[0.2em] uppercase px-4 py-2 transition-colors ${
              activeTab === tab.key
                ? "border border-black text-black font-medium"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Display */}
      {activeTab === "todos" ? (
        /* Grid layout for VER TODO */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 md:px-16">
          {filtered.map((product, i) => (
            <Link
              key={`${activeTab}-${i}`}
              href={`/producto/${product.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover transition-all duration-300 ${
                    product.hoverImage ? "group-hover:opacity-0" : "group-hover:scale-105"
                  }`}
                  sizes="(max-width: 640px) 70vw, (max-width: 768px) 45vw, 25vw"
                />
                {product.hoverImage && (
                  <Image
                    src={product.hoverImage}
                    alt={product.name}
                    fill
                    className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    sizes="(max-width: 640px) 70vw, (max-width: 768px) 45vw, 25vw"
                  />
                )}
                {/* Badge */}
                <span
                  className={`absolute top-3 left-3 text-[9px] font-medium tracking-wide px-2.5 py-1 ${
                    product.badge === "AGOTADO"
                      ? "bg-maroon-light text-white"
                      : "bg-gold/90 text-black"
                  }`}
                >
                  {product.badge}
                </span>
              </div>
              <div className="mt-3 space-y-0.5">
                <h3 className="text-sm font-normal leading-tight">{product.name}</h3>
                <p className="text-sm font-medium">₡ {product.price},00</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Scrollable row for category tabs */
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-black/10 rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-black/10 rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-6 md:px-16 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filtered.map((product, i) => (
              <Link
                key={`${activeTab}-${i}`}
                href={`/producto/${product.slug}`}
                className="group shrink-0 w-[70vw] sm:w-[45vw] md:w-[calc(25%-12px)] snap-start"
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-cover transition-all duration-300 ${
                      product.hoverImage ? "group-hover:opacity-0" : "group-hover:scale-105"
                    }`}
                    sizes="(max-width: 640px) 70vw, (max-width: 768px) 45vw, 25vw"
                  />
                  {product.hoverImage && (
                    <Image
                      src={product.hoverImage}
                      alt={product.name}
                      fill
                      className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      sizes="(max-width: 640px) 70vw, (max-width: 768px) 45vw, 25vw"
                    />
                  )}
                  <span
                    className={`absolute top-3 left-3 text-[9px] font-medium tracking-wide px-2.5 py-1 ${
                      product.badge === "AGOTADO"
                        ? "bg-maroon-light text-white"
                        : "bg-gold/90 text-black"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
                <div className="mt-3 space-y-0.5">
                  <h3 className="text-sm font-normal leading-tight">{product.name}</h3>
                  <p className="text-sm font-medium">₡ {product.price},00</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}
