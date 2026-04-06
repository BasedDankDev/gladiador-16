"use client";

import { useState, useRef, useEffect } from "react";
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
  {
    name: "Slim Fit Dragon S",
    price: "12 500",
    image: "/images/products/img-15.png",
    hoverImage: "/images/products/img-16.png",
    badge: "ENVIO RAPIDO",
    slug: "slim-fit-dragon-s",
    category: "nuevo",
  },
  {
    name: "Slim Fit Papa Morado",
    price: "12 500",
    image: "/images/products/img-18.png",
    hoverImage: "/images/products/img-14.png",
    badge: "ENVIO RAPIDO",
    slug: "slim-fit-papa-morado",
    category: "nuevo",
  },
  {
    name: "Dry Fit Goku S",
    price: "24 500",
    image: "/images/products/img-24.png",
    hoverImage: "/images/products/img-21.png",
    badge: "ENVIO RAPIDO",
    slug: "dry-fit-goku-s",
    category: "nuevo",
  },
  {
    name: "Dry Fit Dracarys",
    price: "19 500",
    image: "/images/products/img-25.png",
    hoverImage: "/images/products/img-26.png",
    badge: "ENVIO RAPIDO",
    slug: "dry-fit-dracarys",
    category: "nuevo",
  },
  {
    name: "Jogger Deportivo",
    price: "18 500",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=600&fit=crop",
    badge: "ENVIO RAPIDO",
    slug: "jogger-deportivo",
    category: "hombre",
  },
  {
    name: "Polo Clasico",
    price: "15 000",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop",
    badge: "AGOTADO",
    slug: "polo-clasico",
    category: "hombre",
  },
  {
    name: "Chaleco Deportivo",
    price: "22 000",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop",
    badge: "ENVIO RAPIDO",
    slug: "chaleco-deportivo",
    category: "hombre",
  },
  {
    name: "Retro Saprissa Mujer",
    price: "12 500",
    image: "/mujer/saprissa-mujer-flatlay.png",
    hoverImage: "/mujer/saprissa-mujer-front.png",
    badge: "ENVIO RAPIDO",
    slug: "saprissa-mujer-retro",
    category: "mujer",
  },
  {
    name: "Retro Saprissa Mujer - Detalle",
    price: "12 500",
    image: "/mujer/saprissa-mujer-closeup.png",
    hoverImage: "/mujer/saprissa-mujer-back.png",
    badge: "ENVIO RAPIDO",
    slug: "saprissa-mujer-retro",
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeTab === "todos" ? products : products.filter((p) => p.category === activeTab);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function onScroll() {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [filtered]);

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

      {/* Scrollable Product Row */}
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
                className={`object-contain transition-all duration-300 ${
                  product.hoverImage ? "group-hover:opacity-0" : "group-hover:scale-105"
                }`}
                sizes="(max-width: 640px) 70vw, (max-width: 768px) 45vw, 25vw"
              />
              {product.hoverImage && (
                <Image
                  src={product.hoverImage}
                  alt={product.name}
                  fill
                  className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

      {/* Progress Bar */}
      <div className="mx-6 md:mx-16 mt-8">
        <div className="h-[2px] bg-gray-200 relative">
          <div
            className="absolute top-0 left-0 h-full bg-maroon-light transition-all duration-150"
            style={{ width: "40%", left: `${scrollProgress * 60}%` }}
          />
        </div>
      </div>

    </section>
  );
}
