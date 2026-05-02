"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Card {
  title: string;
  description?: string;
  cta: string;
  href: string;
  images?: string[];
  video?: string;
  locked?: boolean;
  lockedLabel?: string;
  blur?: boolean;
}

const cards: Card[] = [
  {
    title: "Coleccion Retro Unisex",
    cta: "Comprar",
    href: "/tienda?cat=hombre",
    images: [
      "/featured/retro-3.png",
      "/featured/retro-4.png",
      "/featured/retro-1.png",
      "/featured/retro-2.png",
    ],
  },
  {
    title: "Coleccion Atemporal Mujer",
    cta: "Comprar",
    href: "/tienda?cat=mujer",
    video: "/featured/atemporal-mujer.mp4",
  },
  {
    title: "Coleccion Niños",
    cta: "Comprar",
    href: "/tienda?cat=ninos",
    images: [
      "/ninos/retro-crema/1.png",
      "/ninos/visitante-1986-nino/1.png",
      "/ninos/visitante-1986-nina/1.png",
    ],
  },
  {
    title: "Aftermatch",
    description: "Disponible a partir del 5 de mayo",
    cta: "Próximamente",
    href: "#",
    images: ["/featured/aftermatch.avif"],
    locked: true,
    lockedLabel: "Próximamente",
    blur: true,
  },
];

function CardMedia({ card }: { card: Card }) {
  if (card.video) {
    return (
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <video
          src={card.video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <CardImage
      images={card.images ?? []}
      alt={card.title}
      locked={card.locked}
      blur={card.blur}
    />
  );
}

function CardImage({
  images,
  alt,
  locked,
  blur,
}: {
  images: string[];
  alt: string;
  locked?: boolean;
  blur?: boolean;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          } ${blur ? "blur-lg scale-110" : ""}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      ))}
      {locked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center px-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mb-2 md:w-8 md:h-8 md:mb-3"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.25em]">
            Próximamente
          </span>
        </div>
      )}
    </div>
  );
}

export default function FeaturedGrid() {
  return (
    <section className="bg-white py-6 md:py-10">
      <div className="px-3 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          {cards.map((card) => {
            const inner = (
              <>
                <CardMedia card={card} />
                <div className="pt-3 md:pt-4 pb-2">
                  <h3 className="text-xs md:text-base font-bold uppercase tracking-wide text-black mb-1.5 md:mb-2 leading-snug">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="text-[11px] md:text-sm text-black/70 mb-2 md:mb-4 leading-relaxed">
                      {card.description}
                    </p>
                  )}
                  {!card.locked && (
                    <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-wider text-black border-b-2 border-black pb-0.5">
                      {card.cta}
                    </span>
                  )}
                </div>
              </>
            );

            if (card.locked) {
              return (
                <div
                  key={card.title}
                  className="block border border-transparent p-1 md:p-2 cursor-not-allowed"
                  aria-disabled="true"
                >
                  {inner}
                </div>
              );
            }

            return (
              <Link
                key={card.title}
                href={card.href}
                className="group block border border-transparent hover:border-black transition-colors p-1 md:p-2"
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
