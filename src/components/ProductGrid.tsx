"use client";

import Image from "next/image";
import Link from "next/link";

const products: {
  name: string;
  brand: string;
  price: string;
  variants: string;
  image: string;
  hoverImage?: string;
  badge: string;
  slug: string;
}[] = [
  {
    name: "SLIM FIT DRAGON S",
    brand: "GLADIADOR 16",
    price: "12 500",
    variants: "2 COLORES, 5 TALLAS",
    image: "/images/products/img-15.png",
    hoverImage: "/images/products/img-16.png",
    badge: "ENVIO RAPIDO",
    slug: "slim-fit-dragon-s",
  },
  {
    name: "SLIM FIT PAPA MORADO",
    brand: "GLADIADOR 16",
    price: "12 500",
    variants: "2 COLORES, 5 TALLAS",
    image: "/images/products/img-18.png",
    hoverImage: "/images/products/img-14.png",
    badge: "ENVIO RAPIDO",
    slug: "slim-fit-papa-morado",
  },
  {
    name: "DRY FIT GOKU S",
    brand: "GLADIADOR 16",
    price: "24 500",
    variants: "2 COLORES, 4 TALLAS",
    image: "/images/products/img-24.png",
    hoverImage: "/images/products/img-21.png",
    badge: "ENVIO RAPIDO",
    slug: "dry-fit-goku-s",
  },
  {
    name: "DRY FIT DRACARYS",
    brand: "GLADIADOR 16",
    price: "19 500",
    variants: "2 COLORES, 5 TALLAS",
    image: "/images/products/img-25.png",
    hoverImage: "/images/products/img-26.png",
    badge: "ENVIO RAPIDO",
    slug: "dry-fit-dracarys",
  },
  {
    name: "JOGGER DEPORTIVO",
    brand: "GLADIADOR 16",
    price: "18 500",
    variants: "3 COLORES, 4 TALLAS",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=600&fit=crop",
    badge: "ENVIO RAPIDO",
    slug: "jogger-deportivo",
  },
  {
    name: "POLO CLASICO",
    brand: "GLADIADOR 16",
    price: "15 000",
    variants: "3 COLORES, 5 TALLAS",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop",
    badge: "AGOTADO",
    slug: "polo-clasico",
  },
  {
    name: "CHALECO DEPORTIVO",
    brand: "GLADIADOR 16",
    price: "22 000",
    variants: "2 COLORES, 4 TALLAS",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop",
    badge: "ENVIO RAPIDO",
    slug: "chaleco-deportivo",
  },
  {
    name: "CAMISA FORMAL",
    brand: "GLADIADOR 16",
    price: "28 000",
    variants: "2 COLORES, 5 TALLAS",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop",
    badge: "ENVIO RAPIDO",
    slug: "camisa-formal",
  },
];

const filters = ["CATEGORIA", "TIPO DE PRODUCTO", "TALLA", "TAMANO", "COLOR", "PRECIO", "EN OFERTA"];

export default function ProductGrid() {
  return (
    <section id="productos" className="bg-cream text-black py-16 md:py-24">
      <div className="px-6 md:px-16">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase italic">
            TENDENCIAS ACTUALES
          </h2>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase italic text-outline-maroon">
            VERANO 2026
          </h2>
        </div>

        {/* Top bar: filter toggle + result count + sort */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h16M4 12h10M4 18h4" />
              </svg>
              Ocultar filtros
            </button>
            <span className="text-sm text-gray-400">{products.length} Resultados</span>
          </div>
          <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-black transition-colors">
            Ordenar: Caracteristicas
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        <div className="flex gap-10">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-56 shrink-0">
            {filters.map((filter) => (
              <div key={filter} className="border-t border-gray-300/50 py-4">
                <button className="flex items-center justify-between w-full text-sm font-normal text-gray-800 capitalize">
                  {filter.charAt(0) + filter.slice(1).toLowerCase()}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            ))}
            <div className="border-t border-gray-300/50" />
          </aside>

          {/* Product Grid - 4 columns matching reference */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {products.map((product, i) => (
              <Link
                key={i}
                href={`/producto/${product.slug}`}
                className="group"
              >
                <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-contain transition-all duration-300 ${
                      product.hoverImage ? "group-hover:opacity-0" : "group-hover:scale-105"
                    }`}
                    sizes="(max-width: 768px) 50vw, 22vw"
                  />
                  {product.hoverImage && (
                    <Image
                      src={product.hoverImage}
                      alt={product.name}
                      fill
                      className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      sizes="(max-width: 768px) 50vw, 22vw"
                    />
                  )}
                  {/* Badge */}
                  <span
                    className={`absolute top-2 left-2 text-[9px] font-normal tracking-wide px-2 py-0.5 ${
                      product.badge === "AGOTADO"
                        ? "bg-maroon-light text-white"
                        : "bg-gold/90 text-black"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
                <div className="mt-2.5 text-center space-y-0.5">
                  <h3 className="text-[13px] font-normal leading-tight capitalize">
                    {product.name.charAt(0) + product.name.slice(1).toLowerCase()}
                  </h3>
                  <p className="text-[12px] text-gray-400">
                    {product.brand.charAt(0) + product.brand.slice(1).toLowerCase()}
                  </p>
                  <p className="text-[13px] font-normal">
                    ₡ {product.price},00
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {product.variants.charAt(0) + product.variants.slice(1).toLowerCase()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
