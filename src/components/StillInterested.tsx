"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useViewedProducts, clearViewedProduct } from "@/hooks/useViewedProducts";

interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  brand: string;
}

export default function StillInterested() {
  const viewed = useViewedProducts();
  const [products, setProducts] = useState<ApiProduct[]>([]);

  useEffect(() => {
    if (viewed.length === 0) return;
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: ApiProduct[]) => {
        const map = new Map(data.map((p) => [p.slug, p]));
        const ordered = viewed
          .map((slug) => map.get(slug))
          .filter((p): p is ApiProduct => !!p);
        setProducts(ordered);
      })
      .catch(() => setProducts([]));
  }, [viewed]);

  function handleDismiss(slug: string) {
    clearViewedProduct(slug);
    setProducts((prev) => prev.filter((p) => p.slug !== slug));
  }

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-8 md:py-10 border-t border-black/10">
      <div className="px-3 md:px-10">
        <h2 className="text-base md:text-2xl font-black uppercase tracking-tight text-black mb-4 md:mb-6">
          ¿Aún te interesa?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {products.slice(0, 4).map((p) => (
            <div key={p.slug} className="group relative">
              <Link href={`/producto/${p.slug}`} className="block">
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="pt-2 md:pt-3">
                  <p className="text-[9px] md:text-[10px] text-black/40 uppercase tracking-[0.15em]">{p.brand}</p>
                  <h3 className="text-xs md:text-sm font-medium text-black mt-0.5 line-clamp-2">{p.name}</h3>
                  <p className="text-xs md:text-sm font-bold text-black mt-1">₡{p.price.toLocaleString()},00</p>
                </div>
              </Link>

              {/* Dismiss button */}
              <button
                onClick={() => handleDismiss(p.slug)}
                aria-label="Quitar de la lista"
                className="absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-white text-black/60 hover:text-black rounded-full flex items-center justify-center shadow-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
