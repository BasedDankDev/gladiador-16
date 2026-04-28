"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  images: string | null;
  badge: string | null;
  category: string;
  inStock: boolean;
}

type DisplayProduct = {
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  badge: string;
  slug: string;
  category: string;
};

const HOVER_IMAGES: Record<string, string> = {
  "polo-modernista-hombre": "/hombre/polo-modernista/3.png",
  "polo-retro-hombre": "/hombre/polo-retro/3.png",
  "saprissa-mujer-retro": "/mujer/saprissa-mujer-closeup.png",
  "atemporal-morada-mujer": "/mujer/atemporal-morada/3.png",
  "polo-modernista-crop-mujer": "/mujer/polo-modernista-crop/3.png",
  "polo-retro-crop-mujer": "/mujer/polo-retro-crop/3.png",
};

const NUEVO_SLUGS = [
  "visitante-1986-hombre",
  "visitante-1986-mujer",
  "atemporal-morada-mujer",
  "polo-modernista-hombre",
];

const HOMBRE_ORDER = [
  "polo-retro-hombre",
  "polo-modernista-hombre",
  "visitante-1986-hombre",
  "adidas-local-hombre",
];

const formatPrice = (price: number) => {
  const whole = Math.floor(price / 1000);
  const rest = price % 1000;
  return `${whole} ${rest.toString().padStart(3, "0")}`;
};

const tabs = [
  { key: "nuevo", label: "LO NUEVO" },
  { key: "hombre", label: "HOMBRE" },
  { key: "mujer", label: "MUJER" },
  { key: "ninos", label: "NIÑOS" },
  { key: "todos", label: "VER TODO" },
];

export default function ProductGrid({ initialTab = "nuevo" }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: ApiProduct[]) => setApiProducts(data))
      .catch(() => setApiProducts([]));
  }, []);

  const toDisplay = (p: ApiProduct, category: string): DisplayProduct => ({
    name: p.name,
    price: formatPrice(p.price),
    image: p.image,
    hoverImage: HOVER_IMAGES[p.slug],
    badge: p.inStock ? p.badge || "NUEVO" : "AGOTADO",
    slug: p.slug,
    category,
  });

  const products: DisplayProduct[] = [
    ...NUEVO_SLUGS.map((slug) => apiProducts.find((p) => p.slug === slug))
      .filter((p): p is ApiProduct => !!p)
      .map((p) => toDisplay(p, "nuevo")),
    ...apiProducts.map((p) => toDisplay(p, p.category)),
  ];

  const filtered = (() => {
    if (activeTab === "todos") return products;
    if (activeTab === "hombre") {
      return HOMBRE_ORDER
        .map((slug) => products.find((p) => p.slug === slug && p.category === "hombre"))
        .filter((p): p is DisplayProduct => !!p);
    }
    return products.filter((p) => p.category === activeTab);
  })();

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
      <div className="flex justify-start md:justify-center gap-2 sm:gap-4 md:gap-6 mb-8 md:mb-10 px-4 md:px-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase px-3 sm:px-4 py-2 whitespace-nowrap transition-colors shrink-0 ${
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6 md:px-16">
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
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-black/10 rounded-full items-center justify-center shadow-md hover:bg-black hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-black/10 rounded-full items-center justify-center shadow-md hover:bg-black hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-6 md:px-16 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filtered.map((product, i) => (
              <Link
                key={`${activeTab}-${i}`}
                href={`/producto/${product.slug}`}
                className="group shrink-0 w-[65vw] sm:w-[45vw] md:w-[calc(25%-12px)] snap-start"
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
